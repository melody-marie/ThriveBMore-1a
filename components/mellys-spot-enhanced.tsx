"use client"

import { useEffect, useState } from "react"
import { supabase, type MellysSpotPost, type UserMood } from "@/lib/supabase-client"
import { botSystem } from "@/lib/bot-system"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Sparkles, Bot, User, Crown, Shield, Zap, MessageCircle, Send, Smile, RefreshCw } from "lucide-react"

interface MellysSpotEnhancedProps {
  isVisible: boolean
  onClose: () => void
}

export default function MellysSpotEnhanced({ isVisible, onClose }: MellysSpotEnhancedProps) {
  const [posts, setPosts] = useState<MellysSpotPost[]>([])
  const [newPost, setNewPost] = useState("")
  const [currentMood, setCurrentMood] = useState("")
  const [energyLevel, setEnergyLevel] = useState([5])
  const [needsSupport, setNeedsSupport] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showMoodCheck, setShowMoodCheck] = useState(false)

  // Mock data for when Supabase isn't connected
  const mockPosts: MellysSpotPost[] = [
    {
      id: "1",
      content: "🌟 Your ancestors whisper: 'You are exactly where you need to be, beloved.' Trust the journey. ✨",
      post_type: "oracle",
      bot_name: "Oracle Aziza",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      metadata: { wisdom_type: "daily_blessing" },
    },
    {
      id: "2",
      content:
        "💖 Melly here checking in: How's your heart today, love? Remember, feeling all your feelings is brave work. 🤗",
      post_type: "care_check",
      bot_name: "Care Bot Melly",
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      metadata: { care_type: "wellness_check" },
    },
    {
      id: "3",
      content:
        "Just wanted to share some gratitude today. This community has been such a blessing in my healing journey. Thank you all for creating this safe space. 💕",
      post_type: "user",
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      metadata: {},
    },
    {
      id: "4",
      content:
        "💫 Energy Matchmaker here: I sense 3 beautiful souls with high energy ready to lift others up, and 2 hearts that could use some extra love today. If you're feeling strong, consider reaching out with kindness. Community is medicine. ✨",
      post_type: "bot",
      bot_name: "Energy Matchmaker",
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      metadata: { match_type: "community_support" },
    },
    {
      id: "5",
      content: "🔮 The universe conspires in your favor today. Your resilience is your superpower, love. 💪🏾✨",
      post_type: "oracle",
      bot_name: "Oracle Aziza",
      created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      metadata: { wisdom_type: "empowerment" },
    },
  ]

  useEffect(() => {
    if (isVisible) {
      fetchPosts()
      // Start bot system when component mounts
      botSystem.startBots()
    }
  }, [isVisible])

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from("mellys_spot_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20)

      if (error) {
        console.log("Using mock data while database is being set up")
        setPosts(mockPosts)
      } else {
        setPosts(data || mockPosts)
      }
    } catch (error) {
      console.log("Using mock data while database is being set up")
      setPosts(mockPosts)
    }
  }

  async function submitPost() {
    if (!newPost.trim()) return

    setIsLoading(true)

    const newPostData: Partial<MellysSpotPost> = {
      content: newPost,
      post_type: "user",
      created_at: new Date().toISOString(),
      metadata: { source: "mellys_spot_enhanced" },
    }

    try {
      const { error } = await supabase.from("mellys_spot_posts").insert([newPostData])

      if (error) {
        // Add to local state if database isn't ready
        setPosts((prev) => [
          {
            ...newPostData,
            id: Date.now().toString(),
          } as MellysSpotPost,
          ...prev,
        ])
      } else {
        fetchPosts()
      }
    } catch (error) {
      // Add to local state if database isn't ready
      setPosts((prev) => [
        {
          ...newPostData,
          id: Date.now().toString(),
        } as MellysSpotPost,
        ...prev,
      ])
    }

    setNewPost("")
    setIsLoading(false)
  }

  async function submitMoodCheck() {
    if (!currentMood) return

    const moodData: Partial<UserMood> = {
      user_id: "current-user", // This would be the actual user ID in production
      mood: currentMood,
      energy_level: energyLevel[0],
      needs_support: needsSupport,
      created_at: new Date().toISOString(),
    }

    try {
      await supabase.from("user_moods").insert([moodData])
      await botSystem.logUserMood("current-user", currentMood, energyLevel[0], needsSupport)
    } catch (error) {
      console.log("Mood data will be saved when database is ready")
    }

    // Add gratitude message to feed
    const gratitudeMessage = `💖 Thank you for sharing your energy with us, beautiful soul. Your check-in helps us create a more supportive community. Sending you love! ✨`

    try {
      await supabase.from("mellys_spot_posts").insert([
        {
          content: gratitudeMessage,
          post_type: "bot",
          bot_name: "Gratitude Bot",
          metadata: { type: "mood_appreciation", triggered_by: "mood_checkin" },
        },
      ])
    } catch (error) {
      // Add to local state
      setPosts((prev) => [
        {
          id: Date.now().toString(),
          content: gratitudeMessage,
          post_type: "bot",
          bot_name: "Gratitude Bot",
          created_at: new Date().toISOString(),
          metadata: { type: "mood_appreciation" },
        },
        ...prev,
      ])
    }

    // Reset form
    setCurrentMood("")
    setEnergyLevel([5])
    setNeedsSupport(false)
    setShowMoodCheck(false)

    // Refresh posts
    setTimeout(fetchPosts, 1000)
  }

  function getBotIcon(botName?: string) {
    switch (botName) {
      case "Oracle Aziza":
        return <Crown className="w-4 h-4 text-purple-600" />
      case "Care Bot Melly":
        return <Heart className="w-4 h-4 text-pink-600" />
      case "Energy Matchmaker":
        return <Zap className="w-4 h-4 text-yellow-600" />
      case "Community Guardian":
        return <Shield className="w-4 h-4 text-blue-600" />
      case "Gratitude Bot":
        return <Sparkles className="w-4 h-4 text-green-600" />
      default:
        return <Bot className="w-4 h-4 text-gray-600" />
    }
  }

  function getPostTypeColor(postType: string) {
    switch (postType) {
      case "oracle":
        return "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
      case "care_check":
        return "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200"
      case "bot":
        return "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
      default:
        return "bg-gradient-to-r from-white to-gray-50 border-gray-200"
    }
  }

  function formatTimeAgo(dateString: string) {
    const now = new Date()
    const postDate = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            ×
          </button>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Melly's Spot</h1>
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Sacred Digital Sanctuary • Bot-Blessed Community Space • Where Hearts Connect ✨
            </p>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto space-y-6">
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={() => setShowMoodCheck(!showMoodCheck)}
              variant={showMoodCheck ? "default" : "outline"}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
            >
              <Smile className="w-4 h-4 mr-2" />
              Mood Check-In
            </Button>

            <Button
              onClick={fetchPosts}
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Blessings
            </Button>
          </div>

          {/* Mood Check-In Form */}
          {showMoodCheck && (
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Heart className="w-5 h-5" />
                  How's Your Energy Today, Beautiful? 💚
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Current Mood:</label>
                  <Select value={currentMood} onValueChange={setCurrentMood}>
                    <SelectTrigger className="border-green-200 focus:border-green-400">
                      <SelectValue placeholder="Select your vibe..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="radiant">✨ Radiant & Glowing</SelectItem>
                      <SelectItem value="grateful">🙏 Grateful & Blessed</SelectItem>
                      <SelectItem value="peaceful">🕊️ Peaceful & Centered</SelectItem>
                      <SelectItem value="creative">🎨 Creative & Inspired</SelectItem>
                      <SelectItem value="hopeful">🌅 Hopeful & Optimistic</SelectItem>
                      <SelectItem value="tired">😴 Tired but Holding On</SelectItem>
                      <SelectItem value="anxious">💭 Anxious & Overwhelmed</SelectItem>
                      <SelectItem value="sad">💙 Sad & Processing</SelectItem>
                      <SelectItem value="struggling">🌊 Struggling & Need Support</SelectItem>
                      <SelectItem value="healing">🌱 Healing & Growing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Energy Level: {energyLevel[0]}/10
                  </label>
                  <Slider
                    value={energyLevel}
                    onValueChange={setEnergyLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Drained</span>
                    <span>Balanced</span>
                    <span>Energized</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="needsSupport"
                    checked={needsSupport}
                    onChange={(e) => setNeedsSupport(e.target.checked)}
                    className="rounded border-green-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="needsSupport" className="text-sm text-gray-700">
                    I could use some extra community support today 💕
                  </label>
                </div>

                <Button
                  onClick={submitMoodCheck}
                  disabled={!currentMood}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Share My Energy ✨
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Post Creation */}
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-pink-600" />
                Share Something Sacred
              </h3>
              <Textarea
                placeholder="What's on your heart today? Share a blessing, ask for support, celebrate a victory, or just say hello... This is your sacred space. 💖"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none border-pink-200 focus:border-purple-400"
              />
              <Button
                onClick={submitPost}
                disabled={!newPost.trim() || isLoading}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? "Blessing the Feed..." : "Bless the Feed"} ✨
              </Button>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Community Blessings & Bot Wisdom
              <Sparkles className="w-6 h-6 text-pink-600" />
            </h2>

            {posts.map((post) => (
              <Card
                key={post.id}
                className={`${getPostTypeColor(post.post_type)} transition-all hover:shadow-lg border-l-4`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {post.post_type === "user" ? (
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          {getBotIcon(post.bot_name)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {post.bot_name ? (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                            🤖 {post.bot_name}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                            👤 Community Member
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">{formatTimeAgo(post.created_at)}</span>
                      </div>

                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>

                      <div className="flex items-center gap-4 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          Bless
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Respond
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">✨</div>
                <h3 className="text-xl font-semibold text-gray-700">Welcome to Melly's Spot!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  This sacred space is just getting started. Share something beautiful to begin the blessing flow!
                </p>
                <div className="text-2xl">💖</div>
              </div>
            )}
          </div>

          {/* Footer Message */}
          <div className="text-center py-6 border-t border-gray-200">
            <p className="text-gray-600 italic max-w-2xl mx-auto">
              "In this sacred space, every voice matters, every heart is held, and every soul is seen. You are loved,
              you are valued, you belong here." 💫🏳️‍⚧️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
