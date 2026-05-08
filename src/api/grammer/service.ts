import apiClient from '../api-client';
import type { ApiEnvelope, ListQuery, PaginatedData } from '../types';
import type { GrammarItem } from '@/types/grammar';

export type GrammerCreatePayload = Omit<GrammarItem, 'id'>;
export type GrammerUpdatePayload = Partial<GrammerCreatePayload>;

export const listGrammer = (params: ListQuery) =>
  apiClient.get<ApiEnvelope<PaginatedData<GrammarItem>>>('/api/grammer', {
    params,
  });

export const getGrammerById = (id: number) =>
  apiClient.get<ApiEnvelope<GrammarItem>>(`/api/grammer/${id}`);

export const createGrammer = (data: GrammerCreatePayload) =>
  apiClient.post<ApiEnvelope<GrammarItem>>('/api/grammer', data);

export const updateGrammer = (id: number, data: GrammerUpdatePayload) =>
  apiClient.patch<ApiEnvelope<GrammarItem>>(`/api/grammer/${id}`, data);

export const deleteGrammer = (id: number) =>
  apiClient.delete<ApiEnvelope<null>>(`/api/grammer/${id}`);
