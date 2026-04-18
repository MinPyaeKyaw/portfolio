import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./auth-layout";
import { GoogleIcon } from "./components/google-icon";
import { useAuth } from "./use-auth";
import { handleGoogleLogin } from "./google-auth";
import { isValidEmail } from "./utils/validation";

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function LoginView() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!isValidEmail(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password.trim()) {
      next.password = "Password is required.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    login(email.trim());
    navigate("/", { replace: true });
  }

  function onGoogleClick() {
    handleGoogleLogin();
  }

  return (
    <AuthLayout
      title="Sign in"
      description="Welcome back. Sign in to continue learning."
    >
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <Input
            id="login-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-invalid={!!errors.email}
          />
          {errors.email ? (
            <p className="text-destructive text-xs">{errors.email}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Input
            id="login-password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-invalid={!!errors.password}
          />
          {errors.password ? (
            <p className="text-destructive text-xs">{errors.password}</p>
          ) : null}
        </div>
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Forgot Password
          </Link>
        </div>
        <Button type="submit" className="h-10 w-full md:h-9">
          Sign In
        </Button>
      </form>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-border border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground md:bg-card">Or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-10 w-full gap-2 border-border/80 md:h-9"
        onClick={onGoogleClick}
      >
        <GoogleIcon className="size-4" />
        Login with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to="/sign-up"
          className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
