import type { Metadata } from 'next'
import { ContactPage } from '../../components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact | Dolindra Prasad Sharma',
  description:
    'Get in touch with Dolindra Prasad Sharma, organizational leader, author, and public administrator based in Kathmandu, Nepal.',
  alternates: { canonical: '/contact' },
}

export default function Page() {
  return <ContactPage />
}
