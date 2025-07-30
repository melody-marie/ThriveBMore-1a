"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageCircle,
  MapPin,
  Clock,
  Heart,
  Shield,
  Star,
  Search,
  Filter,
  Send,
  X,
  Lock,
  Eye,
  EyeOff,
  Zap,
  CheckCircle,
} from "lucide-react"

interface PeerConnectorProps {
  isVisible: boolean
  onClose: () => void
}

interface PeerNavigator {
  id: string
  name: string
  avatar: string
  bio: string
  specialties: string[]
  location: string
  availability: "available" | "busy" | "offline"
  rating: number
  responseTime: string
  languages: string[]
  isVerified: boolean
  isAnonymous: boolean
  supportTypes: string[]
  experience: string
}

interface SupportRequest {
  id: string
  type: string
  description: string
  urgency: "low" | "medium" | "high" | "urgent"
  location?: string
  isAnonymous: boolean
  timestamp: Date
  status: "pending" | "matched" | "active" | "completed"
}

export function PeerConnector({ isVisible, onClose }: PeerConnectorProps) {
  const [activeTab, setActiveTab] = useState("find-support")
  const [supportType, setSupportType] = useState("")
  const [urgencyLevel, setUrgencyLevel] = useState<"low" | "medium" | "high" | "urgent">("medium")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [matchedPeers, setMatchedPeers] = useState<PeerNavigator[]>([])
  const [isMatching, setIsMatching] = useState(false)
  const [activeRequest, setActiveRequest] = useState<SupportRequest | null>(null)

  const supportTypes = [
    { id: "emotional", label: "Emotional Support", icon: "💜" },
    { id: "crisis", label: "Crisis Support", icon: "🚨" },
    { id: "transition", label: "Transition Guidance", icon: "🏳️‍⚧️" },
    { id: "healthcare", label: "Healthcare Navigation", icon: "🏥" },
    { id: "legal", label: "Legal Resources", icon: "⚖️" },
    { id: "housing", label: "Housing Assistance", icon: "🏠" },
    { id: "employment", label: "Employment Support", icon: "💼" },
    { id: "family", label: "Family Relations", icon: "👨‍👩‍👧‍👦" },
    { id: "spiritual", label: "Spiritual Guidance", icon: "✨" },
    { id: "peer", label: "Peer Mentorship", icon: "🤝" },
  ]

  const peerNavigators: PeerNavigator[] = [
    {
      id: "1",
      name: "Alex Chen",
      avatar: "🌟",
      bio: "Trans advocate with 5+ years experience in peer support. Specializing in transition guidance and healthcare navigation.",
      specialties: ["Transition Guidance", "Healthcare Navigation", "Crisis Support"],
      location: "Baltimore, MD",
      availability: "available",
      rating: 4.9,
      responseTime: "< 5 min",
      languages: ["English", "Spanish"],
      isVerified: true,
      isAnonymous: false,
      supportTypes: ["transition", "healthcare", "crisis"],
      experience: "5+ years",
    },
    {
      id: "2",
      name: "Jordan (Anonymous)",
      avatar: "🦋",
      bio: "Experienced peer navigator focusing on emotional support and crisis intervention. Available 24/7 for urgent situations.",
      specialties: ["Emotional Support", "Crisis Support", "Spiritual Guidance"],
      location: "Baltimore Metro Area",
      availability: "available",
      rating: 4.8,
      responseTime: "< 10 min",
      languages: ["English"],
      isVerified: true,
      isAnonymous: true,
      supportTypes: ["emotional", "crisis", "spiritual"],
      experience: "3+ years",
    },
    {
      id: "3",
      name: "Sam Rodriguez",
      avatar: "🌈",
      bio: "Legal advocate and peer mentor with expertise in housing rights and employment discrimination. Bilingual support available.",
      specialties: ["Legal Resources", "Housing Assistance", "Employment Support"],
      location: "Baltimore, MD",
      availability: "busy",
      rating: 4.7,
      responseTime: "< 30 min",
      languages: ["English", "Spanish"],
      isVerified: true,
      isAnonymous: false,
      supportTypes: ["legal", "housing", "employment"],
      experience: "7+ years",
    },
    {
      id: "4",
      name: "River (They/Them)",
      avatar: "🌙",
      bio: "Spiritual practitioner and family relations specialist. Helping folks navigate coming out and family acceptance journeys.",
      specialties: ["Family Relations", "Spiritual Guidance", "Peer Mentorship"],
      location: "Baltimore, MD",
      availability: "available",
      rating: 4.9,
      responseTime: "< 15 min",
      languages: ["English"],
      isVerified: true,
      isAnonymous: false,
      supportTypes: ["family", "spiritual", "peer"],
      experience: "4+ years",
    },
  ]

  const handleSupportRequest = async () => {
    if (!supportType || !description.trim()) return

    setIsMatching(true)

    const request: SupportRequest = {
      id: Date.now().toString(),
      type: supportType,
      description,
      urgency: urgencyLevel,
      location: location || undefined,
      isAnonymous,
      timestamp: new Date(),
      status: "pending",
    }

    setActiveRequest(request)

    // Simulate matching algorithm
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Filter peers based on support type and availability
    const matches = peerNavigators
      .filter((peer) => peer.supportTypes.includes(supportType) && peer.availability === "available")
      .sort((a, b) => b.rating - a.rating)

    setMatchedPeers(matches)
    setIsMatching(false)
    setActiveRequest({ ...request, status: "matched" })
  }

  const handleConnectToPeer = (peerId: string) => {
    const peer = peerNavigators.find((p) => p.id === peerId)
    if (peer && activeRequest) {
      setActiveRequest({ ...activeRequest, status: "active" })
      // In a real implementation, this would initiate encrypted chat
      console.log("Connecting to peer:", peer.name)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "from-green-500 to-green-600"
      case "medium":
        return "from-yellow-500 to-orange-500"
      case "high":
        return "from-orange-500 to-red-500"
      case "urgent":
        return "from-red-500 to-red-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden border-4 border-green-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Peer Connector</h2>
              <p className="text-green-100 text-sm">Privacy-first peer support matching</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="encrypted-badge">
              <Lock className="w-3 h-3 mr-1" />
              E2E Encrypted
            </Badge>
            <Button size="sm" variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/50">
              <TabsTrigger value="find-support" className="text-sm">
                <Search className="w-4 h-4 mr-1" />
                Find Support
              </TabsTrigger>
              <TabsTrigger value="browse-peers" className="text-sm">
                <Users className="w-4 h-4 mr-1" />
                Browse Peers
              </TabsTrigger>
              <TabsTrigger value="my-connections" className="text-sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                My Connections
              </TabsTrigger>
            </TabsList>

            {/* Find Support Tab */}
            <TabsContent value="find-support" className="space-y-6">
              {!activeRequest ? (
                <Card className="liberation-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-green-500" />
                      Request Peer Support
                    </CardTitle>
                    <p className="text-gray-600">Connect with trained peer navigators who understand your journey</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Support Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        What type of support do you need?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {supportTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSupportType(type.id)}
                            className={`p-3 border rounded-lg text-left transition-all ${
                              supportType === type.id
                                ? "border-green-400 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="text-lg mb-1">{type.icon}</div>
                            <div className="text-sm font-medium">{type.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Urgency Level */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Urgency Level</label>
                      <Select value={urgencyLevel} onValueChange={(value) => setUrgencyLevel(value as any)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500" />
                              Low - General guidance
                            </div>
                          </SelectItem>
                          <SelectItem value="medium">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-yellow-500" />
                              Medium - Need support soon
                            </div>
                          </SelectItem>
                          <SelectItem value="high">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-orange-500" />
                              High - Urgent assistance needed
                            </div>
                          </SelectItem>
                          <SelectItem value="urgent">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500" />
                              Urgent - Crisis situation
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Describe your situation</label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Share what you're going through and what kind of support would be most helpful..."
                        className="min-h-[100px] resize-none"
                      />
                    </div>

                    {/* Location (Optional) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location (Optional)</label>
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State (for local resource recommendations)"
                      />
                    </div>

                    {/* Privacy Options */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">Privacy Settings</h4>
                        <Badge className="encrypted-badge text-xs">
                          <Lock className="w-2 h-2 mr-1" />
                          Always Encrypted
                        </Badge>
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="rounded"
                        />
                        <div className="flex items-center gap-2">
                          {isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          <span className="text-sm">Connect anonymously (recommended for sensitive topics)</span>
                        </div>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleSupportRequest}
                      disabled={!supportType || !description.trim() || isMatching}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      size="lg"
                    >
                      {isMatching ? (
                        <>
                          <Zap className="w-5 h-5 mr-2 animate-spin" />
                          Finding Your Peer Navigator...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Find Peer Support
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                /* Matching Results */
                <div className="space-y-6">
                  {/* Request Status */}
                  <Card className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${getUrgencyColor(activeRequest.urgency)}`}
                          />
                          <div>
                            <h4 className="font-semibold">Support Request Active</h4>
                            <p className="text-sm text-gray-600">
                              {supportTypes.find((t) => t.id === activeRequest.type)?.label} • {activeRequest.urgency}{" "}
                              priority
                            </p>
                          </div>
                        </div>
                        <Badge variant={activeRequest.status === "matched" ? "default" : "secondary"}>
                          {activeRequest.status === "matched" ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Peers Found
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              {activeRequest.status}
                            </>
                          )}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Matched Peers */}
                  {matchedPeers.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Available Peer Navigators ({matchedPeers.length})
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {matchedPeers.map((peer) => (
                          <Card key={peer.id} className="liberation-card">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-2xl">
                                    {peer.avatar}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">{peer.name}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <div
                                        className={`w-2 h-2 rounded-full ${getAvailabilityColor(peer.availability)}`}
                                      />
                                      <span className="capitalize">{peer.availability}</span>
                                      <span>•</span>
                                      <span>{peer.responseTime}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{peer.rating}</span>
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-3">{peer.bio}</p>

                              <div className="space-y-2 mb-4">
                                <div className="flex flex-wrap gap-1">
                                  {peer.specialties.map((specialty, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {peer.location}
                                  </span>
                                  <span>{peer.experience} experience</span>
                                  <span>{peer.languages.join(", ")}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex gap-1">
                                  {peer.isVerified && (
                                    <Badge className="bg-green-500 text-white text-xs">
                                      <Shield className="w-2 h-2 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                  {peer.isAnonymous && (
                                    <Badge className="anonymous-mode text-xs">
                                      <EyeOff className="w-2 h-2 mr-1" />
                                      Anonymous
                                    </Badge>
                                  )}
                                </div>

                                <Button
                                  onClick={() => handleConnectToPeer(peer.id)}
                                  size="sm"
                                  className="bg-gradient-to-r from-green-500 to-blue-500"
                                  disabled={peer.availability !== "available"}
                                >
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  Connect
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Browse Peers Tab */}
            <TabsContent value="browse-peers" className="space-y-6">
              {/* Search and Filters */}
              <Card className="liberation-card">
                <CardContent className="p-4">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search peer navigators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {supportTypes.slice(0, 6).map((type) => (
                      <Button
                        key={type.id}
                        variant={selectedFilters.includes(type.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (selectedFilters.includes(type.id)) {
                            setSelectedFilters(selectedFilters.filter((f) => f !== type.id))
                          } else {
                            setSelectedFilters([...selectedFilters, type.id])
                          }
                        }}
                        className="text-xs"
                      >
                        {type.icon} {type.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Peer Directory */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {peerNavigators.map((peer) => (
                  <Card key={peer.id} className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-2xl">
                          {peer.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{peer.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(peer.availability)}`} />
                            <span className="capitalize">{peer.availability}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{peer.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{peer.bio}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {peer.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {peer.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{peer.specialties.length - 2} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {peer.isVerified && (
                            <Badge className="bg-green-500 text-white text-xs">
                              <Shield className="w-2 h-2 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* My Connections Tab */}
            <TabsContent value="my-connections" className="space-y-6">
              <Card className="liberation-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    Active Connections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Active Connections</h3>
                    <p className="text-gray-600 mb-4">
                      When you connect with peer navigators, your conversations will appear here.
                    </p>
                    <Button
                      onClick={() => setActiveTab("find-support")}
                      className="bg-gradient-to-r from-green-500 to-blue-500"
                    >
                      Find Peer Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
