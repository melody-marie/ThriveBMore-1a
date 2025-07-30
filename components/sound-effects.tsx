"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Headphones,
  Heart,
  Brain,
  Moon,
  Waves,
  Wind,
  Zap,
  Sparkles,
  X,
  Minimize2,
  Maximize2,
  Info,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
} from "lucide-react"

interface SoundEffectsProps {
  isVisible: boolean
  onClose: () => void
}

interface SoundSource {
  id: string
  name: string
  description: string
  category: "frequency" | "nature" | "binaural" | "ambient" | "guided"
  frequency?: number
  icon: any
  color: string
  isPlaying: boolean
  volume: number
  benefits: string[]
  usage: string
  duration?: string
  audioUrl?: string
}

export function SoundEffects({ isVisible, onClose }: SoundEffectsProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [masterVolume, setMasterVolume] = useState([70])
  const [isMasterMuted, setIsMasterMuted] = useState(false)
  const [activeTab, setActiveTab] = useState("healing")
  const [currentPlaylist, setCurrentPlaylist] = useState<string[]>([])
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map())
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map())
  const masterGainRef = useRef<GainNode | null>(null)
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map())

  const [soundSources, setSoundSources] = useState<SoundSource[]>([
    {
      id: "432hz",
      name: "432Hz Sacred Healing",
      description: "The frequency of universal healing and cellular repair",
      category: "frequency",
      frequency: 432,
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      isPlaying: false,
      volume: 50,
      benefits: ["Cellular healing", "Stress reduction", "Emotional balance", "DNA repair"],
      usage: "Use for 15-20 minutes during meditation or rest. Best with headphones.",
      duration: "∞",
    },
    {
      id: "528hz",
      name: "528Hz Love Frequency",
      description: "The miracle tone of love, DNA repair, and transformation",
      category: "frequency",
      frequency: 528,
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
      isPlaying: false,
      volume: 50,
      benefits: ["DNA repair", "Love & compassion", "Transformation", "Miracles"],
      usage: "Perfect for heart chakra healing and self-love practices. 20-30 minutes recommended.",
      duration: "∞",
    },
    {
      id: "741hz",
      name: "741Hz Detox & Cleanse",
      description: "Cleansing frequency for removing toxins and negative energy",
      category: "frequency",
      frequency: 741,
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      isPlaying: false,
      volume: 50,
      benefits: ["Detoxification", "Mental clarity", "Problem solving", "Intuition"],
      usage: "Use when feeling mentally foggy or emotionally heavy. 15-25 minutes.",
      duration: "∞",
    },
    {
      id: "rain",
      name: "Gentle Rain",
      description: "Soft rainfall sounds for deep relaxation and focus",
      category: "nature",
      icon: Waves,
      color: "from-blue-400 to-blue-600",
      isPlaying: false,
      volume: 60,
      benefits: ["Relaxation", "Focus", "Sleep aid", "Anxiety relief"],
      usage: "Great for background ambiance during work, study, or rest.",
      duration: "60:00",
    },
    {
      id: "ocean",
      name: "Ocean Waves",
      description: "Rhythmic ocean waves for deep meditation and peace",
      category: "nature",
      icon: Waves,
      color: "from-teal-400 to-teal-600",
      isPlaying: false,
      volume: 55,
      benefits: ["Deep relaxation", "Anxiety relief", "Meditation", "Sleep"],
      usage: "Use for deep meditation or when feeling anxious. Very calming.",
      duration: "45:00",
    },
    {
      id: "forest",
      name: "Forest Sanctuary",
      description: "Gentle wind through trees with bird songs and nature sounds",
      category: "nature",
      icon: Wind,
      color: "from-green-400 to-green-600",
      isPlaying: false,
      volume: 45,
      benefits: ["Grounding", "Nature connection", "Peace", "Stress relief"],
      usage: "Perfect for grounding exercises and nature meditation.",
      duration: "50:00",
    },
    {
      id: "alpha",
      name: "Alpha Waves (10Hz)",
      description: "Binaural beats for relaxed awareness and enhanced creativity",
      category: "binaural",
      frequency: 10,
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
      isPlaying: false,
      volume: 40,
      benefits: ["Creativity", "Relaxed focus", "Learning", "Flow state"],
      usage: "Use with headphones for creative work or studying. 25-45 minutes.",
      duration: "30:00",
    },
    {
      id: "theta",
      name: "Theta Waves (6Hz)",
      description: "Deep meditation and subconscious healing frequencies",
      category: "binaural",
      frequency: 6,
      icon: Moon,
      color: "from-indigo-500 to-purple-500",
      isPlaying: false,
      volume: 35,
      benefits: ["Deep meditation", "Healing", "Intuition", "Spiritual connection"],
      usage: "Best for deep meditation and inner healing work. Requires headphones.",
      duration: "40:00",
    },
    {
      id: "guided-anxiety",
      name: "Anxiety Relief Meditation",
      description: "Trauma-informed guided meditation for anxiety and panic",
      category: "guided",
      icon: Heart,
      color: "from-pink-400 to-rose-400",
      isPlaying: false,
      volume: 65,
      benefits: ["Anxiety relief", "Panic support", "Grounding", "Safety"],
      usage: "Use during anxiety or panic episodes. Gentle, trauma-informed approach.",
      duration: "12:30",
    },
    {
      id: "guided-sleep",
      name: "Trans-Affirming Sleep Story",
      description: "Gentle bedtime story celebrating trans identity and worth",
      category: "guided",
      icon: Moon,
      color: "from-purple-400 to-pink-400",
      isPlaying: false,
      volume: 50,
      benefits: ["Better sleep", "Self-acceptance", "Comfort", "Affirmation"],
      usage: "Listen before bed for peaceful, affirming sleep. Very gentle.",
      duration: "25:00",
    },
  ])

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      masterGainRef.current = audioContextRef.current.createGain()
      masterGainRef.current.connect(audioContextRef.current.destination)
      masterGainRef.current.gain.value = masterVolume[0] / 100
    }

    return () => {
      // Cleanup
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop()
        } catch (e) {
          // Oscillator might already be stopped
        }
      })
      oscillatorsRef.current.clear()
      gainNodesRef.current.clear()
      audioElementsRef.current.forEach((audio) => {
        audio.pause()
        audio.src = ""
      })
      audioElementsRef.current.clear()
    }
  }, [])

  // Update master volume
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMasterMuted ? 0 : masterVolume[0] / 100
    }
  }, [masterVolume, isMasterMuted])

  const createFrequencySound = (
    frequency: number,
    volume: number,
  ): { oscillator: OscillatorNode; gainNode: GainNode } => {
    if (!audioContextRef.current || !masterGainRef.current) {
      throw new Error("Audio context not initialized")
    }

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)

    gainNode.gain.setValueAtTime(volume / 100, audioContextRef.current.currentTime)

    oscillator.connect(gainNode)
    gainNode.connect(masterGainRef.current)

    return { oscillator, gainNode }
  }

  const createBinauralBeats = (baseFreq: number, beatFreq: number, volume: number) => {
    if (!audioContextRef.current || !masterGainRef.current) {
      throw new Error("Audio context not initialized")
    }

    const oscillator1 = audioContextRef.current.createOscillator()
    const oscillator2 = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator1.type = "sine"
    oscillator2.type = "sine"

    oscillator1.frequency.setValueAtTime(baseFreq, audioContextRef.current.currentTime)
    oscillator2.frequency.setValueAtTime(baseFreq + beatFreq, audioContextRef.current.currentTime)

    gainNode.gain.setValueAtTime(volume / 200, audioContextRef.current.currentTime)

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(masterGainRef.current)

    return { oscillator1, oscillator2, gainNode }
  }

  const createNatureSound = (type: string, volume: number) => {
    if (!audioContextRef.current || !masterGainRef.current) {
      throw new Error("Audio context not initialized")
    }

    const gainNode = audioContextRef.current.createGain()
    gainNode.gain.setValueAtTime(volume / 100, audioContextRef.current.currentTime)
    gainNode.connect(masterGainRef.current)

    // Create procedural nature sounds using multiple oscillators and noise
    const createNoise = () => {
      const bufferSize = audioContextRef.current!.sampleRate * 2
      const noiseBuffer = audioContextRef.current!.createBuffer(1, bufferSize, audioContextRef.current!.sampleRate)
      const output = noiseBuffer.getChannelData(0)

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      const whiteNoise = audioContextRef.current!.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      const filter = audioContextRef.current!.createBiquadFilter()

      switch (type) {
        case "rain":
          filter.type = "highpass"
          filter.frequency.value = 1000
          break
        case "ocean":
          filter.type = "lowpass"
          filter.frequency.value = 800
          break
        case "forest":
          filter.type = "bandpass"
          filter.frequency.value = 2000
          filter.Q.value = 0.5
          break
      }

      whiteNoise.connect(filter)
      filter.connect(gainNode)
      whiteNoise.start()

      return whiteNoise
    }

    const noiseSource = createNoise()
    return { gainNode, noiseSource }
  }

  const playNotificationSound = () => {
    if (!audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime)
    oscillator.frequency.setValueAtTime(600, audioContextRef.current.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.2)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + 0.2)
  }

  const toggleSound = (soundId: string) => {
    setSoundSources((prev) =>
      prev.map((sound) => {
        if (sound.id === soundId) {
          const newIsPlaying = !sound.isPlaying

          if (newIsPlaying) {
            playNotificationSound()

            try {
              if (sound.category === "frequency") {
                const { oscillator, gainNode } = createFrequencySound(sound.frequency!, sound.volume)
                oscillator.start()
                oscillatorsRef.current.set(soundId, oscillator)
                gainNodesRef.current.set(soundId, gainNode)
              } else if (sound.category === "binaural") {
                const { oscillator1, oscillator2, gainNode } = createBinauralBeats(200, sound.frequency!, sound.volume)
                oscillator1.start()
                oscillator2.start()
                oscillatorsRef.current.set(soundId + "_1", oscillator1)
                oscillatorsRef.current.set(soundId + "_2", oscillator2)
                gainNodesRef.current.set(soundId, gainNode)
              } else if (sound.category === "nature") {
                const { gainNode } = createNatureSound(sound.id, sound.volume)
                gainNodesRef.current.set(soundId, gainNode)
              } else if (sound.category === "guided") {
                // For guided meditations, we would load actual audio files
                // For demo purposes, we'll create a simple tone
                const { oscillator, gainNode } = createFrequencySound(220, sound.volume)
                oscillator.start()
                oscillatorsRef.current.set(soundId, oscillator)
                gainNodesRef.current.set(soundId, gainNode)
              }
            } catch (error) {
              console.error("Error starting sound:", error)
              return sound
            }
          } else {
            const oscillator = oscillatorsRef.current.get(soundId)
            const oscillator1 = oscillatorsRef.current.get(soundId + "_1")
            const oscillator2 = oscillatorsRef.current.get(soundId + "_2")

            try {
              if (oscillator) {
                oscillator.stop()
                oscillatorsRef.current.delete(soundId)
              }
              if (oscillator1) {
                oscillator1.stop()
                oscillatorsRef.current.delete(soundId + "_1")
              }
              if (oscillator2) {
                oscillator2.stop()
                oscillatorsRef.current.delete(soundId + "_2")
              }
              gainNodesRef.current.delete(soundId)
            } catch (error) {
              console.error("Error stopping sound:", error)
            }
          }

          return { ...sound, isPlaying: newIsPlaying }
        }
        return sound
      }),
    )
  }

  const updateSoundVolume = (soundId: string, newVolume: number) => {
    setSoundSources((prev) =>
      prev.map((sound) => {
        if (sound.id === soundId) {
          const gainNode = gainNodesRef.current.get(soundId)
          if (gainNode && audioContextRef.current) {
            gainNode.gain.setValueAtTime(newVolume / 100, audioContextRef.current.currentTime)
          }
          return { ...sound, volume: newVolume }
        }
        return sound
      }),
    )
  }

  const stopAllSounds = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })
    oscillatorsRef.current.clear()
    gainNodesRef.current.clear()

    setSoundSources((prev) => prev.map((sound) => ({ ...sound, isPlaying: false })))
    playNotificationSound()
  }

  const createPlaylist = (category: string) => {
    const categoryTracks = soundSources.filter((s) => s.category === category).map((s) => s.id)
    setCurrentPlaylist(categoryTracks)
    setCurrentTrackIndex(0)
  }

  const nextTrack = () => {
    if (currentPlaylist.length === 0) return

    const currentSound = soundSources.find((s) => s.id === currentPlaylist[currentTrackIndex])
    if (currentSound?.isPlaying) {
      toggleSound(currentSound.id)
    }

    const nextIndex = isShuffled
      ? Math.floor(Math.random() * currentPlaylist.length)
      : (currentTrackIndex + 1) % currentPlaylist.length

    setCurrentTrackIndex(nextIndex)

    setTimeout(() => {
      const nextSoundId = currentPlaylist[nextIndex]
      const nextSound = soundSources.find((s) => s.id === nextSoundId)
      if (nextSound && !nextSound.isPlaying) {
        toggleSound(nextSoundId)
      }
    }, 500)
  }

  const previousTrack = () => {
    if (currentPlaylist.length === 0) return

    const currentSound = soundSources.find((s) => s.id === currentPlaylist[currentTrackIndex])
    if (currentSound?.isPlaying) {
      toggleSound(currentSound.id)
    }

    const prevIndex = currentTrackIndex === 0 ? currentPlaylist.length - 1 : currentTrackIndex - 1

    setCurrentTrackIndex(prevIndex)

    setTimeout(() => {
      const prevSoundId = currentPlaylist[prevIndex]
      const prevSound = soundSources.find((s) => s.id === prevSoundId)
      if (prevSound && !prevSound.isPlaying) {
        toggleSound(prevSoundId)
      }
    }, 500)
  }

  const categorizedSounds = {
    healing: soundSources.filter((s) => s.category === "frequency"),
    nature: soundSources.filter((s) => s.category === "nature"),
    binaural: soundSources.filter((s) => s.category === "binaural"),
    guided: soundSources.filter((s) => s.category === "guided"),
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl w-full max-w-7xl transition-all duration-300 ${
          isMinimized ? "h-20" : "h-[90vh]"
        } overflow-hidden border-4 border-green-200 sigil-background`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center sacred-breathe">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Sacred Sound Healing</h2>
              <p className="text-green-100 text-sm">Therapeutic frequencies & healing audio</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="encrypted-badge">
              <Volume2 className="w-3 h-3 mr-1" />
              {soundSources.filter((s) => s.isPlaying).length} active
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
          <div className="p-6 h-full overflow-y-auto">
            {/* Master Controls */}
            <Card className="liberation-card mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Button onClick={() => setIsMasterMuted(!isMasterMuted)} variant="ghost" size="sm">
                      {isMasterMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Master Volume:</span>
                      <Slider
                        value={masterVolume}
                        onValueChange={setMasterVolume}
                        max={100}
                        step={1}
                        className="w-32"
                        disabled={isMasterMuted}
                      />
                      <span className="text-sm w-8">{isMasterMuted ? 0 : masterVolume[0]}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button onClick={previousTrack} variant="ghost" size="sm" disabled={currentPlaylist.length === 0}>
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button onClick={nextTrack} variant="ghost" size="sm" disabled={currentPlaylist.length === 0}>
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setIsShuffled(!isShuffled)}
                      variant={isShuffled ? "default" : "ghost"}
                      size="sm"
                    >
                      <Shuffle className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setIsRepeating(!isRepeating)}
                      variant={isRepeating ? "default" : "ghost"}
                      size="sm"
                    >
                      <Repeat className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={stopAllSounds}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-700 bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Stop All
                    </Button>
                  </div>
                </div>

                {/* Current Playlist Info */}
                {currentPlaylist.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-blue-800">Current Playlist</h4>
                        <p className="text-sm text-blue-600">
                          Track {currentTrackIndex + 1} of {currentPlaylist.length} •
                          {isShuffled ? "Shuffled" : "Sequential"} • {isRepeating ? "Repeating" : "Play Once"}
                        </p>
                      </div>
                      <Button
                        onClick={() => setCurrentPlaylist([])}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600"
                      >
                        Clear Playlist
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/50">
                <TabsTrigger value="healing" className="text-sm">
                  <Heart className="w-4 h-4 mr-1" />
                  Healing Frequencies
                </TabsTrigger>
                <TabsTrigger value="nature" className="text-sm">
                  <Waves className="w-4 h-4 mr-1" />
                  Nature Sounds
                </TabsTrigger>
                <TabsTrigger value="binaural" className="text-sm">
                  <Brain className="w-4 h-4 mr-1" />
                  Binaural Beats
                </TabsTrigger>
                <TabsTrigger value="guided" className="text-sm">
                  <Moon className="w-4 h-4 mr-1" />
                  Guided Sessions
                </TabsTrigger>
              </TabsList>

              {/* Healing Frequencies Tab */}
              <TabsContent value="healing" className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Sacred Healing Frequencies</h3>
                  <p className="text-gray-600">Ancient Solfeggio frequencies for healing and transformation</p>
                  <Button
                    onClick={() => createPlaylist("frequency")}
                    className="mt-2 bg-gradient-to-r from-pink-500 to-rose-500"
                    size="sm"
                  >
                    Create Healing Playlist
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorizedSounds.healing.map((sound) => {
                    const IconComponent = sound.icon
                    return (
                      <Card key={sound.id} className="liberation-card carousel-slide">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${sound.color} rounded-full flex items-center justify-center sacred-breathe`}
                              >
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{sound.name}</CardTitle>
                                <p className="text-sm text-gray-600">{sound.frequency}Hz</p>
                              </div>
                            </div>

                            <Button
                              onClick={() => toggleSound(sound.id)}
                              size="sm"
                              className={`${
                                sound.isPlaying ? "bg-red-500 hover:bg-red-600" : `bg-gradient-to-r ${sound.color}`
                              }`}
                            >
                              {sound.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600">{sound.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Volume2 className="w-4 h-4 text-gray-500" />
                              <Slider
                                value={[sound.volume]}
                                onValueChange={(value) => updateSoundVolume(sound.id, value[0])}
                                max={100}
                                step={1}
                                className="flex-1"
                                disabled={!sound.isPlaying}
                              />
                              <span className="text-sm w-8">{sound.volume}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-gray-700">Benefits:</h5>
                            <div className="flex flex-wrap gap-1">
                              {sound.benefits.map((benefit, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-600">{sound.usage}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              {/* Nature Sounds Tab */}
              <TabsContent value="nature" className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Nature's Symphony</h3>
                  <p className="text-gray-600">Immersive natural soundscapes for relaxation and grounding</p>
                  <Button
                    onClick={() => createPlaylist("nature")}
                    className="mt-2 bg-gradient-to-r from-green-500 to-emerald-500"
                    size="sm"
                  >
                    Create Nature Playlist
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorizedSounds.nature.map((sound) => {
                    const IconComponent = sound.icon
                    return (
                      <Card key={sound.id} className="liberation-card carousel-slide">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${sound.color} rounded-full flex items-center justify-center sacred-breathe`}
                              >
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{sound.name}</CardTitle>
                                <p className="text-sm text-gray-600">{sound.duration}</p>
                              </div>
                            </div>

                            <Button
                              onClick={() => toggleSound(sound.id)}
                              size="sm"
                              className={`${
                                sound.isPlaying ? "bg-red-500 hover:bg-red-600" : `bg-gradient-to-r ${sound.color}`
                              }`}
                            >
                              {sound.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600">{sound.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Volume2 className="w-4 h-4 text-gray-500" />
                              <Slider
                                value={[sound.volume]}
                                onValueChange={(value) => updateSoundVolume(sound.id, value[0])}
                                max={100}
                                step={1}
                                className="flex-1"
                                disabled={!sound.isPlaying}
                              />
                              <span className="text-sm w-8">{sound.volume}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-gray-700">Benefits:</h5>
                            <div className="flex flex-wrap gap-1">
                              {sound.benefits.map((benefit, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-600">{sound.usage}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              {/* Binaural Beats Tab */}
              <TabsContent value="binaural" className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Binaural Beats</h3>
                  <p className="text-gray-600">Brainwave entrainment for enhanced mental states</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                    <div className="flex items-start gap-2">
                      <Headphones className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> Binaural beats require headphones to be effective. Each ear receives
                        a slightly different frequency.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => createPlaylist("binaural")}
                    className="mt-2 bg-gradient-to-r from-purple-500 to-indigo-500"
                    size="sm"
                  >
                    Create Brainwave Playlist
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {categorizedSounds.binaural.map((sound) => {
                    const IconComponent = sound.icon
                    return (
                      <Card key={sound.id} className="liberation-card carousel-slide">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${sound.color} rounded-full flex items-center justify-center sacred-breathe`}
                              >
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{sound.name}</CardTitle>
                                <p className="text-sm text-gray-600">
                                  {sound.frequency}Hz beat • {sound.duration}
                                </p>
                              </div>
                            </div>

                            <Button
                              onClick={() => toggleSound(sound.id)}
                              size="sm"
                              className={`${
                                sound.isPlaying ? "bg-red-500 hover:bg-red-600" : `bg-gradient-to-r ${sound.color}`
                              }`}
                            >
                              {sound.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600">{sound.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Volume2 className="w-4 h-4 text-gray-500" />
                              <Slider
                                value={[sound.volume]}
                                onValueChange={(value) => updateSoundVolume(sound.id, value[0])}
                                max={100}
                                step={1}
                                className="flex-1"
                                disabled={!sound.isPlaying}
                              />
                              <span className="text-sm w-8">{sound.volume}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-gray-700">Benefits:</h5>
                            <div className="flex flex-wrap gap-1">
                              {sound.benefits.map((benefit, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-600">{sound.usage}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              {/* Guided Sessions Tab */}
              <TabsContent value="guided" className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Guided Healing Sessions</h3>
                  <p className="text-gray-600">Trauma-informed meditations and affirmations for your journey</p>
                  <Button
                    onClick={() => createPlaylist("guided")}
                    className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500"
                    size="sm"
                  >
                    Create Guided Playlist
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {categorizedSounds.guided.map((sound) => {
                    const IconComponent = sound.icon
                    return (
                      <Card key={sound.id} className="liberation-card carousel-slide">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${sound.color} rounded-full flex items-center justify-center sacred-breathe`}
                              >
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{sound.name}</CardTitle>
                                <p className="text-sm text-gray-600">{sound.duration}</p>
                              </div>
                            </div>

                            <Button
                              onClick={() => toggleSound(sound.id)}
                              size="sm"
                              className={`${
                                sound.isPlaying ? "bg-red-500 hover:bg-red-600" : `bg-gradient-to-r ${sound.color}`
                              }`}
                            >
                              {sound.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600">{sound.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Volume2 className="w-4 h-4 text-gray-500" />
                              <Slider
                                value={[sound.volume]}
                                onValueChange={(value) => updateSoundVolume(sound.id, value[0])}
                                max={100}
                                step={1}
                                className="flex-1"
                                disabled={!sound.isPlaying}
                              />
                              <span className="text-sm w-8">{sound.volume}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-gray-700">Benefits:</h5>
                            <div className="flex flex-wrap gap-1">
                              {sound.benefits.map((benefit, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-600">{sound.usage}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>

            {/* Usage Guidelines */}
            <Card className="liberation-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Usage Guidelines & Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">For Focus & Productivity</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Use Alpha waves (10Hz) for creative work</li>
                      <li>• Nature sounds for background ambiance</li>
                      <li>• Keep volume at 30-50% for concentration</li>
                      <li>• Sessions of 25-45 minutes work best</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">For Sleep & Relaxation</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Use Theta waves (6Hz) for deep relaxation</li>
                      <li>• Ocean waves or gentle rain for sleep</li>
                      <li>• Lower volume (20-40%) before bedtime</li>
                      <li>• Allow 15-30 minutes to take effect</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">For Anxiety Relief</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 432Hz frequency for emotional balance</li>
                      <li>• Forest sounds for grounding</li>
                      <li>• Combine with deep breathing exercises</li>
                      <li>• Use during panic attacks for quick relief</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">For Meditation & Healing</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 528Hz for heart chakra healing</li>
                      <li>• Theta waves for deeper states</li>
                      <li>• Start with 10-15 minute sessions</li>
                      <li>• Use headphones for binaural beats</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🎧 Pro Tips for Maximum Benefit</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Create custom playlists for different moods and activities</li>
                    <li>• Use the shuffle feature to discover new combinations</li>
                    <li>• Layer different sounds (e.g., 432Hz + gentle rain) for unique experiences</li>
                    <li>• Set a consistent daily practice for best results</li>
                    <li>• Trust your intuition - your body knows what it needs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
