import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)} aria-label={`${value} üzerinden 5 yıldız`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn("size-3.5", index < Math.round(value) ? "fill-amber-400 text-amber-400" : "text-neutral-300")}
        />
      ))}
    </span>
  )
}
