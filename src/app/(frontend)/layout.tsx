// src/app/(frontend)/layout.tsx

import { AuthProvider } from '../../_providers/Auth'
import React, { ReactNode } from 'react'
import ClientWrapper from './ClientWrapper'
import './globals.css'
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-merriweather',
})

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} font-sans`}>
        <AuthProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
