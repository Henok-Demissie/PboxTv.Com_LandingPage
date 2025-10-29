"use client"
import { Tv, Download, Sparkles, Zap, Shield, ThumbsUp, Users, Film } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlowingTiltCard } from "@/components/ui/glowing-tilt-card"
import { ParallaxScroll } from "@/components/ui/parallax-scroll"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { ProgressCard } from "@/components/ui-library/cards/progress-card"

export function FeaturesSection() {
  const features = [
    {
      icon: <Film className="h-10 w-10 text-red-500" />,
      title: "4K Ultra HD & HDR",
      description: "Experience cinema-grade picture with 4K, Dolby Vision, and HDR10.",
      progress: 100,
      borderClass: "border-glow-red",
    },
    {
      icon: <Download className="h-10 w-10 text-blue-500" />,
      title: "Offline Downloads",
      description: "Save movies and shows to watch later without internet.",
      progress: 100,
      borderClass: "border-glow-blue",
    },
    {
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: "Lightning Fast Streaming",
      description: "Optimized delivery for instant playback with adaptive bitrate.",
      progress: 100,
      borderClass: "border-glow-yellow",
    },
    {
      icon: <Tv className="h-10 w-10 text-green-500" />,
      title: "Watch on Any Device",
      description: "TV, mobile, tablet, and web with seamless handoff.",
      progress: 100,
      borderClass: "border-glow-green",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-purple-500" />,
      title: "Personalized Picks",
      description: "AI recommendations tailored to your taste and watch history.",
      progress: 100,
      borderClass: "border-glow-purple",
    },
    {
      icon: <Shield className="h-10 w-10 text-orange-500" />,
      title: "Parental Controls",
      description: "Profile locks, content ratings, and safe viewing for families.",
      progress: 100,
      borderClass: "border-glow-orange",
    },
  ]

  return (
    <section id="features" className="relative w-full py-12 md:py-24 lg:py-32 bg-muted/30 overflow-hidden">
      <AnimatedBackground variant="dots" color="rgba(220, 38, 38, 0.05)" />

      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
            <div className="space-y-4">
              <AnimatedText
                text="Stream Smarter with Premium Features"
                variant="heading"
                className="text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter sm:text-5xl gradient-text"
                animation="slide"
              />
              <AnimatedText
                text="Everything you need for an incredible movie and TV experience — fast, beautiful, and personalized."
                variant="paragraph"
                className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70"
                animation="fade"
                delay={0.3}
              />
            </div>
          </div>
        </ScrollReveal>

        <ParallaxScroll baseVelocity={0.1} direction="up" className="py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlowingTiltCard>
                  <Card
                    className={`h-full glassmorphic-card border-none overflow-hidden group soft-glow ${feature.borderClass}`}
                  >
                    <CardHeader>
                      <div className="p-2 rounded-xl w-fit bg-muted/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {feature.icon}
                      </div>
                      <CardTitle className="mt-4 tracking-tight relative">
                        {feature.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-base opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                        {feature.description}
                      </CardDescription>

                      <ProgressCard
                        title=""
                        progress={feature.progress}
                        total={100}
                        status={feature.progress === 100 ? "success" : "default"}
                        showPercentage
                        variant="minimal"
                        progressColor={feature.progress === 100 ? "bg-green-500" : "bg-red-500"}
                      />
                    </CardContent>
                  </Card>
                </GlowingTiltCard>
              </ScrollReveal>
            ))}
          </div>
        </ParallaxScroll>
      </div>
    </section>
  )
}
