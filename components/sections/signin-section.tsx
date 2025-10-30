"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"

export function SignInSection() {
  const { toast } = useToast()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [remember, setRemember] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const update = () => setShow(window.location.hash === "#signin")
    update()
    window.addEventListener("hashchange", update)
    return () => window.removeEventListener("hashchange", update)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({ title: "Missing details", description: "Please enter email and password.", variant: "destructive" })
      return
    }
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      if (remember) {
        localStorage.setItem("pboxtv:userEmail", email)
      }
      toast({ title: "Signed in", description: "Welcome back to PboxTv!" })
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <section id="signin" className="relative w-full py-12 md:py-16 lg:py-20">
      <div className="container px-6 md:px-8 max-w-xl">
        <h2 className="text-2xl md:text-3xl [font-family:var(--font-heading)] font-bold tracking-tighter mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or mobile number"
              className="h-11 w-full rounded-md px-3 bg-black/40 border border-white/20 text-white placeholder:text-gray-300/70 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-11 w-full rounded-md px-3 bg-black/40 border border-white/20 text-white placeholder:text-gray-300/70 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-md bg-red-600 text-white hover:bg-red-500 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <div className="flex items-center gap-2 pt-1">
            <input id="remember" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
          </div>
        </form>
      </div>
    </section>
  )
}


