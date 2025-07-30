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
  Shield,
  Volume2,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Wifi,
  WifiOff,
} from "lucide-react"
import { LittleSpace } from "@/components/little-space"
import { OmniBotChat } from "@/components/omni-bot-chat"
import { Ticker } from "@/components/ticker"
import { MellysSpotEnhanced } from "@/components/mellys-spot-enhanced"
import { SoundEffects } from "@/components/sound-effects"
import { EmergencySignal } from "@/components/emergency-signal"
import { PeerConnector } from "@/components/peer-connector"
import { SoulVault } from "@/components/soul-vault"
import { LiberationMail } from "@/components/liberation-mail"
import { QuantumCloak } from "@/components/quantum-cloak"
import { SacredSplash } from "@/components/sacred-splash"
import { FloatingNavigation } from "@/components/floating-navigation"
import { useSoulVault } from "@/components/soul-vault-provider"
import { useEmergency } from "@/components/emergency-provider"

export default function HomePage() {
  const [showLittleSpace, setShowLittleSpace] = useState(false)
  const [showOmniBot, setShowOmniBot] = useState(false)
  const [showMellysSpot, setShowMellysSpot] = useState(false)
  const [showSoundHealing, setShowSoundHealing] = useState(false)
  const [showPeerConnector, setShowPeerConnector] = useState(false)
  const [showSoulVault, setShowSoulVault] = useState(false)
  const [showLiberationMail, setShowLiberationMail] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [spiritualQuote, setSpiritualQuote] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [encryptionStatus, setEncryptionStatus] = useState("active")
  const [currentSection, setCurrentSection] = useState("home")

  const { user, isAuthenticated } = useSoulVault()
  const { emergencyActive, emergencyLevel } = useEmergency()

  const spiritualQuotes = [
    "Your liberation is bound up with mine. - Aziza Okoro",
    "In the darkness, we find our light. In community, we find our strength.",
    "Every breath is a revolution. Every heartbeat, a prayer for freedom.",
    "The ancestors whisper: 'You are exactly who you're meant to be.'",
    "Healing happens in sacred spaces where all souls are welcomed.",
    "We are the ones we've been waiting for. We are the change.",
    "Your existence is resistance. Your joy is revolution.",
    "In the quantum field of possibility, all souls are free.",
    "The Underground Railroad continues in digital form.",
    "Liberation technology serves the most vulnerable first.",
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const quoteTimer = setInterval(() => {
      setSpiritualQuote(spiritualQuotes[Math.floor(Math.random() * spiritualQuotes.length)])
    }, 10000)

    // Set initial quote
    setSpiritualQuote(spiritualQuotes[0])

    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Hide splash after 3 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(quoteTimer)
      clearTimeout(splashTimer)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleNavigate = (section: string) => {
    setCurrentSection(section)

    switch (section) {
      case "little-space":
        setShowLittleSpace(true)
        break
      case "mellys-spot":
        setShowMellysSpot(true)
        break
      case "omni-bot":
        setShowOmniBot(true)
        break
      case "sound-healing":
        setShowSoundHealing(true)
        break
      case "peer-connector":
        setShowPeerConnector(true)
        break
      case "soul-vault":
        setShowSoulVault(true)
        break
      case "liberation-mail":
        setShowLiberationMail(true)
        break
      case "emergency":
        // Emergency signal is handled by the EmergencySignal component
        break
      case "home":
        // Close all modals
        setShowLittleSpace(false)
        setShowOmniBot(false)
        setShowMellysSpot(false)
        setShowSoundHealing(false)
        setShowPeerConnector(false)
        setShowSoulVault(false)
        setShowLiberationMail(false)
        break
    }
  }

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support",
      type: "crisis",
      encrypted: true,
    },
    {
      name: "Trans Lifeline",
      number: "(877) 565-8860",
      description: "Trans peer support hotline",
      type: "trans",
      encrypted: true,
    },
    {
      name: "LGBT National Hotline",
      number: "(1-888-843-4564)",
      description: "Confidential support for LGBTQ+ community",
      type: "lgbtq",
      encrypted: true,
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 text-based crisis support",
      type: "text",
      encrypted: true,
    },
  ]

  const baltimoreResources = [
    {
      name: "Chase Brexton Health Care",
      address: "1001 Cathedral St, Baltimore, MD 21201",
      phone: "(410) 837-2050",
      services: ["LGBTQ+ affirming healthcare", "Mental health", "HIV/AIDS care", "Trans healthcare"],
      website: "https://chasebrexton.org",
      hours: "Mon-Fri 8AM-5PM",
      verified: true,
      safeSpace: true,
    },
    {
      name: "Pride Center of Maryland",
      address: "2530 N Charles St, Baltimore, MD 21218",
      phone: "(410) 777-8145",
      services: ["Community programs", "Support groups", "Resources", "Events"],
      website: "https://pridemd.org",
      hours: "Mon-Fri 9AM-5PM",
      verified: true,
      safeSpace: true,
    },
    {
      name: "PFLAG Baltimore",
      address: "Various locations",
      phone: "(443) 286-2469",
      services: ["Family support", "Education", "Advocacy", "Support groups"],
      website: "https://pflagbaltimore.org",
      hours: "Meetings 2nd Sunday each month",
      verified: true,
      safeSpace: true,
    },
  ]

  const communitySpaces = [
    {
      name: "Little Space",
      description: "A safe, nurturing environment for age regression and inner child healing",
      icon: Heart,
      color: "from-pink-500 to-purple-500",
      action: () => setShowLittleSpace(true),
      features: ["Comfort items", "Gentle activities", "Safe space", "Trauma-informed"],
      encrypted: true,
      anonymous: true,
    },
    {
      name: "Melly's Spot",
      description: "Peer support and community connection hub",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      action: () => setShowMellysSpot(true),
      features: ["Community posts", "Resource sharing", "Events", "Peer support"],
      encrypted: true,
      anonymous: false,
    },
    {
      name: "Sound Healing",
      description: "Therapeutic frequencies and healing audio experiences",
      icon: Volume2,
      color: "from-green-500 to-emerald-500",
      action: () => setShowSoundHealing(true),
      features: ["432Hz meditation", "Binaural beats", "Nature sounds", "Custom frequencies"],
      encrypted: false,
      anonymous: true,
    },
    {
      name: "OmniBot Guide",
      description: "AI-powered trauma-informed support companion",
      icon: Sparkles,
      color: "from-yellow-500 to-orange-500",
      action: () => setShowOmniBot(true),
      features: ["24/7 support", "Crisis detection", "Resource matching", "Trauma-informed"],
      encrypted: true,
      anonymous: true,
    },
  ]

  const liberationModules = [
    {
      name: "Emergency Signal",
      description: "One-tap encrypted distress alert system",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      action: () => {},
      priority: "urgent",
      encrypted: true,
    },
    {
      name: "Peer Connector",
      description: "Privacy-first peer support matching",
      icon: UserCheck,
      color: "from-green-500 to-emerald-500",
      action: () => setShowPeerConnector(true),
      priority: "high",
      encrypted: true,
    },
    {
      name: "SoulVault",
      description: "Encrypted personal sanctuary & identity hub",
      icon: Lock,
      color: "from-purple-500 to-indigo-500",
      action: () => setShowSoulVault(true),
      priority: "high",
      encrypted: true,
    },
    {
      name: "LiberationMail",
      description: "Secure trauma-informed communications",
      icon: Mail,
      color: "from-pink-500 to-rose-500",
      action: () => setShowLiberationMail(true),
      priority: "medium",
      encrypted: true,
    },
  ]

  const audioLibrary = [
    {
      title: "Guided Meditation for Anxiety",
      duration: "15:30",
      category: "Meditation",
      plays: 1247,
      description: "Gentle breathing and grounding techniques",
      encrypted: true,
    },
    {
      title: "Affirmations for Trans Youth",
      duration: "8:45",
      category: "Affirmations",
      plays: 892,
      description: "Empowering daily affirmations",
      encrypted: true,
    },
    {
      title: "Sleep Stories: Enchanted Forest",
      duration: "22:15",
      category: "Sleep",
      plays: 2156,
      description: "Peaceful bedtime story for deep rest",
      encrypted: false,
    },
    {
      title: "Breathing Exercises for Panic",
      duration: "12:00",
      category: "Breathing",
      plays: 1534,
      description: "Emergency breathing techniques",
      encrypted: true,
    },
    {
      title: "432Hz Healing Frequency",
      duration: "30:00",
      category: "Frequency",
      plays: 3421,
      description: "Sacred healing frequency meditation",
      encrypted: false,
    },
    {
      title: "Ancestral Wisdom Meditation",
      duration: "18:20",
      category: "Spiritual",
      plays: 987,
      description: "Connect with ancestral guidance",
      encrypted: true,
    },
  ]

  if (showSplash) {
    return <SacredSplash onComplete={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden sigil-background">
      {/* Floating Navigation */}
      <FloatingNavigation onNavigate={handleNavigate} currentSection={currentSection} />

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
        <div
          className="absolute top-1/2 right-1/4 w-28 h-28 rounded-full bg-gradient-to-r from-pink-400/20 to-transparent blur-xl floating"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Emergency Overlay */}
      {emergencyActive && (
        <div className="fixed inset-0 bg-red-500/20 backdrop-blur-sm z-40 pointer-events-none">
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg emergency-pulse">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Emergency Signal Active - Level {emergencyLevel}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mystical-glow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold afro-futuristic-text">ThriveBMore</h1>
                <p className="text-sm text-gray-600">Underground Railroad of Trans Liberation</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className="flex items-center gap-2">
                {isOnline ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-red-500" />}
                <span className="text-xs text-gray-600">{isOnline ? "Connected" : "Offline"}</span>
              </div>

              {/* Encryption Status */}
              <Badge className="encrypted-badge">
                <Lock className="w-3 h-3 mr-1" />
                E2E Encrypted
              </Badge>

              {/* User Status */}
              {isAuthenticated ? (
                <Badge variant="secondary" className="spiritual-pulse">
                  <UserCheck className="w-3 h-3 mr-1" />
                  {user?.isAnonymous ? "Anonymous" : "Authenticated"}
                </Badge>
              ) : (
                <Badge variant="outline">
                  <Eye className="w-3 h-3 mr-1" />
                  Guest Mode
                </Badge>
              )}

              <div className="text-sm text-gray-600">{currentTime.toLocaleTimeString()}</div>

              {/* Quantum Cloak Button */}
              <QuantumCloak />

              {/* Emergency Signal */}
              <EmergencySignal />
            </div>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <Ticker />

      {/* Spiritual Quote Banner */}
      <div className="relative z-10 bg-gradient-to-r from-purple-900/30 to-yellow-900/30 border-y border-border/50 p-4">
        <div className="container mx-auto text-center">
          <p className="text-lg italic text-foreground/90 spiritual-pulse">"{spiritualQuote}"</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Hero Section */}
        <section className="text-center space-y-6 carousel-slide">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold afro-futuristic-text">Sanctuary Initiated</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              You've arrived at the Underground Railroad of Trans Liberation. A comprehensive platform for LGBTQ+
              community support, crisis intervention, and collective liberation in Baltimore and beyond. Built with
              love, protected by encryption, guided by ancestral wisdom.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 mystical-glow"
              onClick={() => setShowOmniBot(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with OmniBot
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent crisis-alert"
            >
              <Phone className="w-5 h-5 mr-2" />
              Crisis Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
              onClick={() => setShowPeerConnector(true)}
            >
              <UserCheck className="w-5 h-5 mr-2" />
              Find Peer Support
            </Button>
          </div>
        </section>

        {/* Liberation Modules */}
        <section className="carousel-slide">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold afro-futuristic-text mb-4">Liberation Stack Modules</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encrypted, trauma-informed tools for safety, connection, and empowerment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liberationModules.map((module, index) => {
              const IconComponent = module.icon
              return (
                <Card
                  key={index}
                  className={`liberation-card cursor-pointer transition-all hover:shadow-lg hover:scale-105 mystical-glow ${
                    module.priority === "urgent" ? "border-red-300" : ""
                  }`}
                  onClick={module.action}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-full flex items-center justify-center mx-auto mb-4 sacred-breathe`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{module.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                    <div className="flex justify-center gap-2">
                      <Badge variant={module.priority === "urgent" ? "destructive" : "secondary"} className="text-xs">
                        {module.priority}
                      </Badge>
                      {module.encrypted && (
                        <Badge className="encrypted-badge text-xs">
                          <Lock className="w-2 h-2 mr-1" />
                          E2E
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Crisis Resources */}
        <section className="liberation-card p-6 border-red-200 carousel-slide">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-2xl font-bold text-red-800">Crisis Resources</h3>
              <p className="text-red-700">Immediate help is available 24/7 - All connections encrypted</p>
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
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="border-red-300 text-red-700">
                        {resource.type}
                      </Badge>
                      {resource.encrypted && (
                        <Badge className="encrypted-badge text-xs">
                          <Lock className="w-2 h-2 mr-1" />
                          Encrypted
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Spaces */}
        <section className="carousel-slide">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold afro-futuristic-text mb-4">Sacred Community Spaces</h3>
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
                  className="liberation-card cursor-pointer transition-all hover:shadow-lg hover:scale-105 mystical-glow"
                  onClick={space.action}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${space.color} rounded-full flex items-center justify-center mx-auto mb-4 sacred-breathe`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{space.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{space.description}</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {space.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-center gap-1">
                      {space.encrypted && (
                        <Badge className="encrypted-badge text-xs">
                          <Lock className="w-2 h-2 mr-1" />
                          E2E
                        </Badge>
                      )}
                      {space.anonymous && (
                        <Badge className="anonymous-mode text-xs">
                          <EyeOff className="w-2 h-2 mr-1" />
                          Anonymous
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Audio Library */}
        <section className="carousel-slide">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold afro-futuristic-text mb-4">Healing Audio Library</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Guided meditations, affirmations, and healing frequencies for your wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {audioLibrary.map((audio, index) => (
              <Card key={index} className="liberation-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{audio.title}</h4>
                      <p className="text-xs text-gray-600 mb-1">{audio.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{audio.duration}</span>
                        <Badge variant="outline" className="text-xs">
                          {audio.category}
                        </Badge>
                        <span>{audio.plays} plays</span>
                        {audio.encrypted && (
                          <Badge className="encrypted-badge text-xs">
                            <Lock className="w-2 h-2 mr-1" />
                            E2E
                          </Badge>
                        )}
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
        <section className="carousel-slide">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold afro-futuristic-text mb-4">Baltimore LGBTQ+ Resources</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Local organizations and services supporting our community</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {baltimoreResources.map((resource, index) => (
              <Card key={index} className="liberation-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800">{resource.name}</CardTitle>
                    <div className="flex gap-1">
                      {resource.verified && (
                        <Badge className="bg-green-500 text-white text-xs">
                          <Shield className="w-2 h-2 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {resource.safeSpace && (
                        <Badge className="safe-space-indicator text-xs">
                          <Heart className="w-2 h-2 mr-1" />
                          Safe Space
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{resource.hours}</p>
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

        {/* Aziza's Spiritual Guidance Section */}
        <section className="mt-12 carousel-slide">
          <Card className="liberation-card spiritual-border">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 p-1 mystical-glow">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <img
                    src="/aziza-branding.png"
                    alt="Aziza Okoro - Spiritual Practitioner"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl afro-futuristic-text">Aziza Okoro</CardTitle>
              <p className="text-muted-foreground">
                Spiritual Practitioner • Wellness Facilitator • Trans Liberation Guide
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg italic">
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
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-semibold">www.thrivebmore.org • (443) 555-1015</p>
                <p>Available for crisis support 24/7</p>
                <p className="italic">"Healing in the quantum field of infinite possibility"</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features Overview */}
        <section className="sanctuary-gradient rounded-2xl p-8 carousel-slide">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold afro-futuristic-text mb-4">Platform Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for community support, crisis intervention, and collective liberation
            </p>
          </div>

          <Tabs defaultValue="support" className="w-full">
            <TabsList className="grid w-full grid-cols-4 liberation-card">
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="wellness">Wellness</TabsTrigger>
              <TabsTrigger value="organizing">Organizing</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="support" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="liberation-card">
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

                <Card className="liberation-card">
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
                <Card className="liberation-card">
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

                <Card className="liberation-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-blue-600" />
                      Sound Healing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Therapeutic frequencies, binaural beats, and healing audio experiences.
                    </p>
                    <Button
                      onClick={() => setShowSoundHealing(true)}
                      variant="outline"
                      className="border-blue-300 text-blue-700 bg-transparent"
                    >
                      Start Healing
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="organizing" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="liberation-card">
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

                <Card className="liberation-card">
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
                <Card className="liberation-card">
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
                    <Button
                      onClick={() => setShowMellysSpot(true)}
                      variant="outline"
                      className="border-cyan-300 text-cyan-700 bg-transparent"
                    >
                      Visit Melly's Spot
                    </Button>
                  </CardContent>
                </Card>

                <Card className="liberation-card">
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
      <footer className="bg-gray-900 text-white py-12 mt-16 relative z-10">
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
                Underground Railroad of Trans Liberation - Digital sanctuary for LGBTQ+ community support and collective
                action.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="encrypted-badge text-xs">
                  <Lock className="w-2 h-2 mr-1" />
                  End-to-End Encrypted
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Liberation Stack</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Emergency Signal</li>
                <li>Peer Connector</li>
                <li>SoulVault</li>
                <li>LiberationMail</li>
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
              <div className="flex gap-4 mb-4">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
              <p className="text-sm text-gray-400">Aziza Okoro: (443) 555-1015</p>
              <p className="text-xs text-gray-500 mt-1">Encrypted communications available</p>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2024 ThriveBMore Liberation Stack. Built with love for our community.</p>
            <div className="mt-2 flex justify-center space-x-4 text-sm">
              <span>Crisis Hotline: 988</span>
              <span>•</span>
              <span>Trans Lifeline: 877-565-8860</span>
              <span>•</span>
              <span>Emergency: 911</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              "The Underground Railroad continues in digital form" - All communications encrypted
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLittleSpace && <LittleSpace isVisible={showLittleSpace} onClose={() => setShowLittleSpace(false)} />}
      {showOmniBot && <OmniBotChat isVisible={showOmniBot} onClose={() => setShowOmniBot(false)} />}
      {showMellysSpot && <MellysSpotEnhanced isVisible={showMellysSpot} onClose={() => setShowMellysSpot(false)} />}
      {showSoundHealing && <SoundEffects isVisible={showSoundHealing} onClose={() => setShowSoundHealing(false)} />}
      {showPeerConnector && <PeerConnector isVisible={showPeerConnector} onClose={() => setShowPeerConnector(false)} />}
      {showSoulVault && <SoulVault isVisible={showSoulVault} onClose={() => setShowSoulVault(false)} />}
      {showLiberationMail && (
        <LiberationMail isVisible={showLiberationMail} onClose={() => setShowLiberationMail(false)} />
      )}
    </div>
  )
}
