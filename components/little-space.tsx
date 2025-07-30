"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Heart, Palette, BookOpen, Music, Wind } from "lucide-react"

export function LittleSpace() {
  const [currentActivity, setCurrentActivity] = useState("comfort")
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState("inhale")
  const [musicVolume, setMusicVolume] = useState([50])
  const [selectedColor, setSelectedColor] = useState("#FFB6C1")

  // Breathing exercise timer
  useEffect(() => {
    if (!breathingActive) return

    const breathingCycle = setInterval(() => {
      setBreathingPhase((prev) => {
        if (prev === "inhale") return "hold"
        if (prev === "hold") return "exhale"
        return "inhale"
      })
    }, 4000)

    return () => clearInterval(breathingCycle)
  }, [breathingActive])

  const comfortItems = [
    { name: "Soft Teddy Bear", emoji: "🧸", comfort: "Warm hugs available" },
    { name: "Cozy Blanket", emoji: "🛋️", comfort: "Wrapped in safety" },
    { name: "Hot Cocoa", emoji: "☕", comfort: "Warm and sweet" },
    { name: "Favorite Snacks", emoji: "🍪", comfort: "Comfort food ready" },
    { name: "Gentle Music", emoji: "🎵", comfort: "Soothing melodies" },
    { name: "Fairy Lights", emoji: "✨", comfort: "Magical ambiance" },
  ]

  const colorPalette = ["#FFB6C1", "#E6E6FA", "#F0E68C", "#98FB98", "#87CEEB", "#DDA0DD", "#F5DEB3", "#FFA07A"]

  const gentleStories = [
    {
      title: "The Magical Garden",
      preview: "In a secret garden where flowers sing lullabies...",
      duration: "5 min",
    },
    {
      title: "Starlight Friends",
      preview: "High above the clouds, little stars dance together...",
      duration: "7 min",
    },
    {
      title: "The Cozy Cave",
      preview: "A friendly bear finds the perfect place to rest...",
      duration: "4 min",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="liberation-card text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center floating">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl afro-futuristic-text">Welcome to Little Space</CardTitle>
          <p className="text-muted-foreground">A gentle sanctuary for your inner child to rest and play</p>
        </CardHeader>
      </Card>

      {/* Activity Tabs */}
      <Tabs value={currentActivity} onValueChange={setCurrentActivity}>
        <TabsList className="grid w-full grid-cols-5 liberation-card">
          <TabsTrigger value="comfort">
            <Heart className="w-4 h-4 mr-1" />
            Comfort
          </TabsTrigger>
          <TabsTrigger value="coloring">
            <Palette className="w-4 h-4 mr-1" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="stories">
            <BookOpen className="w-4 h-4 mr-1" />
            Stories
          </TabsTrigger>
          <TabsTrigger value="music">
            <Music className="w-4 h-4 mr-1" />
            Music
          </TabsTrigger>
          <TabsTrigger value="breathing">
            <Wind className="w-4 h-4 mr-1" />
            Breathe
          </TabsTrigger>
        </TabsList>

        {/* Comfort Items */}
        <TabsContent value="comfort" className="space-y-4">
          <Card className="liberation-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-400" />
                Comfort Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {comfortItems.map((item, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-pink-50/10 to-purple-50/10 border-pink-200/30"
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-2 spiritual-pulse">{item.emoji}</div>
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.comfort}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coloring Section */}
        <TabsContent value="coloring" className="space-y-4">
          <Card className="liberation-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2 text-purple-400" />
                Gentle Coloring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Color Palette */}
              <div>
                <p className="text-sm font-medium mb-2">Choose your colors:</p>
                <div className="flex flex-wrap gap-2">
                  {colorPalette.map((color, index) => (
                    <button
                      key={index}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                        selectedColor === color ? "border-white scale-110" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Simple Coloring Canvas */}
              <div className="bg-white/10 rounded-lg p-6 text-center border-2 border-dashed border-purple-300/50">
                <div className="space-y-4">
                  <div className="text-6xl spiritual-pulse">🌸</div>
                  <p className="text-muted-foreground">Coloring canvas coming soon!</p>
                  <p className="text-sm text-muted-foreground">
                    For now, imagine painting this beautiful flower with your chosen color:
                    <span
                      className="inline-block w-4 h-4 rounded-full ml-2 border border-white/30"
                      style={{ backgroundColor: selectedColor }}
                    ></span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stories Section */}
        <TabsContent value="stories" className="space-y-4">
          <Card className="liberation-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                Gentle Stories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {gentleStories.map((story, index) => (
                <Card key={index} className="bg-gradient-to-r from-blue-50/10 to-purple-50/10 border-blue-200/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{story.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{story.preview}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <Badge variant="secondary" className="text-xs">
                          {story.duration}
                        </Badge>
                        <Button size="sm" className="mt-2 w-full">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Listen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Music Section */}
        <TabsContent value="music" className="space-y-4">
          <Card className="liberation-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Music className="w-5 h-5 mr-2 text-green-400" />
                Soft Music
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Volume</label>
                  <Slider value={musicVolume} onValueChange={setMusicVolume} max={100} step={1} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Volume: {musicVolume[0]}%</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Lullaby Dreams", emoji: "🌙", playing: false },
                    { name: "Gentle Rain", emoji: "🌧️", playing: false },
                    { name: "Music Box", emoji: "🎵", playing: true },
                    { name: "Forest Sounds", emoji: "🌲", playing: false },
                  ].map((track, index) => (
                    <Card key={index} className="bg-gradient-to-r from-green-50/10 to-blue-50/10 border-green-200/30">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{track.emoji}</span>
                          <div>
                            <p className="font-medium text-sm">{track.name}</p>
                            {track.playing && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                <Music className="w-3 h-3 mr-1" />
                                Playing
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant={track.playing ? "default" : "outline"}>
                          {track.playing ? "Pause" : "Play"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Breathing Exercises */}
        <TabsContent value="breathing" className="space-y-4">
          <Card className="liberation-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wind className="w-5 h-5 mr-2 text-cyan-400" />
                Gentle Breathing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* Breathing Circle */}
              <div className="flex justify-center">
                <div
                  className={`w-32 h-32 rounded-full border-4 border-cyan-400 flex items-center justify-center transition-all duration-4000 ${
                    breathingActive
                      ? breathingPhase === "inhale"
                        ? "scale-110 bg-cyan-400/20"
                        : breathingPhase === "hold"
                          ? "scale-110 bg-cyan-400/30"
                          : "scale-90 bg-cyan-400/10"
                      : "scale-100 bg-cyan-400/10"
                  }`}
                >
                  <div className="text-center">
                    <Wind className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    {breathingActive && <p className="text-sm font-medium capitalize">{breathingPhase}</p>}
                  </div>
                </div>
              </div>

              {/* Breathing Instructions */}
              <div className="space-y-2">
                {breathingActive ? (
                  <div>
                    <p className="text-lg font-medium capitalize">{breathingPhase}</p>
                    <p className="text-sm text-muted-foreground">
                      {breathingPhase === "inhale" && "Breathe in slowly and deeply"}
                      {breathingPhase === "hold" && "Hold your breath gently"}
                      {breathingPhase === "exhale" && "Breathe out slowly and completely"}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium">Ready to breathe together?</p>
                    <p className="text-sm text-muted-foreground">Follow the gentle rhythm to calm your mind and body</p>
                  </div>
                )}
              </div>

              {/* Control Button */}
              <Button
                onClick={() => setBreathingActive(!breathingActive)}
                className={breathingActive ? "bg-red-500 hover:bg-red-600" : "bg-cyan-500 hover:bg-cyan-600"}
              >
                {breathingActive ? "Stop Breathing Exercise" : "Start Breathing Exercise"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating Comfort Elements */}
      <div className="fixed bottom-6 right-6 space-y-2 pointer-events-none">
        <div className="text-2xl floating">⭐</div>
        <div className="text-2xl floating" style={{ animationDelay: "1s" }}>
          🌙
        </div>
        <div className="text-2xl floating" style={{ animationDelay: "2s" }}>
          ✨
        </div>
      </div>
    </div>
  )
}
