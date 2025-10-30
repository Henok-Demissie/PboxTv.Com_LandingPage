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
  const posters = [
    "https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "https://image.tmdb.org/t/p/w780/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    "https://image.tmdb.org/t/p/w780/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    "https://image.tmdb.org/t/p/w780/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    "https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "https://image.tmdb.org/t/p/w780/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
  ]

  return (
    <section id="home" className="relative w-full min-h-[80vh] md:min-h-[88vh] overflow-hidden">
      {/* Background collage */}
      <div className="absolute inset-0 -z-10">
        <div className="grid h-full w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 opacity-50">
          {posters.concat(posters).map((src, i) => (
            <div key={i} className="relative aspect-[2/3]">
              <img src={src} alt="poster" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70" />
      </div>

      {/* Top-right button removed per request; sign-in appears only when triggered */}

      <div className="container px-6 md:px-8 relative z-10">
        <ScrollReveal>
          <motion.div
            className="mx-auto max-w-3xl py-20 md:py-28 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl [font-family:var(--font-heading)] font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-white"
              variants={itemVariants}
            >
              Unlimited movies, TV shows, and more
            </motion.h1>

            <motion.p className="mt-4 text-lg md:text-xl text-gray-200/90" variants={itemVariants}>
              Starts at USD 2.99. Cancel anytime.
            </motion.p>

            <motion.p className="mt-6 text-sm md:text-base text-gray-300" variants={itemVariants}>
              Ready to watch? Enter your email to create or restart your membership.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
              variants={itemVariants}
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full h-12 rounded-md px-4 bg-black/40 border border-white/20 text-white placeholder:text-gray-300/70 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                />
              </div>
              <Link href="#get-started" className="shrink-0">
                <button className="h-12 px-6 rounded-md bg-red-600 text-white hover:bg-red-500 transition-colors">
                  Get Started
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
