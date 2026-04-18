import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./auth-layout";
import { useAuth } from "./use-auth";
import {
  isValidEmail,
  isValidPassword,
  passwordsMatch,
  PASSWORD_MIN_LENGTH,
} from "./utils/validation";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUpView() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!name.trim()) {
      next.name = "Name is required.";
    }
    if (!isValidEmail(email)) {
      next.email = "Enter a valid email address.";
    }
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
    login(email.trim());
    navigate("/", { replace: true });
  }

  return (
    <AuthLayout
      title="Create account"
      description="Join Myanhon and start your Japanese learning journey."
    >
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <label htmlFor="signup-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <Input
            id="signup-name"
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 md:h-9"
            placeholder="Your name"
            aria-invalid={!!errors.name}
          />
          {errors.name ? (
            <p className="text-destructive text-xs">{errors.name}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="signup-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 md:h-9"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email ? (
            <p className="text-destructive text-xs">{errors.email}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="signup-password"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 md:h-9"
            placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
            aria-invalid={!!errors.password}
          />
          {errors.password ? (
            <p className="text-destructive text-xs">{errors.password}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="signup-confirm"
            className="text-sm font-medium text-foreground"
          >
            Confirm password
          </label>
          <Input
            id="signup-confirm"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-10 md:h-9"
            placeholder="Repeat password"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword ? (
            <p className="text-destructive text-xs">{errors.confirmPassword}</p>
          ) : null}
        </div>
        <Button type="submit" className="h-10 w-full md:h-9">
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
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
