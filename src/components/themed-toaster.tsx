import { Toaster } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/logo.svg";

const LogoIcon = () => (
  <img src={logo} alt="" className="size-11 object-contain" draggable={false} />
);

/**
 * Wraps sonner's Toaster so it follows the app theme (class-based, not
 * prefers-color-scheme). Mount once inside ThemeProvider.
 *
 * Toasts use the brand logo as the icon for every variant (success/error/info/
 * warning/loading) and rely solely on the neutral card surface — no per-status
 * color tints — so the message is the focus.
 */
export function ThemedToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      position="top-center"
      offset={16}
      gap={10}
      duration={3800}
      visibleToasts={3}
      icons={{
        success: <LogoIcon />,
        error: <LogoIcon />,
        info: <LogoIcon />,
        warning: <LogoIcon />,
        loading: <LogoIcon />,
      }}
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: [
            "group app-toast pointer-events-auto",
            "flex w-full items-center gap-3.5",
            "rounded-2xl border border-border/70",
            "bg-card/90 text-card-foreground backdrop-blur-md",
            "px-4 py-3",
            "shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--primary)_18%,transparent),0_2px_6px_-2px_rgba(0,0,0,0.08)]",
          ].join(" "),
          title: "text-[15px] font-semibold leading-snug tracking-tight",
          description: "mt-1 text-[13px] text-muted-foreground leading-relaxed",
          icon: "app-toast__icon flex size-12 shrink-0 items-center justify-center rounded-full",
          actionButton:
            "!bg-primary !text-primary-foreground !rounded-full !px-3 !py-1.5 !text-xs !font-medium hover:!opacity-90",
          cancelButton:
            "!bg-muted !text-foreground !rounded-full !px-3 !py-1.5 !text-xs !font-medium hover:!bg-muted/80",
        },
      }}
    />
  );
}
