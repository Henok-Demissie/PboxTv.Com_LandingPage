"use client"

import { Tv, Download, Sparkles, Zap, Shield, Film } from "lucide-react"
import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowingTiltCard } from "@/components/ui/glowing-tilt-card"
import { ProgressCard } from "@/components/ui-library/cards/progress-card"

export function FeaturesSection() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const [showLeftIndicator, setShowLeftIndicator] = React.useState(false)
  const [showRightIndicator, setShowRightIndicator] = React.useState(true)
  const [visibleCards, setVisibleCards] = React.useState<Set<number>>(new Set([0, 1]))

  const checkScrollPosition = React.useCallback(() => {
    if (!scrollContainerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    const maxScroll = scrollWidth - clientWidth
    
    setShowLeftIndicator(scrollLeft > 10)
    setShowRightIndicator(scrollLeft < maxScroll - 10)

    // Check which cards are visible in viewport
    const container = scrollContainerRef.current
    const containerRect = container.getBoundingClientRect()
    const visible = new Set<number>()
    
    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const cardRect = cardRef.getBoundingClientRect()
        // Card is visible if it intersects with container viewport
        if (cardRect.right > containerRect.left && cardRect.left < containerRect.right) {
          visible.add(index)
        }
      }
    })
    
    setVisibleCards(visible)
  }, [])

  React.useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', checkScrollPosition)
      return () => {
        container.removeEventListener('scroll', checkScrollPosition)
        window.removeEventListener('resize', checkScrollPosition)
      }
    }
  }, [checkScrollPosition])

  React.useEffect(() => {
    // Initialize visible cards on mount
    checkScrollPosition()
  }, [checkScrollPosition])

  const features = [
    { icon: <Film className="h-7 w-7 text-red-500" />, title: "4K Ultra HD & HDR", description: "Experience cinema-grade picture with 4K, Dolby Vision, and HDR10.", progress: 100, borderClass: "border-glow-red" },
    { icon: <Download className="h-7 w-7 text-blue-500" />, title: "Offline Downloads", description: "Save movies and shows to watch later without internet.", progress: 100, borderClass: "border-glow-blue" },
    { icon: <Zap className="h-7 w-7 text-yellow-500" />, title: "Lightning Fast Streaming", description: "Optimized delivery for instant playback with adaptive bitrate.", progress: 100, borderClass: "border-glow-yellow" },
    { icon: <Tv className="h-7 w-7 text-green-500" />, title: "Watch on Any Device", description: "TV, mobile, tablet, and web with seamless handoff. Enjoy it.", progress: 100, borderClass: "border-glow-green" },
    { icon: <Sparkles className="h-7 w-7 text-purple-500" />, title: "Personalized Picks", description: "AI recommendations tailored to your taste and watch history.", progress: 100, borderClass: "border-glow-purple" },
    { icon: <Shield className="h-7 w-7 text-orange-500" />, title: "Parental Controls", description: "Profile locks, content ratings, and safe viewing for families.", progress: 100, borderClass: "border-glow-orange" },
  ]

  return (
    <section id="features" className="relative w-full py-12 md:py-16 lg:py-20 bg-muted/30">
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

        <div className="py-12 relative">
          {/* Left scroll gradient indicator */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-muted/30 via-muted/15 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${showLeftIndicator ? 'opacity-100' : 'opacity-0'}`}></div>
          
          {/* Right scroll gradient indicator */}
          <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-muted/30 via-muted/15 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${showRightIndicator ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto -mx-6 md:-mx-8 md:no-scrollbar scroll-smooth"
          >
            <div className="flex gap-2.5 px-6 md:px-8 pb-2">
              {features.map((feature, index) => {
                const isVisible = visibleCards.has(index)
                const isLast = index === features.length - 1
                const cardContent = (
                  <>
                    <CardHeader className="p-2">
                      <div className="p-1 rounded-lg w-fit bg-muted/50">
                        {feature.icon}
                      </div>
                      <CardTitle className="mt-1.5 text-xs tracking-tight line-clamp-2">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1.5 p-2 pt-0">
                      <CardDescription className="text-xs opacity-80 line-clamp-2">
                        {feature.description}
                      </CardDescription>
                      <ProgressCard title="" progress={feature.progress} total={100} status={feature.progress === 100 ? "success" : "default"} showPercentage variant="minimal" progressColor={feature.progress === 100 ? "bg-green-500" : "bg-red-500"} />
                    </CardContent>
                  </>
                )
                
                return (
                  <div 
                    key={index} 
                    ref={(el) => { cardRefs.current[index] = el }}
                    className={`min-w-[120px] sm:min-w-[140px] md:min-w-[180px] lg:min-w-[200px] flex-shrink-0 max-w-[85vw] ${isLast ? 'pr-6 md:pr-8' : ''}`}
                  >
                    {isVisible ? (
                      <GlowingTiltCard tiltAmount={5} glareOpacity={0.2}>
                        <Card className={`h-full glassmorphic-card overflow-visible ${feature.borderClass} transition-all duration-500`}>
                          {cardContent}
                        </Card>
                      </GlowingTiltCard>
                    ) : (
                      <Card className={`h-full glassmorphic-card overflow-visible ${feature.borderClass} opacity-70 transition-all duration-500`}>
                        {cardContent}
                      </Card>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
