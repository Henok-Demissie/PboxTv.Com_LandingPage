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

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrollPosition > 10 ? "bg-background/95 backdrop-blur-lg border-b border-border/40" : "bg-background/90",
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
                        className="absolute top-full left-1/2 mt-3 z-50 pointer-events-auto min-w-[420px] max-w-4xl transform -translate-x-1/2 will-change-transform"
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
              className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted/30 transition-all duration-200 px-3"
              asChild
            >
              <Link href="#signin">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition-all duration-200 hover:shadow-lg px-5"
              asChild
            >
              <Link href="#signup">Sign Up Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-1.5 rounded-md hover:bg-muted transition-colors"
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
          <motion.div
            className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background shadow-xl border-l border-border"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-3 border-b border-border">
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
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="text-foreground h-5 w-5" />
                </button>
              </div>

              <div className="py-3 px-2">
                <nav className="flex flex-col space-y-1">
                  <button className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search
                  </button>

                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        document.querySelector(item.href)?.scrollIntoView({
                          behavior: "smooth",
                        })
                        closeMobileMenu()
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="mt-auto p-3 border-t border-border">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-muted/50 transition-colors"
                    asChild
                  >
                    <Link href="#signin" onClick={closeMobileMenu}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black transition-colors" asChild>
                    <Link href="#signup" onClick={closeMobileMenu}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
