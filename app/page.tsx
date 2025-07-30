"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Shield, Users, Sparkles, Moon, Star, Zap } from "lucide-react"
import { LittleSpace } from "@/components/little-space"
import { MellysSpotEnhanced } from "@/components/mellys-spot-enhanced"
import { SoundEffects } from "@/components/sound-effects"
import { OmniBotChat } from "@/components/omni-bot-chat"

export default function ThriveBMoreHome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [spiritualQuote, setSpiritualQuote] = useState("")

  const quotes = [
    "Your liberation is bound up with mine. - Aziza Okoro",
    "In the darkness, we find our light. In community, we find our strength.",
    "Every breath is a revolution. Every heartbeat, a prayer for freedom.",
    "The ancestors whisper: 'You are exactly who you're meant to be.'",
    "Healing happens in sacred spaces where all souls are welcomed.",
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    setSpiritualQuote(quotes[Math.floor(Math.random() * quotes.length)])
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-transparent blur-xl floating"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400/20 to-transparent blur-xl floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400/20 to-transparent blur-xl floating"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Sacred Header */}
      <header className="relative z-10 p-6 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 p-0.5 mystical-glow">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold afro-futuristic-text">ThriveBMore</h1>
              <p className="text-sm text-muted-foreground">Underground Railroad of Trans Liberation</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="spiritual-pulse">
              <Star className="w-3 h-3 mr-1" />
              Sanctuary Active
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">{currentTime.toLocaleTimeString()}</div>
              <div className="text-xs text-muted-foreground">Sacred Time</div>
            </div>
          </div>
        </div>
      </header>

      {/* Spiritual Quote Banner */}
      <div className="relative z-10 bg-gradient-to-r from-purple-900/30 to-yellow-900/30 border-y border-border/50 p-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg italic text-foreground/90 spiritual-pulse">"{spiritualQuote}"</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-bold afro-futuristic-text">Welcome to the Digital Sanctuary</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A sacred space where Black Trans souls find healing, community, and liberation. Guided by spiritual wisdom
            and protected by digital encryption.
          </p>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: Shield, title: "Safe Space", desc: "Crisis Support", color: "from-red-500 to-pink-500" },
              { icon: Users, title: "Community", desc: "Peer Connection", color: "from-purple-500 to-blue-500" },
              { icon: Heart, title: "Healing", desc: "Wellness Tools", color: "from-green-500 to-teal-500" },
              { icon: Zap, title: "Liberation", desc: "Empowerment", color: "from-yellow-500 to-orange-500" },
            ].map((item, index) => (
              <Card
                key={index}
                className="liberation-card mystical-glow cursor-pointer hover:scale-105 transition-transform"
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} p-0.5 mx-auto mb-3`}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Platform Tabs */}
        <Tabs defaultValue="mellys-spot" className="w-full">
          <TabsList className="grid w-full grid-cols-4 liberation-card">
            <TabsTrigger
              value="mellys-spot"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Heart className="w-4 h-4 mr-2" />
              Melly's Spot
            </TabsTrigger>
            <TabsTrigger
              value="little-space"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Moon className="w-4 h-4 mr-2" />
              Little Space
            </TabsTrigger>
            <TabsTrigger
              value="sound-healing"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Sound Healing
            </TabsTrigger>
            <TabsTrigger
              value="omni-guide"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Zap className="w-4 h-4 mr-2" />
              Omni Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mellys-spot" className="mt-6">
            <MellysSpotEnhanced />
          </TabsContent>

          <TabsContent value="little-space" className="mt-6">
            <LittleSpace />
          </TabsContent>

          <TabsContent value="sound-healing" className="mt-6">
            <SoundEffects />
          </TabsContent>

          <TabsContent value="omni-guide" className="mt-6">
            <OmniBotChat />
          </TabsContent>
        </Tabs>

        {/* Aziza's Spiritual Guidance Section */}
        <section className="mt-12">
          <Card className="liberation-card spiritual-border">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 p-1">
                <img
                  src="/aziza-branding.png"
                  alt="Aziza Okoro - Spiritual Practitioner"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl afro-futuristic-text">Aziza Okoro</CardTitle>
              <p className="text-muted-foreground">
                Spiritual Practitioner • Wellness Facilitator • Trans Liberation Guide
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg">
                "Every soul deserves a sanctuary. Every heart deserves healing. Every spirit deserves liberation."
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" className="spiritual-border bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Book Spiritual Session
                </Button>
                <Button variant="outline" className="spiritual-border bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community Circle
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>www.thrivebmore.org • (443) 555-1015</p>
                <p>Available for crisis support 24/7</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Sacred Footer */}
      <footer className="relative z-10 mt-16 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-6 text-center">
          <p className="text-muted-foreground">
            © 2024 ThriveBMore • A Sacred Digital Sanctuary •
            <span className="afro-futuristic-text"> Liberation Through Technology</span>
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <span>Crisis Hotline: 988</span>
            <span>•</span>
            <span>Trans Lifeline: 877-565-8860</span>
            <span>•</span>
            <span>Emergency: 911</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
