"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Users,
  Shield,
  Sparkles,
  Music,
  Brain,
  Star,
  Play,
  Volume2,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react"
import LittleSpace from "@/components/little-space"
import MellysSpotEnhanced from "@/components/mellys-spot-enhanced"
import AudioPlayer from "@/components/audio-player"
import SoundEffects from "@/components/sound-effects"
import SuggestionEngine from "@/components/suggestion-engine"

export default function ThriveBMorePlatform() {
  const [activeSection, setActiveSection] = useState("home")
  const [showLittleSpace, setShowLittleSpace] = useState(false)
  const [showMellysSpot, setShowMellysSpot] = useState(false)

  const communityStats = [
    { label: "Active Members", value: "2,847", icon: Users },
    { label: "Safe Spaces", value: "12", icon: Shield },
    { label: "Daily Check-ins", value: "156", icon: Heart },
    { label: "Success Stories", value: "89", icon: Star },
  ]

  const features = [
    {
      title: "Melly's Spot",
      description: "Sacred sanctuary for littles and age regression with AI companions",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      action: () => setShowMellysSpot(true),
    },
    {
      title: "Little Space",
      description: "Personalized comfort zone with activities and soothing content",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      action: () => setShowLittleSpace(true),
    },
    {
      title: "Community Circles",
      description: "Connect with others on similar journeys in safe, moderated spaces",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      action: () => setActiveSection("community"),
    },
    {
      title: "Wellness Hub",
      description: "Meditation, sound healing, and mental health resources",
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      action: () => setActiveSection("wellness"),
    },
    {
      title: "Crisis Support",
      description: "24/7 emergency resources and immediate community response",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      action: () => setActiveSection("crisis"),
    },
    {
      title: "Identity Celebration",
      description: "Affirming spaces for LGBTQ+, BIPOC, and intersectional identities",
      icon: Star,
      color: "from-yellow-500 to-amber-500",
      action: () => setActiveSection("identity"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ThriveBMore
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {["home", "wellness", "community", "resources", "about"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? "text-purple-600 font-semibold" : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 bg-transparent">
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  ThriveBMore
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  A sacred digital sanctuary where BIPOC, LGBTQ+, and marginalized communities find healing, connection,
                  and authentic self-expression. Your journey to wholeness starts here. ✨
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {communityStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200"
                  >
                    <stat.icon className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-800">{stat.value}</span>
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestion Engine */}
            <SuggestionEngine currentSection="home" />

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                  onClick={feature.action}
                >
                  <CardHeader className="pb-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Community Values */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-200">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Sacred Values
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Radical Love</h3>
                  <p className="text-gray-600">
                    Unconditional acceptance and celebration of all identities and expressions
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Sacred Safety</h3>
                  <p className="text-gray-600">
                    Protected spaces where vulnerability is honored and trauma is held with care
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Collective Healing</h3>
                  <p className="text-gray-600">
                    Community-centered wellness that honors ancestral wisdom and modern therapy
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "wellness" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Wellness Sanctuary
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Holistic healing tools combining ancient wisdom with modern wellness practices
              </p>
            </div>

            <SuggestionEngine currentSection="wellness" />

            <Tabs defaultValue="meditation" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
                <TabsTrigger value="meditation" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Meditation
                </TabsTrigger>
                <TabsTrigger value="sound" className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Sound Healing
                </TabsTrigger>
                <TabsTrigger value="music" className="flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Music Player
                </TabsTrigger>
                <TabsTrigger value="mood" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Mood Tracking
                </TabsTrigger>
              </TabsList>

              <TabsContent value="meditation" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Morning Affirmations",
                      duration: "10 min",
                      type: "Guided",
                      color: "from-yellow-400 to-orange-500",
                    },
                    {
                      title: "Anxiety Relief",
                      duration: "15 min",
                      type: "Breathing",
                      color: "from-blue-400 to-purple-500",
                    },
                    {
                      title: "Identity Celebration",
                      duration: "20 min",
                      type: "Visualization",
                      color: "from-pink-400 to-red-500",
                    },
                    {
                      title: "Trauma Healing",
                      duration: "25 min",
                      type: "Body Scan",
                      color: "from-green-400 to-teal-500",
                    },
                    {
                      title: "Sleep Stories",
                      duration: "30 min",
                      type: "Narrative",
                      color: "from-indigo-400 to-purple-500",
                    },
                    {
                      title: "Ancestral Connection",
                      duration: "18 min",
                      type: "Spiritual",
                      color: "from-purple-400 to-pink-500",
                    },
                  ].map((meditation, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-lg transition-all cursor-pointer bg-white/60 backdrop-blur-sm"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`w-full h-32 bg-gradient-to-r ${meditation.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}
                        >
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{meditation.title}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>{meditation.duration}</span>
                          <Badge variant="secondary">{meditation.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sound" className="mt-6">
                <SoundEffects />
              </TabsContent>

              <TabsContent value="music" className="mt-6">
                <AudioPlayer />
              </TabsContent>

              <TabsContent value="mood" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Mood Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>This Week</span>
                          <Badge className="bg-green-100 text-green-800">Improving</Badge>
                        </div>
                        <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-600">Mood chart visualization</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-600" />
                        Daily Check-in
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">How are you feeling today?</p>
                        <div className="grid grid-cols-3 gap-2">
                          {["😊", "😐", "😔", "😰", "😴", "🤗"].map((emoji, index) => (
                            <button
                              key={index}
                              className="p-3 text-2xl hover:bg-purple-100 rounded-lg transition-colors"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Log Mood</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === "community" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Community Spaces
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with others who understand your journey in safe, affirming spaces
              </p>
            </div>

            <SuggestionEngine currentSection="community" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Melly's Spot",
                  description: "Sacred sanctuary for littles and age regression",
                  members: 234,
                  color: "from-purple-500 to-pink-500",
                  action: () => setShowMellysSpot(true),
                },
                {
                  name: "Trans Joy Circle",
                  description: "Celebrating transgender experiences and identity",
                  members: 189,
                  color: "from-blue-400 to-pink-400",
                  action: () => {},
                },
                {
                  name: "BIPOC Healing Space",
                  description: "Culturally affirming support for people of color",
                  members: 312,
                  color: "from-yellow-500 to-red-500",
                  action: () => {},
                },
                {
                  name: "Neurodivergent Haven",
                  description: "Understanding and celebrating different minds",
                  members: 156,
                  color: "from-green-500 to-blue-500",
                  action: () => {},
                },
                {
                  name: "Survivor Support",
                  description: "Trauma-informed healing and recovery",
                  members: 98,
                  color: "from-purple-500 to-indigo-500",
                  action: () => {},
                },
                {
                  name: "Creative Expression",
                  description: "Art, music, and creative healing",
                  members: 267,
                  color: "from-pink-500 to-orange-500",
                  action: () => {},
                },
              ].map((space, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all cursor-pointer bg-white/60 backdrop-blur-sm"
                  onClick={space.action}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-full h-24 bg-gradient-to-r ${space.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{space.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{space.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{space.members} members</span>
                      <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 bg-transparent">
                        Join
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === "resources" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Crisis & Resources
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Immediate support and comprehensive resources for your wellbeing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <Phone className="w-5 h-5" />
                    Crisis Hotlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium">National Suicide Prevention</span>
                      <span className="text-red-600 font-bold">988</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium">Crisis Text Line</span>
                      <span className="text-red-600 font-bold">Text HOME to 741741</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium">Trans Lifeline</span>
                      <span className="text-red-600 font-bold">877-565-8860</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium">LGBT National Hotline</span>
                      <span className="text-red-600 font-bold">1-888-843-4564</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Globe className="w-5 h-5" />
                    Online Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      "PFLAG - Family Support",
                      "The Trevor Project - LGBTQ Youth",
                      "NAMI - Mental Health Education",
                      "RAINN - Sexual Assault Support",
                      "SAMHSA - Substance Abuse Help",
                      "Crisis Text Line - 24/7 Support",
                    ].map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="font-medium">{resource}</span>
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 bg-transparent">
                          Visit
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "about" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                About ThriveBMore
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our mission, values, and commitment to community healing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700">Our Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    ThriveBMore was born from the recognition that marginalized communities need spaces designed
                    specifically for their unique healing journeys. We understand that trauma, identity, and wellness
                    intersect in complex ways.
                  </p>
                  <p>
                    Our platform combines cutting-edge technology with ancient wisdom, creating a sanctuary where BIPOC,
                    LGBTQ+, neurodivergent, and other marginalized individuals can find authentic community and
                    comprehensive support.
                  </p>
                  <p>
                    Every feature is designed with trauma-informed care, cultural competency, and radical inclusivity at
                    its core. This isn't just another wellness app—it's a movement toward collective liberation and
                    healing.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-pink-700">Contact & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <span>support@thrivebmore.org</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <span>1-800-THRIVE-1</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <span>Baltimore, MD & Virtual Worldwide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span>24/7 Community Support</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-3">Community Guidelines</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Respect all identities and expressions</li>
                      <li>• Practice consent in all interactions</li>
                      <li>• Honor confidentiality and privacy</li>
                      <li>• Support without judgment</li>
                      <li>• Celebrate diversity and intersectionality</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-purple-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ThriveBMore
              </span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A sacred digital sanctuary for marginalized communities to heal, connect, and thrive together. Built with
              love, powered by community. 💖✨🏳️‍⚧️
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Privacy Policy</span>
              <span>Community Guidelines</span>
              <span>Crisis Resources</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LittleSpace isVisible={showLittleSpace} onClose={() => setShowLittleSpace(false)} />
      <MellysSpotEnhanced isVisible={showMellysSpot} onClose={() => setShowMellysSpot(false)} />
    </div>
  )
}
