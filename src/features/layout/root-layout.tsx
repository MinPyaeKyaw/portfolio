import { BookOpen, Home, Layers } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { BrandLinkToHome } from '@/components/brand-lockup'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-muted text-foreground'
      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
  )

const mobileTabClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] font-medium transition-colors',
    isActive
      ? 'text-primary'
      : 'text-muted-foreground active:bg-muted/50'
  )

export default function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-border border-b bg-background/95 px-4 py-2.5 backdrop-blur-sm md:px-6">
        <BrandLinkToHome />
        <div className="flex items-center gap-1 md:gap-2">
          <nav
            className="hidden flex-wrap gap-1 md:flex"
            aria-label="Main"
          >
            <NavLink to="/dictionary" className={navClass}>
              Dictionary
            </NavLink>
            <NavLink to="/kanji" className={navClass}>
              Kanji
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main
        className={cn(
          'flex-1',
          'pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))] md:pb-0'
        )}
      >
        <Outlet />
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-border border-t bg-background/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md md:hidden"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-lg">
          <NavLink to="/" end className={mobileTabClass}>
            {({ isActive }) => (
              <>
                <Home
                  className={cn('size-5 shrink-0', isActive && 'stroke-[2.5]')}
                  aria-hidden
                />
                <span>Home</span>
              </>
            )}
          </NavLink>
          <NavLink to="/dictionary" className={mobileTabClass}>
            {({ isActive }) => (
              <>
                <BookOpen
                  className={cn('size-5 shrink-0', isActive && 'stroke-[2.5]')}
                  aria-hidden
                />
                <span>Dictionary</span>
              </>
            )}
          </NavLink>
          <NavLink to="/kanji" className={mobileTabClass}>
            {({ isActive }) => (
              <>
                <Layers
                  className={cn('size-5 shrink-0', isActive && 'stroke-[2.5]')}
                  aria-hidden
                />
                <span>Kanji</span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
