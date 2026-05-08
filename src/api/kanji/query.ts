import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ListQuery } from '../types';
import { kanjiKeys } from './key';
import {
  createKanji,
  deleteKanji,
  getKanjiById,
  listKanji,
  updateKanji,
  type KanjiCreatePayload,
  type KanjiUpdatePayload,
} from './service';

export const useKanjiList = (filters: ListQuery) =>
  useQuery({
    queryKey: kanjiKeys.list(filters),
    queryFn: () => listKanji(filters),
    select: (res) => res.data.data,
  });

export const useKanjiDetail = (id: number | undefined) =>
  useQuery({
    queryKey: kanjiKeys.detail(id ?? -1),
    queryFn: () => getKanjiById(id as number),
    select: (res) => res.data.data,
    enabled: typeof id === 'number' && Number.isFinite(id),
  });

export const useCreateKanji = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: KanjiCreatePayload) => createKanji(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: kanjiKeys.all });
    },
  });
};

export const useUpdateKanji = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: KanjiUpdatePayload }) =>
      updateKanji(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: kanjiKeys.all });
    },
  });
};

export const useDeleteKanji = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteKanji(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: kanjiKeys.all });
    },
  });
};
