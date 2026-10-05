import type { SVGProps } from 'react'

/** Custom architectural line icons (32×32 grid, 1.5 stroke). */
const paths = {
  house: 'M3 15 16 5l13 10M7 12.5V27h18V12.5M7 20h18M12.5 27v-7M19.5 27v-7M3 27h26',
  foundation: 'M2 11h28M10 11v8H6v7h20v-7h-4v-8M10 22h12M5 7l2 4M12 7l2 4M19 7l2 4M26 7l2 4',
  frame: 'M4 8h24v3.5H4zM8 11.5V27M24 11.5V27M16 11.5V27M3 27h26M8 19h16',
  pour: 'M9 4h14l-5 8v4h-4v-4zM16 19v1.5M16 23v.5M4 25h24v3H4z',
  masonry: 'M4 7h24v20H4zM4 13.7h24M4 20.3h24M12 7v6.7M22 7v6.7M8 13.7v6.6M17 13.7v6.6M12 20.3V27M22 20.3V27',
  formwork: 'M3 7h26v4H3zM9 7v4M16 7v4M23 7v4M7 11v15M16 11v15M25 11v15M5 26h4M14 26h4M23 26h4',
  props: 'M14 16h4v11h-4zM15.2 4h1.6v12M12 4h8M11 27h10M12 14h8',
  scaffold: 'M7 4v24M25 4v24M7 10h18M7 18h18M7 26h18M7 10l18 8M7 18l18 8M4 28h24',
  crane: 'M9 28V5h2v23M5 28h10M11 8h17M6 8h3M24 8v6M22 14h4v3h-4zM11 5l4 3M9 5l-3 3',
  offer: 'M8 4h12l5 5v19H8zM20 4v5h5M12 18l3 3 6-6',
  pin: 'M16 28s-8-8.3-8-14a8 8 0 1 1 16 0c0 5.7-8 14-8 14zM16 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  chat: 'M4 6h17v11H11l-5 4v-4H4zM21 11h7v10h-2v4l-4.5-4H14v-4',
  steps: 'M3 27h7v-6h6v-6h6V9h7M3 27h26',
  ruler: 'M6 26 26 6l3 3L9 29zM10 22l2 2M13 19l3 3M16 16l2 2M19 13l3 3M22 10l2 2',
  plan: 'M4 4h24v24H4zM4 14h10v14M14 4v6M20 14h8M20 14v6M4 22h4',
  phone: 'M8 4h5l2 6-3 2a15 15 0 0 0 8 8l2-3 6 2v5a2 2 0 0 1-2 2A22 22 0 0 1 6 6a2 2 0 0 1 2-2z',
  mail: 'M4 8h24v16H4zM4 8l12 9 12-9',
  user: 'M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM6 28c0-5.5 4.5-9 10-9s10 3.5 10 9',
  arrow: 'M5 16h21M19 9l7 7-7 7',
  chevronLeft: 'M20 6 10 16l10 10',
  chevronRight: 'M12 6l10 10-10 10',
  menu: 'M5 10h22M5 16h22M5 22h22',
  close: 'M8 8l16 16M24 8 8 24',
  check: 'M6 16.5l6.5 6.5L26 9.5',
  shield: 'M16 4l10 4v7c0 6.5-4.3 11-10 13-5.7-2-10-6.5-10-13V8zM11.5 16l3.2 3.2L21 13',
  facebook: 'M18 28V17h4l.6-4.5H18V9.7c0-1.3.4-2.2 2.2-2.2h2.4v-4a31 31 0 0 0-3.5-.2c-3.5 0-5.8 2.1-5.8 6v3.2H9.5V17h3.8v11',
  instagram: 'M5 5h22v22H5zM16 21a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM22.5 9.5h.01',
} as const

export type IconName = keyof typeof paths

export function Icon({ name, size = 24, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  )
}

/** Official WhatsApp glyph (filled). */
export function WhatsAppIcon({ size = 24, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  )
}
