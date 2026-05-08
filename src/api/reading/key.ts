import type { ListQuery } from '../types';

export const readingKeys = {
  all: ['reading'] as const,
  list: (filters: ListQuery) => ['reading', 'list', filters] as const,
  detail: (id: number) => ['reading', 'detail', id] as const,
};
