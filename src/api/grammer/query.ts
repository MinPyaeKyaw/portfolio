import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ListQuery } from '../types';
import { grammerKeys } from './key';
import {
  createGrammer,
  deleteGrammer,
  getGrammerById,
  listGrammer,
  updateGrammer,
  type GrammerCreatePayload,
  type GrammerUpdatePayload,
} from './service';

export const useGrammerList = (filters: ListQuery) =>
  useQuery({
    queryKey: grammerKeys.list(filters),
    queryFn: () => listGrammer(filters),
    select: (res) => res.data.data,
  });

export const useGrammerDetail = (id: number | undefined) =>
  useQuery({
    queryKey: grammerKeys.detail(id ?? -1),
    queryFn: () => getGrammerById(id as number),
    select: (res) => res.data.data,
    enabled: typeof id === 'number' && Number.isFinite(id),
  });

export const useCreateGrammer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: GrammerCreatePayload) => createGrammer(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: grammerKeys.all });
    },
  });
};

export const useUpdateGrammer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: GrammerUpdatePayload }) =>
      updateGrammer(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: grammerKeys.all });
    },
  });
};

export const useDeleteGrammer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteGrammer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: grammerKeys.all });
    },
  });
};
