import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import '../styles/globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'TiffinDelight - Premium Tiffin Service',
  description: 'Experience authentic flavors with our premium tiffin delivery service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}
