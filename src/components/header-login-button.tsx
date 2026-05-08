import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Header CTA mirrored on the Get Started hero button:
 * primary fill, brightness-on-hover, trailing icon inside a soft circle.
 * Renders an icon-only square on mobile and a labelled pill on md+.
 */
export function HeaderLoginButton() {
  return (
    <>
      <Link
        to="/login"
        aria-label="Sign in"
        className={cn(
          buttonVariants({ size: "icon" }),
          "group/cta shrink-0 transition-[transform,filter] duration-200 [a]:hover:bg-primary hover:brightness-110 md:hidden motion-reduce:transition-none",
        )}
      >
        <LogIn
          className="size-[1.125rem] transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden
        />
      </Link>
      <Link
        to="/login"
        className={cn(
          buttonVariants({ size: "sm" }),
          "group/cta hidden shrink-0 gap-2 overflow-hidden pl-3 pr-1 transition-[transform,filter] duration-200 [a]:hover:bg-primary hover:brightness-110 md:inline-flex motion-reduce:transition-none",
        )}
      >
        <span className="relative z-10">Login</span>
        <span
          aria-hidden
          className="relative z-10 inline-flex size-5 items-center justify-center rounded-full bg-primary-foreground/15 transition-all duration-300 group-hover/cta:bg-primary-foreground/25 motion-reduce:transition-none"
        >
          <LogIn
            className="size-3 transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </Link>
    </>
  );
}
