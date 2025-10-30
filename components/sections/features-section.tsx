"use client"

import { Tv, Download, Sparkles, Zap, Shield, Film } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowingTiltCard } from "@/components/ui/glowing-tilt-card"
import { ProgressCard } from "@/components/ui-library/cards/progress-card"

export function FeaturesSection() {
  const features = [
    { icon: <Film className="h-10 w-10 text-red-500" />, title: "4K Ultra HD & HDR", description: "Experience cinema-grade picture with 4K, Dolby Vision, and HDR10.", progress: 100, borderClass: "border-glow-red" },
    { icon: <Download className="h-10 w-10 text-blue-500" />, title: "Offline Downloads", description: "Save movies and shows to watch later without internet.", progress: 100, borderClass: "border-glow-blue" },
    { icon: <Zap className="h-10 w-10 text-yellow-500" />, title: "Lightning Fast Streaming", description: "Optimized delivery for instant playback with adaptive bitrate.", progress: 100, borderClass: "border-glow-yellow" },
    { icon: <Tv className="h-10 w-10 text-green-500" />, title: "Watch on Any Device", description: "TV, mobile, tablet, and web with seamless handoff.", progress: 100, borderClass: "border-glow-green" },
    { icon: <Sparkles className="h-10 w-10 text-purple-500" />, title: "Personalized Picks", description: "AI recommendations tailored to your taste and watch history.", progress: 100, borderClass: "border-glow-purple" },
    { icon: <Shield className="h-10 w-10 text-orange-500" />, title: "Parental Controls", description: "Profile locks, content ratings, and safe viewing for families.", progress: 100, borderClass: "border-glow-orange" },
  ]

  return (
    <section id="features" className="relative w-full py-12 md:py-24 lg:py-32 bg-muted/30 overflow-hidden">
      <div className="container px-6 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter sm:text-5xl gradient-text">
              More Reasons to Join
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
              Everything you need for an incredible movie and TV experience — fast, beautiful, and personalized.
            </p>
          </div>
        </div>

        <div className="py-12">
          <div className="no-scrollbar mx-auto max-w-[100vw] overflow-x-auto">
            <div className="flex gap-6 px-1">
              {features.map((feature, index) => (
                <div key={index} className="min-w-[320px] md:min-w-[380px] lg:min-w-[420px]">
                  <GlowingTiltCard tiltAmount={0} glareOpacity={0}>
                    <Card className={`h-full glassmorphic-card overflow-visible ${feature.borderClass}`}>
                      <CardHeader>
                        <div className="p-2 rounded-xl w-fit bg-muted/50">
                          {feature.icon}
                        </div>
                        <CardTitle className="mt-4 tracking-tight">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-base opacity-80">
                          {feature.description}
                        </CardDescription>
                        <ProgressCard title="" progress={feature.progress} total={100} status={feature.progress === 100 ? "success" : "default"} showPercentage variant="minimal" progressColor={feature.progress === 100 ? "bg-green-500" : "bg-red-500"} />
                      </CardContent>
                    </Card>
                  </GlowingTiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
