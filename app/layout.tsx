import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { Navbar } from '@/components/custom/Navbar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased relative",
        fontSans.variable
      )}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
