"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  MessageCircle,
  Music,
  Star,
  Send,
  Plus,
  Bookmark,
  Share,
  ThumbsUp,
  Clock,
  MapPin,
  Calendar,
  Phone,
  ExternalLink,
  Headphones,
  Play,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
} from "lucide-react"

interface Post {
  id: string
  author: string
  content: string
  timestamp: Date
  likes: number
  comments: number
  tags: string[]
  type: "story" | "resource" | "question" | "celebration" | "support"
  isAnonymous: boolean
  mood?: "happy" | "sad" | "anxious" | "excited" | "grateful" | "struggling"
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
  hours?: string
  cost: "free" | "sliding_scale" | "insurance" | "paid"
  lgbtq_friendly: boolean
  trans_specific: boolean
  verified: boolean
  rating: number
  reviews: number
}

interface AudioTrack {
  id: string
  title: string
  artist: string
  duration: string
  category: "affirmations" | "meditation" | "music" | "stories" | "nature"
  mood: string[]
  plays: number
  likes: number
  isPlaying?: boolean
}

export function MellysSpotEnhanced() {
  const [currentTab, setCurrentTab] = useState("community")
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const samplePosts: Post[] = [
    {
      id: "1",
      author: "Alex",
      content:
        "Just wanted to share that I had my first therapy session today and it went really well! Finding an LGBTQ+ affirming therapist made all the difference. 💜",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likes: 12,
      comments: 5,
      tags: ["therapy", "mental-health", "lgbtq-affirming"],
      type: "celebration",
      isAnonymous: false,
      mood: "happy",
    },
    {
      id: "2",
      author: "Anonymous",
      content:
        "Having a rough day with dysphoria. Could use some gentle reminders that this feeling will pass. Thank you for being such a supportive community. 🏳️‍⚧️",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 8,
      comments: 12,
      tags: ["dysphoria", "support", "transgender"],
      type: "support",
      isAnonymous: true,
      mood: "struggling",
    },
    {
      id: "3",
      author: "Jordan",
      content:
        "Does anyone know of good LGBTQ+ friendly housing resources in Baltimore? Looking for something affordable and safe. Any recommendations would be amazing!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      likes: 6,
      comments: 8,
      tags: ["housing", "baltimore", "resources"],
      type: "question",
      isAnonymous: false,
      mood: "anxious",
    },
    {
      id: "4",
      author: "Sam",
      content:
        "Grateful for this community today. You all remind me that I'm not alone in this journey. Sending love to everyone who needs it. ✨💕",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      likes: 15,
      comments: 7,
      tags: ["gratitude", "community", "love"],
      type: "celebration",
      isAnonymous: false,
      mood: "grateful",
    },
  ]

  const sampleResources: Resource[] = [
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
      hours: "Mon-Fri 8AM-5PM",
      cost: "insurance",
      lgbtq_friendly: true,
      trans_specific: true,
      verified: true,
      rating: 4.8,
      reviews: 127,
    },
    {
      id: "2",
      name: "FreeState Justice",
      description: "Legal advocacy organization providing free legal services for LGBTQ+ individuals",
      category: "legal",
      contact: {
        phone: "(410) 625-7861",
        email: "info@freestatelaw.org",
        website: "https://freestatelaw.org",
      },
      cost: "free",
      lgbtq_friendly: true,
      trans_specific: true,
      verified: true,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: "3",
      name: "Baltimore LGBT Center",
      description: "Community center offering support groups, events, and resources for LGBTQ+ individuals",
      category: "community",
      contact: {
        phone: "(410) 837-5445",
        website: "https://baltimoreequality.org",
        address: "2530 N Charles St, Baltimore, MD 21218",
      },
      hours: "Mon-Fri 9AM-6PM, Sat 10AM-4PM",
      cost: "free",
      lgbtq_friendly: true,
      trans_specific: false,
      verified: true,
      rating: 4.7,
      reviews: 156,
    },
  ]

  const sampleTracks: AudioTrack[] = [
    {
      id: "1",
      title: "You Are Enough",
      artist: "Melly's Affirmations",
      duration: "8:45",
      category: "affirmations",
      mood: ["empowering", "self-love"],
      plays: 1247,
      likes: 89,
    },
    {
      id: "2",
      title: "Gentle Breathing for Anxiety",
      artist: "Healing Voices",
      duration: "12:30",
      category: "meditation",
      mood: ["calming", "anxiety-relief"],
      plays: 892,
      likes: 67,
    },
    {
      id: "3",
      title: "Trans Joy Celebration",
      artist: "Community Voices",
      duration: "15:20",
      category: "music",
      mood: ["joyful", "celebratory"],
      plays: 2156,
      likes: 134,
    },
    {
      id: "4",
      title: "Forest Rain Sounds",
      artist: "Nature Sounds",
      duration: "30:00",
      category: "nature",
      mood: ["peaceful", "sleep"],
      plays: 1534,
      likes: 78,
    },
  ]

  useEffect(() => {
    setPosts(samplePosts)
  }, [])

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: isAnonymous ? "Anonymous" : "You",
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      tags: [],
      type: "story",
      isAnonymous,
      mood: selectedMood as any,
    }

    setPosts([post, ...posts])
    setNewPost("")
    setSelectedMood("")
  }

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case "happy":
        return "bg-yellow-100 text-yellow-800"
      case "sad":
        return "bg-blue-100 text-blue-800"
      case "anxious":
        return "bg-orange-100 text-orange-800"
      case "excited":
        return "bg-pink-100 text-pink-800"
      case "grateful":
        return "bg-green-100 text-green-800"
      case "struggling":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "celebration":
        return "🎉"
      case "support":
        return "🤗"
      case "question":
        return "❓"
      case "resource":
        return "📋"
      case "story":
        return "📝"
      default:
        return "💬"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <Card className="w-full bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Melly's Spot Enhanced
            </h2>
            <p className="text-sm text-gray-600">Community hub for peer support and resources</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white/60">
            <TabsTrigger value="community" className="data-[state=active]:bg-green-200">
              <MessageCircle className="w-4 h-4 mr-2" />
              Community
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-blue-200">
              <Star className="w-4 h-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-purple-200">
              <Headphones className="w-4 h-4 mr-2" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-pink-200">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="space-y-6">
            {/* Post Creation */}
            <Card className="bg-white/80 border-green-200">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your story, ask for support, or celebrate with the community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Mood:</label>
                      <select
                        value={selectedMood}
                        onChange={(e) => setSelectedMood(e.target.value)}
                        className="text-sm border border-green-200 rounded px-2 py-1"
                      >
                        <option value="">Select mood</option>
                        <option value="happy">😊 Happy</option>
                        <option value="grateful">🙏 Grateful</option>
                        <option value="excited">🎉 Excited</option>
                        <option value="anxious">😰 Anxious</option>
                        <option value="sad">😢 Sad</option>
                        <option value="struggling">💪 Struggling</option>
                      </select>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-green-300"
                      />
                      Post anonymously
                    </label>
                  </div>

                  <Button
                    onClick={handlePostSubmit}
                    disabled={!newPost.trim()}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Share with Community
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-green-200"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-green-200 rounded px-3 py-2"
                >
                  <option value="all">All Posts</option>
                  <option value="celebration">Celebrations</option>
                  <option value="support">Support</option>
                  <option value="question">Questions</option>
                  <option value="resource">Resources</option>
                </select>
              </div>

              {posts.map((post) => (
                <Card key={post.id} className="bg-white/80 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">
                          {post.isAnonymous ? "?" : post.author[0]}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-800">{post.author}</span>
                          <span className="text-xs text-gray-500">{formatTimeAgo(post.timestamp)}</span>
                          <span className="text-sm">{getTypeIcon(post.type)}</span>
                          {post.mood && <Badge className={`text-xs ${getMoodColor(post.mood)}`}>{post.mood}</Badge>}
                        </div>

                        <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>

                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-green-300 text-green-700">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-green-600">
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-1 hover:text-purple-600">
                            <Bookmark className="w-4 h-4" />
                            Save
                          </button>
                          <button className="flex items-center gap-1 hover:text-pink-600">
                            <Share className="w-4 h-4" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleResources.map((resource) => (
                <Card key={resource.id} className="bg-white/80 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-lg">{resource.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(resource.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({resource.reviews} reviews)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{resource.description}</p>

                    <div className="space-y-2 text-sm">
                      {resource.contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-blue-600" />
                          <span>{resource.contact.phone}</span>
                        </div>
                      )}
                      {resource.contact.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span className="text-xs">{resource.contact.address}</span>
                        </div>
                      )}
                      {resource.hours && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs">{resource.hours}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      <Badge className="text-xs bg-blue-100 text-blue-700">{resource.category}</Badge>
                      <Badge className="text-xs bg-green-100 text-green-700">{resource.cost}</Badge>
                      {resource.lgbtq_friendly && (
                        <Badge className="text-xs bg-rainbow-100 text-rainbow-700">LGBTQ+ Friendly</Badge>
                      )}
                      {resource.trans_specific && (
                        <Badge className="text-xs bg-pink-100 text-pink-700">Trans Specific</Badge>
                      )}
                      {resource.verified && <Badge className="text-xs bg-purple-100 text-purple-700">✓ Verified</Badge>}
                    </div>

                    <div className="flex gap-2">
                      {resource.contact.website && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-blue-300 text-blue-600 bg-transparent"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Website
                        </Button>
                      )}
                      {resource.contact.phone && (
                        <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6">
            {/* Audio Player */}
            {currentTrack && (
              <Card className="bg-white/80 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <Music className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{currentTrack.title}</h3>
                      <p className="text-sm text-gray-600">{currentTrack.artist}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {currentTrack.mood.map((mood, index) => (
                          <Badge key={index} className="text-xs bg-purple-100 text-purple-700">
                            {mood}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={togglePlayPause}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Audio Library */}
            <div className="grid md:grid-cols-2 gap-4">
              {sampleTracks.map((track) => (
                <Card
                  key={track.id}
                  className="bg-white/80 border-purple-200 cursor-pointer hover:shadow-lg transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{track.title}</h4>
                        <p className="text-sm text-gray-600">{track.artist}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>{track.duration}</span>
                          <span>{track.plays} plays</span>
                          <span>{track.likes} likes</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => playTrack(track)}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      <Badge className="text-xs bg-purple-100 text-purple-700">{track.category}</Badge>
                      {track.mood.slice(0, 2).map((mood, index) => (
                        <Badge key={index} className="text-xs bg-pink-100 text-pink-700">
                          {mood}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Trans Support Group",
                  date: "Every Tuesday, 7:00 PM",
                  location: "Baltimore LGBT Center",
                  description: "Weekly peer support meeting for transgender individuals",
                  type: "support",
                },
                {
                  title: "Community Organizing Workshop",
                  date: "Saturday, 2:00 PM",
                  location: "Virtual & In-Person",
                  description: "Learn effective organizing strategies for community change",
                  type: "education",
                },
                {
                  title: "Pride Planning Meeting",
                  date: "Next Monday, 6:30 PM",
                  location: "Pride Center of Maryland",
                  description: "Help plan Baltimore Pride 2024 events and activities",
                  type: "planning",
                },
                {
                  title: "LGBTQ+ Youth Movie Night",
                  date: "Friday, 7:00 PM",
                  location: "Community Center",
                  description: "Safe space for LGBTQ+ youth to connect and have fun",
                  type: "social",
                },
              ].map((event, index) => (
                <Card key={index} className="bg-white/80 border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-pink-600" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-pink-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-pink-100 text-pink-700">{event.type}</Badge>
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white">
                        Join Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/80 border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-700">Create New Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Event title" className="border-pink-200" />
                <Textarea placeholder="Event description" className="border-pink-200" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Date and time" className="border-pink-200" />
                  <Input placeholder="Location" className="border-pink-200" />
                </div>
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default MellysSpotEnhanced
