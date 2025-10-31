import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { Toaster } from "@/components/ui/toaster"

import "@/app/globals.css"
import { Suspense } from "react"

// Use only Google Fonts to avoid any local font references
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
})

const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  title: "PboxTv | Unlimited Movies, TV & Live Channels",
  description:
    "PboxTv streams blockbuster movies, hit series, and live channels in 4K HDR with Dolby Atmos. Download for offline and watch anywhere.",
  keywords: ["PboxTv", "movies", "tv shows", "live tv", "streaming", "4K", "Dolby Atmos"],
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased font-light",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <SiteHeader />
            <Suspense>
              <PageTransition>
                <div className="flex-1 w-full overflow-x-hidden">{children}</div>
              </PageTransition>
            </Suspense>
            <SiteFooter />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
