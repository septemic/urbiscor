/** URBISCOR CONSTRUCT mark: a reinforced-concrete portal frame inside a plan square. */
export function LogoMark({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="10" width="24" height="4" fill="#D8A64B" />
      <rect x="10" y="14" width="3.5" height="17" fill="currentColor" />
      <rect x="26.5" y="14" width="3.5" height="17" fill="currentColor" />
      <path d="M6 31h28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 20.5h7M16.5 25h7" stroke="currentColor" strokeWidth="1" opacity=".55" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={38} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-extrabold tracking-[0.1em]">URBISCOR</span>
        <span className="mt-1 font-display text-[0.6rem] font-bold tracking-[0.46em] text-gold">CONSTRUCT</span>
      </span>
    </span>
  )
}
