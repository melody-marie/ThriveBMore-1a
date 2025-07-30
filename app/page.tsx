"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Heart,
  Shield,
  Users,
  MessageCircle,
  BookOpen,
  Smartphone,
  Globe,
  Download,
  Zap,
  Lock,
  Headphones,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { OmniBotChat } from "@/components/omni-bot-chat"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl">ThriveBMore</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/organizing-101" className="text-white/80 hover:text-white transition-colors">
                Organizing 101
              </Link>
              <Link href="/community" className="text-white/80 hover:text-white transition-colors">
                Community
              </Link>
              <Link href="/resources" className="text-white/80 hover:text-white transition-colors">
                Resources
              </Link>
              <Button
                onClick={() => setIsChatOpen(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with OmniBot
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
              <div className="flex flex-col space-y-3">
                <Link href="/organizing-101" className="text-white/80 hover:text-white transition-colors">
                  Organizing 101
                </Link>
                <Link href="/community" className="text-white/80 hover:text-white transition-colors">
                  Community
                </Link>
                <Link href="/resources" className="text-white/80 hover:text-white transition-colors">
                  Resources
                </Link>
                <Button
                  onClick={() => setIsChatOpen(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with OmniBot
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
            🏳️‍⚧️ Digital Liberation Stack
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to the
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block">
              TransPower Revolution
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sacred encrypted space for LGBTQ+ liberation. Build community, access resources, organize for change, and
            heal together in Baltimore and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start with OmniBot
            </Button>
            <Link href="/organizing-101">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg bg-transparent"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Learn Organizing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TransPower Stack Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The TransPower Liberation Stack</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              A complete digital ecosystem designed for LGBTQ+ liberation, community building, and systemic change.
            </p>
          </div>

          <Tabs defaultValue="os" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="os" className="text-white data-[state=active]:bg-white/20">
                <Smartphone className="w-4 h-4 mr-2" />
                LiberationOS
              </TabsTrigger>
              <TabsTrigger value="app" className="text-white data-[state=active]:bg-white/20">
                <Heart className="w-4 h-4 mr-2" />
                ThriveBMore
              </TabsTrigger>
              <TabsTrigger value="browser" className="text-white data-[state=active]:bg-white/20">
                <Globe className="w-4 h-4 mr-2" />
                SpiritSurf
              </TabsTrigger>
              <TabsTrigger value="hub" className="text-white data-[state=active]:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                The Cauldron
              </TabsTrigger>
            </TabsList>

            <TabsContent value="os">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    LiberationOS v0.1
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Trauma-informed, encrypted operating system built for liberation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Core Features
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Afro-futuristic design principles</li>
                        <li>• End-to-end encryption by default</li>
                        <li>• Trauma-informed user interfaces</li>
                        <li>• Lightweight for any device</li>
                        <li>• Offline-first architecture</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Security Modules
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Identity Kernel protection</li>
                        <li>• SoulVault encrypted storage</li>
                        <li>• PeerConnector mesh networking</li>
                        <li>• Anti-surveillance protocols</li>
                        <li>• Community-verified updates</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="app">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    ThriveBMore Platform
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Complete liberation toolkit for LGBTQ+ community organizing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Community Tools
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Real-time resource mapping</li>
                        <li>• Crisis assistance network</li>
                        <li>• Story sharing vault</li>
                        <li>• Community event calendar</li>
                        <li>• Peer support circles</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Liberation Features
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• OmniBot AI companion</li>
                        <li>• Organizing education modules</li>
                        <li>• Encrypted messaging system</li>
                        <li>• Healing audio library</li>
                        <li>• Emergency response protocols</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="browser">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    SpiritSurf Browser
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Spiritual-tech browser for secure, community-routed navigation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Privacy Features
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Built-in VPN routing</li>
                        <li>• Anti-surveillance extensions</li>
                        <li>• Encrypted tab memory</li>
                        <li>• Community mesh networking</li>
                        <li>• Anonymous browsing modes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Spiritual Tech
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• AI-assisted page de-biasing</li>
                        <li>• TransNet community shortcuts</li>
                        <li>• Healing-focused UI design</li>
                        <li>• Direct portal access</li>
                        <li>• Community content filtering</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hub">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    The Cauldron App Hub
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Community-created app launchpad for liberation tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Community Publishing
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Secure, invite-only publishing</li>
                        <li>• Community code review</li>
                        <li>• Peer-to-peer distribution</li>
                        <li>• Liberation-focused curation</li>
                        <li>• Collaborative development</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Security & Trust
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Cryptographic app signing</li>
                        <li>• Community trust networks</li>
                        <li>• Transparent source code</li>
                        <li>• Decentralized hosting</li>
                        <li>• Privacy-first architecture</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Liberation Tools & Features</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Everything you need for community organizing, healing, and building lasting change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* OmniBot AI */}
            <Card
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => setIsChatOpen(true)}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle>OmniBot AI Companion</CardTitle>
                <CardDescription className="text-white/70">
                  Trauma-informed AI for crisis support, resources, and community connection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• 24/7 crisis intervention</li>
                  <li>• LGBTQ+ cultural competency</li>
                  <li>• Local resource mapping</li>
                  <li>• Peer support matching</li>
                </ul>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Chat Now
                </Button>
              </CardContent>
            </Card>

            {/* Organizing Education */}
            <Link href="/organizing-101">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Community Organizing</CardTitle>
                  <CardDescription className="text-white/70">
                    Learn the difference between mobilizing and organizing for lasting change
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li>• Kwame Ture's teachings</li>
                    <li>• Historical movement analysis</li>
                    <li>• Modern LGBTQ+ applications</li>
                    <li>• Interactive learning modules</li>
                  </ul>
                  <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Healing Audio Library */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Melly's Healing Spot</CardTitle>
                <CardDescription className="text-white/70">
                  Curated audio library for meditation, affirmations, and healing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Trans affirmation tracks</li>
                  <li>• Guided meditations</li>
                  <li>• Binaural beats for focus</li>
                  <li>• Nature sounds for calm</li>
                </ul>
                <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                  Listen Now
                </Button>
              </CardContent>
            </Card>

            {/* Community Calendar */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Community Events</CardTitle>
                <CardDescription className="text-white/70">
                  Find and organize LGBTQ+ events, protests, and gatherings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Local Baltimore events</li>
                  <li>• Protest coordination</li>
                  <li>• Community meetings</li>
                  <li>• Healing circles</li>
                </ul>
                <Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  View Events
                </Button>
              </CardContent>
            </Card>

            {/* Resource Mapping */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Resource Network</CardTitle>
                <CardDescription className="text-white/70">
                  Real-time map of LGBTQ+ friendly resources and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Healthcare providers</li>
                  <li>• Legal assistance</li>
                  <li>• Housing support</li>
                  <li>• Emergency services</li>
                </ul>
                <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Find Resources
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Crisis Support</CardTitle>
                <CardDescription className="text-white/70">
                  24/7 emergency assistance and crisis intervention resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Immediate crisis hotlines</li>
                  <li>• Emergency housing</li>
                  <li>• Safety planning</li>
                  <li>• Peer crisis support</li>
                </ul>
                <Button className="w-full mt-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                  Get Help Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Liberation?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Connect with Baltimore's LGBTQ+ community. Organize for change. Build the world we deserve to live in.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setIsChatOpen(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
                <Link href="/community">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg bg-transparent"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-xl">ThriveBMore</span>
              </div>
              <p className="text-white/70 text-sm">
                Digital liberation platform for LGBTQ+ community organizing and healing.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="/organizing-101" className="hover:text-white transition-colors">
                    Organizing 101
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="/crisis" className="hover:text-white transition-colors">
                    Crisis Support
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@thrivebmore.org
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Crisis: 988
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Baltimore, MD
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/70 text-sm">
              © 2024 ThriveBMore. Built with love for liberation.
              <span className="text-pink-400">🏳️‍⚧️</span>
            </p>
          </div>
        </div>
      </footer>

      {/* OmniBot Chat Modal */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0 bg-gradient-to-br from-purple-900 to-pink-900 border-purple-500/30">
          <OmniBotChat onClose={() => setIsChatOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
