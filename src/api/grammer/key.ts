import type { ListQuery } from '../types';

export const grammerKeys = {
  all: ['grammer'] as const,
  list: (filters: ListQuery) => ['grammer', 'list', filters] as const,
  detail: (id: number) => ['grammer', 'detail', id] as const,
};
