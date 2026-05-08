import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ListQuery } from '../types';
import { readingKeys } from './key';
import {
  createReading,
  deleteReading,
  getReadingById,
  listReading,
  updateReading,
} from './service';
import type { ReadingCreatePayload, ReadingUpdatePayload } from './types';

export const useReadingList = (filters: ListQuery) =>
  useQuery({
    queryKey: readingKeys.list(filters),
    queryFn: () => listReading(filters),
    select: (res) => res.data.data,
  });

export const useReadingDetail = (id: number | undefined) =>
  useQuery({
    queryKey: readingKeys.detail(id ?? -1),
    queryFn: () => getReadingById(id as number),
    select: (res) => res.data.data,
    enabled: typeof id === 'number' && Number.isFinite(id),
  });

export const useCreateReading = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ReadingCreatePayload) => createReading(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: readingKeys.all });
    },
  });
};

export const useUpdateReading = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ReadingUpdatePayload }) =>
      updateReading(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: readingKeys.all });
    },
  });
};

export const useDeleteReading = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteReading(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: readingKeys.all });
    },
  });
};
