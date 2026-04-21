import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "../../components/layouts/auth-layout";
import { useResetPassword } from "@/api/auth/query";
import {
  isValidPassword,
  passwordsMatch,
  PASSWORD_MIN_LENGTH,
} from "./utils/validation";

type FieldErrors = {
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export default function ResetPasswordView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const resetPasswordMutation = useResetPassword();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [done, setDone] = useState(false);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!isValidPassword(password)) {
      next.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
    }
    if (!passwordsMatch(password, confirmPassword)) {
      next.confirmPassword = "Passwords do not match.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    resetPasswordMutation.mutate(
      { token, newPassword: password },
      {
        onSuccess: () => {
          setDone(true);
        },
        onError: (err) => {
          const message =
            (err as { response?: { data?: { message?: string } } })
              .response?.data?.message ??
            "Failed to reset password. The link may have expired.";
          setErrors({ form: message });
        },
      }
    );
  }

  if (!token) {
    return (
      <AuthLayout
        title="Invalid link"
        description="This reset link is invalid or has expired."
      >
        <p className="text-center text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
          >
            Request a new reset link
          </Link>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset password"
      description={
        done
          ? "Your password has been reset successfully."
          : "Enter your new password below."
      }
    >
      {!done ? (
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Input
              id="reset-password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={`New password (min. ${PASSWORD_MIN_LENGTH} characters)`}
              aria-invalid={!!errors.password}
              disabled={resetPasswordMutation.isPending}
            />
            {errors.password ? (
              <p className="text-destructive text-xs">{errors.password}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Input
              id="reset-confirm"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              aria-invalid={!!errors.confirmPassword}
              disabled={resetPasswordMutation.isPending}
            />
            {errors.confirmPassword ? (
              <p className="text-destructive text-xs">
                {errors.confirmPassword}
              </p>
            ) : null}
          </div>

          {errors.form ? (
            <p role="status" className="text-destructive text-xs">
              {errors.form}
            </p>
          ) : null}

          <Button
            type="submit"
            className="h-10 w-full md:h-9"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending ? "Resetting…" : "Reset Password"}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            You can now sign in with your new password.
          </p>
          <Button
            type="button"
            className="h-10 w-full md:h-9"
            onClick={() => navigate("/login", { replace: true })}
          >
            Go to Login
          </Button>
        </div>
      )}

      {!done && (
        <p className="text-center text-sm">
          <Link
            to="/login"
            className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
          >
            Back to Login
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}
