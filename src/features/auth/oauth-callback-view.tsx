import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExchangeSession } from "@/api/auth/query";
import { AuthLayout } from "../../components/layouts/auth-layout";

export default function OAuthCallbackView() {
  const navigate = useNavigate();
  const exchangeSessionMutation = useExchangeSession();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    exchangeSessionMutation.mutate(undefined, {
      onSuccess: () => {
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
