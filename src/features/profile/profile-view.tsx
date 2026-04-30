import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Cake,
  GraduationCap,
  Heart,
  LogOut,
  Mail,
  Pencil,
  Phone,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserSignOut } from "@/api/auth/query";
import { useMyProfile } from "@/api/user-info/query";
import { JAPANESE_LEVELS } from "./utils/constants";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

function resolveUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE}${url}`;
}

function formatDateOfBirth(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function levelLabel(value?: string): string | null {
  if (!value) return null;
  const match = JAPANESE_LEVELS.find((l) => l.value === value);
  return match ? match.label : value;
}

export default function ProfileView() {
  const navigate = useNavigate();
  const { data: profile, isLoading, isError } = useMyProfile();
  const signOutMutation = useUserSignOut();

  function onSignOut() {
    signOutMutation.mutate(undefined, {
      onSuccess: () => navigate("/", { replace: true }),
    });
  }

  useEffect(() => {
    if (profile && profile.userInfo === null) {
      navigate("/set-up", { replace: true });
    }
  }, [profile, navigate]);

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col items-center justify-center px-4">
        <p role="status" className="text-sm text-muted-foreground">
          Loading…
        </p>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-destructive">Could not load your profile.</p>
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Back to home
        </Button>
      </div>
    );
  }

  const imageUrl = resolveUrl(profile.userInfo?.profileImage);
  const dob = formatDateOfBirth(profile.userInfo?.dateOfBirth);
  const level = levelLabel(profile.userInfo?.japaneseLevel);
  const interests = profile.userInfo?.interests ?? [];

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pt-4 pb-24">
      <div className="space-y-4">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 pt-2 pb-2 text-center">
            <div
              className="grid size-24 place-items-center overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10"
              aria-hidden={!imageUrl}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <UserIcon
                  className="size-9 text-muted-foreground"
                  aria-hidden
                />
              )}
            </div>
            <div className="space-y-0.5">
              <p className="font-heading text-lg font-medium leading-snug">
                {profile.username}
              </p>
              <p className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="size-3.5" aria-hidden />
                {profile.email}
              </p>
              {profile.phone ? (
                <p className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <Phone className="size-3.5" aria-hidden />
                  {profile.phone}
                </p>
              ) : null}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate("/set-up")}
              className="mt-1"
            >
              <Pencil aria-hidden />
              Edit profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" aria-hidden />
              About you
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between gap-3 py-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Cake className="size-4" aria-hidden />
                Date of birth
              </div>
              <p className="text-sm font-medium text-foreground">
                {dob ?? "—"}
              </p>
            </div>

            <div
              className="-mx-4 border-t border-foreground/5"
              aria-hidden
            />

            <div className="flex items-center justify-between gap-3 py-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="size-4" aria-hidden />
                Japanese level
              </div>
              {level ? (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                  {level}
                </span>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="size-4 text-primary" aria-hidden />
              Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-foreground ring-1 ring-foreground/10"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No interests selected yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Button
          type="button"
          variant="destructive"
          onClick={onSignOut}
          disabled={signOutMutation.isPending}
          className="w-full"
        >
          <LogOut aria-hidden />
          {signOutMutation.isPending ? "Signing out…" : "Sign out"}
        </Button>
      </div>
    </div>
  );
}
