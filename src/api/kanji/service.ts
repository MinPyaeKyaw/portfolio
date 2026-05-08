import apiClient from '../api-client';
import type { ApiEnvelope, ListQuery, PaginatedData } from '../types';
import type { KanjiLearningItem } from '@/types/kanji-learning';

export type KanjiCreatePayload = Omit<KanjiLearningItem, 'id'>;
export type KanjiUpdatePayload = Partial<KanjiCreatePayload>;

export const listKanji = (params: ListQuery) =>
  apiClient.get<ApiEnvelope<PaginatedData<KanjiLearningItem>>>('/api/kanji', {
    params,
  });

export const getKanjiById = (id: number) =>
  apiClient.get<ApiEnvelope<KanjiLearningItem>>(`/api/kanji/${id}`);

export const createKanji = (data: KanjiCreatePayload) =>
  apiClient.post<ApiEnvelope<KanjiLearningItem>>('/api/kanji', data);

export const updateKanji = (id: number, data: KanjiUpdatePayload) =>
  apiClient.patch<ApiEnvelope<KanjiLearningItem>>(`/api/kanji/${id}`, data);

export const deleteKanji = (id: number) =>
  apiClient.delete<ApiEnvelope<null>>(`/api/kanji/${id}`);
