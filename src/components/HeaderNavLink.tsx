import { createLink } from '@tanstack/react-router'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

type SectionAnchorProps = ComponentPropsWithoutRef<'a'> & {
  sectionCurrent?: 'page' | 'location'
}

// Route activity alone cannot describe the section currently visible on a page.
// Keep router navigation while applying the section's ARIA state at the anchor.
const SectionAnchor = forwardRef<HTMLAnchorElement, SectionAnchorProps>(
  ({ sectionCurrent, ...props }, ref) => <a {...props} ref={ref} aria-current={sectionCurrent} />,
)

export const HeaderNavLink = createLink(SectionAnchor)
