"use client"
import { motion } from "framer-motion"
import { Tv, Smartphone, Gamepad2, Monitor, Database, Music, Settings, Camera, BarChart3, Zap } from "lucide-react"

const dropdownVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

export function DownloadDropdown() {
  const leftItems = [
    { icon: Tv, title: "For TVs", desc: "Roku, Fire TV, Samsung & more" },
    { icon: Smartphone, title: "For Mobile", desc: "iOS & Android" },
    { icon: Gamepad2, title: "For Consoles", desc: "PlayStation & Xbox" },
    { icon: Monitor, title: "For Desktop", desc: "Mac, Windows & Web" },
  ]

  const rightItems = [
    { icon: Database, title: "Media Server", desc: "Create, organize, and store your collections." },
    { icon: Music, title: "Music Player", desc: "Experience the app made for audiophiles." },
    { icon: Camera, title: "Photos", desc: "All your photo collections. One easy app." },
    { icon: BarChart3, title: "Dashboard", desc: "A custom app for remote server monitoring." },
  ]

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-4xl rounded-xl shadow-xl p-6 z-50 border bg-background border-primary/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: Get the App */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4 whitespace-nowrap">Get the App</h3>
          <div className="space-y-3">
            {leftItems.map((item, idx) => (
              <a
                key={item.title}
                href="#"
                role="menuitem"
                tabIndex={0}
                className={`flex gap-3 items-start p-3 rounded-lg transition-all duration-150 ${idx === 0 ? 'bg-primary/10' : 'hover:bg-primary/10'}`}
              >
                <div className="shrink-0 rounded-lg bg-primary/10 p-2">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground whitespace-nowrap">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right column: Pro Downloads */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4 whitespace-nowrap">PboxTv Pro Downloads</h3>
          <div className="space-y-3">
            {rightItems.map((item) => (
              <a
                key={item.title}
                href="#"
                role="menuitem"
                tabIndex={0}
                className="flex gap-3 items-start p-3 rounded-lg hover:bg-primary/10 transition-all duration-150"
              >
                <div className="shrink-0 rounded-lg bg-primary/10 p-2">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground whitespace-nowrap">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function MoviesDropdown() {
  const categories = [
    "Action",
    "Animation",
    "Comedy",
    "Crime",
    "Descriptive Audio",
    "Documentary",
    "Drama",
    "En Español",
    "Horror",
    "Music",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Western",
  ]

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-6xl rounded-xl shadow-2xl p-6 md:p-8 z-50 border bg-background border-primary/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 md:mb-4">Explore</h3>
          <div className="flex flex-col min-w-[18rem] space-y-1.5">
            {["Featured", "Movies & TV Shows", "Live TV Channels", "Most Popular", "Leaving Soon", "What to Watch"].map(
              (item) => (
                <button
                  key={item}
                  className="text-left rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <span className="block leading-6 tracking-tight">{item}</span>
                </button>
              ),
            )}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 md:mb-4">Categories</h3>
          <div className="grid grid-cols-2 gap-2 min-w-[18rem]">
            {categories.map((cat) => (
              <button
                key={cat}
                className="text-left rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                <span className="block leading-6 tracking-tight">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Highlights removed per request */}
      </div>
    </motion.div>
  )
}

export function LiveTVDropdown() {
  const categories = [
    "Hit TV",
    "True Crime",
    "News",
    "Reality",
    "Movies",
    "Classic TV",
    "Lifestyle",
    "Daytime TV",
    "Kids & Family",
    "Chills & Thrills",
    "En Español",
    "Music",
    "Drama TV",
    "Comedy",
    "Sports",
    "History & Science",
    "Sci-Fi & Action",
    "Food & Home",
    "Nature & Travel",
    "Game Shows",
    "Anime+",
    "International",
  ]

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-6xl rounded-xl shadow-2xl p-6 md:p-8 z-50 border bg-background border-primary/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 md:mb-4">Explore</h3>
          <div className="flex flex-col min-w-[18rem] space-y-1.5">
            {["Browse Channels", "Featured Channels", "News", "Comedy", "Sports"].map((item) => (
              <button
                key={item}
                className="text-left rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                <span className="block leading-6 tracking-tight">{item}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 md:mb-4">Categories</h3>
          <div className="grid grid-cols-2 gap-2 min-w-[18rem]">
            {categories.map((cat) => (
              <button
                key={cat}
                className="text-left rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                <span className="block leading-6 tracking-tight">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Highlights removed per request */}
      </div>
    </motion.div>
  )
}

export function FeaturesDropdown() {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-4xl rounded-xl shadow-xl p-8 z-50 border bg-background border-primary/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* PboxTv for All */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-6">PboxTv for All</h3>
          <div className="space-y-4">
            {[
              { icon: Zap, title: "600+ Free Live TV Channels", desc: "Tune in anytime, on any device." },
              { icon: Tv, title: "Free Movies & Shows", desc: "Stream 50,000+ titles on demand." },
              { icon: Settings, title: "Experience Discover", desc: "Find a movie. Find a show. Find your friends." },
              { icon: Smartphone, title: "Stream on Any Device", desc: "Download our free app to start." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-200 cursor-pointer group"
              >
                <item.icon className="h-6 w-6 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PboxTv Pro Features */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-6">PboxTv Pro Features</h3>
          <div className="space-y-4">
            {[
              { icon: Database, title: "Personal Media Library", desc: "Add your own content and organize it." },
              { icon: BarChart3, title: "Advanced Controls", desc: "Customize your streaming experience." },
              { icon: Music, title: "Premium Audio", desc: "Experience high-quality audio streaming." },
              { icon: Camera, title: "Media Management", desc: "Organize & manage all your collections." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-200 cursor-pointer group"
              >
                <item.icon className="h-6 w-6 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
