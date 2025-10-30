"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { motion } from "framer-motion"
import * as React from "react"

const trending = [
  { title: "Ballad of a Small Player", img: "https://image.tmdb.org/t/p/w300/9wC5XxvFeoDyAJhDigw1VE3DybZ.jpg" },
  { title: "A House of Dynamite", img: "https://image.tmdb.org/t/p/w300/qGL2P2GRle3NbS1Ry6j8TDIrS9I.jpg" },
  { title: "Until Dawn", img: "https://image.tmdb.org/t/p/w300/9hVIAtF5NCz7r3A2kZZgwyUr0GI.jpg" },
  { title: "The Witcher", img: "https://image.tmdb.org/t/p/w300/7vjaCdMw15FEbXyLQTVa04URsPm.jpg" },
  { title: "Friends", img: "https://image.tmdb.org/t/p/w300/f496cm9enuEsZkSPzCwnTESEK5s.jpg" },
  { title: "Dune: Part Two", img: "https://image.tmdb.org/t/p/w300/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
  { title: "Stranger Things", img: "https://image.tmdb.org/t/p/w300/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg" },
  { title: "Breaking Bad", img: "https://image.tmdb.org/t/p/w300/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg" },
  { title: "Oppenheimer", img: "https://image.tmdb.org/t/p/w300/ptpr0kGAckfQkJeJIt8st5M5I5h.jpg" },
  { title: "John Wick 4", img: "https://image.tmdb.org/t/p/w300/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg" },
]

export function TrendingSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (!api) return
    const id = setInterval(() => {
      if (!paused) api.scrollNext()
    }, 2500)
    return () => clearInterval(id)
  }, [api, paused])

  return (
    <section id="trending" className="relative w-full pt-12 md:pt-16 lg:pt-20 pb-12 bg-background overflow-hidden">
      {/* Curved animated separator between hero and trending */}
      <div className="pointer-events-none absolute -top-10 left-0 right-0 curve-accent">
        <svg viewBox="0 0 1440 120" width="100%" height="120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.0" />
              <stop offset="40%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M0,100 C400,20 1040,20 1440,100" fill="none" stroke="url(#curveStroke)" strokeWidth="6" pathLength={300} />
        </svg>
      </div>

      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter mb-6 text-foreground">Trending Now</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {trending.map((item, idx) => (
                <CarouselItem key={idx} className="basis-2/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2 md:pl-4">
                  <motion.div whileHover={{ y: -6, scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative">
                    <span className="pointer-events-none absolute left-3 top-3 z-20 text-white number-outline text-5xl md:text-6xl lg:text-7xl font-extrabold select-none">
                      {idx + 1}
                    </span>
                    <div className="overflow-hidden rounded-lg border border-white/10 border-glow-red bg-black/30">
                      <img src={item.img} alt={item.title} className="h-[220px] w-full object-cover transition-transform duration-300 hover:scale-105" />
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-white/20 bg-black/40 hover:bg-black/60" />
            <CarouselNext className="border-white/20 bg-black/40 hover:bg-black/60" />
          </Carousel>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}


