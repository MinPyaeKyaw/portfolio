import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import { userInfoKeys } from './key';
import { getMyProfile, patchProfile, upsertProfile } from './service';
import type { PatchProfilePayload, UpsertProfilePayload } from './types';

export const useMyProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: userInfoKeys.me,
    queryFn: () => getMyProfile(),
    select: (response) => response.data.data,
    enabled: isAuthenticated,
    retry: false,
  });
};

export const useUpsertProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpsertProfilePayload) => upsertProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userInfoKeys.me });
    },
  });
};

export const usePatchProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PatchProfilePayload) => patchProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userInfoKeys.me });
    },
  });
};
