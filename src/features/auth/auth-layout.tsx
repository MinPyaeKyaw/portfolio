import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function AuthLayout({
  title,
  description,
  children,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-10 md:py-14",
        className,
      )}
    >
      <Card
        className={cn(
          "w-full max-w-md border-border/80 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-border/60 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
        )}
      >
        <CardHeader className="space-y-1">
          <CardTitle className="font-heading text-xl md:text-2xl">{title}</CardTitle>
          {description ? (
            <CardDescription className="text-pretty">{description}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </div>
  );
}
