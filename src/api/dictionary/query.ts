import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ListQuery } from '../types';
import { dictionaryKeys } from './key';
import {
  createDictionary,
  deleteDictionary,
  getDictionaryById,
  listDictionary,
  updateDictionary,
  type DictionaryCreatePayload,
  type DictionaryUpdatePayload,
} from './service';

export const useDictionaryList = (filters: ListQuery) =>
  useQuery({
    queryKey: dictionaryKeys.list(filters),
    queryFn: () => listDictionary(filters),
    select: (res) => res.data.data,
  });

export const useDictionaryDetail = (id: number | undefined) =>
  useQuery({
    queryKey: dictionaryKeys.detail(id ?? -1),
    queryFn: () => getDictionaryById(id as number),
    select: (res) => res.data.data,
    enabled: typeof id === 'number' && Number.isFinite(id),
  });

export const useCreateDictionary = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: DictionaryCreatePayload) => createDictionary(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dictionaryKeys.all });
    },
  });
};

export const useUpdateDictionary = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DictionaryUpdatePayload }) =>
      updateDictionary(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dictionaryKeys.all });
    },
  });
};

export const useDeleteDictionary = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDictionary(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: dictionaryKeys.all });
    },
  });
};
