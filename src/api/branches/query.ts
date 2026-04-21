import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { branchKeys } from './key'
import {
	createBranch,
	deleteBranch,
	deleteManyBranches,
	downloadBranchTemplate,
	exportBranches,
	getBranch,
	getBranchList,
	importBranches,
	updateBranch,
} from './service'

export const useBranchList = (params: Record<string, unknown>) => {
	return useQuery({
		queryKey: branchKeys.list(params),
		queryFn: () => getBranchList(params),
		select: (response) => response.data.data,
	})
}

export const useBranch = (id: string) => {
	return useQuery({
		queryKey: branchKeys.detail(id),
		queryFn: () => getBranch(id),
		select: (response) => response.data.data,
		enabled: !!id,
	})
}

export const useBranchCreate = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: FormData) => createBranch(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: branchKeys.all })
		},
	})
}

export const useBranchUpdate = (id: string) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: FormData) => updateBranch(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: branchKeys.all })
		},
	})
}

export const useBranchDelete = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: string) => deleteBranch(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: branchKeys.all })
		},
	})
}

export const useBranchDeleteMany = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (ids: string[]) => deleteManyBranches(ids),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: branchKeys.all })
		},
	})
}

export const useBranchImport = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (file: File) => importBranches(file),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: branchKeys.all })
		},
	})
}

export const useBranchExport = () => {
	return useMutation({
		mutationFn: async (params?: Record<string, unknown>) => {
			const response = await exportBranches(params)
			return response.data as Blob
		},
		onSuccess: () => {
			toast.success('Branches exported successfully')
		},
		onError: () => {
			toast.error('Failed to export branches')
		},
	})
}

export const useBranchDownloadTemplate = () => {
	return useMutation({
		mutationFn: async () => {
			const response = await downloadBranchTemplate()
			return response.data
		},
		onSuccess: (blob) => {
			const today = new Date().toISOString().split('T')[0]
			const filename = `branch_template_${today}.xlsx`
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', filename)

			document.body.appendChild(link)
			link.click()

			link.parentNode?.removeChild(link)
			window.URL.revokeObjectURL(url)
			toast.success('Template downloaded successfully')
		},
		onError: (error) => {
			console.error(error)
			toast.error('Failed to download template')
		},
	})
}
