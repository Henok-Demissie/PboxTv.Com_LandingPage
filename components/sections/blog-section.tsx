"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function BlogSection() {
  const blogPosts = [
    {
      title: "What’s New on PboxTv",
      description: "Fresh premieres, new seasons, and exclusive collections you can stream tonight.",
      date: "May 15, 2023",
      readTime: "5 min read",
    },
    {
      title: "4K, HDR, and Dolby Atmos on PboxTv",
      description: "How to get the best picture and sound across your devices.",
      date: "April 28, 2023",
      readTime: "7 min read",
    },
    {
      title: "Tips for Personalized Picks",
      description: "Tune your profile for recommendations you’ll actually love.",
      date: "April 10, 2023",
      readTime: "6 min read",
    },
  ]

  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter sm:text-5xl">
                News & Tips from PboxTv
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Stay up to date with the latest releases, features, and viewing tips.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="h-full glassmorphic-card">
                <CardHeader>
                  <CardTitle className="tracking-tight">{post.title}</CardTitle>
                  <CardDescription className="opacity-70">
                    {post.date} · {post.readTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground opacity-70">{post.description}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm text-primary hover:underline transition-colors"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
