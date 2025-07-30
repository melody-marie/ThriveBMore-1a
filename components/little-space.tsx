"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Star,
  Sparkles,
  Cloud,
  Rainbow,
  Flower,
  FlowerIcon as Butterfly,
  Cat,
  Dog,
  BeakerIcon as Bear,
  Rabbit,
  X,
  Volume2,
  VolumeX,
  Palette,
  Book,
  Music,
  Gamepad2,
  Cookie,
  Coffee,
  Cake,
  IceCream,
} from "lucide-react"

interface LittleSpaceProps {
  isVisible: boolean
  onClose: () => void
}

interface ColoringPage {
  id: string
  name: string
  difficulty: "easy" | "medium" | "hard"
  category: "animals" | "nature" | "fantasy" | "patterns"
  colors: string[]
}

interface ComfortItem {
  id: string
  name: string
  icon: any
  description: string
  comfort_level: number
  category: "plushies" | "blankets" | "snacks" | "drinks" | "activities"
}

interface Story {
  id: string
  title: string
  duration: string
  category: "bedtime" | "adventure" | "comfort" | "educational"
  age_range: string
  preview: string
}

export function LittleSpace({ isVisible, onClose }: LittleSpaceProps) {
  const [currentTab, setCurrentTab] = useState("comfort")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [currentColoring, setCurrentColoring] = useState<ColoringPage | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [comfortItems, setComfortItems] = useState<ComfortItem[]>([])

  const colorPalette = [
    "#FF6B9D",
    "#FFB5C1",
    "#FFC0CB",
    "#E6E6FA",
    "#DDA0DD",
    "#98FB98",
    "#90EE90",
    "#87CEEB",
    "#87CEFA",
    "#B0E0E6",
    "#FFE4B5",
    "#FFEFD5",
    "#FFF8DC",
    "#F0E68C",
    "#FFFFE0",
    "#FFB347",
    "#FFA500",
    "#FF7F50",
    "#FF6347",
    "#FF4500",
  ]

  const coloringPages: ColoringPage[] = [
    {
      id: "butterfly",
      name: "Pretty Butterfly",
      difficulty: "easy",
      category: "animals",
      colors: ["#FF6B9D", "#87CEEB", "#98FB98", "#FFE4B5"],
    },
    {
      id: "flower-garden",
      name: "Flower Garden",
      difficulty: "medium",
      category: "nature",
      colors: ["#FF6B9D", "#98FB98", "#FFE4B5", "#DDA0DD"],
    },
    {
      id: "teddy-bear",
      name: "Cuddly Teddy Bear",
      difficulty: "easy",
      category: "animals",
      colors: ["#FFB347", "#FFA500", "#FF6B9D", "#87CEEB"],
    },
    {
      id: "rainbow-castle",
      name: "Rainbow Castle",
      difficulty: "hard",
      category: "fantasy",
      colors: ["#FF6B9D", "#FFB347", "#98FB98", "#87CEEB", "#DDA0DD"],
    },
  ]

  const comfortItemsData: ComfortItem[] = [
    {
      id: "teddy",
      name: "Soft Teddy Bear",
      icon: Bear,
      description: "A warm, cuddly friend for comfort",
      comfort_level: 9,
      category: "plushies",
    },
    {
      id: "bunny",
      name: "Fluffy Bunny",
      icon: Rabbit,
      description: "Gentle and soft, perfect for snuggles",
      comfort_level: 8,
      category: "plushies",
    },
    {
      id: "kitty",
      name: "Sleepy Kitty",
      icon: Cat,
      description: "Purrs softly and brings peace",
      comfort_level: 9,
      category: "plushies",
    },
    {
      id: "puppy",
      name: "Happy Puppy",
      icon: Dog,
      description: "Loyal friend who's always happy to see you",
      comfort_level: 8,
      category: "plushies",
    },
    {
      id: "warm-milk",
      name: "Warm Milk",
      icon: Coffee,
      description: "Soothing and helps you feel sleepy",
      comfort_level: 7,
      category: "drinks",
    },
    {
      id: "cookies",
      name: "Chocolate Chip Cookies",
      icon: Cookie,
      description: "Sweet treats that make everything better",
      comfort_level: 8,
      category: "snacks",
    },
    {
      id: "ice-cream",
      name: "Strawberry Ice Cream",
      icon: IceCream,
      description: "Cold and sweet, perfect for happy moments",
      comfort_level: 9,
      category: "snacks",
    },
    {
      id: "cake",
      name: "Birthday Cake",
      icon: Cake,
      description: "Special treat for celebrating you",
      comfort_level: 10,
      category: "snacks",
    },
  ]

  const stories: Story[] = [
    {
      id: "sleepy-forest",
      title: "The Sleepy Forest Friends",
      duration: "12 minutes",
      category: "bedtime",
      age_range: "3-8",
      preview: "Join the woodland animals as they get ready for bed in their cozy forest home...",
    },
    {
      id: "rainbow-adventure",
      title: "The Rainbow Adventure",
      duration: "15 minutes",
      category: "adventure",
      age_range: "4-10",
      preview: "Follow Luna as she discovers a magical rainbow that leads to a land of wonder...",
    },
    {
      id: "gentle-dragon",
      title: "The Gentle Dragon",
      duration: "10 minutes",
      category: "comfort",
      age_range: "3-7",
      preview: "Meet Sparkle, a kind dragon who helps children feel brave and loved...",
    },
    {
      id: "counting-stars",
      title: "Counting Stars",
      duration: "8 minutes",
      category: "bedtime",
      age_range: "2-6",
      preview: "A peaceful journey through the night sky, counting twinkling stars...",
    },
  ]

  const activities = [
    {
      id: "breathing",
      name: "Bubble Breathing",
      icon: Cloud,
      description: "Breathe in like you're smelling flowers, breathe out like you're blowing bubbles",
      duration: "5 minutes",
    },
    {
      id: "counting",
      name: "Counting Game",
      icon: Star,
      description: "Count pretty things: stars, flowers, butterflies, and more!",
      duration: "10 minutes",
    },
    {
      id: "colors",
      name: "Color Hunt",
      icon: Rainbow,
      description: "Find all the colors of the rainbow around you",
      duration: "15 minutes",
    },
    {
      id: "music",
      name: "Gentle Music",
      icon: Music,
      description: "Listen to soft, calming melodies",
      duration: "20 minutes",
    },
  ]

  useEffect(() => {
    setComfortItems(comfortItemsData)
  }, [])

  const playComfortSound = () => {
    if (soundEnabled) {
      // Create gentle chime sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2) // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4) // G5

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.6)
    }
  }

  const selectComfortItem = (item: ComfortItem) => {
    playComfortSound()
    // Add visual feedback or animation here
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 z-50 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-pink-300 animate-bounce">
          <Heart className="w-8 h-8" />
        </div>
        <div className="absolute top-20 right-20 text-purple-300 animate-pulse">
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute bottom-20 left-20 text-blue-300 animate-bounce" style={{ animationDelay: "1s" }}>
          <Butterfly className="w-10 h-10" />
        </div>
        <div className="absolute bottom-10 right-10 text-yellow-300 animate-pulse" style={{ animationDelay: "2s" }}>
          <Flower className="w-8 h-8" />
        </div>
        <div className="absolute top-1/2 left-5 text-green-300 animate-bounce" style={{ animationDelay: "0.5s" }}>
          <Rainbow className="w-12 h-12" />
        </div>
        <div className="absolute top-1/3 right-5 text-pink-300 animate-pulse" style={{ animationDelay: "1.5s" }}>
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Little Space
              </h1>
              <p className="text-sm text-gray-600">Your safe, cozy corner 🧸💕</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-pink-600 hover:bg-pink-100"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose} className="text-pink-600 hover:bg-pink-100">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-hidden">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm mb-6">
            <TabsTrigger value="comfort" className="data-[state=active]:bg-pink-200">
              <Heart className="w-4 h-4 mr-2" />
              Comfort
            </TabsTrigger>
            <TabsTrigger value="coloring" className="data-[state=active]:bg-purple-200">
              <Palette className="w-4 h-4 mr-2" />
              Coloring
            </TabsTrigger>
            <TabsTrigger value="stories" className="data-[state=active]:bg-blue-200">
              <Book className="w-4 h-4 mr-2" />
              Stories
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-green-200">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="music" className="data-[state=active]:bg-yellow-200">
              <Music className="w-4 h-4 mr-2" />
              Music
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="comfort" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-pink-600 mb-2">Comfort Corner</h2>
                    <p className="text-gray-600">Choose something that makes you feel safe and happy 💕</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {comfortItems.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Card
                          key={item.id}
                          className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-white/80 backdrop-blur-sm border-pink-200"
                          onClick={() => selectComfortItem(item)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-3">
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                            <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                            <div className="flex justify-center">
                              {[...Array(5)].map((_, i) => (
                                <Heart
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(item.comfort_level / 2)
                                      ? "text-pink-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge className="mt-2 bg-pink-100 text-pink-700 text-xs">{item.category}</Badge>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200">
                    <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">Gentle Reminders 🌸</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-pink-50 rounded-lg p-4">
                        <h4 className="font-semibold text-pink-700 mb-2">You are safe here 🛡️</h4>
                        <p className="text-sm text-gray-600">
                          This is your special space where you can be exactly who you are.
                        </p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-700 mb-2">You are loved 💜</h4>
                        <p className="text-sm text-gray-600">You deserve kindness, comfort, and all the good things.</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-700 mb-2">It's okay to feel little 🧸</h4>
                        <p className="text-sm text-gray-600">
                          Your feelings are valid and this is a healthy way to cope.
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-700 mb-2">Take your time 🌱</h4>
                        <p className="text-sm text-gray-600">
                          There's no rush. Stay as long as you need to feel better.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="coloring" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-purple-600 mb-2">Coloring Pages</h2>
                    <p className="text-gray-600">Pick your favorite colors and create something beautiful! 🎨</p>
                  </div>

                  {!currentColoring ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {coloringPages.map((page) => (
                        <Card
                          key={page.id}
                          className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-white/80 backdrop-blur-sm border-purple-200"
                          onClick={() => setCurrentColoring(page)}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                              <Palette className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{page.name}</h3>
                            <div className="flex justify-center gap-2 mb-3">
                              {page.colors.slice(0, 4).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <Badge
                              className={`text-xs ${
                                page.difficulty === "easy"
                                  ? "bg-green-100 text-green-700"
                                  : page.difficulty === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {page.difficulty}
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-purple-600">{currentColoring.name}</h3>
                        <Button
                          onClick={() => setCurrentColoring(null)}
                          variant="outline"
                          className="border-purple-300 text-purple-600"
                        >
                          Back to Pages
                        </Button>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg p-4 border-2 border-dashed border-purple-300 min-h-96 flex items-center justify-center">
                              <div className="text-center text-gray-500">
                                <Palette className="w-16 h-16 mx-auto mb-4 text-purple-300" />
                                <p>Coloring canvas would appear here</p>
                                <p className="text-sm mt-2">Interactive coloring functionality coming soon!</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-purple-600 mb-4">Color Palette</h4>
                            <div className="grid grid-cols-4 gap-2 mb-6">
                              {colorPalette.map((color, index) => (
                                <button
                                  key={index}
                                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                                    selectedColors.includes(color)
                                      ? "border-purple-500 shadow-lg"
                                      : "border-white shadow-sm"
                                  }`}
                                  style={{ backgroundColor: color }}
                                  onClick={() => {
                                    if (selectedColors.includes(color)) {
                                      setSelectedColors(selectedColors.filter((c) => c !== color))
                                    } else {
                                      setSelectedColors([...selectedColors, color])
                                    }
                                  }}
                                />
                              ))}
                            </div>

                            <div className="space-y-3">
                              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Magic Fill
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full border-purple-300 text-purple-600 bg-transparent"
                              >
                                Clear All
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full border-purple-300 text-purple-600 bg-transparent"
                              >
                                Save Picture
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="stories" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-blue-600 mb-2">Story Time</h2>
                    <p className="text-gray-600">Cozy up and listen to gentle stories 📚✨</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {stories.map((story) => (
                      <Card
                        key={story.id}
                        className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-white/80 backdrop-blur-sm border-blue-200"
                        onClick={() => setCurrentStory(story)}
                      >
                        <CardHeader>
                          <CardTitle className="text-blue-700 flex items-center gap-2">
                            <Book className="w-5 h-5" />
                            {story.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm mb-4">{story.preview}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <Badge className="bg-blue-100 text-blue-700">{story.category}</Badge>
                            <span>{story.duration}</span>
                            <span>Ages {story.age_range}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {currentStory && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-blue-600">{currentStory.title}</h3>
                        <Button
                          onClick={() => setCurrentStory(null)}
                          variant="outline"
                          className="border-blue-300 text-blue-600"
                        >
                          Close Story
                        </Button>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
                        <Book className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                        <p className="text-gray-600 mb-4">Audio story player would appear here</p>
                        <div className="flex justify-center gap-4">
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white">▶️ Play Story</Button>
                          <Button variant="outline" className="border-blue-300 text-blue-600 bg-transparent">
                            ⏸️ Pause
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="activities" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-green-600 mb-2">Gentle Activities</h2>
                    <p className="text-gray-600">Fun and calming activities to help you feel better 🌈</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {activities.map((activity) => {
                      const IconComponent = activity.icon
                      return (
                        <Card
                          key={activity.id}
                          className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-white/80 backdrop-blur-sm border-green-200"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-green-700 mb-2">{activity.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                                <div className="flex items-center justify-between">
                                  <Badge className="bg-green-100 text-green-700 text-xs">{activity.duration}</Badge>
                                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                                    Start Activity
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-200">
                    <h3 className="text-xl font-bold text-green-600 mb-4 text-center">Breathing Exercise 🫧</h3>
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                        <Cloud className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Breathe in slowly through your nose... hold for 3 seconds... breathe out slowly through your
                        mouth
                      </p>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">Start Breathing Exercise</Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="music" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-yellow-600 mb-2">Gentle Music</h2>
                    <p className="text-gray-600">Soft melodies to help you relax and feel peaceful 🎵</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Lullaby Dreams", duration: "15:30", mood: "sleepy" },
                      { name: "Forest Sounds", duration: "20:00", mood: "peaceful" },
                      { name: "Gentle Piano", duration: "12:45", mood: "calm" },
                      { name: "Ocean Waves", duration: "25:00", mood: "relaxing" },
                      { name: "Music Box Melodies", duration: "18:20", mood: "nostalgic" },
                      { name: "Soft Humming", duration: "10:15", mood: "comforting" },
                    ].map((track, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-white/80 backdrop-blur-sm border-yellow-200"
                      >
                        <CardContent className="p-4 text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Music className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-1">{track.name}</h3>
                          <p className="text-xs text-gray-600 mb-2">{track.duration}</p>
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs mb-3">{track.mood}</Badge>
                          <Button size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                            ▶️ Play
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-yellow-200">
                    <h3 className="text-xl font-bold text-yellow-600 mb-4 text-center">Now Playing 🎶</h3>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Music className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">Select a song to play</h4>
                      <p className="text-gray-600 text-sm mb-4">Your music will appear here with playback controls</p>
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" className="border-yellow-300 text-yellow-600 bg-transparent">
                          ⏮️ Previous
                        </Button>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">⏸️ Pause</Button>
                        <Button variant="outline" className="border-yellow-300 text-yellow-600 bg-transparent">
                          ⏭️ Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default LittleSpace
