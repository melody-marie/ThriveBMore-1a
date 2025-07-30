"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles, Shield, Users } from "lucide-react"

interface SacredSplashProps {
  onComplete: () => void
}

export function SacredSplash({ onComplete }: SacredSplashProps) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const phases = [
    {
      icon: Heart,
      text: "Sanctuary Initiated",
      subtext: "Connecting to the Underground Railroad of Trans Liberation",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      text: "Encryption Active",
      subtext: "Securing your digital sanctuary with end-to-end encryption",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      text: "Community Connected",
      subtext: "Linking you to peer support networks and healing resources",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Sparkles,
      text: "Liberation Stack Ready",
      subtext: "Welcome to your safe space for healing and empowerment",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev < phases.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 500)
          }, 1000)
          return prev
        }
      })
    }, 750)

    return () => clearInterval(timer)
  }, [onComplete, phases.length])

  if (!isVisible) return null

  const currentPhaseData = phases[currentPhase]
  const IconComponent = currentPhaseData.icon

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 z-50 flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-transparent blur-3xl floating"></div>
        <div
          className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-pink-500/20 to-transparent blur-3xl floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-56 h-56 rounded-full bg-gradient-to-r from-blue-500/20 to-transparent blur-3xl floating"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="text-center text-white z-10 max-w-2xl px-8">
        {/* Logo/Icon */}
        <div
          className={`w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r ${currentPhaseData.color} flex items-center justify-center mystical-glow`}
        >
          <IconComponent className="w-12 h-12 text-white" />
        </div>

        {/* Main Text */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 afro-futuristic-text text-white">{currentPhaseData.text}</h1>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-purple-100 mb-8 spiritual-pulse">{currentPhaseData.subtext}</p>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mb-8">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index <= currentPhase ? `bg-gradient-to-r ${currentPhaseData.color}` : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Ancestral Wisdom Quote */}
        <div className="text-center">
          <p className="text-lg italic text-purple-200 spiritual-pulse">
            "The ancestors whisper: 'You are exactly who you're meant to be.'"
          </p>
          <p className="text-sm text-purple-300 mt-2">- Aziza Okoro</p>
        </div>

        {/* Loading Animation */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-purple-200 text-sm">Built with love for the Black Trans community</p>
        <p className="text-purple-300 text-xs mt-1">End-to-end encrypted • Trauma-informed • Community-centered</p>
      </div>
    </div>
  )
}
