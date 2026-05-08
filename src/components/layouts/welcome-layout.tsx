import { NavLink, Outlet } from "react-router-dom";
import { BrandLinkToHome } from "@/components/brand-lockup";
import { HeaderLoginButton } from "@/components/header-login-button";
import { HeaderProfileButton } from "@/components/header-profile-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/features/auth/use-auth";

/**
 * Layout for the welcome/landing page.
 * Same chrome as the root app shell minus the floating back button and
 * mobile bottom tab bar — first-paint experience should feel marketing-like,
 * not utility-like.
 */
export default function WelcomeLayout() {
  const { isAuthenticated } = useAuth();

  const desktopNavLinkClass =
    "relative z-10 flex-1 whitespace-nowrap px-3 py-2 text-center text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground";

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 flex h-[3.75rem] flex-nowrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <BrandLinkToHome />
        <div className="flex items-center gap-1 md:gap-2">
          <nav className="relative hidden md:block" aria-label="Main">
            <div className="relative flex min-w-[220px]">
              <NavLink to="/" end className={desktopNavLinkClass}>
                Learn
              </NavLink>
              <NavLink to="/dictionary" className={desktopNavLinkClass}>
                Dictionary
              </NavLink>
              <NavLink to="/kanji" className={desktopNavLinkClass}>
                Kanji
              </NavLink>
            </div>
          </nav>
          <ThemeToggle />
          {isAuthenticated ? <HeaderProfileButton /> : <HeaderLoginButton />}
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col pb-[env(safe-area-inset-bottom,0px)]">
        <Outlet />
      </main>
    </div>
  );
}
