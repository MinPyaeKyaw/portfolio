import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeSession } from "@/api/auth/service";
import { getMyProfile } from "@/api/user-info/service";
import { useAuthStore } from "@/stores/auth-store";
import { AuthLayout } from "../../components/layouts/auth-layout";

export default function OAuthCallbackView() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    (async () => {
      try {
        const exchangeRes = await exchangeSession();
        login(exchangeRes.data.data);
      } catch {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const profileRes = await getMyProfile();
        if (!profileRes.data.data.userInfo) {
          navigate("/set-up", { replace: true });
          return;
        }
      } catch {
        // If the profile fetch fails, fall through to dictionary
      }

      navigate("/dictionary", { replace: true });
    })();
  }, [login, navigate]);

  return (
    <AuthLayout
      title="Signing in…"
      description="Please wait while we complete your sign in."
    >
      <></>
    </AuthLayout>
  );
}
