import type React from "react"
import type { Metadata } from "next"
// Changed to Geist Sans font
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  // Updated site name to Atlas
  title: "Atlas - Track Your Motorcycle Rides",
  description: "Track and manage your motorcycle rides and garage",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Applied Geist Sans font */}
      <body className={GeistSans.className}>
        <Navigation />
        <main className="min-h-screen bg-white">{children}</main>
      </body>
    </html>
  )
}
