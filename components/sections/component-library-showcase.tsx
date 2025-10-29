"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { ImageCard } from "@/components/ui-library/cards/image-card"
import { CtaCard } from "@/components/ui-library/cards/cta-card"
import { ProgressCard } from "@/components/ui-library/cards/progress-card"
import { GradientButton } from "@/components/ui-library/buttons/gradient-button"
import { PrimaryButton, SecondaryButton, OutlineButton } from "@/components/ui-library/buttons/button-variants"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui-library/animations/scroll-animations"
import { Sparkles, Zap, Layers, Palette, ArrowRight, CheckCircle, BookOpen, Lightbulb, Rocket, Users } from "lucide-react"

export function ComponentLibraryShowcase() {
  const [activeTab, setActiveTab] = useState("cards")

  return (
    <section id="movies" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
            <div className="space-y-4">
              <AnimatedText
                text="Browse Collections"
                variant="heading"
                className="text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter sm:text-5xl gradient-text"
                animation="slide"
              />
              <AnimatedText
                text="Trending now, critically acclaimed, and hand-picked collections to binge tonight."
                variant="paragraph"
                className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70"
                animation="fade"
                delay={0.3}
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-12">
                <AnimatedGradientBorder
                  colors={["#dc2626", "#4b5563", "#dc2626", "#4b5563"]}
                  borderWidth={1}
                  duration={8}
                  containerClassName="rounded-full"
                >
                  <TabsList className="glassmorphic-tabs border-0">
                    <TabsTrigger value="cards">Trending</TabsTrigger>
                    <TabsTrigger value="buttons">For You</TabsTrigger>
                    <TabsTrigger value="progress">Collections</TabsTrigger>
                  </TabsList>
                </AnimatedGradientBorder>
              </div>

              {/* Cards Tab */}
              <TabsContent value="cards" className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium tracking-tight text-center">Trending on PboxTv</h3>
                  <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                    The hottest movies and series everyone is watching right now
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ScrollAnimation type="slide" direction="up" delay={0.1}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
                        imageAlt="Now Streaming"
                        title="Now Streaming: Must‑Watch"
                        description="Hand‑picked blockbusters and award‑winners now on PboxTv."
                        tags={["4K", "Dolby", "Top 10"]}
                        variant="default"
                        className="border-glow-red"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.2}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
                        imageAlt="For You"
                        title="For You"
                        description="Personalized picks based on your taste and watch history."
                        tags={["Personalized", "Just Added"]}
                        variant="hover-zoom"
                        className="border-glow-blue"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.3}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
                        imageAlt="Curated Collections"
                        title="Curated Collections"
                        description="From Oscar Winners to Family Night — collections for every mood."
                        tags={["Collections", "Family", "Action"]}
                        variant="hover-reveal"
                        className="border-glow-purple"
                      />
                    </ScrollAnimation>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <h3 className="text-2xl font-medium tracking-tight text-center">Join PboxTv</h3>
                  <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                    Watch instantly on any device. Cancel anytime.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ScrollAnimation type="slide" direction="up" delay={0.1}>
                      <CtaCard
                        title="Start Watching Free"
                        description="Create your profile and start streaming in minutes."
                        primaryAction={{ text: "Sign Up Free" }}
                        secondaryAction={{ text: "See Plans" }}
                        variant="default"
                        icon={<Sparkles className="h-6 w-6" />}
                        className="border-glow-green"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.2}>
                      <CtaCard
                        title="Go Premium"
                        description="4K HDR, Dolby Atmos, and offline downloads."
                        primaryAction={{ text: "Upgrade" }}
                        variant="gradient"
                        alignment="center"
                        buttonVariant="gradient"
                        icon={<Zap className="h-6 w-6" />}
                        className="border-glow-yellow"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.3}>
                      <CtaCard
                        title="Watch Anywhere"
                        description="TV, mobile, tablet, and web — pick up where you left off."
                        primaryAction={{ text: "See Devices" }}
                        variant="glass"
                        alignment="right"
                        buttonVariant="magnetic"
                        icon={<Users className="h-6 w-6" />}
                        className="border-glow-orange"
                      />
                    </ScrollAnimation>
                  </div>
                </div>
              </TabsContent>

              {/* For You Tab */}
              <TabsContent value="buttons" className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium tracking-tight text-center">For You</h3>
                  <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                    Hand‑picked movies and series based on your watch history
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ScrollAnimation type="slide" direction="up" delay={0.1}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
                        imageAlt="Because you watched Action"
                        title="High‑Octane Picks"
                        description="Explosive action and non‑stop thrills you’ll love."
                        tags={["Action", "Top Rated"]}
                        variant="hover-zoom"
                        className="border-glow-red"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.2}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"
                        imageAlt="Because you liked Drama"
                        title="Critically Acclaimed"
                        description="Award‑winning dramas, hand‑picked for you."
                        tags={["Drama", "Award‑Winning"]}
                        variant="hover-reveal"
                        className="border-glow-blue"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.3}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg"
                        imageAlt="For the Weekend"
                        title="Weekend Binge"
                        description="Fresh seasons and must‑watch mini‑series."
                        tags={["Series", "New Season"]}
                        variant="default"
                        className="border-glow-purple"
                      />
                    </ScrollAnimation>
                  </div>
                </div>
              </TabsContent>

              {/* Collections Tab */}
              <TabsContent value="progress" className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium tracking-tight text-center">Curated Collections</h3>
                  <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                    Themes and collections for every mood
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ScrollAnimation type="slide" direction="up" delay={0.1}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
                        imageAlt="Oscar Winners"
                        title="Oscar Winners"
                        description="Award‑winning films across decades."
                        tags={["Drama", "Classic"]}
                        variant="hover-reveal"
                        className="border-glow-yellow"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.2}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg"
                        imageAlt="Family Night"
                        title="Family Night"
                        description="Feel‑good favorites for all ages."
                        tags={["Family", "Comedy"]}
                        variant="default"
                        className="border-glow-green"
                      />
                    </ScrollAnimation>

                    <ScrollAnimation type="slide" direction="up" delay={0.3}>
                      <ImageCard
                        imageSrc="https://image.tmdb.org/t/p/w1280/fYtHxTxlhzD4QWfEbrC1rypysSD.jpg"
                        imageAlt="Adrenaline Rush"
                        title="Adrenaline Rush"
                        description="Edge‑of‑your‑seat action marathons."
                        tags={["Action", "Thriller"]}
                        variant="hover-zoom"
                        className="border-glow-red"
                      />
                    </ScrollAnimation>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
