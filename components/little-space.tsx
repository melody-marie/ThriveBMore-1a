"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  Star,
  Sparkles,
  Palette,
  Book,
  Music,
  Gamepad2,
  Cookie,
  TurtleIcon as Teddy,
  Rainbow,
  Moon,
} from "lucide-react"

interface LittleSpaceProps {
  isVisible: boolean
  onClose: () => void
}

export default function LittleSpace({ isVisible, onClose }: LittleSpaceProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [mood, setMood] = useState<string>("happy")

  const activities = [
    {
      id: "coloring",
      name: "Digital Coloring",
      icon: Palette,
      description: "Peaceful coloring pages with gentle themes",
      color: "from-pink-400 to-rose-400",
    },
    {
      id: "stories",
      name: "Comfort Stories",
      icon: Book,
      description: "Soothing bedtime stories and fairy tales",
      color: "from-purple-400 to-indigo-400",
    },
    {
      id: "music",
      name: "Lullabies & Songs",
      icon: Music,
      description: "Gentle music and nursery rhymes",
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "games",
      name: "Simple Games",
      icon: Gamepad2,
      description: "Easy, non-competitive games",
      color: "from-green-400 to-emerald-400",
    },
    {
      id: "snacks",
      name: "Virtual Snacks",
      icon: Cookie,
      description: "Pretend tea parties and treats",
      color: "from-yellow-400 to-amber-400",
    },
    {
      id: "stuffies",
      name: "Stuffie Friends",
      icon: Teddy,
      description: "Virtual stuffed animal companions",
      color: "from-orange-400 to-red-400",
    },
  ]

  const comfortItems = [
    { name: "Soft Blankie", emoji: "🧸", comfort: 95 },
    { name: "Warm Milk", emoji: "🥛", comfort: 88 },
    { name: "Night Light", emoji: "🌙", comfort: 92 },
    { name: "Favorite Stuffie", emoji: "🐻", comfort: 98 },
    { name: "Cozy Socks", emoji: "🧦", comfort: 85 },
    { name: "Gentle Music", emoji: "🎵", comfort: 90 },
  ]

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-4 border-pink-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors text-xl"
          >
            ×
          </button>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Little Space</h1>
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-pink-100 max-w-2xl mx-auto">
              Your safe, cozy corner for when you need to feel small and cared for 💕
            </p>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto space-y-6">
          {/* Mood Check */}
          <Card className="bg-white/60 backdrop-blur-sm border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-700">
                <Heart className="w-5 h-5" />
                How are you feeling, little one?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { mood: "happy", emoji: "😊", label: "Happy" },
                  { mood: "sleepy", emoji: "😴", label: "Sleepy" },
                  { mood: "sad", emoji: "😢", label: "Sad" },
                  { mood: "scared", emoji: "😰", label: "Scared" },
                  { mood: "excited", emoji: "🤗", label: "Excited" },
                  { mood: "grumpy", emoji: "😤", label: "Grumpy" },
                  { mood: "shy", emoji: "🙈", label: "Shy" },
                  { mood: "giggly", emoji: "😄", label: "Giggly" },
                ].map((moodOption) => (
                  <Button
                    key={moodOption.mood}
                    variant={mood === moodOption.mood ? "default" : "outline"}
                    onClick={() => setMood(moodOption.mood)}
                    className={`h-16 flex-col gap-1 ${
                      mood === moodOption.mood
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                        : "border-pink-200 hover:bg-pink-50"
                    }`}
                  >
                    <span className="text-2xl">{moodOption.emoji}</span>
                    <span className="text-xs">{moodOption.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comfort Level */}
          <Card className="bg-white/60 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Star className="w-5 h-5" />
                Comfort Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {comfortItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">{item.name}</p>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Heart
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.comfort / 20) ? "text-pink-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{item.comfort}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Sparkles className="w-5 h-5" />
                Fun Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <Card
                      key={activity.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedActivity === activity.id ? "ring-2 ring-purple-400 shadow-lg" : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedActivity(activity.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{activity.name}</h3>
                        <p className="text-xs text-gray-600">{activity.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Activity Content */}
          {selectedActivity && (
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Rainbow className="w-5 h-5" />
                  {activities.find((a) => a.id === selectedActivity)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedActivity === "coloring" && (
                  <div className="text-center space-y-4">
                    <div className="w-full h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Palette className="w-12 h-12 text-gray-400 mx-auto" />
                        <p className="text-gray-600">Coloring canvas would go here</p>
                        <p className="text-sm text-gray-500">
                          Pick your favorite colors and create something beautiful!
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      {["#FF6B9D", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"].map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedActivity === "stories" && (
                  <div className="space-y-4">
                    <div className="bg-white/80 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">🌟 The Brave Little Star</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Once upon a time, in a sky full of twinkling lights, there lived a little star who was afraid to
                        shine...
                      </p>
                      <Button size="sm" className="mt-3 bg-gradient-to-r from-purple-500 to-pink-500">
                        Read More
                      </Button>
                    </div>

                    <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">🐰 The Gentle Bunny's Garden</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        In a peaceful meadow, a kind bunny tended to the most beautiful garden filled with rainbow
                        flowers...
                      </p>
                      <Button size="sm" className="mt-3 bg-gradient-to-r from-blue-500 to-cyan-500">
                        Read More
                      </Button>
                    </div>
                  </div>
                )}

                {selectedActivity === "music" && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Music className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-gray-700 mb-4">Choose a gentle song to listen to:</p>
                    </div>

                    <div className="space-y-2">
                      {[
                        "🎵 Twinkle Twinkle Little Star",
                        "🎵 You Are My Sunshine",
                        "🎵 Gentle Rain Sounds",
                        "🎵 Soft Piano Lullaby",
                      ].map((song, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start border-pink-200 hover:bg-pink-50 bg-transparent"
                        >
                          {song}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedActivity === "games" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/80 rounded-lg p-4 border border-green-200 text-center">
                        <div className="text-4xl mb-2">🎯</div>
                        <h4 className="font-semibold text-green-800">Simple Matching</h4>
                        <p className="text-sm text-gray-600">Match the cute animals!</p>
                      </div>

                      <div className="bg-white/80 rounded-lg p-4 border border-yellow-200 text-center">
                        <div className="text-4xl mb-2">🧩</div>
                        <h4 className="font-semibold text-yellow-800">Easy Puzzles</h4>
                        <p className="text-sm text-gray-600">Big pieces, gentle fun!</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedActivity === "snacks" && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-semibold text-orange-800 mb-4">🍪 Virtual Tea Party Time! 🫖</h4>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { item: "🍪", name: "Cookies" },
                        { item: "🧁", name: "Cupcakes" },
                        { item: "🍓", name: "Strawberries" },
                        { item: "🥛", name: "Warm Milk" },
                        { item: "🫖", name: "Herbal Tea" },
                        { item: "🍯", name: "Honey" },
                      ].map((snack, index) => (
                        <div
                          key={index}
                          className="bg-white/80 rounded-lg p-3 border border-orange-200 text-center cursor-pointer hover:shadow-md transition-all"
                        >
                          <div className="text-3xl mb-1">{snack.item}</div>
                          <p className="text-xs text-gray-700">{snack.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedActivity === "stuffies" && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-semibold text-red-800 mb-4">🧸 Meet Your Stuffie Friends! 🐻</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Cuddle Bear", emoji: "🧸", personality: "Gives the best hugs" },
                        { name: "Sleepy Bunny", emoji: "🐰", personality: "Loves bedtime stories" },
                        { name: "Happy Puppy", emoji: "🐶", personality: "Always ready to play" },
                        { name: "Wise Owl", emoji: "🦉", personality: "Listens to all your secrets" },
                      ].map((stuffie, index) => (
                        <div
                          key={index}
                          className="bg-white/80 rounded-lg p-4 border border-red-200 text-center cursor-pointer hover:shadow-md transition-all"
                        >
                          <div className="text-4xl mb-2">{stuffie.emoji}</div>
                          <h5 className="font-semibold text-red-800">{stuffie.name}</h5>
                          <p className="text-xs text-gray-600 mt-1">{stuffie.personality}</p>
                          <Button size="sm" className="mt-2 bg-gradient-to-r from-red-400 to-pink-400">
                            Say Hi!
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Bedtime Helper */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <Moon className="w-5 h-5" />
                Bedtime Helper
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-indigo-700 text-sm">Getting ready for sleepy time?</p>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-16 flex-col gap-1 border-indigo-200 hover:bg-indigo-50 bg-transparent"
                >
                  <Moon className="w-6 h-6 text-indigo-600" />
                  <span className="text-xs">Night Light</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-16 flex-col gap-1 border-indigo-200 hover:bg-indigo-50 bg-transparent"
                >
                  <Music className="w-6 h-6 text-indigo-600" />
                  <span className="text-xs">Lullaby</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-16 flex-col gap-1 border-indigo-200 hover:bg-indigo-50 bg-transparent"
                >
                  <Book className="w-6 h-6 text-indigo-600" />
                  <span className="text-xs">Bedtime Story</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-16 flex-col gap-1 border-indigo-200 hover:bg-indigo-50 bg-transparent"
                >
                  <Heart className="w-6 h-6 text-indigo-600" />
                  <span className="text-xs">Goodnight Hug</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer Message */}
          <div className="text-center py-4">
            <p className="text-gray-600 italic">
              "You are safe, you are loved, you are perfect just as you are, little one." 💕✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
