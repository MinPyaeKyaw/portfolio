import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExchangeSession } from "@/api/auth/query";
import { getMyProfile } from "@/api/user-info/service";
import { AuthLayout } from "../../components/layouts/auth-layout";

export default function OAuthCallbackView() {
  const navigate = useNavigate();
  const exchangeSessionMutation = useExchangeSession();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    exchangeSessionMutation.mutate(undefined, {
      onSuccess: async () => {
        try {
          const res = await getMyProfile();
          const profile = res.data.data;
          if (!profile.userInfo) {
            navigate("/set-up", { replace: true });
            return;
          }
        } catch {
          // If the profile fetch itself fails, fall through to home
        }
        navigate("/", { replace: true });
      },
      onError: () => {
        navigate("/login", { replace: true });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLayout
      title="Signing in…"
      description="Please wait while we complete your sign in."
    >
      <></>
    </AuthLayout>
  );
}
