"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { List, X, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { DownloadDropdown, MoviesDropdown, LiveTVDropdown, FeaturesDropdown } from "@/components/header-dropdowns"

  const navItems = [
  { name: "Free Movies & TV", href: "#movies", dropdown: MoviesDropdown },
  { name: "Live TV", href: "#live-tv", dropdown: LiveTVDropdown },
  { name: "Features", href: "#features", dropdown: FeaturesDropdown },
  { name: "Download", href: "#download", dropdown: DownloadDropdown },
]

export function SiteHeader() {
  const pathname = usePathname()
  const scrollPosition = useScrollPosition()
  const lastScrollRef = React.useRef(0)
  const [hideHeader, setHideHeader] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [searchFocused, setSearchFocused] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout>()
  const openDelayRef = React.useRef<NodeJS.Timeout>()
  const headerRef = React.useRef<HTMLDivElement | null>(null)
  const menuButtonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({})

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  React.useEffect(() => {
    // Prevent background scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Only enable hover-triggered dropdowns on fine pointers (mouse). On touch/coarse devices, rely on clicks.
  const isFinePointer = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer:fine)").matches

  const handleMouseEnter = (itemName: string) => {
    if (!isFinePointer) return
    // Clear any pending close timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = undefined
    }

    // Small open delay to avoid showing dropdowns on quick mouse passes
    if (openDelayRef.current) {
      clearTimeout(openDelayRef.current)
    }
    openDelayRef.current = setTimeout(() => {
      setActiveDropdown(itemName)
      openDelayRef.current = undefined
    }, 220)
  }

  const handleMouseLeave = () => {
    // Delay closing slightly to allow moving into the dropdown container
    if (openDelayRef.current) {
      clearTimeout(openDelayRef.current)
      openDelayRef.current = undefined
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      dropdownTimeoutRef.current = undefined
    }, 300)
  }

  const focusFirstMenuItem = (itemName: string) => {
    const menu = document.getElementById(`nav-${itemName.toLowerCase().replace(/\s+/g, "-")}-menu`)
    if (!menu) return
    const first = menu.querySelector<HTMLElement>('[role="menuitem"]')
    first?.focus()
  }

  const handleButtonKeyDown = (e: React.KeyboardEvent, itemName: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveDropdown(itemName)
      setTimeout(() => focusFirstMenuItem(itemName), 30)
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveDropdown(itemName)
      setTimeout(() => focusFirstMenuItem(itemName), 30)
    }
  }

  const handleMenuKeyDown = (e: React.KeyboardEvent, itemName: string) => {
    const menu = document.getElementById(`nav-${itemName.toLowerCase().replace(/\s+/g, "-")}-menu`)
    if (!menu) return
    const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'))
    if (items.length === 0) return

    const active = document.activeElement as HTMLElement | null
    const idx = active ? items.indexOf(active) : -1

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setActiveDropdown(null)
        // return focus to trigger button
        const btn = menuButtonRefs.current[itemName]
        btn?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (idx === -1 || idx === items.length - 1) items[0].focus()
        else items[idx + 1].focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        if (idx <= 0) items[items.length - 1].focus()
        else items[idx - 1].focus()
        break
      case 'Home':
        e.preventDefault()
        items[0].focus()
        break
      case 'End':
        e.preventDefault()
        items[items.length - 1].focus()
        break
    }
  }

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!activeDropdown) return
      if (!headerRef.current) return
      if (!headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleDocClick)
    return () => document.removeEventListener("mousedown", handleDocClick)
  }, [activeDropdown])

  // Clean up timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
      if (openDelayRef.current) clearTimeout(openDelayRef.current)
    }
  }, [])

  // Auto-hide header on scroll down, show on scroll up
  React.useEffect(() => {
    const last = lastScrollRef.current
    const goingDown = scrollPosition > last
    const beyondThreshold = scrollPosition > 120
    setHideHeader(goingDown && beyondThreshold)
    lastScrollRef.current = scrollPosition
  }, [scrollPosition])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 will-change-transform",
        hideHeader ? "-translate-y-full" : "translate-y-0",
        mobileMenuOpen
          ? "bg-black"
          : scrollPosition > 10
            ? "bg-background md:bg-background/95 md:backdrop-blur-lg border-b border-border/40 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]"
            : "bg-background md:bg-background/90",
      )}
      ref={headerRef}
    >
      <div className="container px-6 md:px-8 flex h-16 items-center justify-between gap-6 relative">
        {/* Left Section: Logo + Search */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/"
            className="flex items-center space-x-1 shrink-0 hover:opacity-80 transition-opacity duration-200"
          >
            <span className="[font-family:var(--font-heading)] text-xl leading-none font-bold tracking-tight text-primary">
              PboxTv
            </span>
          </Link>

          <div className="hidden md:flex items-center shrink-0 min-w-0">
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border/40 transition-all duration-200 hover:border-primary/70 hover:bg-muted/70",
                searchFocused && "bg-muted border-primary/50",
              )}
            >
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Find Movies & TV"
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full max-w-[260px]"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
        </div>

        {/* Right Section: Navigation + Auth Buttons */}
        <div className="flex items-center gap-4 shrink-0 ml-auto">
          {/* Desktop nav (to the right of search) */}
          <nav className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => {
              const DropdownComponent = item.dropdown
              const isActive = activeDropdown === item.name
              const id = `nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`

              return (
                <div key={item.name} className="relative group">
                  <button
                    id={id}
                    aria-haspopup="menu"
                    aria-expanded={String(!!isActive)}
                    className="px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 whitespace-nowrap rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 relative nav-pill"
                    ref={(el) => { menuButtonRefs.current[item.name] = el; }}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                    onKeyDown={(e) => handleButtonKeyDown(e, item.name)}
                  >
                    {item.name}
                    <span className="pointer-events-none nav-underline" />
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        id={`${id}-menu`}
                        role="menu"
                        aria-labelledby={id}
                        className="fixed top-16 left-0 right-0 z-50 pointer-events-auto mx-auto w-full max-w-6xl px-4 will-change-transform"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                        onKeyDown={(e: React.KeyboardEvent) => handleMenuKeyDown(e, item.name)}
                      >
                        <div className="p-1">
                          <div className="w-full">
                            {/* Dropdown components are already designed to render two columns when wide enough. */}
                            <DropdownComponent />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted/30 transition-all duration-200 px-3 rounded-full border border-transparent hover:border-red-500/50 hover:shadow-[0_0_18px_rgba(239,68,68,0.35)]"
              asChild
            >
              <Link href="#signin">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition-all duration-200 hover:shadow-[0_0_22px_rgba(255,215,0,0.35)] px-5 rounded-full"
              asChild
            >
              <Link href="#signup">Sign Up Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-1.5 rounded-md bg-background border border-border hover:bg-muted transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={String(mobileMenuOpen)}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <X className="text-foreground h-5 w-5" /> : <List className="text-foreground h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div className="fixed inset-0 z-[60] bg-black" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className="mx-auto my-6 w-[92%] max-w-sm h-[calc(100%-3rem*2)] rounded-2xl bg-black text-white border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.45)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-3 border-b border-white/15 rounded-t-2xl">
                <Link
                  href="/"
                  className="flex items-center space-x-1 hover:opacity-80 transition-opacity"
                  onClick={closeMobileMenu}
                >
                  <span className="[font-family:var(--font-heading)] text-xl font-bold tracking-tight text-primary">
                    PboxTv
                  </span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex h-[calc(100%-56px)] flex-col px-4 py-4">
                {/* Single black container for all content */}
                <div className="rounded-md bg-black">
                  {/* Search row */}
                  <div className="pt-2 px-2">
                    <div className="flex items-center gap-2 rounded-md border border-white/15 bg-black px-3 py-2 focus-within:ring-2 focus-within:ring-red-500/60">
                      <Search className="h-4 w-4 text-white/80" />
                      <input
                        type="text"
                        placeholder="Find Movies & TV"
                        className="bg-transparent text-base text-white placeholder:text-white/60 outline-none w-full"
                      />
                      <button
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.5)] transition"
                        aria-label="Search"
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {/* Primary menu items */}
                  <nav className="flex flex-col mt-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="px-3 py-3 text-lg font-medium bg-black text-white rounded-none hover:bg-white/10 focus:bg-white/15 focus:outline-none transition-colors hover:ring-2 hover:ring-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.4)]"
                        onClick={(e) => {
                          e.preventDefault()
                          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                          closeMobileMenu()
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Bottom actions */}
                  <div className="pt-4 pb-4 px-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full bg-black border-white/30 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.4)]"
                        asChild
                      >
                        <Link href="#signin" onClick={closeMobileMenu}>
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.4)]"
                        asChild
                      >
                        <Link href="#signup" onClick={closeMobileMenu}>
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
