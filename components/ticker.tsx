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
} from "lucide-react"

interface TickerItem {
  id: string
  type: "announcement" | "event" | "crisis" | "celebration" | "resource" | "community"
  content: string
  timestamp: Date
  priority: "low" | "medium" | "high" | "urgent"
  icon: any
  color: string
  link?: string
  location?: string
  author?: string
}

export function Ticker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const tickerItems: TickerItem[] = [
    {
      id: "1",
      type: "announcement",
      content:
        "Welcome to ThriveBMore Liberation Stack! Your safe space for community support and collective action. 💜",
      timestamp: new Date(),
      priority: "high",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
      author: "ThriveBMore Team",
    },
    {
      id: "2",
      type: "crisis",
      content:
        "Crisis support available 24/7: National Suicide Prevention Lifeline 988 | Trans Lifeline (877) 565-8860",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      priority: "urgent",
      icon: Phone,
      color: "from-red-500 to-red-600",
    },
    {
      id: "3",
      type: "event",
      content: "LGBTQ+ Support Group meets every Tuesday 7PM at Baltimore LGBT Center - All welcome! 🏳️‍🌈",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      priority: "medium",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      location: "Baltimore LGBT Center",
    },
    {
      id: "4",
      type: "community",
      content: "New Little Space activities added! Check out our digital coloring pages and comfort stories. 🧸",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      priority: "medium",
      icon: Sparkles,
      color: "from-pink-500 to-purple-500",
    },
    {
      id: "5",
      type: "resource",
      content: "Chase Brexton Health Care offers LGBTQ+ affirming healthcare - Now accepting new patients! 🏥",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      priority: "medium",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "6",
      type: "celebration",
      content: "Celebrating 500+ community members! Thank you for making this space special. ✨",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      priority: "low",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "7",
      type: "announcement",
      content: "OmniBot AI companion now features enhanced crisis detection and Baltimore resource integration! 🤖",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      priority: "medium",
      icon: MessageCircle,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "8",
      type: "event",
      content: "Organizing 101 Workshop: Community Building Strategies - Saturday 2PM (Virtual) 📚",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
      priority: "medium",
      icon: BookOpen,
      color: "from-teal-500 to-blue-500",
    },
    {
      id: "9",
      type: "resource",
      content: "New guided meditation added to Audio Library: 'Healing from Trauma' - 20 minutes of gentle support 🎵",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      priority: "low",
      icon: Music,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "10",
      type: "community",
      content: "Melly's Spot peer support circle growing! Join our community of mutual aid and care. 🤝",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
      priority: "medium",
      icon: Users,
      color: "from-rose-500 to-pink-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length)
    }, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [tickerItems.length])

  const currentItem = tickerItems[currentIndex]
  const IconComponent = currentItem.icon

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500 text-white text-xs">URGENT</Badge>
      case "high":
        return <Badge className="bg-orange-500 text-white text-xs">HIGH</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="text-xs">
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
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-3 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Left side - Ticker content */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className={`w-8 h-8 bg-gradient-to-r ${currentItem.color} rounded-full flex items-center justify-center`}
              >
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wide">
                {currentItem.type.replace("_", " ")}
              </span>
              {getPriorityBadge(currentItem.priority)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base truncate md:whitespace-normal">{currentItem.content}</p>

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
              </div>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Ticker navigation dots */}
            <div className="hidden md:flex items-center gap-1">
              {tickerItems.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex % 5 ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <div className="hidden sm:block text-xs text-white/80">
              {currentIndex + 1} / {tickerItems.length}
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
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
            className="h-full bg-white transition-all duration-8000 ease-linear"
            style={{
              width: `${((currentIndex + 1) / tickerItems.length) * 100}%`,
              animation: "ticker-progress 8s linear infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default Ticker
