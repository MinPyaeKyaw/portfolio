import { ArrowLeft } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BrandLinkToHome } from "@/components/brand-lockup";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

/**
 * Layout for account/secondary pages (profile, settings, profile setup).
 * Header with back button + brand + theme toggle. No bottom mobile nav.
 */
export default function AccountLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isSetup = pathname === "/set-up";

  return (
    <div className="flex h-svh max-h-svh min-h-0 flex-col overflow-hidden bg-background">
      <header className="sticky top-0 z-40 flex h-[3.75rem] flex-nowrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <div className="flex min-w-0 items-center gap-1">
          {!isSetup ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="shrink-0 text-foreground"
            >
              <ArrowLeft className="size-[1.125rem]" aria-hidden />
            </Button>
          ) : null}
          <BrandLinkToHome />
        </div>
        <ThemeToggle />
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-[env(safe-area-inset-bottom,0px)]">
        <Outlet />
      </main>
    </div>
  );
}
