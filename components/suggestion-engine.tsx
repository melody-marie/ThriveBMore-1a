"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Lightbulb, Clock, Heart, Brain, Users } from "lucide-react"

interface Suggestion {
  id: string
  title: string
  description: string
  reasoning: string
  priority: number
  category: "wellness" | "community" | "activity" | "resource"
  timeRelevant?: boolean
  icon: React.ComponentType<{ className?: string }>
  action?: () => void
}

interface SuggestionEngineProps {
  currentSection: string
  userMood?: string
  timeOfDay?: "morning" | "afternoon" | "evening" | "night"
}

export default function SuggestionEngine({ currentSection, userMood = "neutral", timeOfDay }: SuggestionEngineProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set())
  const [currentTime, setCurrentTime] = useState<"morning" | "afternoon" | "evening" | "night">("morning")

  useEffect(() => {
    // Determine time of day
    const hour = new Date().getHours()
    let timeOfDay: "morning" | "afternoon" | "evening" | "night"

    if (hour >= 5 && hour < 12) timeOfDay = "morning"
    else if (hour >= 12 && hour < 17) timeOfDay = "afternoon"
    else if (hour >= 17 && hour < 22) timeOfDay = "evening"
    else timeOfDay = "night"

    setCurrentTime(timeOfDay)
  }, [])

  useEffect(() => {
    generateSuggestions()
  }, [currentSection, userMood, currentTime])

  const generateSuggestions = () => {
    const allSuggestions: Suggestion[] = [
      // Time-based suggestions
      {
        id: "morning-affirmations",
        title: "Start with Morning Affirmations",
        description: "Begin your day with empowering self-love statements",
        reasoning: "Morning affirmations set a positive tone for the entire day and boost self-confidence",
        priority: currentTime === "morning" ? 10 : 3,
        category: "wellness",
        timeRelevant: true,
        icon: Heart,
        action: () => console.log("Navigate to morning affirmations"),
      },
      {
        id: "evening-reflection",
        title: "Evening Gratitude Practice",
        description: "Reflect on today's blessings and growth moments",
        reasoning: "Evening reflection helps process the day and cultivate gratitude before rest",
        priority: currentTime === "evening" ? 10 : 2,
        category: "wellness",
        timeRelevant: true,
        icon: Brain,
      },
      {
        id: "night-wind-down",
        title: "Gentle Sleep Preparation",
        description: "Soothing sounds and meditation for peaceful rest",
        reasoning: "Quality sleep is essential for mental health and healing",
        priority: currentTime === "night" ? 10 : 1,
        category: "wellness",
        timeRelevant: true,
        icon: Clock,
      },

      // Section-based suggestions
      {
        id: "explore-mellys-spot",
        title: "Visit Melly's Spot",
        description: "Connect with the little space community and AI companions",
        reasoning: "Community connection provides support and reduces isolation",
        priority: currentSection === "home" ? 8 : 5,
        category: "community",
        icon: Users,
        action: () => console.log("Open Melly's Spot"),
      },
      {
        id: "sound-healing-session",
        title: "Try Sound Healing",
        description: "Therapeutic frequencies for stress relief and balance",
        reasoning: "Sound therapy can reduce anxiety and promote deep relaxation",
        priority: currentSection === "wellness" ? 9 : 4,
        category: "wellness",
        icon: Brain,
      },
      {
        id: "mood-check-in",
        title: "Daily Mood Check-in",
        description: "Track your emotional state and get personalized support",
        reasoning: "Regular mood tracking helps identify patterns and triggers",
        priority: 7,
        category: "wellness",
        icon: Heart,
      },

      // Mood-based suggestions
      {
        id: "anxiety-relief",
        title: "Anxiety Relief Breathing",
        description: "Guided breathing exercises for immediate calm",
        reasoning: "Breathing techniques activate the parasympathetic nervous system",
        priority: userMood === "anxious" ? 10 : 3,
        category: "wellness",
        icon: Brain,
      },
      {
        id: "community-support",
        title: "Reach Out for Support",
        description: "Connect with community members who understand your journey",
        reasoning: "Peer support is proven to improve mental health outcomes",
        priority: userMood === "struggling" ? 10 : 4,
        category: "community",
        icon: Users,
      },
      {
        id: "celebration-space",
        title: "Share Your Joy",
        description: "Celebrate your wins with the community",
        reasoning: "Sharing positive moments amplifies joy and inspires others",
        priority: userMood === "joyful" ? 9 : 2,
        category: "community",
        icon: Heart,
      },

      // General wellness suggestions
      {
        id: "identity-affirmation",
        title: "Identity Affirmation Session",
        description: "Guided meditation celebrating your authentic self",
        reasoning: "Regular identity affirmation strengthens self-acceptance and confidence",
        priority: 6,
        category: "wellness",
        icon: Heart,
      },
      {
        id: "trauma-informed-healing",
        title: "Gentle Trauma Healing",
        description: "Safe, trauma-informed healing practices",
        reasoning: "Trauma-informed approaches honor your pace and safety",
        priority: 5,
        category: "wellness",
        icon: Brain,
      },
      {
        id: "creative-expression",
        title: "Creative Expression Space",
        description: "Art, music, and creative healing activities",
        reasoning: "Creative expression provides healthy emotional outlets",
        priority: 4,
        category: "activity",
        icon: Heart,
      },
    ]

    // Filter out dismissed suggestions and sort by priority
    const activeSuggestions = allSuggestions
      .filter((suggestion) => !dismissedSuggestions.has(suggestion.id))
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 3) // Show top 3 suggestions

    setSuggestions(activeSuggestions)
  }

  const dismissSuggestion = (suggestionId: string) => {
    setDismissedSuggestions((prev) => new Set([...prev, suggestionId]))
  }

  const getTimeIcon = () => {
    switch (currentTime) {
      case "morning":
        return "🌅"
      case "afternoon":
        return "☀️"
      case "evening":
        return "🌆"
      case "night":
        return "🌙"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wellness":
        return "from-green-500 to-emerald-500"
      case "community":
        return "from-blue-500 to-purple-500"
      case "activity":
        return "from-pink-500 to-rose-500"
      case "resource":
        return "from-yellow-500 to-orange-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  if (suggestions.length === 0) return null

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-amber-800">Personalized Suggestions</h3>
          <span className="text-lg">{getTimeIcon()}</span>
        </div>

        <div className="space-y-3">
          {suggestions.map((suggestion) => {
            const IconComponent = suggestion.icon

            return (
              <div
                key={suggestion.id}
                className="flex items-start gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200 hover:shadow-sm transition-all"
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(suggestion.category)} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-gray-900 text-sm">{suggestion.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissSuggestion(suggestion.id)}
                      className="w-6 h-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {suggestion.category}
                      </Badge>
                      {suggestion.timeRelevant && (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Time-sensitive
                        </Badge>
                      )}
                    </div>

                    {suggestion.action && (
                      <Button
                        size="sm"
                        onClick={suggestion.action}
                        className="text-xs h-6 px-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                      >
                        Try Now
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-2 italic">💡 {suggestion.reasoning}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-amber-700">Suggestions adapt to your mood, time of day, and current activity ✨</p>
        </div>
      </CardContent>
    </Card>
  )
}
