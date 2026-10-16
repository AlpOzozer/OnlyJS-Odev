import { cn } from "@/lib/utils"

type ProductTubProps = {
  label: string
  flavor: string
  detail?: string
  color: string
  className?: string
  image?: string
  imageAlt?: string
}

export function ProductTub({ label, flavor, detail, color, className, image, imageAlt }: ProductTubProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={imageAlt ?? `${label} ${flavor}`}
        className={cn("mx-auto aspect-square w-full max-w-56 object-contain", className)}
      />
    )
  }

  return (
    <div className={cn("relative mx-auto aspect-[3/4] w-full max-w-56", className)}>
      <div className="absolute bottom-1 left-[18%] h-3 w-[64%] rounded-full bg-black/25 blur-md" />
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-t-[42%] rounded-b-[1.6rem] shadow-xl ring-1 ring-black/10"
        style={{
          background: `linear-gradient(160deg, color-mix(in srgb, ${color} 72%, white) 0%, ${color} 42%, #07111d 100%)`,
        }}
      >
        <div className="h-[14%] bg-gradient-to-b from-white/35 to-black/20" />
        <div className="mx-auto -mt-2 h-3 w-[72%] rounded-full bg-black/25" />
        <div className="flex flex-1 flex-col items-center justify-center px-3 text-center text-white">
          <p className="text-[10px] font-black tracking-[0.28em]">OJS</p>
          <p className="text-[8px] font-semibold tracking-[0.22em] text-white/80">NUTRITION</p>
          <p className="mt-3 text-sm leading-tight font-black tracking-wide md:text-base">{label}</p>
          <div className="my-2 h-px w-8 bg-white/50" />
          <p className="text-[11px] text-white/85">{flavor}</p>
          {detail ? <p className="mt-1 text-[10px] text-white/70">{detail}</p> : null}
        </div>
        <div className="h-2 bg-white/80" />
      </div>
    </div>
  )
}
