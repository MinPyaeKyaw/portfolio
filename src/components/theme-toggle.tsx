import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="shrink-0 text-foreground"
    >
      {isDark ? (
        <Sun className="size-[1.125rem]" aria-hidden />
      ) : (
        <Moon className="size-[1.125rem]" aria-hidden />
      )}
    </Button>
  )
}
