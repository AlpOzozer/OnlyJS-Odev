import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
