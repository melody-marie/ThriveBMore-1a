"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, Sparkles, Phone, Globe, Calendar } from "lucide-react"

interface TickerMessage {
  id: string
  text: string
  type: "crisis" | "community" | "spiritual" | "announcement" | "contact"
  icon: React.ReactNode
  priority: "high" | "medium" | "low"
  color: string
}

export function Ticker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const messages: TickerMessage[] = [
    {
      id: "crisis-support",
      text: "🚨 Crisis Support Available 24/7 - You are not alone. Aziza Okoro: (443) 555-1015",
      type: "crisis",
      icon: <Heart className="w-4 h-4" />,
      priority: "high",
      color: "from-red-500 to-pink-500",
    },
    {
      id: "community-gathering",
      text: "🏳️‍⚧️ Weekly Community Healing Circle - Thursdays 7PM EST - Safe space for all",
      type: "community",
      icon: <Users className="w-4 h-4" />,
      priority: "medium",
      color: "from-purple-500 to-blue-500",
    },
    {
      id: "spiritual-sessions",
      text: "🔮 Spiritual Guidance & Wellness Sessions Available - Contact: (443) 555-1015",
      type: "spiritual",
      icon: <Sparkles className="w-4 h-4" />,
      priority: "medium",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "platform-security",
      text: "🛡️ Your data is protected with end-to-end encryption - Privacy guaranteed",
      type: "announcement",
      icon: <Shield className="w-4 h-4" />,
      priority: "low",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "website-info",
      text: "🌐 Visit www.thrivebmore.org for more resources and community support",
      type: "announcement",
      icon: <Globe className="w-4 h-4" />,
      priority: "low",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "direct-support",
      text: "📞 Direct Support Line: (443) 555-1015 - Aziza Okoro, Spiritual Practitioner & Wellness Facilitator",
      type: "contact",
      icon: <Phone className="w-4 h-4" />,
      priority: "high",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "liberation-reminder",
      text: "✊🏾 Remember: You are exactly who you're meant to be - The ancestors celebrate your truth",
      type: "spiritual",
      icon: <Sparkles className="w-4 h-4" />,
      priority: "medium",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "upcoming-events",
      text: "📅 Upcoming: Trans Liberation Workshop - Register at www.thrivebmore.org",
      type: "announcement",
      icon: <Calendar className="w-4 h-4" />,
      priority: "medium",
      color: "from-teal-500 to-green-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length)
    }, 5000) // Change message every 5 seconds

    return () => clearInterval(interval)
  }, [messages.length])

  const currentMessage = messages[currentIndex]

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-500/30">
      <div className="relative overflow-hidden">
        <div className="ticker-scroll py-2 px-4">
          <div className="flex items-center justify-center gap-3 text-white">
            <Badge
              className={`bg-gradient-to-r ${currentMessage.color} text-white border-none px-3 py-1 flex items-center gap-2`}
            >
              {currentMessage.icon}
              <span className="font-semibold uppercase text-xs tracking-wide">{currentMessage.type}</span>
            </Badge>

            <div className="text-sm md:text-base font-medium text-center flex-1">{currentMessage.text}</div>

            <button
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white transition-colors ml-4"
              aria-label="Close ticker"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className={`h-full bg-gradient-to-r ${currentMessage.color} transition-all duration-5000 ease-linear`}
            style={{
              width: `${((currentIndex + 1) / messages.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Floating dots indicator */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-1">
        {messages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
            aria-label={`Go to message ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
