import { createFileRoute } from '@tanstack/react-router'
import { ServicePage } from '@/components/ServicePage'
import { servicePageHead } from '@/lib/serviceSeo'

export const Route = createFileRoute('/servicii_/structuri-beton-armat')({
  head: () => servicePageHead('structuri-beton-armat'),
  component: () => <ServicePage id="structuri-beton-armat" />,
})
