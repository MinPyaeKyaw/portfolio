import type { ApiResponse, PaginatedResponse } from '@/types/types'
import apiClient from '../api-client'
import type { ApiBranch } from './types'

export const getBranchList = async (params: Record<string, unknown>) => {
	return apiClient.get<PaginatedResponse<ApiBranch>>('/api/branches', {
		params,
	})
}

export const getBranch = async (id: string) => {
	return apiClient.get<ApiResponse<ApiBranch>>(`/api/branches/${id}`)
}

export const createBranch = async (data: FormData) => {
	return apiClient.post<ApiBranch>('/api/branches', data, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}

export const updateBranch = async (id: string, data: FormData) => {
	return apiClient.patch<ApiBranch>(`/api/branches/${id}`, data, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}

export const deleteBranch = async (id: string) => {
	return apiClient.delete(`/api/branches/${id}`)
}

export const deleteManyBranches = async (ids: string[]) => {
	return apiClient.post('/api/branches/delete-many', { ids })
}

export const importBranches = async (file: File) => {
	const formData = new FormData()
	formData.append('file', file)
	return apiClient.post('/api/branches/import/excel', formData, {
		headers: {
			'Content-Type': undefined,
		},
	})
}

export const exportBranches = async (params?: Record<string, unknown>) => {
	return apiClient.get('/api/branches/export/excel', {
		params,
		responseType: 'blob',
	})
}

export const downloadBranchTemplate = async () => {
	return apiClient.get('/api/branches/download-template/excel', {
		responseType: 'blob',
	})
}
