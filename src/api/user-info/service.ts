import type { ApiResponse } from '@/types/types';
import apiClient from '../api-client';
import type {
  PatchProfilePayload,
  ProfileResult,
  UpsertProfilePayload,
} from './types';

function buildBody(
  payload: UpsertProfilePayload | PatchProfilePayload
): FormData | Record<string, unknown> {
  if (payload.imageFile) {
    const fd = new FormData();
    fd.append('file', payload.imageFile);
    if (payload.dateOfBirth !== undefined)
      fd.append('dateOfBirth', payload.dateOfBirth);
    if (payload.japaneseLevel !== undefined)
      fd.append('japaneseLevel', payload.japaneseLevel);
    if (payload.interests !== undefined)
      fd.append('interests', JSON.stringify(payload.interests));
    if (payload.profileImage !== undefined)
      fd.append('profileImage', payload.profileImage);
    if (payload.username !== undefined) fd.append('username', payload.username);
    if (payload.phone !== undefined) fd.append('phone', payload.phone);
    return fd;
  }
  const { imageFile: _imageFile, ...rest } = payload;
  void _imageFile;
  return rest;
}

export const getMyProfile = () =>
  apiClient.get<ApiResponse<ProfileResult>>('/api/user-info/me');

export const upsertProfile = (data: UpsertProfilePayload) =>
  apiClient.post<ApiResponse<ProfileResult>>('/api/user-info', buildBody(data));

export const patchProfile = (data: PatchProfilePayload) =>
  apiClient.patch<ApiResponse<ProfileResult>>(
    '/api/user-info',
    buildBody(data)
  );
