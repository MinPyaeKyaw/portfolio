import { Toaster } from "sonner";
import { useTheme } from "@/hooks/use-theme";

/**
 * Wraps sonner's Toaster so it follows the app theme (class-based, not
 * prefers-color-scheme). Mount once inside ThemeProvider.
 */
export function ThemedToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      richColors
      closeButton
      position="top-center"
    />
  );
}
