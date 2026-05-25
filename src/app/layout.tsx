import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://dolindrasharma.com'
const siteTitle =
  'Dolindra Prasad Sharma | Organizational Leader, Author & Public Administrator'
const siteDescription =
  'Official portfolio of Dolindra Prasad Sharma, Managing Director of Himalaya Nepal Krishi Company Limited, author of Badalbhitra Ko Gham, and a senior Nepali organizational leader, public administrator, and patron of literary and research institutions in Kathmandu, Nepal.'

const keywords = [
  'Dolindra Prasad Sharma',
  'Dolindra Sharma',
  'Mr. Dolindra Prasad Sharma',
  'organizational leader Nepal',
  'public administrator Nepal',
  'author Nepal',
  'Nepali leader',
  'Managing Director Himalaya Nepal Krishi',
  'Himalaya Nepal Krishi Company Limited',
  'Sajha Prakashan',
  'Nepal Studies and Research Center',
  'Shami Literary Academy',
  'CYC Nepal',
  'Oxford International Publication',
  'Badalbhitra Ko Gham',
  'Tribhuvan University MPA',
  'Public Administration Resource Management',
  'Political Science Nepal',
  'Kathmandu leader',
  'Nepal portfolio',
]

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Dolindra Prasad Sharma',
  },
  description: siteDescription,
  keywords,
  authors: [{ name: 'Dolindra Prasad Sharma', url: siteUrl }],
  creator: 'Dolindra Prasad Sharma',
  publisher: 'Dolindra Prasad Sharma',
  applicationName: 'Dolindra Prasad Sharma',
  category: 'Personal portfolio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Dolindra Prasad Sharma',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 1200,
        alt: 'Dolindra Prasad Sharma, Managing Director of Himalaya Nepal Krishi Company Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/hero-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#c0392b',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}#person`,
  name: 'Dolindra Prasad Sharma',
  alternateName: ['Dolindra Sharma', 'Mr. Dolindra Prasad Sharma'],
  description:
    'Nepali organizational leader, author, and public administrator. Managing Director of Himalaya Nepal Krishi Company Limited; patron of Shami Literary Academy and Nepal Studies and Research Center.',
  url: siteUrl,
  image: `${siteUrl}/hero-image.png`,
  jobTitle: [
    'Managing Director',
    'Organizational Leader',
    'Author',
    'Public Administrator',
  ],
  nationality: 'Nepali',
  gender: 'Male',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'Nepal',
  },
  knowsLanguage: ['Nepali', 'English'],
  worksFor: {
    '@type': 'Organization',
    name: 'Himalaya Nepal Krishi Company Limited',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kathmandu',
      addressCountry: 'Nepal',
    },
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Tribhuvan University',
      sameAs: 'https://tribhuvan-university.edu.np/',
    },
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Managing Director',
      occupationLocation: {
        '@type': 'City',
        name: 'Kathmandu, Nepal',
      },
    },
  ],
  knowsAbout: [
    'Public administration',
    'Resource management',
    'Political science',
    'Organizational leadership',
    'Publishing in Nepal',
    'Agricultural development',
    'Nepali literature',
    'Community development',
  ],
  award: [
    'Author of the anthology Badalbhitra Ko Gham (2018)',
    'Patron of Shami Literary Academy',
    'Patron of Nepal Studies and Research Center',
  ],
  sameAs: ['https://www.facebook.com/dolindra.sharma'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}#website`,
  url: siteUrl,
  name: 'Dolindra Prasad Sharma · Official Portfolio',
  description: siteDescription,
  inLanguage: 'en',
  publisher: { '@id': `${siteUrl}#person` },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-bg font-body text-dark antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
