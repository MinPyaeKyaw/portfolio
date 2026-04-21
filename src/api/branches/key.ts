export const branchKeys = {
	all: ['branches'] as const,
	list: (params: Record<string, unknown>) =>
		[...branchKeys.all, 'list', params] as const,
	detail: (id: string) => [...branchKeys.all, 'detail', id] as const,
}
