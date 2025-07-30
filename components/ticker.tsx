"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  MapPin,
  Star,
  Sparkles,
  Music,
  BookOpen,
  Phone,
  MessageCircle,
  Shield,
  Clock,
  Lock,
  Zap,
} from "lucide-react"

interface TickerItem {
  id: string
  type: "announcement" | "event" | "crisis" | "celebration" | "resource" | "community" | "security"
  content: string
  timestamp: Date
  priority: "low" | "medium" | "high" | "urgent"
  icon: any
  color: string
  link?: string
  location?: string
  author?: string
  encrypted?: boolean
}

export function Ticker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const tickerItems: TickerItem[] = [
    {
      id: "1",
      type: "announcement",
      content:
        "🌟 Welcome to ThriveBMore Liberation Stack! Your encrypted sanctuary for community support and collective action. All communications are end-to-end encrypted for your safety. 💜",
      timestamp: new Date(),
      priority: "high",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
      author: "ThriveBMore Team",
      encrypted: true,
    },
    {
      id: "2",
      type: "crisis",
      content:
        "🚨 CRISIS SUPPORT AVAILABLE 24/7: National Suicide Prevention Lifeline 988 | Trans Lifeline (877) 565-8860 | Crisis Text Line: Text HOME to 741741 | All calls encrypted and confidential",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      priority: "urgent",
      icon: Phone,
      color: "from-red-500 to-red-600",
      encrypted: true,
    },
    {
      id: "3",
      type: "event",
      content:
        "🏳️‍⚧️ TONIGHT 7PM: Trans Support Group at Baltimore LGBT Center - Safe space for sharing, healing, and community connection. Anonymous participation welcome!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      priority: "medium",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      location: "Baltimore LGBT Center",
      encrypted: true,
    },
    {
      id: "4",
      type: "community",
      content:
        "🧸 NEW FEATURE: Little Space now includes digital coloring pages, comfort stories, and guided breathing exercises. Your safe space for inner child healing awaits!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      priority: "medium",
      icon: Sparkles,
      color: "from-pink-500 to-purple-500",
      encrypted: true,
    },
    {
      id: "5",
      type: "resource",
      content:
        "🏥 Chase Brexton Health Care now accepting new patients for LGBTQ+ affirming healthcare including transition services. Call (410) 837-2050 for appointments.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      priority: "medium",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      encrypted: false,
    },
    {
      id: "6",
      type: "celebration",
      content:
        "✨ MILESTONE: 1,000+ community members now connected through our encrypted peer support network! Thank you for making this space special and safe.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      priority: "low",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      encrypted: true,
    },
    {
      id: "7",
      type: "security",
      content:
        "🔐 SECURITY UPDATE: All platform communications now feature quantum-resistant encryption. Your privacy and safety remain our highest priority.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      priority: "high",
      icon: Lock,
      color: "from-indigo-500 to-purple-500",
      encrypted: true,
    },
    {
      id: "8",
      type: "announcement",
      content:
        "🤖 OmniBot AI companion now features enhanced crisis detection and Baltimore resource integration! Available 24/7 for trauma-informed support.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      priority: "medium",
      icon: MessageCircle,
      color: "from-indigo-500 to-purple-500",
      encrypted: true,
    },
    {
      id: "9",
      type: "event",
      content:
        "📚 SATURDAY 2PM: Organizing 101 Workshop - Community Building Strategies (Virtual). Learn grassroots organizing skills for systemic change!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
      priority: "medium",
      icon: BookOpen,
      color: "from-teal-500 to-blue-500",
      location: "Virtual (Zoom)",
      encrypted: true,
    },
    {
      id: "10",
      type: "resource",
      content:
        "🎵 NEW AUDIO: 'Healing from Trauma' meditation added to Sound Healing library - 20 minutes of gentle, trauma-informed support with 432Hz frequencies.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      priority: "low",
      icon: Music,
      color: "from-violet-500 to-purple-500",
      encrypted: true,
    },
    {
      id: "11",
      type: "community",
      content:
        "🤝 Melly's Spot peer support circle growing daily! Join our community of mutual aid, care, and liberation. Anonymous participation always welcome.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
      priority: "medium",
      icon: Users,
      color: "from-rose-500 to-pink-500",
      encrypted: true,
    },
    {
      id: "12",
      type: "security",
      content:
        "⚡ QUANTUM CLOAK: New emergency privacy feature activated! One-click digital sanctuary protection for immediate safety needs.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      priority: "high",
      icon: Zap,
      color: "from-purple-600 to-indigo-600",
      encrypted: true,
    },
  ]

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % tickerItems.length)
      }, 8000) // Change every 8 seconds

      return () => clearInterval(interval)
    }
  }, [tickerItems.length, isPaused])

  const currentItem = tickerItems[currentIndex]
  const IconComponent = currentItem.icon

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500 text-white text-xs animate-pulse">URGENT</Badge>
      case "high":
        return <Badge className="bg-orange-500 text-white text-xs">HIGH</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
            MEDIUM
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="text-xs">
            INFO
          </Badge>
        )
      default:
        return null
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  if (!isVisible) return null

  return (
    <div
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-3 relative overflow-hidden cursor-pointer"
      onClick={() => setIsPaused(!isPaused)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Left side - Ticker content */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className={`w-8 h-8 bg-gradient-to-r ${currentItem.color} rounded-full flex items-center justify-center sacred-breathe`}
              >
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wide">
                {currentItem.type.replace("_", " ")}
              </span>
              {getPriorityBadge(currentItem.priority)}
            </div>

            <div className="flex-1 min-w-0 carousel-slide">
              <p className="text-sm md:text-base truncate md:whitespace-normal leading-relaxed">
                {currentItem.content}
              </p>

              <div className="flex items-center gap-4 text-xs text-white/80 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(currentItem.timestamp)}
                </span>

                {currentItem.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {currentItem.location}
                  </span>
                )}

                {currentItem.author && (
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {currentItem.author}
                  </span>
                )}

                {currentItem.encrypted && (
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Encrypted
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Ticker navigation dots */}
            <div className="hidden md:flex items-center gap-1">
              {tickerItems.slice(0, 8).map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex % 8 ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <div className="hidden sm:block text-xs text-white/80">
              {currentIndex + 1} / {tickerItems.length}
            </div>

            {/* Pause/Play indicator */}
            <div className="text-xs text-white/60">{isPaused ? "⏸️" : "▶️"}</div>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsVisible(false)
              }}
              className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close ticker"
            >
              <span className="text-sm">×</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className={`h-full bg-white transition-all ${isPaused ? "" : "duration-8000 ease-linear"}`}
            style={{
              width: `${((currentIndex + 1) / tickerItems.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Ticker
