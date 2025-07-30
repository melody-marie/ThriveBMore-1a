"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, Sparkles } from "lucide-react"

interface TickerMessage {
  id: string
  text: string
  type: "support" | "safety" | "community" | "celebration"
  icon: React.ReactNode
}

const TICKER_MESSAGES: TickerMessage[] = [
  {
    id: "1",
    text: "You are loved, valued, and deserving of respect exactly as you are 💜",
    type: "support",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: "2",
    text: "Safe spaces available 24/7 - You are never alone in this journey",
    type: "safety",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "3",
    text: "Join our community support groups - Building connections that heal",
    type: "community",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "4",
    text: "Celebrating every step of your authentic journey - Your truth matters",
    type: "celebration",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "5",
    text: "Crisis support available - Text THRIVE to (443) 555-1015",
    type: "safety",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "6",
    text: "Trans liberation is collective liberation - We rise together",
    type: "community",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "7",
    text: "Your identity is sacred - Honor your truth with pride",
    type: "celebration",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "8",
    text: "Mental health resources available - Healing is a community effort",
    type: "support",
    icon: <Heart className="w-4 h-4" />,
  },
]

const getTypeStyles = (type: TickerMessage["type"]) => {
  switch (type) {
    case "support":
      return "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
    case "safety":
      return "bg-gradient-to-r from-red-500 to-orange-600 text-white"
    case "community":
      return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    case "celebration":
      return "bg-gradient-to-r from-yellow-500 to-amber-600 text-white"
    default:
      return "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
  }
}

export function Ticker() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const nextMessage = useCallback(() => {
    setCurrentMessageIndex((prev) => (prev + 1) % TICKER_MESSAGES.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextMessage, 5000) // Change message every 5 seconds
    return () => clearInterval(interval)
  }, [nextMessage])

  const currentMessage = TICKER_MESSAGES[currentMessageIndex]

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-purple-500/30">
      <div className="relative overflow-hidden py-2">
        <div className="ticker-scroll flex items-center gap-4 whitespace-nowrap">
          <Badge
            className={`${getTypeStyles(currentMessage.type)} px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-lg`}
          >
            {currentMessage.icon}
            {currentMessage.text}
          </Badge>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          aria-label="Close ticker"
        >
          ×
        </button>
      </div>
    </div>
  )
}
