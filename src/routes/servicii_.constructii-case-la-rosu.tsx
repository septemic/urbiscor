import { createFileRoute } from '@tanstack/react-router'
import { ServicePage } from '@/components/ServicePage'
import { servicePageHead } from '@/lib/serviceSeo'

export const Route = createFileRoute('/servicii_/constructii-case-la-rosu')({
  head: () => servicePageHead('constructii-la-rosu'),
  component: () => <ServicePage id="constructii-la-rosu" />,
})
