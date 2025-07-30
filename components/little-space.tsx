"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Star,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  X,
  Sparkles,
  Palette,
  BookOpen,
  Music,
  Minimize2,
  Maximize2,
} from "lucide-react"

interface LittleSpaceProps {
  isVisible: boolean
  onClose: () => void
}

export function LittleSpace({ isVisible, onClose }: LittleSpaceProps) {
  const [selectedComfortItem, setSelectedComfortItem] = useState<string | null>(null)
  const [currentStory, setCurrentStory] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([50])
  const [isMuted, setIsMuted] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#ff69b4")
  const [isMinimized, setIsMinimized] = useState(false)
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale")

  const comfortItems = [
    {
      id: "teddy",
      name: "Soft Teddy Bear",
      emoji: "🧸",
      description: "A warm, cuddly friend for comfort",
      color: "from-pink-400 to-pink-600",
    },
    {
      id: "blanket",
      name: "Cozy Blanket",
      emoji: "🛋️",
      description: "Wrap yourself in warmth and safety",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "cocoa",
      name: "Hot Cocoa",
      emoji: "☕",
      description: "Sweet warmth to soothe your soul",
      color: "from-amber-400 to-amber-600",
    },
    {
      id: "stars",
      name: "Fairy Lights",
      emoji: "✨",
      description: "Gentle twinkling lights for peace",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "pillow",
      name: "Fluffy Pillow",
      emoji: "🛏️",
      description: "Soft support for rest and comfort",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "journal",
      name: "Feelings Journal",
      emoji: "📔",
      description: "A safe place for your thoughts",
      color: "from-green-400 to-green-600",
    },
  ]

  const bedtimeStories = [
    {
      id: "forest",
      title: "The Magical Forest",
      duration: "12 minutes",
      description: "A gentle journey through an enchanted woodland",
      content: "Once upon a time, in a forest where the trees whispered secrets of kindness...",
    },
    {
      id: "ocean",
      title: "Ocean Dreams",
      duration: "15 minutes",
      description: "Peaceful waves and friendly sea creatures",
      content: "By the gentle shore where waves dance with moonlight...",
    },
    {
      id: "garden",
      title: "The Secret Garden",
      duration: "18 minutes",
      description: "A hidden garden where flowers sing lullabies",
      content: "Behind the old wooden door covered in ivy, there was a garden...",
    },
    {
      id: "stars",
      title: "Starlight Adventure",
      duration: "10 minutes",
      description: "A journey among the friendly stars",
      content: "High above the clouds, where stars twinkle like diamonds...",
    },
  ]

  const lullabies = [
    { id: "twinkle", title: "Twinkle Little Star", duration: "3:20" },
    { id: "brahms", title: "Brahms Lullaby", duration: "4:15" },
    { id: "hush", title: "Hush Little Baby", duration: "2:45" },
    { id: "rock", title: "Rock-a-Bye Baby", duration: "3:00" },
    { id: "golden", title: "Golden Slumbers", duration: "3:30" },
  ]

  const colorPalette = [
    "#ff69b4", // Pink
    "#dda0dd", // Plum
    "#87ceeb", // Sky Blue
    "#98fb98", // Pale Green
    "#f0e68c", // Khaki
    "#ffa07a", // Light Salmon
    "#e6e6fa", // Lavender
    "#ffe4e1", // Misty Rose
  ]

  useEffect(() => {
    let breathingInterval: NodeJS.Timeout

    if (breathingActive) {
      breathingInterval = setInterval(() => {
        setBreathingPhase((prev) => {
          if (prev === "inhale") return "hold"
          if (prev === "hold") return "exhale"
          return "inhale"
        })
      }, 4000) // 4 seconds per phase
    }

    return () => {
      if (breathingInterval) clearInterval(breathingInterval)
    }
  }, [breathingActive])

  const handleComfortItemClick = (itemId: string) => {
    setSelectedComfortItem(itemId)
    // Add gentle haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const handleStoryPlay = (storyId: string) => {
    setCurrentStory(storyId)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-2xl w-full max-w-6xl transition-all duration-300 ${
          isMinimized ? "h-20" : "h-[90vh]"
        } overflow-hidden border-4 border-pink-200`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Little Space</h2>
              <p className="text-pink-100 text-sm">Your safe, nurturing sanctuary</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
          <div className="p-6 h-full overflow-y-auto">
            <Tabs defaultValue="comfort" className="h-full">
              <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/50">
                <TabsTrigger value="comfort" className="text-sm">
                  <Heart className="w-4 h-4 mr-1" />
                  Comfort
                </TabsTrigger>
                <TabsTrigger value="coloring" className="text-sm">
                  <Palette className="w-4 h-4 mr-1" />
                  Coloring
                </TabsTrigger>
                <TabsTrigger value="stories" className="text-sm">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Stories
                </TabsTrigger>
                <TabsTrigger value="music" className="text-sm">
                  <Music className="w-4 h-4 mr-1" />
                  Music
                </TabsTrigger>
                <TabsTrigger value="breathing" className="text-sm">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Breathing
                </TabsTrigger>
              </TabsList>

              {/* Comfort Items Tab */}
              <TabsContent value="comfort" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Comfort Items</h3>
                  <p className="text-gray-600">Select items that make you feel safe and cozy</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {comfortItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedComfortItem === item.id ? "ring-4 ring-pink-400 shadow-lg" : "hover:shadow-md"
                      } comfort-item`}
                      onClick={() => handleComfortItemClick(item.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 text-3xl`}
                        >
                          {item.emoji}
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        {selectedComfortItem === item.id && (
                          <Badge className="mt-2 bg-pink-400 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Selected
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedComfortItem && (
                  <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200">
                    <CardContent className="p-6 text-center">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        You've chosen your {comfortItems.find((item) => item.id === selectedComfortItem)?.name}!
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Take a moment to imagine holding it close. Feel its warmth and comfort surrounding you.
                      </p>
                      <div className="flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-4xl sacred-breathe">
                          {comfortItems.find((item) => item.id === selectedComfortItem)?.emoji}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Coloring Tab */}
              <TabsContent value="coloring" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Gentle Coloring</h3>
                  <p className="text-gray-600">Choose colors and create something beautiful</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {colorPalette.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-gray-800 scale-110" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>

                <Card className="bg-white border-2 border-dashed border-gray-300">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">🌸</div>
                      <p className="text-gray-600">
                        Imagine coloring this beautiful flower with your chosen color:
                        <span
                          className="inline-block w-4 h-4 rounded-full ml-2 border border-gray-300"
                          style={{ backgroundColor: selectedColor }}
                        ></span>
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        Close your eyes and visualize painting gentle strokes with your favorite color
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stories Tab */}
              <TabsContent value="stories" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Bedtime Stories</h3>
                  <p className="text-gray-600">Gentle stories to help you relax and feel safe</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {bedtimeStories.map((story) => (
                    <Card key={story.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-800">{story.title}</CardTitle>
                        <p className="text-sm text-gray-600">{story.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{story.duration}</Badge>
                          <Button
                            size="sm"
                            onClick={() => handleStoryPlay(story.id)}
                            className="bg-gradient-to-r from-pink-400 to-purple-400"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Listen
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 italic">"{story.content}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {currentStory && (
                  <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                          Now Playing: {bedtimeStories.find((s) => s.id === currentStory)?.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={togglePlayPause}>
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={toggleMute}>
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Volume:</span>
                          <Slider
                            value={volume}
                            onValueChange={setVolume}
                            max={100}
                            step={1}
                            className="flex-1"
                            disabled={isMuted}
                          />
                          <span className="text-sm text-gray-600 w-8">{isMuted ? 0 : volume[0]}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: isPlaying ? "45%" : "0%" }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Music Tab */}
              <TabsContent value="music" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Soft Music</h3>
                  <p className="text-gray-600">Gentle lullabies and peaceful melodies</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lullabies.map((lullaby) => (
                    <Card key={lullaby.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                            <Music className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{lullaby.title}</h4>
                            <p className="text-sm text-gray-600">{lullaby.duration}</p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Music Player</h4>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Button size="sm" variant="ghost">
                        <SkipForward className="w-4 h-4 rotate-180" />
                      </Button>
                      <Button size="lg" className="bg-gradient-to-r from-pink-400 to-purple-400">
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 text-gray-600" />
                      <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
                      <span className="text-sm text-gray-600 w-8">{volume[0]}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Breathing Tab */}
              <TabsContent value="breathing" className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Gentle Breathing</h3>
                  <p className="text-gray-600">Calm your mind with guided breathing exercises</p>
                </div>

                <Card className="bg-gradient-to-r from-blue-100 to-green-100 border-blue-200">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div
                        className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center transition-all duration-4000 ${
                          breathingActive
                            ? breathingPhase === "inhale"
                              ? "scale-110"
                              : breathingPhase === "hold"
                                ? "scale-110"
                                : "scale-90"
                            : "scale-100"
                        }`}
                      >
                        <div className="text-white text-lg font-semibold">
                          {breathingActive
                            ? breathingPhase === "inhale"
                              ? "Breathe In"
                              : breathingPhase === "hold"
                                ? "Hold"
                                : "Breathe Out"
                            : "Ready"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        onClick={() => setBreathingActive(!breathingActive)}
                        className={`${
                          breathingActive
                            ? "bg-gradient-to-r from-red-400 to-pink-400"
                            : "bg-gradient-to-r from-blue-400 to-green-400"
                        }`}
                      >
                        {breathingActive ? "Stop Breathing Exercise" : "Start Breathing Exercise"}
                      </Button>

                      <p className="text-sm text-gray-600">
                        {breathingActive
                          ? "Follow the circle and breathe along. Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds."
                          : "Click to start a gentle breathing exercise that will help you feel calm and centered."}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-xl">🫁</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">Deep Breathing</h4>
                      <p className="text-sm text-gray-600">Slow, deep breaths to calm anxiety</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-xl">🌱</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">Grounding</h4>
                      <p className="text-sm text-gray-600">Connect with the present moment</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-xl">💜</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">Self-Love</h4>
                      <p className="text-sm text-gray-600">Breathe in love, breathe out peace</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
