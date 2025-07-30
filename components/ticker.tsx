"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Lock, AlertTriangle, Heart, Users, Sparkles } from "lucide-react"

export function Ticker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const tickerItems = [
    {
      id: 1,
      message: "🏳️‍⚧️ Welcome to ThriveBMore Liberation Stack - Your digital sanctuary is now active",
      priority: "high",
      encrypted: true,
      category: "welcome",
      icon: Heart,
    },
    {
      id: 2,
      message: "🚨 Crisis Support Available 24/7 - Trans Lifeline: 877-565-8860 | National: 988",
      priority: "urgent",
      encrypted: true,
      category: "crisis",
      icon: AlertTriangle,
    },
    {
      id: 3,
      message: "✨ New: OmniBot AI Companion now includes trauma-informed crisis detection",
      priority: "high",
      encrypted: true,
      category: "feature",
      icon: Sparkles,
    },
    {
      id: 4,
      message: "🎵 Sound Healing Library Updated: 432Hz frequencies, binaural beats, and nature sounds",
      priority: "medium",
      encrypted: false,
      category: "wellness",
      icon: Heart,
    },
    {
      id: 5,
      message: "🤝 Peer Connector: Anonymous matching for community support now available",
      priority: "high",
      encrypted: true,
      category: "community",
      icon: Users,
    },
    {
      id: 6,
      message: "🔒 All communications end-to-end encrypted - Your privacy is sacred",
      priority: "medium",
      encrypted: true,
      category: "security",
      icon: Lock,
    },
    {
      id: 7,
      message: "📍 Baltimore Resources: Chase Brexton, Pride Center MD, PFLAG - Safe spaces verified",
      priority: "medium",
      encrypted: false,
      category: "resources",
      icon: Heart,
    },
    {
      id: 8,
      message: "🌟 Little Space: Safe environment for age regression and inner child healing",
      priority: "medium",
      encrypted: true,
      category: "wellness",
      icon: Heart,
    },
    {
      id: 9,
      message: "💜 Melly's Spot: Community hub for peer support and mutual aid coordination",
      priority: "medium",
      encrypted: true,
      category: "community",
      icon: Users,
    },
    {
      id: 10,
      message: "⚡ Emergency Signal: One-tap encrypted distress alert system - Stay safe",
      priority: "urgent",
      encrypted: true,
      category: "emergency",
      icon: AlertTriangle,
    },
    {
      id: 11,
      message: "🏛️ SoulVault: Encrypted personal sanctuary for identity documents and memories",
      priority: "high",
      encrypted: true,
      category: "security",
      icon: Lock,
    },
    {
      id: 12,
      message: "📧 LiberationMail: Secure trauma-informed communications platform",
      priority: "medium",
      encrypted: true,
      category: "communication",
      icon: Sparkles,
    },
    {
      id: 13,
      message: "🌈 Aziza Okoro available for spiritual sessions - Healing in the quantum field",
      priority: "low",
      encrypted: false,
      category: "spiritual",
      icon: Heart,
    },
    {
      id: 14,
      message: "🔮 Underground Railroad continues in digital form - Liberation technology for all",
      priority: "low",
      encrypted: false,
      category: "mission",
      icon: Sparkles,
    },
  ]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((current) => (current + 1) % tickerItems.length)
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, tickerItems.length])

  const currentItem = tickerItems[currentIndex]
  const IconComponent = currentItem.icon

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-blue-500 text-white"
      case "low":
        return "bg-gray-500 text-white"
      default:
        return "bg-purple-500 text-white"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "crisis":
        return "border-red-300 text-red-700"
      case "emergency":
        return "border-red-400 text-red-800"
      case "security":
        return "border-green-300 text-green-700"
      case "wellness":
        return "border-pink-300 text-pink-700"
      case "community":
        return "border-blue-300 text-blue-700"
      case "spiritual":
        return "border-purple-300 text-purple-700"
      default:
        return "border-gray-300 text-gray-700"
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-y border-purple-200/50 py-2 relative overflow-hidden sigil-pattern">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-4">
          {/* Ticker Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mystical-glow">
              <IconComponent className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-purple-800 hidden sm:block">Liberation Feed</span>
          </div>

          {/* Progress Bar */}
          <div className="w-16 h-1 bg-purple-200 rounded-full overflow-hidden flex-shrink-0">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Ticker Content */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-3 carousel-slide">
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(currentItem.priority)} variant="secondary">
                  {currentItem.priority.toUpperCase()}
                </Badge>
                <Badge variant="outline" className={getCategoryColor(currentItem.category)}>
                  {currentItem.category}
                </Badge>
                {currentItem.encrypted && (
                  <Badge className="encrypted-badge">
                    <Lock className="w-2 h-2 mr-1" />
                    E2E
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">{currentItem.message}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 p-0 hover:bg-purple-100"
              title={isPlaying ? "Pause ticker" : "Play ticker"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </Button>

            <div className="text-xs text-gray-500 hidden sm:block">
              {currentIndex + 1}/{tickerItems.length}
            </div>
          </div>
        </div>
      </div>

      {/* Aziza Sigil Watermark */}
      <div
        className="absolute top-0 right-0 w-16 h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('/aziza-sigil-branding.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
        }}
      ></div>
    </div>
  )
}
