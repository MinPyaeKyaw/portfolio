import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/** Matches dictionary search field: card fill, border, primary focus (no ring glow). */
const inputClassName =
  "h-11 w-full min-w-0 rounded-full border border-border/80 bg-card px-4 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:rounded-full file:border-0 file:bg-transparent file:px-3 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus-visible:border-destructive md:h-10 md:text-sm dark:bg-card dark:disabled:bg-muted/40 dark:aria-invalid:border-destructive"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputClassName, className)}
      {...props}
    />
  )
}

export { Input }
