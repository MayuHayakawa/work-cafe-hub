import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { Metadata } from "next";

import '../../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth page for Work cafe hub',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1 h-screen w-screen flex justify-center items-center`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}