import { createFileRoute } from '@tanstack/react-router'
import { ServicePage } from '@/components/ServicePage'
import { servicePageHead } from '@/lib/serviceSeo'

export const Route = createFileRoute('/servicii_/fundatii')({
  head: () => servicePageHead('fundatii'),
  component: () => <ServicePage id="fundatii" />,
})
