import { createFileRoute } from '@tanstack/react-router'
import { ServicePage } from '@/components/ServicePage'
import { servicePageHead } from '@/lib/serviceSeo'

export const Route = createFileRoute('/servicii_/zidarie')({
  head: () => servicePageHead('zidarie'),
  component: () => <ServicePage id="zidarie" />,
})
