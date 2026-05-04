import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, Settings, User as UserIcon, UserRound } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMyProfile } from "@/api/user-info/query";
import { useUserSignOut } from "@/api/auth/query";
import { cn } from "@/lib/utils";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

function resolveUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE}${url}`;
}

const triggerClass = cn(
  "group relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-foreground transition-all",
  "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
  "data-[popup-open]:ring-2 data-[popup-open]:ring-primary",
);

function Avatar({ imageUrl }: { imageUrl?: string }) {
  return imageUrl ? (
    <img src={imageUrl} alt="" className="size-full object-cover" />
  ) : (
    <UserIcon className="size-4 text-muted-foreground" aria-hidden />
  );
}

type MenuProps = {
  imageUrl?: string;
  username?: string;
  email?: string;
  onProfile: () => void;
  onSettings: () => void;
  onSignOut: () => void;
  signOutPending: boolean;
  /** When true, render a larger avatar header (mobile sheet). */
  large?: boolean;
};

function ProfileMenu({
  imageUrl,
  username,
  email,
  onProfile,
  onSettings,
  onSignOut,
  signOutPending,
  large,
}: MenuProps) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex items-center gap-3 px-2 py-2",
          large ? "px-4 py-4" : undefined,
        )}
      >
        <div
          className={cn(
            "grid shrink-0 place-items-center overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10",
            large ? "size-12" : "size-9",
          )}
          aria-hidden={!imageUrl}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="" className="size-full object-cover" />
          ) : (
            <UserIcon
              className={cn(
                "text-muted-foreground",
                large ? "size-5" : "size-4",
              )}
              aria-hidden
            />
          )}
        </div>
        <div className="min-w-0">
          {username ? (
            <p className="truncate text-sm font-medium text-foreground">
              {username}
            </p>
          ) : null}
          {email ? (
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          ) : null}
        </div>
      </div>

      <div
        className={cn("h-px bg-foreground/5", large ? "mx-4" : "mx-2")}
        aria-hidden
      />

      <div className={cn("flex flex-col gap-0.5", large ? "p-2" : "p-1")}>
        <button
          type="button"
          onClick={onProfile}
          className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
        >
          <UserRound className="size-4 text-muted-foreground" aria-hidden />
          Profile
        </button>
        <button
          type="button"
          onClick={onSettings}
          className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
        >
          <Settings className="size-4 text-muted-foreground" aria-hidden />
          Settings
        </button>
        <button
          type="button"
          onClick={onSignOut}
          disabled={signOutPending}
          className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 focus-visible:bg-destructive/10 focus-visible:outline-none disabled:opacity-60"
        >
          <LogOut className="size-4" aria-hidden />
          {signOutPending ? "Signing out…" : "Log out"}
        </button>
      </div>
    </div>
  );
}

export function HeaderProfileButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data } = useMyProfile();
  const signOutMutation = useUserSignOut();
  const [open, setOpen] = useState(false);

  const imageUrl = resolveUrl(data?.userInfo?.profileImage);
  const isActive =
    pathname.startsWith("/profile") || pathname.startsWith("/settings");

  const triggerRingClass = cn(
    isActive && !open
      ? "ring-2 ring-primary"
      : "ring-1 ring-foreground/10 hover:ring-primary/40",
  );

  function handleProfile() {
    setOpen(false);
    navigate("/profile");
  }

  function handleSettings() {
    setOpen(false);
    navigate("/settings");
  }

  function handleSignOut() {
    setOpen(false);
    signOutMutation.mutate(undefined, {
      onSuccess: () => navigate("/", { replace: true }),
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Profile menu"
            aria-current={isActive ? "page" : undefined}
            className={cn(triggerClass, triggerRingClass)}
          />
        }
      >
        <Avatar imageUrl={imageUrl} />
      </SheetTrigger>
      <SheetContent side="right" className="pb-[env(safe-area-inset-bottom)]">
        <SheetTitle className="sr-only">Profile menu</SheetTitle>
        <ProfileMenu
          imageUrl={imageUrl}
          username={data?.username}
          email={data?.email}
          onProfile={handleProfile}
          onSettings={handleSettings}
          onSignOut={handleSignOut}
          signOutPending={signOutMutation.isPending}
          large
        />
      </SheetContent>
    </Sheet>
  );
}
