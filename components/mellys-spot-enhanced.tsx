"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Heart,
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  Phone,
  ExternalLink,
  Plus,
  Search,
  Star,
  Clock,
  Send,
  X,
  Minimize2,
  Maximize2,
  ThumbsUp,
  Share,
  Bookmark,
  Volume2,
  Play,
  User,
  Shield,
} from "lucide-react"

interface MellysSpotProps {
  isVisible: boolean
  onClose: () => void
}

interface CommunityPost {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: Date
  likes: number
  comments: number
  tags: string[]
  mood: "happy" | "sad" | "anxious" | "excited" | "peaceful" | "struggling"
  isAnonymous: boolean
  hasLiked: boolean
  hasBookmarked: boolean
}

interface Resource {
  id: string
  name: string
  description: string
  category: "healthcare" | "legal" | "housing" | "community" | "crisis" | "education"
  contact: {
    phone?: string
    email?: string
    website?: string
    address?: string
  }
  hours: string
  rating: number
  reviews: number
  lgbtqFriendly: boolean
  transSpecific: boolean
  languages: string[]
  cost: "free" | "sliding_scale" | "insurance" | "paid"
}

interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  location: string
  organizer: string
  attendees: number
  maxAttendees?: number
  category: "support_group" | "social" | "educational" | "protest" | "celebration" | "workshop"
  isVirtual: boolean
  rsvpRequired: boolean
  hasRSVPed: boolean
}

export function MellysSpotEnhanced({ isVisible, onClose }: MellysSpotProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState("community")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostMood, setNewPostMood] = useState<CommunityPost["mood"]>("peaceful")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "Alex",
      avatar: "🌟",
      content:
        "Just wanted to share that I had my first therapy session today and it went really well! Feeling hopeful for the first time in months. 💜",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likes: 12,
      comments: 5,
      tags: ["therapy", "hope", "mental_health"],
      mood: "happy",
      isAnonymous: false,
      hasLiked: false,
      hasBookmarked: false,
    },
    {
      id: "2",
      author: "Anonymous",
      avatar: "🦋",
      content:
        "Having a rough day with dysphoria. Could use some gentle words if anyone has them to spare. Thank you for being such a supportive community.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 8,
      comments: 12,
      tags: ["dysphoria", "support", "community"],
      mood: "struggling",
      isAnonymous: true,
      hasLiked: true,
      hasBookmarked: true,
    },
    {
      id: "3",
      author: "Jordan",
      avatar: "🌈",
      content:
        "Celebrating 6 months on HRT today! The changes have been amazing and I'm feeling more like myself every day. Grateful for this journey. 🏳️‍⚧️",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      likes: 25,
      comments: 8,
      tags: ["hrt", "celebration", "transition"],
      mood: "excited",
      isAnonymous: false,
      hasLiked: false,
      hasBookmarked: false,
    },
  ])

  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      name: "Chase Brexton Health Care",
      description:
        "Comprehensive LGBTQ+ affirming healthcare including primary care, mental health, and transition services",
      category: "healthcare",
      contact: {
        phone: "(410) 837-2050",
        website: "https://chasebrexton.org",
        address: "1001 Cathedral St, Baltimore, MD 21201",
      },
      hours: "Mon-Fri 8AM-5PM, Sat 9AM-1PM",
      rating: 4.8,
      reviews: 156,
      lgbtqFriendly: true,
      transSpecific: true,
      languages: ["English", "Spanish"],
      cost: "insurance",
    },
    {
      id: "2",
      name: "Pride Center of Maryland",
      description:
        "Community center providing resources, support groups, and programming for LGBTQ+ individuals and families",
      category: "community",
      contact: {
        phone: "(410) 777-8145",
        email: "info@pridemd.org",
        website: "https://pridemd.org",
        address: "2530 N Charles St, Baltimore, MD 21218",
      },
      hours: "Mon-Fri 9AM-5PM",
      rating: 4.9,
      reviews: 89,
      lgbtqFriendly: true,
      transSpecific: true,
      languages: ["English", "Spanish"],
      cost: "free",
    },
    {
      id: "3",
      name: "Trans Lifeline",
      description: "24/7 crisis support hotline run by and for transgender people",
      category: "crisis",
      contact: {
        phone: "(877) 565-8860",
        website: "https://translifeline.org",
      },
      hours: "24/7",
      rating: 4.7,
      reviews: 234,
      lgbtqFriendly: true,
      transSpecific: true,
      languages: ["English", "Spanish"],
      cost: "free",
    },
  ])

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Trans Support Group",
      description:
        "Weekly support group for transgender individuals. Safe space to share experiences and connect with community.",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      time: "7:00 PM - 8:30 PM",
      location: "Pride Center of Maryland",
      organizer: "Pride Center Staff",
      attendees: 12,
      maxAttendees: 15,
      category: "support_group",
      isVirtual: false,
      rsvpRequired: true,
      hasRSVPed: false,
    },
    {
      id: "2",
      title: "LGBTQ+ Game Night",
      description:
        "Join us for a fun evening of board games, card games, and community connection. All skill levels welcome!",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      time: "6:00 PM - 9:00 PM",
      location: "Community Center",
      organizer: "Baltimore LGBTQ+ Social Group",
      attendees: 8,
      category: "social",
      isVirtual: false,
      rsvpRequired: false,
      hasRSVPed: false,
    },
    {
      id: "3",
      title: "Know Your Rights Workshop",
      description:
        "Educational workshop covering LGBTQ+ legal rights, discrimination protections, and available legal resources.",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      time: "2:00 PM - 4:00 PM",
      location: "Virtual (Zoom)",
      organizer: "LGBTQ+ Legal Advocates",
      attendees: 25,
      category: "educational",
      isVirtual: true,
      rsvpRequired: true,
      hasRSVPed: true,
    },
  ])

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    anxious: "😰",
    excited: "🎉",
    peaceful: "😌",
    struggling: "💙",
  }

  const categoryColors = {
    healthcare: "from-blue-500 to-blue-600",
    legal: "from-purple-500 to-purple-600",
    housing: "from-green-500 to-green-600",
    community: "from-pink-500 to-pink-600",
    crisis: "from-red-500 to-red-600",
    education: "from-yellow-500 to-yellow-600",
  }

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: isAnonymous ? "Anonymous" : "You",
      avatar: isAnonymous ? "🦋" : "🌟",
      content: newPostContent,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      tags: [],
      mood: newPostMood,
      isAnonymous,
      hasLiked: false,
      hasBookmarked: false,
    }

    setCommunityPosts([newPost, ...communityPosts])
    setNewPostContent("")
    setNewPostMood("peaceful")
    setIsAnonymous(false)
  }

  const handleLikePost = (postId: string) => {
    setCommunityPosts((posts) =>
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
              hasLiked: !post.hasLiked,
            }
          : post,
      ),
    )
  }

  const handleBookmarkPost = (postId: string) => {
    setCommunityPosts((posts) =>
      posts.map((post) => (post.id === postId ? { ...post, hasBookmarked: !post.hasBookmarked } : post)),
    )
  }

  const handleRSVP = (eventId: string) => {
    setEvents((events) =>
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: event.hasRSVPed ? event.attendees - 1 : event.attendees + 1,
              hasRSVPed: !event.hasRSVPed,
            }
          : event,
      ),
    )
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl w-full max-w-7xl transition-all duration-300 ${
          isMinimized ? "h-20" : "h-[90vh]"
        } overflow-hidden border-4 border-blue-200`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Melly's Spot</h2>
              <p className="text-blue-100 text-sm">Community connection & peer support hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30">
              <Heart className="w-3 h-3 mr-1" />
              {communityPosts.length} posts today
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-6 h-full overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/50">
                <TabsTrigger value="community" className="text-sm">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Community
                </TabsTrigger>
                <TabsTrigger value="resources" className="text-sm">
                  <Shield className="w-4 h-4 mr-1" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="events" className="text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="audio" className="text-sm">
                  <Volume2 className="w-4 h-4 mr-1" />
                  Audio
                </TabsTrigger>
              </TabsList>

              {/* Community Tab */}
              <TabsContent value="community" className="flex-1 space-y-6 overflow-hidden">
                {/* Create Post */}
                <Card className="liberation-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Share with the community</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="What's on your mind? Share your thoughts, feelings, or ask for support..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Mood:</span>
                          <div className="flex gap-1">
                            {Object.entries(moodEmojis).map(([mood, emoji]) => (
                              <button
                                key={mood}
                                onClick={() => setNewPostMood(mood as CommunityPost["mood"])}
                                className={`p-2 rounded-full transition-all ${
                                  newPostMood === mood ? "bg-blue-100 scale-110" : "hover:bg-gray-100"
                                }`}
                                title={mood}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-600">Post anonymously</span>
                        </label>
                      </div>

                      <Button
                        onClick={handleCreatePost}
                        disabled={!newPostContent.trim()}
                        className="bg-gradient-to-r from-blue-500 to-purple-500"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Posts */}
                <ScrollArea className="flex-1">
                  <div className="space-y-4">
                    {communityPosts.map((post) => (
                      <Card key={post.id} className="liberation-card">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-lg">
                              {post.avatar}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-800">{post.author}</span>
                                <span className="text-2xl">{moodEmojis[post.mood]}</span>
                                <span className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</span>
                                {post.isAnonymous && (
                                  <Badge variant="secondary" className="text-xs">
                                    Anonymous
                                  </Badge>
                                )}
                              </div>

                              <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>

                              {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center gap-4">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleLikePost(post.id)}
                                  className={`${post.hasLiked ? "text-red-500" : "text-gray-500"}`}
                                >
                                  <ThumbsUp className="w-4 h-4 mr-1" />
                                  {post.likes}
                                </Button>

                                <Button size="sm" variant="ghost" className="text-gray-500">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {post.comments}
                                </Button>

                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleBookmarkPost(post.id)}
                                  className={`${post.hasBookmarked ? "text-blue-500" : "text-gray-500"}`}
                                >
                                  <Bookmark className="w-4 h-4" />
                                </Button>

                                <Button size="sm" variant="ghost" className="text-gray-500">
                                  <Share className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="flex-1 space-y-6 overflow-hidden">
                {/* Search and Filter */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                  >
                    <option value="all">All Categories</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="legal">Legal</option>
                    <option value="housing">Housing</option>
                    <option value="community">Community</option>
                    <option value="crisis">Crisis</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                {/* Resources List */}
                <ScrollArea className="flex-1">
                  <div className="space-y-4">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="liberation-card">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg text-gray-800">{resource.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`bg-gradient-to-r ${categoryColors[resource.category]} text-white`}>
                                  {resource.category}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm text-gray-600">
                                    {resource.rating} ({resource.reviews} reviews)
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-1">
                              {resource.lgbtqFriendly && (
                                <Badge variant="outline" className="text-xs border-rainbow">
                                  🏳️‍🌈 LGBTQ+
                                </Badge>
                              )}
                              {resource.transSpecific && (
                                <Badge variant="outline" className="text-xs border-trans">
                                  🏳️‍⚧️ Trans
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-gray-600">{resource.description}</p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              {resource.contact.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm">{resource.contact.phone}</span>
                                </div>
                              )}

                              {resource.contact.address && (
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                  <span className="text-sm">{resource.contact.address}</span>
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{resource.hours}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">Cost:</span>
                                <Badge variant="outline" className="text-xs">
                                  {resource.cost.replace("_", " ")}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">Languages:</span>
                                <span className="text-sm">{resource.languages.join(", ")}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {resource.contact.website && (
                              <Button size="sm" variant="outline">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Website
                              </Button>
                            )}

                            {resource.contact.phone && (
                              <Button size="sm" variant="outline">
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                              </Button>
                            )}

                            <Button size="sm" variant="ghost">
                              <Bookmark className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="flex-1 space-y-6 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Upcoming Events</h3>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-4">
                    {events.map((event) => (
                      <Card key={event.id} className="liberation-card">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg text-gray-800">{event.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{event.category.replace("_", " ")}</Badge>
                                {event.isVirtual && (
                                  <Badge variant="outline" className="border-blue-300 text-blue-700">
                                    Virtual
                                  </Badge>
                                )}
                                {event.rsvpRequired && (
                                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                                    RSVP Required
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="text-right text-sm text-gray-600">
                              <div>{event.date.toLocaleDateString()}</div>
                              <div>{event.time}</div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-gray-600">{event.description}</p>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>

                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {event.organizer}
                            </div>

                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.attendees} attending
                              {event.maxAttendees && ` / ${event.maxAttendees}`}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleRSVP(event.id)}
                              className={`${
                                event.hasRSVPed
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-gradient-to-r from-blue-500 to-purple-500"
                              }`}
                            >
                              {event.hasRSVPed ? "✓ Going" : "RSVP"}
                            </Button>

                            <Button size="sm" variant="outline">
                              <Share className="w-4 h-4 mr-2" />
                              Share
                            </Button>

                            <Button size="sm" variant="ghost">
                              <Calendar className="w-4 h-4 mr-2" />
                              Add to Calendar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Audio Tab */}
              <TabsContent value="audio" className="flex-1 space-y-6 overflow-hidden">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Community Audio Library</h3>
                  <p className="text-gray-600">Healing sounds, meditations, and community-created content</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Morning Affirmations", duration: "8:30", category: "Affirmations", plays: 234 },
                    { title: "Community Meditation", duration: "15:00", category: "Meditation", plays: 156 },
                    { title: "Trans Joy Playlist", duration: "45:20", category: "Music", plays: 89 },
                    { title: "Anxiety Relief Sounds", duration: "20:15", category: "Healing", plays: 312 },
                    { title: "Bedtime Stories", duration: "12:45", category: "Sleep", plays: 178 },
                    { title: "Empowerment Speeches", duration: "25:30", category: "Inspiration", plays: 267 },
                  ].map((audio, index) => (
                    <Card key={index} className="liberation-card">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{audio.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{audio.duration}</span>
                              <Badge variant="outline" className="text-xs">
                                {audio.category}
                              </Badge>
                              <span>{audio.plays} plays</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
