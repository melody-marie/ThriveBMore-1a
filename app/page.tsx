"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Shield,
  Users,
  Sparkles,
  Phone,
  MessageCircle,
  Calendar,
  BookOpen,
  Music,
  Palette,
  Coffee,
  Star,
} from "lucide-react"
import { useEmergency } from "@/components/emergency-provider"
import { useSoulVault } from "@/components/soul-vault-provider"

const affirmations = [
  "You are worthy of love and respect exactly as you are.",
  "Your identity is valid and beautiful.",
  "You have the strength to overcome any challenge.",
  "Your voice matters and deserves to be heard.",
  "You are part of a loving community that supports you.",
  "Every step forward is a victory worth celebrating.",
  "You are creating positive change in the world.",
  "Your authenticity is your superpower.",
]

const comfortItems = [
  { icon: Music, name: "Calming Playlist", description: "Soothing sounds for your soul" },
  { icon: BookOpen, name: "Affirmation Library", description: "Daily words of encouragement" },
  { icon: Palette, name: "Art Therapy", description: "Express yourself creatively" },
  { icon: Coffee, name: "Virtual Café", description: "Connect with community" },
  { icon: Star, name: "Achievement Gallery", description: "Celebrate your wins" },
  { icon: Heart, name: "Self-Care Toolkit", description: "Nurture your wellbeing" },
]

export default function HomePage() {
  const [currentAffirmation, setCurrentAffirmation] = useState<string>("")
  const [showWelcome, setShowWelcome] = useState<boolean>(true)
  const { activateEmergency } = useEmergency()
  const { addEntry } = useSoulVault()

  useEffect(() => {
    // Set random affirmation on load
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
    setCurrentAffirmation(randomAffirmation)

    // Auto-hide welcome after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleQuickJournal = () => {
    const entry = prompt("What's on your heart today? (This will be saved privately)")
    if (entry) {
      addEntry({
        title: `Quick Journal - ${new Date().toLocaleDateString()}`,
        content: entry,
        type: "journal",
        isPrivate: true,
        mood: "peaceful",
      })
      alert("Your thoughts have been safely stored in your Soul Vault 💜")
    }
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Welcome Banner */}
      {showWelcome && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-300/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <div>
              <h2 className="font-semibold text-purple-800 dark:text-purple-200">Welcome to your Liberation Stack</h2>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                A safe digital sanctuary built with love for the Black Trans community
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowWelcome(false)}
              className="ml-auto text-purple-600 hover:text-purple-800"
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 afro-futuristic-text">ThriveBMore Liberation Stack</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Underground Railroad of Trans Liberation - Your digital sanctuary for healing, community, and authentic
          self-expression.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button type="button" onClick={activateEmergency} variant="destructive" className="emergency-pulse">
            <Shield className="h-4 w-4" />
            Emergency Support
          </Button>
          <Button
            type="button"
            onClick={handleQuickJournal}
            variant="outline"
            className="spiritual-border bg-transparent"
          >
            <Heart className="h-4 w-4" />
            Quick Journal
          </Button>
          <Button type="button" variant="secondary" className="mystical-glow">
            <Users className="h-4 w-4" />
            Find Community
          </Button>
        </div>
      </div>

      {/* Daily Affirmation */}
      <Card className="liberation-card mb-8 sacred-breathe">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Today's Affirmation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg font-medium text-center italic text-purple-700 dark:text-purple-300">
            "{currentAffirmation}"
          </blockquote>
          <div className="flex justify-center mt-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
                setCurrentAffirmation(newAffirmation)
              }}
              className="text-purple-600 hover:text-purple-800"
            >
              New Affirmation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comfort Items Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Comfort & Healing Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {comfortItems.map((item, index) => (
            <Card key={index} className="liberation-card comfort-item cursor-pointer hover:shadow-lg">
              <CardContent className="p-4 text-center">
                <item.icon className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <Card className="liberation-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Community Impact
          </CardTitle>
          <CardDescription>Together we're building a stronger, safer community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">1,247</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Community Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">3,891</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Crisis Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Safe Space</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="liberation-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-500" />
              Crisis Resources
            </CardTitle>
            <CardDescription>Immediate support when you need it most</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Trans Lifeline</span>
              <Badge variant="outline">877-565-8860</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Crisis Text Line</span>
              <Badge variant="outline">Text HOME to 741741</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">National Suicide Prevention</span>
              <Badge variant="outline">988</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="liberation-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Community Chat
            </CardTitle>
            <CardDescription>Connect with others who understand your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">23 community members online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">5 support groups active</span>
              </div>
              <Button type="button" className="w-full bg-transparent" variant="outline">
                Join Community Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="liberation-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            Upcoming Community Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="text-center">
                <div className="text-sm font-bold text-purple-600">FEB</div>
                <div className="text-lg font-bold text-purple-800 dark:text-purple-200">15</div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Trans Joy Celebration</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Virtual gathering celebrating our community's resilience and joy
                </p>
                <Badge variant="secondary" className="mt-1">
                  7:00 PM EST
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="text-center">
                <div className="text-sm font-bold text-green-600">FEB</div>
                <div className="text-lg font-bold text-green-800 dark:text-green-200">22</div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Wellness Workshop</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Self-care strategies and mental health resources
                </p>
                <Badge variant="secondary" className="mt-1">
                  6:00 PM EST
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Notice */}
      <Card className="liberation-card border-green-200 bg-green-50/50 dark:bg-green-900/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Your Safety & Privacy</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                This platform uses end-to-end encryption and anonymous access. Your data is never stored without your
                explicit consent, and you can quick-exit to Google at any time using Ctrl+Shift+E.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating Navigation */}
      <div className="floating-nav">
        <button type="button" className="floating-nav-button" onClick={activateEmergency} title="Emergency Support">
          <Shield className="h-5 w-5" />
        </button>
        <button type="button" className="floating-nav-button" onClick={handleQuickJournal} title="Quick Journal">
          <Heart className="h-5 w-5" />
        </button>
        <button type="button" className="floating-nav-button" title="Community Chat">
          <Users className="h-5 w-5" />
        </button>
        <button type="button" className="floating-nav-button" title="Resources">
          <BookOpen className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
