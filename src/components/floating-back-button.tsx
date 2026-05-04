import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type FloatingBackButtonProps = {
  /** Lift the button above the mobile bottom tab bar on small screens. */
  aboveMobileNav?: boolean;
  className?: string;
};

export function FloatingBackButton({
  aboveMobileNav,
  className,
}: FloatingBackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => navigate(-1)}
      className={cn(
        "fixed right-4 z-50 inline-grid size-12 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-200 hover:bg-muted hover:ring-2 hover:ring-primary/40 active:scale-95",
        aboveMobileNav
          ? "bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px)+1rem)] md:bottom-4"
          : "bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)]",
        className,
      )}
    >
      <ArrowLeft className="size-5" aria-hidden />
    </button>
  );
}
