import { useGoogleAuthUrl } from '@/api/auth/query';

export function useGoogleAuth() {
  const mutation = useGoogleAuthUrl();

  function handleGoogleLogin() {
    const callbackURL = `${window.location.origin}/oauth/callback`;
    mutation.mutate(
      { callbackURL },
      {
        onSuccess: (response) => {
          window.location.href = response.data.data.url;
        },
      }
    );
  }

  return { handleGoogleLogin, isPending: mutation.isPending };
}
