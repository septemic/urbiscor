import { Link, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'

/**
 * Link to the quote form: scrolls to it on pages that contain it
 * (home, contact), otherwise opens /contact#oferta.
 */
export function QuoteLink({ className, children, onClick }: { className?: string; children: ReactNode; onClick?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const to = pathname === '/' ? '/' : '/contact'
  return (
    <Link to={to} hash="oferta" className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
