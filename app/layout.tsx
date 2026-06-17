import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { siteUrl } from '@/lib/site'
import './globals.css'

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  display: 'swap',
})

const title =
  'محمد خالد محمد محمود | مبرمج محترف متخصص في الأنظمة المؤسسية (ERP)'
const description =
  'محمد خالد محمد محمود - متخصص في بناء المنصات الرقمية والأنظمة المؤسسية المتقدمة (ERP) وتطوير حلول برمجية مصممة خصيصًا لمساعدة الشركات على إدارة عملياتها بكفاءة أعلى وتحقيق نمو مستدام.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | محمد خالد محمد محمود',
  },
  description,
  applicationName: 'محمد خالد محمد محمود',
  authors: [{ name: 'محمد خالد محمد محمود' }],
  creator: 'محمد خالد محمد محمود',
  keywords: [
    'مطور مواقع',
    'مبرمج ويب',
    'تطوير مواقع',
    'أنظمة ERP',
    'متاجر إلكترونية',
    'Next.js',
    'React',
    'مطور برمجيات متكامل',
    'تصميم مواقع',
    'تحسين محركات البحث',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: siteUrl,
    siteName: 'محمد خالد محمد محمود',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0d1117',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} dark bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
