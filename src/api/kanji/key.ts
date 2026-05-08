import type { ListQuery } from '../types';

export const kanjiKeys = {
  all: ['kanji'] as const,
  list: (filters: ListQuery) => ['kanji', 'list', filters] as const,
  detail: (id: number) => ['kanji', 'detail', id] as const,
};
