"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { motion } from "framer-motion"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      description: "Start watching with ads on supported devices.",
      price: "$0",
      duration: "per month",
      features: [
        "Thousands of Movies & Series",
        "Live TV Channels",
        "Multiple Profiles",
        "HD Streaming",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Premium",
      description: "Best for 4K HDR, Dolby Atmos, and downloads.",
      price: "$14.99",
      duration: "per month",
      features: [
        "4K HDR + Dolby Atmos",
        "Offline Downloads",
        "Ad‑Free Streaming",
        "Watch on Any Device",
        "Priority Support",
      ],
      cta: "Go Premium",
      popular: true,
    },
    {
      name: "Family",
      description: "Share PboxTv with up to 5 profiles.",
      price: "$19.99",
      duration: "per month",
      features: [
        "Up to 5 Profiles",
        "Kids Mode & Parental Controls",
        "4K HDR + Dolby Atmos",
        "Downloads on Multiple Devices",
        "Ad‑Free Streaming",
      ],
      cta: "Choose Family",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter sm:text-5xl">
                PboxTv Plans for Every Viewer
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Start free or upgrade for 4K HDR, downloads, and ad‑free streaming.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className={`h-full flex flex-col glassmorphic-card ${plan.popular ? "border-glow-red" : ""}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="tracking-tight">{plan.name}</CardTitle>
                  <CardDescription className="opacity-70">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 opacity-70">{plan.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.popular ? (
                    <AnimatedGradientBorder
                      colors={["#dc2626", "#4b5563", "#dc2626", "#4b5563"]}
                      borderWidth={1}
                      duration={8}
                    >
                      <Button className="w-full bg-background border-0 text-foreground hover:text-white">
                        {plan.cta}
                      </Button>
                    </AnimatedGradientBorder>
                  ) : (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="w-full neumorphic-button">{plan.cta}</Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
