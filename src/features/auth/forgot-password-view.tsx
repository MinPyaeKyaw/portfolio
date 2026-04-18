import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "../../components/layouts/auth-layout";
import { isValidEmail } from "./utils/validation";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return false;
    }
    setError(undefined);
    return true;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    console.log("[auth] Password reset requested for:", email.trim());
  }

  return (
    <AuthLayout
      title="Forgot password"
      description={
        sent
          ? "If an account exists for that email, you will receive reset instructions shortly."
          : "Enter your email and we will send you reset instructions."
      }
    >
      {!sent ? (
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Input
              id="forgot-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-invalid={!!error}
            />
            {error ? <p className="text-destructive text-xs">{error}</p> : null}
          </div>
          <Button type="submit" className="h-10 w-full md:h-9">
            Send Reset Instructions
          </Button>
        </form>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          You can close this page or return to sign in.
        </p>
      )}

      <p className="text-center text-sm">
        <Link
          to="/login"
          className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}
