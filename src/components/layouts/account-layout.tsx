import { Outlet, useLocation } from "react-router-dom";
import { BrandLinkToHome } from "@/components/brand-lockup";
import { FloatingBackButton } from "@/components/floating-back-button";
import { HeaderProfileButton } from "@/components/header-profile-button";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Layout for account/secondary pages (profile, settings, profile setup).
 * Header with brand + theme toggle + profile sheet trigger. No bottom mobile nav.
 */
export default function AccountLayout() {
  const { pathname } = useLocation();

  const isSetup = pathname === "/set-up";

  return (
    <div className="flex h-svh max-h-svh min-h-0 flex-col overflow-hidden">
      <header className="sticky top-0 z-40 flex h-[3.75rem] flex-nowrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <BrandLinkToHome />
        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          {!isSetup ? <HeaderProfileButton /> : null}
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-[env(safe-area-inset-bottom,0px)]">
        <Outlet />
      </main>

      {!isSetup ? <FloatingBackButton /> : null}
    </div>
  );
}
