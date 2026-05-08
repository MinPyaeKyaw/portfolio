import type { ListQuery } from '../types';

export const dictionaryKeys = {
  all: ['dictionary'] as const,
  list: (filters: ListQuery) => ['dictionary', 'list', filters] as const,
  detail: (id: number) => ['dictionary', 'detail', id] as const,
};
