// axios client configuration

import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

// Add a request interceptor
type RetryableRequestConfig = InternalAxiosRequestConfig & {
	_retry?: boolean
}

interface FailedRequestQueueItem {
	resolve: (token: string) => void
	reject: (error: unknown) => void
}

let isRefreshing = false
let failedQueue: FailedRequestQueueItem[] = []

const processQueue = (error: unknown, token: string | null) => {
	failedQueue.forEach(({ resolve, reject }) => {
		if (token) {
			resolve(token)
		} else {
			reject(error)
		}
	})
	failedQueue = []
}

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const { response, config } = error
		const originalRequest = config as RetryableRequestConfig | undefined

		if (!response || !originalRequest) {
			return Promise.reject(error)
		}

		if (response.status !== 401 || originalRequest._retry) {
			return Promise.reject(error)
		}

		const { refreshToken, reset } = useAuthStore.getState()
		if (!refreshToken) {
			reset()
			return Promise.reject(error)
		}

		originalRequest._retry = true

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({
					resolve: (token: string) => {
						originalRequest.headers = originalRequest.headers || {}
						originalRequest.headers.Authorization = `Bearer ${token}`
						resolve(apiClient(originalRequest))
					},
					reject,
				})
			})
		}

		isRefreshing = true

		try {
			const refreshResponse = await axios.post(
				'/api/user-auth/refresh-token',
				undefined,
				{
					baseURL: apiClient.defaults.baseURL,
					headers: {
						'x-refresh-token': refreshToken,
					},
				}
			)

			const payload = refreshResponse.data?.data ?? refreshResponse.data
			const newAccessToken: string | undefined = payload?.accessToken
			const newRefreshToken: string | undefined = payload?.refreshToken

			if (!newAccessToken) {
				throw new Error('Missing access token in refresh response')
			}

			const { setAccessToken, setRefreshToken } = useAuthStore.getState()
			setAccessToken(newAccessToken)
			if (newRefreshToken) {
				setRefreshToken(newRefreshToken)
			}

			processQueue(null, newAccessToken)

			originalRequest.headers = originalRequest.headers || {}
			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

			return apiClient(originalRequest)
		} catch (refreshError) {
			processQueue(refreshError, null)
			useAuthStore.getState().reset()
			return Promise.reject(refreshError)
		} finally {
			isRefreshing = false
		}
	}
)
apiClient.interceptors.request.use(
	(config) => {
		const { accessToken } = useAuthStore.getState()
		if (accessToken) {
			const headers = config.headers ?? {}
			const headerSetter = (
				headers as { set?: (key: string, value: string) => void }
			).set

			if (typeof headerSetter === 'function') {
				headerSetter.call(headers, 'Authorization', `Bearer ${accessToken}`)
			} else {
				;(headers as Record<string, string>).Authorization =
					`Bearer ${accessToken}`
			}

			config.headers = headers
		}
		return config
	},
	(requestError) => Promise.reject(requestError)
)

export default apiClient
