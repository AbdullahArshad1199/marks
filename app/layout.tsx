import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from './context/UserContext'
import ConditionalLayout from './components/ConditionalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI News Hub - Latest AI News & Videos',
  description: 'Stay updated with the latest AI news, research, and videos from top sources',
  keywords: 'AI, artificial intelligence, machine learning, news, videos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </UserProvider>
      </body>
    </html>
  )
}

