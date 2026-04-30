import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "../../components/layouts/auth-layout";
import { useUserSignUp } from "@/api/auth/query";
import {
  isValidEmail,
  isValidPassword,
  passwordsMatch,
  PASSWORD_MIN_LENGTH,
} from "./utils/validation";

type FieldErrors = {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  form?: string;
};

const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,50}$/;

export default function SignUpView() {
  const navigate = useNavigate();
  const signUpMutation = useUserSignUp();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!name.trim()) {
      next.name = "Name is required.";
    }
    if (!USERNAME_RE.test(username.trim())) {
      next.username =
        "Username must be 3–50 characters using letters, numbers, _, . or -";
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

    signUpMutation.mutate(
      {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
      },
      {
        onSuccess: () => {
          navigate("/set-up", { replace: true });
        },
        onError: (err) => {
          const message =
            (err as { response?: { data?: { message?: string } } })
              .response?.data?.message ?? "Sign up failed. Please try again.";
          setErrors({ form: message });
        },
      }
    );
  }

  return (
    <AuthLayout
      scrollable
      title="Create account"
      description="Join Myanhon and start your Japanese learning journey."
    >
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <Input
            id="signup-name"
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            aria-invalid={!!errors.name}
            disabled={signUpMutation.isPending}
          />
          {errors.name ? (
            <p className="text-destructive text-xs">{errors.name}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Input
            id="signup-username"
            type="text"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            aria-invalid={!!errors.username}
            disabled={signUpMutation.isPending}
          />
          {errors.username ? (
            <p className="text-destructive text-xs">{errors.username}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Input
            id="signup-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-invalid={!!errors.email}
            disabled={signUpMutation.isPending}
          />
          {errors.email ? (
            <p className="text-destructive text-xs">{errors.email}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Input
            id="signup-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (optional)"
            aria-invalid={!!errors.phone}
            disabled={signUpMutation.isPending}
          />
          {errors.phone ? (
            <p className="text-destructive text-xs">{errors.phone}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Input
            id="signup-password"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={`Password (min. ${PASSWORD_MIN_LENGTH} characters)`}
            aria-invalid={!!errors.password}
            disabled={signUpMutation.isPending}
          />
          {errors.password ? (
            <p className="text-destructive text-xs">{errors.password}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Input
            id="signup-confirm"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            aria-invalid={!!errors.confirmPassword}
            disabled={signUpMutation.isPending}
          />
          {errors.confirmPassword ? (
            <p className="text-destructive text-xs">{errors.confirmPassword}</p>
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
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? "Creating account…" : "Create Account"}
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
