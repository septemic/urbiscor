import { createFileRoute } from '@tanstack/react-router'
import { ServicePage } from '@/components/ServicePage'
import { servicePageHead } from '@/lib/serviceSeo'

export const Route = createFileRoute('/servicii_/turnare-beton')({
  head: () => servicePageHead('turnare-beton'),
  component: () => <ServicePage id="turnare-beton" />,
})
