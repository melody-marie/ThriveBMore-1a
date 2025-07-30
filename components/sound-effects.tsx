"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Settings,
  Cloud,
  Waves,
  TreePine,
  Flame,
  Zap,
  Wind,
  Droplets,
  Bird,
  Cat,
  Music,
  Heart,
  Moon,
  Sun,
  Coffee,
  BookOpen,
  Headphones,
} from "lucide-react"

interface SoundEffect {
  id: string
  name: string
  icon: any
  category: "nature" | "ambient" | "focus" | "sleep" | "meditation" | "comfort"
  description: string
  duration?: string
  color: string
  isLooping: boolean
}

interface PlayingSound {
  id: string
  volume: number
  isPlaying: boolean
  audioContext?: AudioContext
  source?: AudioBufferSourceNode
  gainNode?: GainNode
}

export function SoundEffects() {
  const [playingSounds, setPlayingSounds] = useState<Map<string, PlayingSound>>(new Map())
  const [masterVolume, setMasterVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [currentCategory, setCurrentCategory] = useState("nature")
  const audioContextRef = useRef<AudioContext | null>(null)

  const soundEffects: SoundEffect[] = [
    {
      id: "rain",
      name: "Gentle Rain",
      icon: Cloud,
      category: "nature",
      description: "Soft rainfall for relaxation and focus",
      color: "from-blue-400 to-blue-600",
      isLooping: true,
    },
    {
      id: "ocean",
      name: "Ocean Waves",
      icon: Waves,
      category: "nature",
      description: "Rhythmic ocean waves for deep calm",
      color: "from-cyan-400 to-blue-500",
      isLooping: true,
    },
    {
      id: "forest",
      name: "Forest Ambience",
      icon: TreePine,
      category: "nature",
      description: "Birds chirping in a peaceful forest",
      color: "from-green-400 to-green-600",
      isLooping: true,
    },
    {
      id: "fire",
      name: "Crackling Fire",
      icon: Flame,
      category: "ambient",
      description: "Warm fireplace sounds for coziness",
      color: "from-orange-400 to-red-500",
      isLooping: true,
    },
    {
      id: "thunder",
      name: "Distant Thunder",
      icon: Zap,
      category: "nature",
      description: "Gentle thunder for deep sleep",
      color: "from-purple-400 to-gray-600",
      isLooping: true,
    },
    {
      id: "wind",
      name: "Soft Wind",
      icon: Wind,
      category: "nature",
      description: "Gentle breeze through trees",
      color: "from-gray-300 to-blue-400",
      isLooping: true,
    },
    {
      id: "waterfall",
      name: "Waterfall",
      icon: Droplets,
      category: "nature",
      description: "Cascading water for meditation",
      color: "from-blue-300 to-cyan-500",
      isLooping: true,
    },
    {
      id: "birds",
      name: "Morning Birds",
      icon: Bird,
      category: "nature",
      description: "Cheerful bird songs for awakening",
      color: "from-yellow-400 to-green-500",
      isLooping: true,
    },
    {
      id: "purring",
      name: "Cat Purring",
      icon: Cat,
      category: "comfort",
      description: "Soothing cat purrs for comfort",
      color: "from-pink-300 to-purple-400",
      isLooping: true,
    },
    {
      id: "white-noise",
      name: "White Noise",
      icon: Volume2,
      category: "focus",
      description: "Pure white noise for concentration",
      color: "from-gray-400 to-gray-600",
      isLooping: true,
    },
    {
      id: "brown-noise",
      name: "Brown Noise",
      icon: Coffee,
      category: "focus",
      description: "Deep brown noise for focus",
      color: "from-amber-600 to-brown-700",
      isLooping: true,
    },
    {
      id: "pink-noise",
      name: "Pink Noise",
      icon: Heart,
      category: "sleep",
      description: "Balanced pink noise for sleep",
      color: "from-pink-400 to-rose-500",
      isLooping: true,
    },
    {
      id: "night-sounds",
      name: "Night Ambience",
      icon: Moon,
      category: "sleep",
      description: "Peaceful night sounds for bedtime",
      color: "from-indigo-500 to-purple-700",
      isLooping: true,
    },
    {
      id: "morning-sounds",
      name: "Morning Calm",
      icon: Sun,
      category: "meditation",
      description: "Gentle morning atmosphere",
      color: "from-yellow-300 to-orange-400",
      isLooping: true,
    },
    {
      id: "library",
      name: "Library Ambience",
      icon: BookOpen,
      category: "focus",
      description: "Quiet library atmosphere for studying",
      color: "from-brown-400 to-amber-600",
      isLooping: true,
    },
    {
      id: "meditation-bell",
      name: "Meditation Bell",
      icon: Music,
      category: "meditation",
      description: "Gentle bells for mindfulness",
      duration: "5 min intervals",
      color: "from-gold-400 to-yellow-600",
      isLooping: false,
    },
  ]

  useEffect(() => {
    // Initialize audio context
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      // Cleanup audio context
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const generateSoundBuffer = (type: string, duration = 2): AudioBuffer | null => {
    if (!audioContextRef.current) return null

    const sampleRate = audioContextRef.current.sampleRate
    const frameCount = sampleRate * duration
    const buffer = audioContextRef.current.createBuffer(2, frameCount, sampleRate)

    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel)

      for (let i = 0; i < frameCount; i++) {
        let sample = 0

        switch (type) {
          case "rain":
            // Generate rain-like noise
            sample = (Math.random() * 2 - 1) * 0.3 * Math.sin(i * 0.001)
            break
          case "ocean":
            // Generate wave-like sounds
            sample = Math.sin(i * 0.01) * 0.4 + (Math.random() * 2 - 1) * 0.1
            break
          case "forest":
            // Generate forest ambience with occasional bird chirps
            sample = (Math.random() * 2 - 1) * 0.2
            if (Math.random() < 0.001) {
              sample += Math.sin(i * 0.1) * 0.3
            }
            break
          case "fire":
            // Generate crackling fire sounds
            sample = (Math.random() * 2 - 1) * 0.4
            if (Math.random() < 0.01) {
              sample *= 2
            }
            break
          case "white-noise":
            sample = (Math.random() * 2 - 1) * 0.3
            break
          case "brown-noise":
            // Brown noise (lower frequencies)
            sample = (Math.random() * 2 - 1) * 0.3
            if (i > 0) {
              sample = channelData[i - 1] * 0.99 + sample * 0.01
            }
            break
          case "pink-noise":
            // Pink noise (balanced frequencies)
            sample = (Math.random() * 2 - 1) * 0.3
            if (i > 0) {
              sample = channelData[i - 1] * 0.9 + sample * 0.1
            }
            break
          case "purring":
            // Generate purring sound
            sample = Math.sin(i * 0.05) * 0.3 + (Math.random() * 2 - 1) * 0.1
            break
          default:
            sample = (Math.random() * 2 - 1) * 0.2
        }

        channelData[i] = sample
      }
    }

    return buffer
  }

  const playSound = async (soundId: string) => {
    if (!audioContextRef.current) return

    const sound = soundEffects.find((s) => s.id === soundId)
    if (!sound) return

    // Resume audio context if suspended
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume()
    }

    const buffer = generateSoundBuffer(soundId, sound.isLooping ? 10 : 5)
    if (!buffer) return

    const source = audioContextRef.current.createBufferSource()
    const gainNode = audioContextRef.current.createGain()

    source.buffer = buffer
    source.loop = sound.isLooping
    source.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    const volume = (masterVolume / 100) * (isMuted ? 0 : 1)
    gainNode.gain.setValueAtTime(volume * 0.5, audioContextRef.current.currentTime)

    source.start()

    const playingSound: PlayingSound = {
      id: soundId,
      volume: 50,
      isPlaying: true,
      audioContext: audioContextRef.current,
      source,
      gainNode,
    }

    setPlayingSounds((prev) => new Map(prev.set(soundId, playingSound)))
  }

  const stopSound = (soundId: string) => {
    const playingSound = playingSounds.get(soundId)
    if (playingSound && playingSound.source) {
      playingSound.source.stop()
      setPlayingSounds((prev) => {
        const newMap = new Map(prev)
        newMap.delete(soundId)
        return newMap
      })
    }
  }

  const toggleSound = (soundId: string) => {
    const isPlaying = playingSounds.has(soundId)
    if (isPlaying) {
      stopSound(soundId)
    } else {
      playSound(soundId)
    }
  }

  const adjustSoundVolume = (soundId: string, volume: number) => {
    const playingSound = playingSounds.get(soundId)
    if (playingSound && playingSound.gainNode) {
      const adjustedVolume = (volume / 100) * (masterVolume / 100) * (isMuted ? 0 : 1)
      playingSound.gainNode.gain.setValueAtTime(adjustedVolume, audioContextRef.current!.currentTime)

      setPlayingSounds((prev) => {
        const newMap = new Map(prev)
        const updated = { ...playingSound, volume }
        newMap.set(soundId, updated)
        return newMap
      })
    }
  }

  const stopAllSounds = () => {
    playingSounds.forEach((_, soundId) => {
      stopSound(soundId)
    })
  }

  const updateMasterVolume = (volume: number) => {
    setMasterVolume(volume)
    playingSounds.forEach((playingSound, soundId) => {
      if (playingSound.gainNode) {
        const adjustedVolume = (playingSound.volume / 100) * (volume / 100) * (isMuted ? 0 : 1)
        playingSound.gainNode.gain.setValueAtTime(adjustedVolume, audioContextRef.current!.currentTime)
      }
    })
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    playingSounds.forEach((playingSound) => {
      if (playingSound.gainNode) {
        const adjustedVolume = (playingSound.volume / 100) * (masterVolume / 100) * (!isMuted ? 0 : 1)
        playingSound.gainNode.gain.setValueAtTime(adjustedVolume, audioContextRef.current!.currentTime)
      }
    })
  }

  const filteredSounds = soundEffects.filter((sound) => currentCategory === "all" || sound.category === currentCategory)

  const categories = [
    { id: "all", name: "All Sounds", icon: Headphones },
    { id: "nature", name: "Nature", icon: TreePine },
    { id: "ambient", name: "Ambient", icon: Coffee },
    { id: "focus", name: "Focus", icon: BookOpen },
    { id: "sleep", name: "Sleep", icon: Moon },
    { id: "meditation", name: "Meditation", icon: Heart },
    { id: "comfort", name: "Comfort", icon: Cat },
  ]

  return (
    <Card className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Sound Effects & Ambience
            </h2>
            <p className="text-sm text-gray-600">Create your perfect audio environment</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Master Controls */}
        <Card className="bg-white/80 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={toggleMute} className="text-indigo-600 hover:bg-indigo-100">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <span className="text-sm font-medium text-gray-700">Master Volume</span>
              </div>

              <div className="flex-1 max-w-xs">
                <Slider
                  value={[masterVolume]}
                  onValueChange={(value) => updateMasterVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <span className="text-sm text-gray-600 w-12">{masterVolume}%</span>

              <Button
                size="sm"
                onClick={stopAllSounds}
                variant="outline"
                className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Stop All
              </Button>
            </div>

            {playingSounds.size > 0 && (
              <div className="mt-4 pt-4 border-t border-indigo-200">
                <div className="flex items-center gap-2 mb-2">
                  <Music className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Now Playing ({playingSounds.size} sounds)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(playingSounds.keys()).map((soundId) => {
                    const sound = soundEffects.find((s) => s.id === soundId)
                    return sound ? (
                      <Badge key={soundId} className="bg-indigo-100 text-indigo-700">
                        {sound.name}
                      </Badge>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={currentCategory} onValueChange={setCurrentCategory}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 bg-white/60">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-indigo-200 text-xs"
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {category.name}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value={currentCategory} className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSounds.map((sound) => {
                const IconComponent = sound.icon
                const isPlaying = playingSounds.has(sound.id)
                const playingSound = playingSounds.get(sound.id)

                return (
                  <Card
                    key={sound.id}
                    className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-white/80 border-2 ${
                      isPlaying ? "border-indigo-400 shadow-lg" : "border-gray-200"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${sound.color} rounded-full flex items-center justify-center mx-auto ${
                            isPlaying ? "animate-pulse" : ""
                          }`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">{sound.name}</h3>
                          <p className="text-xs text-gray-600 mt-1">{sound.description}</p>
                          {sound.duration && <p className="text-xs text-indigo-600 mt-1">{sound.duration}</p>}
                        </div>

                        <Button
                          size="sm"
                          onClick={() => toggleSound(sound.id)}
                          className={`w-full ${
                            isPlaying
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-indigo-500 hover:bg-indigo-600 text-white"
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3 h-3 mr-1" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              Play
                            </>
                          )}
                        </Button>

                        {isPlaying && playingSound && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Volume2 className="w-3 h-3 text-gray-600" />
                              <Slider
                                value={[playingSound.volume]}
                                onValueChange={(value) => adjustSoundVolume(sound.id, value[0])}
                                max={100}
                                step={1}
                                className="flex-1"
                              />
                              <span className="text-xs text-gray-600 w-8">{playingSound.volume}%</span>
                            </div>
                          </div>
                        )}

                        <Badge className="text-xs bg-gray-100 text-gray-700">{sound.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Usage Tips */}
        <Card className="bg-white/60 border-indigo-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-indigo-700 mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Tips for Better Focus & Relaxation
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">🎧 For Focus:</h4>
                <p>Try white or brown noise at 30-50% volume. Library ambience works great for studying.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">😴 For Sleep:</h4>
                <p>Rain, ocean waves, or pink noise at low volume (20-30%) can help you drift off.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">🧘 For Meditation:</h4>
                <p>Nature sounds like forest ambience or gentle wind create a peaceful atmosphere.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">💆 For Comfort:</h4>
                <p>Cat purring or crackling fire sounds can provide emotional comfort and reduce anxiety.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default SoundEffects
