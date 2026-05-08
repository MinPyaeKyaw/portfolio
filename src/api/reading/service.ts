import apiClient from '../api-client';
import type { ApiEnvelope, ListQuery, PaginatedData } from '../types';
import type {
  ReadingCreatePayload,
  ReadingPassageApi,
  ReadingUpdatePayload,
} from './types';

export const listReading = (params: ListQuery) =>
  apiClient.get<ApiEnvelope<PaginatedData<ReadingPassageApi>>>(
    '/api/reading',
    { params }
  );

export const getReadingById = (id: number) =>
  apiClient.get<ApiEnvelope<ReadingPassageApi>>(`/api/reading/${id}`);

export const createReading = (data: ReadingCreatePayload) =>
  apiClient.post<ApiEnvelope<ReadingPassageApi>>('/api/reading', data);

export const updateReading = (id: number, data: ReadingUpdatePayload) =>
  apiClient.patch<ApiEnvelope<ReadingPassageApi>>(`/api/reading/${id}`, data);

export const deleteReading = (id: number) =>
  apiClient.delete<ApiEnvelope<null>>(`/api/reading/${id}`);
