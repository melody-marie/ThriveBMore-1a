"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Users,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Headphones,
  Play,
  ExternalLink,
  AlertTriangle,
  Zap,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  MoreHorizontal,
  MouseIcon as Mu,
} from "lucide-react"
import { LittleSpace } from "@/components/little-space"
import { OmniBotChat } from "@/components/omni-bot-chat"
import { Ticker } from "@/components/ticker"

export default function HomePage() {
  const [showLittleSpace, setShowLittleSpace] = useState(false)
  const [showOmniBot, setShowOmniBot] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support",
      type: "crisis",
    },
    {
      name: "Trans Lifeline",
      number: "(877) 565-8860",
      description: "Trans peer support hotline",
      type: "trans",
    },
    {
      name: "LGBT National Hotline",
      number: "(1-888-843-4564)",
      description: "Confidential support for LGBTQ+ community",
      type: "lgbtq",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 text-based crisis support",
      type: "text",
    },
  ]

  const baltimoreResources = [
    {
      name: "Chase Brexton Health Care",
      address: "1001 Cathedral St, Baltimore, MD 21201",
      phone: "(410) 837-2050",
      services: ["LGBTQ+ affirming healthcare", "Mental health", "HIV/AIDS care"],
      website: "https://chasebrexton.org",
    },
    {
      name: "Baltimore LGBT Center",
      address: "2530 N Charles St, Baltimore, MD 21218",
      phone: "(410) 837-5445",
      services: ["Community programs", "Support groups", "Resources"],
      website: "https://baltimoreequality.org",
    },
    {
      name: "PFLAG Baltimore",
      address: "Various locations",
      phone: "(443) 286-2469",
      services: ["Family support", "Education", "Advocacy"],
      website: "https://pflagbaltimore.org",
    },
  ]

  const communitySpaces = [
    {
      name: "Little Space",
      description: "A safe, nurturing environment for age regression and inner child healing",
      icon: Heart,
      color: "from-pink-500 to-purple-500",
      action: () => setShowLittleSpace(true),
    },
    {
      name: "Melly's Spot",
      description: "Peer support and community connection hub",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      action: () => {},
    },
    {
      name: "Organizing 101",
      description: "Learn community organizing and advocacy skills",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      action: () => {},
    },
    {
      name: "Wellness Corner",
      description: "Mental health resources and self-care tools",
      icon: Sparkles,
      color: "from-yellow-500 to-orange-500",
      action: () => {},
    },
  ]

  const audioLibrary = [
    {
      title: "Guided Meditation for Anxiety",
      duration: "15:30",
      category: "Meditation",
      plays: 1247,
    },
    {
      title: "Affirmations for Trans Youth",
      duration: "8:45",
      category: "Affirmations",
      plays: 892,
    },
    {
      title: "Sleep Stories: Enchanted Forest",
      duration: "22:15",
      category: "Sleep",
      plays: 2156,
    },
    {
      title: "Breathing Exercises for Panic",
      duration: "12:00",
      category: "Breathing",
      plays: 1534,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ThriveBMore
                </h1>
                <p className="text-sm text-gray-600">Liberation Stack</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">{currentTime.toLocaleTimeString()}</div>
              <Button
                onClick={() => setShowOmniBot(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                OmniBot
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <Ticker />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Your Liberation Journey Starts Here
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A comprehensive platform for LGBTQ+ community support, crisis intervention, and collective liberation in
              Baltimore and beyond.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => setShowOmniBot(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with OmniBot
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <Phone className="w-5 h-5 mr-2" />
              Crisis Support
            </Button>
          </div>
        </section>

        {/* Crisis Resources */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-2xl font-bold text-red-800">Crisis Resources</h3>
              <p className="text-red-700">Immediate help is available 24/7</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="border-red-200 bg-white/80">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-800 mb-1">{resource.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-red-600" />
                        <span className="font-mono text-red-700">{resource.number}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-red-300 text-red-700">
                      {resource.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Spaces */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Community Spaces</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Safe, supportive environments designed for healing, growth, and connection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communitySpaces.map((space, index) => {
              const IconComponent = space.icon
              return (
                <Card
                  key={index}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-purple-200 bg-white/80"
                  onClick={space.action}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${space.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{space.name}</h4>
                    <p className="text-sm text-gray-600">{space.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Audio Library */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Healing Audio Library</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Guided meditations, affirmations, and sleep stories for your wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {audioLibrary.map((audio, index) => (
              <Card key={index} className="border-blue-200 bg-white/80">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{audio.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{audio.duration}</span>
                        <Badge variant="outline" className="text-xs">
                          {audio.category}
                        </Badge>
                        <span>{audio.plays} plays</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Baltimore Resources */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Baltimore LGBTQ+ Resources</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Local organizations and services supporting our community</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {baltimoreResources.map((resource, index) => (
              <Card key={index} className="border-green-200 bg-white/80">
                <CardHeader>
                  <CardTitle className="text-green-800">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{resource.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{resource.phone}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2">Services:</h5>
                    <div className="flex flex-wrap gap-1">
                      {resource.services.map((service, serviceIndex) => (
                        <Badge key={serviceIndex} variant="outline" className="text-xs border-green-300 text-green-700">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Overview */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Platform Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for community support, crisis intervention, and collective liberation
            </p>
          </div>

          <Tabs defaultValue="support" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/50">
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="wellness">Wellness</TabsTrigger>
              <TabsTrigger value="organizing">Organizing</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="support" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                      OmniBot AI Companion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      24/7 trauma-informed AI support with crisis detection and resource recommendations.
                    </p>
                    <Button
                      onClick={() => setShowOmniBot(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      Start Chatting
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-red-600" />
                      Crisis Intervention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Immediate access to crisis hotlines and emergency resources.</p>
                    <Button variant="outline" className="border-red-300 text-red-700 bg-transparent">
                      Get Help Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="wellness" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-600" />
                      Little Space
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Safe space for age regression and inner child healing with activities and comfort items.
                    </p>
                    <Button
                      onClick={() => setShowLittleSpace(true)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500"
                    >
                      Enter Little Space
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-blue-600" />
                      Audio Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Guided meditations, affirmations, and sleep stories for mental wellness.
                    </p>
                    <Button variant="outline" className="border-blue-300 text-blue-700 bg-transparent">
                      Browse Library
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="organizing" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      Organizing 101
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Learn community organizing skills and advocacy strategies for systemic change.
                    </p>
                    <Button variant="outline" className="border-yellow-300 text-yellow-700 bg-transparent">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      Action Networks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Connect with local organizers and participate in community actions.
                    </p>
                    <Button variant="outline" className="border-green-300 text-green-700 bg-transparent">
                      Join Network
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-600" />
                      Melly's Spot
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Peer support hub for community connection and mutual aid coordination.
                    </p>
                    <Button variant="outline" className="border-cyan-300 text-cyan-700 bg-transparent">
                      Visit Melly's Spot
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      Events & Meetups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Community events, support groups, and social gatherings in Baltimore.
                    </p>
                    <Button variant="outline" className="border-indigo-300 text-indigo-700 bg-transparent">
                      View Events
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ThriveBMore</span>
              </div>
              <p className="text-gray-400 text-sm">
                Liberation Stack for LGBTQ+ community support and collective action.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Crisis Resources</li>
                <li>OmniBot Chat</li>
                <li>Community Spaces</li>
                <li>Audio Library</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Baltimore Resources</li>
                <li>Events & Meetups</li>
                <li>Organizing 101</li>
                <li>Action Networks</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2024 ThriveBMore Liberation Stack. Built with love for our community.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LittleSpace isVisible={showLittleSpace} onClose={() => setShowLittleSpace(false)} />
      <OmniBotChat isVisible={showOmniBot} onClose={() => setShowOmniBot(false)} />
    </div>
  )
}
