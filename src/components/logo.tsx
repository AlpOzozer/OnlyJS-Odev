export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`block leading-none ${light ? "text-white" : "text-neutral-950"}`}>
      <span className="block text-[22px] font-black tracking-tight">OJS</span>
      <span className="block text-[10px] font-bold tracking-[0.28em]">NUTRITION</span>
    </span>
  )
}
