"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, Calendar, MapPin, Star, Shield, Users, Headphones } from "lucide-react"

export function MellysSpotEnhanced() {
  const [selectedMood, setSelectedMood] = useState("")
  const [postContent, setPostContent] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    { emoji: "😔", label: "Sad", color: "bg-blue-400" },
    { emoji: "😰", label: "Anxious", color: "bg-orange-400" },
    { emoji: "😌", label: "Peaceful", color: "bg-green-400" },
    { emoji: "😤", label: "Frustrated", color: "bg-red-400" },
    { emoji: "🤗", label: "Loved", color: "bg-pink-400" },
  ]

  const communityPosts = [
    {
      id: 1,
      author: "SoulSister23",
      content: "Just wanted to share that I had my first therapy session today. Feeling hopeful! 💜",
      mood: "😊",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 3,
      isAnonymous: false,
      tags: ["therapy", "hope", "healing"],
    },
    {
      id: 2,
      author: "Anonymous",
      content: "Having a rough day with dysphoria. Could use some gentle words if anyone has them to spare.",
      mood: "😔",
      timestamp: "4 hours ago",
      likes: 8,
      comments: 7,
      isAnonymous: true,
      tags: ["support", "dysphoria", "community"],
    },
    {
      id: 3,
      author: "TransJoy",
      content: "Celebrating 6 months on HRT today! The changes are subtle but I feel more like myself every day.",
      mood: "🤗",
      timestamp: "1 day ago",
      likes: 24,
      comments: 12,
      isAnonymous: false,
      tags: ["hrt", "celebration", "transition"],
    },
  ]

  const resources = [
    {
      name: "Chase Brexton Health Care",
      category: "Healthcare",
      description: "LGBTQ+ affirming healthcare services",
      location: "Baltimore, MD",
      rating: 4.8,
      contact: "(410) 837-2050",
      tags: ["trans-friendly", "hormones", "therapy"],
    },
    {
      name: "FreeState Justice",
      category: "Legal",
      description: "Legal advocacy for LGBTQ+ rights",
      location: "Baltimore, MD",
      rating: 4.9,
      contact: "(410) 625-LGBT",
      tags: ["legal-aid", "name-change", "discrimination"],
    },
    {
      name: "Trans Maryland",
      category: "Community",
      description: "Statewide transgender advocacy organization",
      location: "Maryland",
      rating: 4.7,
      contact: "info@transmaryland.org",
      tags: ["advocacy", "support-groups", "resources"],
    },
  ]

  const upcomingEvents = [
    {
      title: "Trans Support Circle",
      date: "Every Tuesday",
      time: "7:00 PM",
      location: "Community Center",
      type: "Support Group",
      description: "Weekly peer support meeting in a safe space",
    },
    {
      title: "Pride Planning Meeting",
      date: "March 15",
      time: "6:30 PM",
      location: "Virtual",
      type: "Community",
      description: "Help plan Baltimore Pride events",
    },
    {
      title: "Wellness Workshop",
      date: "March 20",
      time: "2:00 PM",
      location: "Wellness Center",
      type: "Workshop",
      description: "Mindfulness and self-care techniques",
    },
  ]

  const audioLibrary = [
    {
      title: "Meditation for Trans Folks",
      duration: "15 min",
      category: "Meditation",
      description: "Body-positive meditation practice",
      plays: 234,
    },
    {
      title: "Affirmations for Difficult Days",
      duration: "8 min",
      category: "Affirmations",
      description: "Gentle reminders of your worth",
      plays: 189,
    },
    {
      title: "Sleep Stories for Healing",
      duration: "25 min",
      category: "Sleep",
      description: "Peaceful stories for restful sleep",
      plays: 156,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="liberation-card text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mystical-glow">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl afro-futuristic-text">Melly's Spot Enhanced</CardTitle>
          <p className="text-muted-foreground">Your community sanctuary for connection, resources, and healing</p>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="community" className="w-full">
        <TabsList className="grid w-full grid-cols-4 liberation-card">
          <TabsTrigger value="community">
            <Users className="w-4 h-4 mr-2" />
            Community
          </TabsTrigger>
          <TabsTrigger value="resources">
            <MapPin className="w-4 h-4 mr-2" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="events">
            <Calendar className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="audio">
            <Headphones className="w-4 h-4 mr-2" />
            Audio Library
          </TabsTrigger>
        </TabsList>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          {/* Post Creation */}
          <Card className="liberation-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
                Share with Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mood Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMood(mood.label)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all ${
                        selectedMood === mood.label
                          ? "border-purple-400 bg-purple-400/20 scale-105"
                          : "border-border hover:border-purple-400/50"
                      }`}
                    >
                      <span className="text-lg">{mood.emoji}</span>
                      <span className="text-sm">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Content */}
              <Textarea
                placeholder="Share your thoughts, feelings, or ask for support..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[100px]"
              />

              {/* Post Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Post anonymously</span>
                  </label>
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Community Posts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-400" />
              Community Posts
            </h3>
            {communityPosts.map((post) => (
              <Card key={post.id} className="liberation-card">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                      {post.isAnonymous ? "?" : post.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{post.author}</span>
                        <span className="text-2xl">{post.mood}</span>
                        <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                        {post.isAnonymous && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Anonymous
                          </Badge>
                        )}
                      </div>
                      <p className="text-foreground mb-3">{post.content}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          {/* Search and Filter */}
          <Card className="liberation-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resource Directory */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-400" />
              Resource Directory
            </h3>
            {resources.map((resource, index) => (
              <Card key={index} className="liberation-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{resource.name}</h4>
                      <Badge variant="secondary" className="mt-1">
                        {resource.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {resource.location}
                    </span>
                    <span>{resource.contact}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-400" />
              Upcoming Events
            </h3>
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="liberation-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{event.title}</h4>
                      <Badge variant="secondary" className="mt-1">
                        {event.type}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      RSVP
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-3">{event.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-green-400" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2">🕐</span>
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audio Library Tab */}
        <TabsContent value="audio" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Headphones className="w-5 h-5 mr-2 text-purple-400" />
              Healing Audio Library
            </h3>
            {audioLibrary.map((audio, index) => (
              <Card key={index} className="liberation-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{audio.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{audio.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <Badge variant="outline">{audio.category}</Badge>
                        <span>{audio.duration}</span>
                        <span>{audio.plays} plays</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Headphones className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
