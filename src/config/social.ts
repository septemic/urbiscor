import { site } from './site'
import type { IconName } from '@/components/Icons'

/** Shared by the footer and desktop rail; unset profiles never become links. */
export const socialProfiles: { label: string; icon: IconName; url: string }[] = [
  { label: 'Facebook', icon: 'facebook', url: site.social.facebook },
  { label: 'Instagram', icon: 'instagram', url: site.social.instagram },
]
