/**
 * Schematic (not to scale) outline of the Oltenia region with its five counties.
 * Deliberately abstract: it shows the region, not an exact coverage area.
 */
export function OlteniaMap({ className = '' }: { className?: string }) {
  const outline =
    'M70 62 L130 42 L200 32 L262 26 L340 22 L346 82 L336 142 L350 202 L345 262 L356 288 L300 282 L240 292 L180 284 L120 272 L80 246 L55 216 L30 182 L46 152 L26 122 L50 92 Z'
  const counties = [
    { name: 'Mehedinți', x: 78, y: 175 },
    { name: 'Gorj', x: 170, y: 82 },
    { name: 'Vâlcea', x: 285, y: 75 },
    { name: 'Dolj', x: 192, y: 222 },
    { name: 'Olt', x: 305, y: 215 },
  ]
  return (
    <svg viewBox="0 0 380 320" className={className} role="img" aria-labelledby="harta-titlu harta-desc">
      <title id="harta-titlu">Reprezentare schematică a regiunii Oltenia</title>
      <desc id="harta-desc">Regiunea Oltenia, cu județele Dolj, Gorj, Mehedinți, Olt și Vâlcea. Reprezentare orientativă, nu la scară.</desc>
      <defs>
        <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
        <clipPath id="map-clip">
          <path d={outline} />
        </clipPath>
      </defs>
      <rect width="380" height="320" fill="url(#map-grid)" />
      <path d={outline} fill="rgba(216,166,75,0.07)" />
      <g clipPath="url(#map-clip)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="3 4" fill="none">
        <path d="M58 82 L132 122 L228 132 L232 26" />
        <path d="M132 122 L142 200 L112 272" />
        <path d="M228 132 L340 124" />
        <path d="M262 136 L256 212 L272 290" />
      </g>
      <path d={outline} fill="none" stroke="#D8A64B" strokeWidth="1.5" />
      {/* Danube (south/west) and Olt (east) hints */}
      <path d="M26 122 L46 152 L30 182 L55 216 L80 246 L120 272 L180 284 L240 292 L300 282 L356 288" fill="none" stroke="rgba(120,160,200,0.45)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {counties.map((c) => (
        <text key={c.name} x={c.x} y={c.y} textAnchor="middle" fill="rgba(255,255,255,0.62)" fontSize="11" fontFamily="Inter Variable, sans-serif" letterSpacing="0.08em">
          {c.name.toUpperCase()}
        </text>
      ))}
      <g transform="translate(205 150)">
        <circle r="22" fill="rgba(216,166,75,0.12)" />
        <circle r="10" fill="rgba(216,166,75,0.25)" />
        <circle r="4" fill="#D8A64B" />
      </g>
      <text x="205" y="190" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Manrope Variable, sans-serif" letterSpacing="0.2em">
        OLTENIA
      </text>
      <g fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter Variable, sans-serif">
        <path d="M354 30v14M349 35l5-5 5 5" stroke="rgba(255,255,255,0.4)" fill="none" />
        <text x="354" y="56" textAnchor="middle">N</text>
        <text x="16" y="312">Reprezentare schematică · nu la scară</text>
      </g>
    </svg>
  )
}
