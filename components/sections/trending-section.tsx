"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { motion } from "framer-motion"
import * as React from "react"
import { trending2024_2025, type TrendingItem } from "@/app/data/posters"

const trending: TrendingItem[] = trending2024_2025

export function TrendingSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [paused, setPaused] = React.useState(false)
  const [items, setItems] = React.useState<TrendingItem[]>(trending)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [slideCount, setSlideCount] = React.useState(0)

  const localPlaceholder = "/placeholder/poster.svg"

  const displayItems = React.useMemo(() => {
    const target = 20
    if (items.length >= target) return items.slice(0, target)
    const out: TrendingItem[] = []
    for (let i = 0; i < target; i++) out.push(items[i % items.length])
    return out
  }, [items])

  React.useEffect(() => {
    if (!api) return
    const update = () => {
      try {
        setSelectedIndex(api.selectedScrollSnap())
        setSlideCount(api.scrollSnapList().length)
      } catch {}
    }
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  React.useEffect(() => {
    if (!api) return
    const id = setInterval(() => {
      if (!paused) api.scrollNext()
    }, 2500)
    return () => clearInterval(id)
  }, [api, paused])

  // Fetch official posters from TMDB for any items with placeholders or missing images
  React.useEffect(() => {
    async function enhancePosters() {
      const updated = await Promise.all(
        items.map(async (it) => {
          const isPlaceholder = !it.img || it.img.includes("placehold.co") || it.img.startsWith("/posters/")
          if (!isPlaceholder) return it
          try {
            const res = await fetch(`/api/tmdb?title=${encodeURIComponent(it.title)}`)
            const data = await res.json()
            if (data?.poster) return { ...it, img: data.poster }
          } catch {}
          return it
        }),
      )
      setItems(updated)
    }
    enhancePosters()
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const distanceFromSelected = React.useCallback(
    (idx: number) => {
      if (!slideCount) return Math.abs(idx - selectedIndex)
      const raw = Math.abs(idx - selectedIndex)
      return Math.min(raw, slideCount - raw)
    },
    [selectedIndex, slideCount],
  )

  return (
    <section id="trending" className="relative z-10 w-full pt-12 md:pt-16 lg:pt-20 pb-12 bg-background overflow-visible">
      {/* Curved animated separator between hero and trending */}
      <div className="pointer-events-none absolute -top-10 left-0 right-0 curve-accent z-0">
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
          <h2 className="text-2xl md:text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter mb-2 text-foreground">Trending Now</h2>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">{selectedIndex + 1} / {displayItems.length}</p>
            <p className="text-xs text-muted-foreground hidden sm:block">Swipe or use arrows to browse</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Carousel opts={{ align: "center", loop: true }} setApi={setApi} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayItems.map((item, idx) => {
                const d = distanceFromSelected(idx)
                const scale = d === 0 ? 1.06 : d === 1 ? 0.9 : 0.8
                const opacity = d === 0 ? 1 : d === 1 ? 0.7 : 0.45
                const grayscale = d === 0 ? 0 : d === 1 ? 0.2 : 0.5
                const zIndex = d === 0 ? 50 : d === 1 ? 30 : 10
                return (
                  <CarouselItem key={idx} className="basis-3/4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2 md:pl-4">
                    <motion.div
                      whileHover={{ y: -6, scale: d === 0 ? 1.08 : scale + 0.05 }}
                      animate={{ scale, opacity, filter: `grayscale(${grayscale})` }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="relative"
                      style={{ zIndex }}
                    >
                      <span className="pointer-events-none absolute left-3 top-3 z-20 text-white number-outline text-5xl md:text-6xl lg:text-7xl font-extrabold select-none">
                        {idx + 1}
                      </span>
                      <div className="overflow-hidden rounded-lg border border-white/10 border-glow-red bg-black/30">
                        <div className="relative w-full aspect-[2/3] bg-black/40">
                          <a href={item.link ?? undefined} target={item.link ? "_blank" : undefined} rel={item.link ? "noopener noreferrer" : undefined}>
                            <img
                              src={item.img ?? localPlaceholder}
                              alt={item.title}
                              className="h-full w-full object-contain bg-black"
                              onError={(e) => {
                                if (e.currentTarget.src !== localPlaceholder) e.currentTarget.src = localPlaceholder
                              }}
                            />
                          </a>
                          <a
                            href={item.trailer ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + ' trailer')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-2 right-2 z-20 inline-flex items-center justify-center rounded-full bg-red-600/90 text-white px-2 py-1 text-xs hover:bg-red-500"
                          >
                            Watch Trailer
                          </a>
                        </div>
                        <p className="px-2 py-2 text-sm text-foreground font-medium line-clamp-1">{item.title}</p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="border-white/20 bg-black/60 hover:bg-black/80 opacity-100" />
            <CarouselNext className="border-white/20 bg-black/60 hover:bg-black/80 opacity-100" />
          </Carousel>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}


