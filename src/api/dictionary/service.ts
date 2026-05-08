import apiClient from '../api-client';
import type { ApiEnvelope, ListQuery, PaginatedData } from '../types';
import type { DictionaryWord } from '@/types/dictionary-word';

export type DictionaryCreatePayload = Omit<DictionaryWord, 'id'>;
export type DictionaryUpdatePayload = Partial<DictionaryCreatePayload>;

export const listDictionary = (params: ListQuery) =>
  apiClient.get<ApiEnvelope<PaginatedData<DictionaryWord>>>(
    '/api/dictionary',
    { params }
  );

export const getDictionaryById = (id: number) =>
  apiClient.get<ApiEnvelope<DictionaryWord>>(`/api/dictionary/${id}`);

export const createDictionary = (data: DictionaryCreatePayload) =>
  apiClient.post<ApiEnvelope<DictionaryWord>>('/api/dictionary', data);

export const updateDictionary = (id: number, data: DictionaryUpdatePayload) =>
  apiClient.patch<ApiEnvelope<DictionaryWord>>(`/api/dictionary/${id}`, data);

export const deleteDictionary = (id: number) =>
  apiClient.delete<ApiEnvelope<null>>(`/api/dictionary/${id}`);
