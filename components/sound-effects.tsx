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
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  X,
  Heart,
  Waves,
  Zap,
  Moon,
  Sun,
  TreePine,
  CloudRain,
  Wind,
  Music,
} from "lucide-react"

interface SoundEffectsProps {
  isVisible: boolean
  onClose: () => void
}

interface AudioTrack {
  id: string
  title: string
  category: string
  frequency?: number
  duration: number
  description: string
  icon: any
  color: string
  isPlaying?: boolean
  volume?: number
}

export function SoundEffects({ isVisible, onClose }: SoundEffectsProps) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([70])
  const [currentTime, setCurrentTime] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [activeCategory, setActiveCategory] = useState("healing")

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const healingTracks: AudioTrack[] = [
    {
      id: "432hz",
      title: "432Hz Sacred Frequency",
      category: "healing",
      frequency: 432,
      duration: 1800, // 30 minutes
      description: "The frequency of the universe - promotes healing and spiritual connection",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "528hz",
      title: "528Hz Love Frequency",
      category: "healing",
      frequency: 528,
      duration: 1200, // 20 minutes
      description: "The frequency of love and DNA repair - promotes transformation",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "741hz",
      title: "741Hz Cleansing Frequency",
      category: "healing",
      frequency: 741,
      duration: 900, // 15 minutes
      description: "Cleanses toxins and electromagnetic radiation",
      icon: Waves,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "binaural-alpha",
      title: "Alpha Wave Binaural Beats",
      category: "healing",
      frequency: 10, // 10Hz alpha waves
      duration: 1800,
      description: "Promotes relaxation and creative thinking",
      icon: Music,
      color: "from-purple-500 to-indigo-500",
    },
  ]

  const natureTracks: AudioTrack[] = [
    {
      id: "forest",
      title: "Enchanted Forest",
      category: "nature",
      duration: 2400, // 40 minutes
      description: "Birds chirping, leaves rustling, gentle forest ambiance",
      icon: TreePine,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "rain",
      title: "Gentle Rain",
      category: "nature",
      duration: 1800,
      description: "Soft rainfall with distant thunder",
      icon: CloudRain,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "ocean",
      title: "Ocean Waves",
      category: "nature",
      duration: 2100,
      description: "Rhythmic ocean waves on a peaceful shore",
      icon: Waves,
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: "wind",
      title: "Mountain Wind",
      category: "nature",
      duration: 1500,
      description: "Gentle mountain breeze through trees",
      icon: Wind,
      color: "from-gray-400 to-slate-500",
    },
  ]

  const meditationTracks: AudioTrack[] = [
    {
      id: "breathing",
      title: "Guided Breathing",
      category: "meditation",
      duration: 600, // 10 minutes
      description: "4-7-8 breathing technique for anxiety relief",
      icon: Sun,
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: "body-scan",
      title: "Body Scan Meditation",
      category: "meditation",
      duration: 1200,
      description: "Progressive relaxation and body awareness",
      icon: Heart,
      color: "from-pink-400 to-rose-500",
    },
    {
      id: "loving-kindness",
      title: "Loving Kindness",
      category: "meditation",
      duration: 900,
      description: "Cultivate compassion for self and others",
      icon: Heart,
      color: "from-rose-400 to-pink-500",
    },
    {
      id: "sleep-story",
      title: "Sleep Story: Starlight Journey",
      category: "meditation",
      duration: 1800,
      description: "Peaceful bedtime story for deep rest",
      icon: Moon,
      color: "from-indigo-500 to-purple-600",
    },
  ]

  const allTracks = [...healingTracks, ...natureTracks, ...meditationTracks]

  const getCurrentTracks = () => {
    switch (activeCategory) {
      case "healing":
        return healingTracks
      case "nature":
        return natureTracks
      case "meditation":
        return meditationTracks
      default:
        return allTracks
    }
  }

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Generate audio for frequency-based tracks
  const generateFrequencyAudio = (frequency: number) => {
    if (!audioContextRef.current) return

    // Stop any existing oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current.disconnect()
    }

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

    // Set volume
    gainNode.gain.setValueAtTime((volume[0] / 100) * 0.3, audioContext.currentTime) // Keep it gentle

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    oscillatorRef.current = oscillator
    gainNodeRef.current = gainNode
  }

  // Generate nature sounds using Web Audio API
  const generateNatureAudio = (trackId: string) => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    const gainNode = audioContext.createGain()
    gainNode.gain.setValueAtTime((volume[0] / 100) * 0.4, audioContext.currentTime)

    // Create different nature sounds using noise and filters
    switch (trackId) {
      case "rain":
        // Generate rain sound using white noise and filtering
        const rainBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 2, audioContext.sampleRate)
        for (let channel = 0; channel < rainBuffer.numberOfChannels; channel++) {
          const channelData = rainBuffer.getChannelData(channel)
          for (let i = 0; i < channelData.length; i++) {
            channelData[i] = (Math.random() * 2 - 1) * 0.1
          }
        }
        const rainSource = audioContext.createBufferSource()
        rainSource.buffer = rainBuffer
        rainSource.loop = true
        rainSource.connect(gainNode)
        gainNode.connect(audioContext.destination)
        rainSource.start()
        break

      case "ocean":
        // Generate ocean waves using low-frequency oscillation
        const waveOsc = audioContext.createOscillator()
        const waveGain = audioContext.createGain()
        waveOsc.type = "sine"
        waveOsc.frequency.setValueAtTime(0.1, audioContext.currentTime)
        waveGain.gain.setValueAtTime(0.3, audioContext.currentTime)
        waveOsc.connect(waveGain)
        waveGain.connect(gainNode)
        gainNode.connect(audioContext.destination)
        waveOsc.start()
        break

      default:
        // Default ambient sound
        const ambientOsc = audioContext.createOscillator()
        ambientOsc.type = "sine"
        ambientOsc.frequency.setValueAtTime(200, audioContext.currentTime)
        const ambientGain = audioContext.createGain()
        ambientGain.gain.setValueAtTime(0.1, audioContext.currentTime)
        ambientOsc.connect(ambientGain)
        ambientGain.connect(gainNode)
        gainNode.connect(audioContext.destination)
        ambientOsc.start()
    }

    gainNodeRef.current = gainNode
  }

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setCurrentTime(0)

    if (track.frequency) {
      generateFrequencyAudio(track.frequency)
    } else if (track.category === "nature") {
      generateNatureAudio(track.id)
    } else {
      // For meditation tracks, use a gentle tone
      generateFrequencyAudio(256) // Middle C
    }

    // Start timer
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= track.duration) {
          if (isRepeating) {
            return 0
          } else {
            stopTrack()
            return prev
          }
        }
        return prev + 1
      })
    }, 1000)
  }

  const stopTrack = () => {
    setIsPlaying(false)

    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current.disconnect()
      oscillatorRef.current = null
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect()
      gainNodeRef.current = null
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      stopTrack()
    } else if (currentTrack) {
      playTrack(currentTrack)
    }
  }

  const nextTrack = () => {
    const tracks = getCurrentTracks()
    if (!currentTrack) return

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    const nextIndex = isShuffled ? Math.floor(Math.random() * tracks.length) : (currentIndex + 1) % tracks.length

    stopTrack()
    playTrack(tracks[nextIndex])
  }

  const previousTrack = () => {
    const tracks = getCurrentTracks()
    if (!currentTrack) return

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1

    stopTrack()
    playTrack(tracks[prevIndex])
  }

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime((volume[0] / 100) * 0.3, audioContextRef.current.currentTime)
    }
  }, [volume])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTrack()
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden liberation-card mystical-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 spiritual-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center sacred-breathe">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl afro-futuristic-text">Sacred Sound Healing</CardTitle>
              <p className="text-muted-foreground">Therapeutic frequencies and healing audio experiences</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-red-100">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 overflow-y-auto max-h-[70vh] sigil-pattern">
          {/* Current Track Player */}
          {currentTrack && (
            <Card className="liberation-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${currentTrack.color} rounded-full flex items-center justify-center sacred-breathe`}
                  >
                    <currentTrack.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{currentTrack.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentTrack.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{currentTrack.category}</Badge>
                      {currentTrack.frequency && (
                        <Badge className="encrypted-badge">
                          <Zap className="w-2 h-2 mr-1" />
                          {currentTrack.frequency}Hz
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(currentTrack.duration)}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                      style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={isShuffled ? "bg-purple-100" : ""}
                  >
                    <Shuffle className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={previousTrack}>
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    size="lg"
                    onClick={togglePlayPause}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextTrack}>
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsRepeating(!isRepeating)}
                    className={isRepeating ? "bg-purple-100" : ""}
                  >
                    <Repeat className="w-4 h-4" />
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                  <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground w-8">{volume[0]}%</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Track Categories */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3 liberation-card">
              <TabsTrigger value="healing">Healing Frequencies</TabsTrigger>
              <TabsTrigger value="nature">Nature Sounds</TabsTrigger>
              <TabsTrigger value="meditation">Guided Meditation</TabsTrigger>
            </TabsList>

            <TabsContent value="healing" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {healingTracks.map((track) => {
                  const IconComponent = track.icon
                  const isCurrentTrack = currentTrack?.id === track.id

                  return (
                    <Card
                      key={track.id}
                      className={`liberation-card cursor-pointer transition-all hover:scale-105 ${
                        isCurrentTrack ? "ring-2 ring-green-500" : ""
                      }`}
                      onClick={() => playTrack(track)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${track.color} rounded-full flex items-center justify-center`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{track.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{track.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {formatTime(track.duration)}
                              </Badge>
                              {track.frequency && (
                                <Badge className="encrypted-badge text-xs">
                                  <Zap className="w-2 h-2 mr-1" />
                                  {track.frequency}Hz
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            {isCurrentTrack && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="nature" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {natureTracks.map((track) => {
                  const IconComponent = track.icon
                  const isCurrentTrack = currentTrack?.id === track.id

                  return (
                    <Card
                      key={track.id}
                      className={`liberation-card cursor-pointer transition-all hover:scale-105 ${
                        isCurrentTrack ? "ring-2 ring-green-500" : ""
                      }`}
                      onClick={() => playTrack(track)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${track.color} rounded-full flex items-center justify-center`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{track.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{track.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {formatTime(track.duration)}
                            </Badge>
                          </div>
                          <Button size="sm" variant="ghost">
                            {isCurrentTrack && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="meditation" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {meditationTracks.map((track) => {
                  const IconComponent = track.icon
                  const isCurrentTrack = currentTrack?.id === track.id

                  return (
                    <Card
                      key={track.id}
                      className={`liberation-card cursor-pointer transition-all hover:scale-105 ${
                        isCurrentTrack ? "ring-2 ring-green-500" : ""
                      }`}
                      onClick={() => playTrack(track)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${track.color} rounded-full flex items-center justify-center`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{track.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{track.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {formatTime(track.duration)}
                            </Badge>
                          </div>
                          <Button size="sm" variant="ghost">
                            {isCurrentTrack && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Healing Information */}
          <Card className="liberation-card spiritual-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 afro-futuristic-text">Sound Healing Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">Healing Frequencies:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 432Hz: Universal harmony and healing</li>
                    <li>• 528Hz: Love frequency and DNA repair</li>
                    <li>• 741Hz: Cleansing and detoxification</li>
                    <li>• Alpha waves: Relaxation and creativity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">Therapeutic Benefits:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Reduces anxiety and stress</li>
                    <li>• Improves sleep quality</li>
                    <li>• Enhances meditation practice</li>
                    <li>• Promotes emotional healing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
