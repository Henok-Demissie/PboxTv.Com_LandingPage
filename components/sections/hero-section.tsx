"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Play } from "lucide-react"

import { SpotlightCard } from "@/components/ui/spotlight-card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import * as React from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { GradientButton } from "@/components/ui-library/buttons/gradient-button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function HeroSection() {
  return (
    <section id="home" className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      <AnimatedBackground variant="gradient" color="rgba(220, 38, 38, 0.08)" secondaryColor="rgba(30, 30, 30, 0.08)" />

      <div className="container px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <ScrollReveal>
            <motion.div
              className="flex flex-col justify-center space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-4" variants={itemVariants}>
                <h1 className="text-4xl [font-family:var(--font-heading)] font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                  <span className="gradient-text">PboxTv</span>
                  <br />
                  <span className="text-foreground">Unlimited Movies, TV & Live Channels</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 opacity-70">
                  Stream blockbusters and classics in 4K HDR with Dolby Atmos. Download for offline, sync across
                  devices, and get picks tailored just for you.
                </p>
              </motion.div>

              <motion.div className="flex flex-col gap-6 sm:flex-row sm:items-center" variants={itemVariants}>
                <GradientButton
                  glowAmount={5}
                  className="px-6 py-2.5 text-base"
                  gradientFrom="from-red-500"
                  gradientTo="to-red-700"
                  asChild
                >
                  <Link href="#movies" className="flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    Start PboxTv
                    <motion.span
                      className="ml-2 inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 1 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </GradientButton>

                <MagneticButton className="neumorphic-button">
                  <Link href="#features" className="px-6 py-2.5 block">
                    Explore Features
                  </Link>
                </MagneticButton>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <p className="text-sm text-muted-foreground flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  Join 5M+ viewers streaming premium content
                </p>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <SpotlightCard className="relative h-[450px] w-full overflow-hidden rounded-xl border glassmorphic-card p-1 border-glow-red">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-gray-900/20 z-10"></div>
              <div className="relative z-20 h-full w-full rounded-xl bg-gradient-to-br from-red-950/50 to-gray-950/50 p-2 sm:p-3">
                <div className="h-full w-full overflow-hidden rounded-lg border border-white/10">
                  <AspectRatio ratio={16 / 9}>
                    {(() => {
                      const posters = [
                        { title: "The Dark Knight (2008)", src: "https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
                        { title: "Inception (2010)", src: "https://image.tmdb.org/t/p/w1280/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg" },
                        { title: "Titanic (1997)", src: "https://image.tmdb.org/t/p/w1280/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg" },
                        { title: "La La Land (2016)", src: "https://image.tmdb.org/t/p/w1280/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg" },
                        { title: "Interstellar (2014)", src: "https://image.tmdb.org/t/p/w1280/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
                        { title: "The Godfather (1972)", src: "https://image.tmdb.org/t/p/w1280/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg" },
                      ]
                      const [api, setApi] = React.useState<CarouselApi | null>(null)

                      React.useEffect(() => {
                        if (!api) return
                        const interval = setInterval(() => {
                          api.scrollNext()
                        }, 2500)
                        return () => clearInterval(interval)
                      }, [api])

                      return (
                        <Carousel opts={{ loop: true }} setApi={setApi} className="h-full w-full">
                          <CarouselContent className="h-full">
                            {posters.map((p, idx) => (
                              <CarouselItem key={idx} className="h-full">
                                <div className="relative h-full w-full">
                                  <img src={p.src} alt={p.title} className="h-full w-full object-cover" />
                                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
                                    <p className="text-xs sm:text-sm font-medium text-white line-clamp-1">{p.title}</p>
                                  </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>
                      )
                    })()}
                  </AspectRatio>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
