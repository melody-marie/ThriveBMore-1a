"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Waves,
  Wind,
  Zap,
  Moon,
  Sun,
  Sparkles,
  Phone,
} from "lucide-react"

interface SoundEffect {
  id: string
  name: string
  description: string
  frequency: number
  duration: number
  type: "healing" | "nature" | "spiritual" | "contact"
  icon: React.ReactNode
  color: string
}

interface SoundEffectsProps {
  isVisible: boolean
  onClose: () => void
}

export function SoundEffects({ isVisible, onClose }: SoundEffectsProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState<string | null>(null)
  const [volume, setVolume] = useState([70])
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const soundEffects: SoundEffect[] = [
    {
      id: "heart-coherence",
      name: "Heart Coherence",
      description: "432Hz frequency for heart chakra healing and emotional balance",
      frequency: 432,
      duration: 300, // 5 minutes
      type: "healing",
      icon: <Heart className="w-5 h-5" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "love-frequency",
      name: "Love Frequency",
      description: "528Hz 'Love Frequency' for DNA repair and transformation",
      frequency: 528,
      duration: 600, // 10 minutes
      type: "healing",
      icon: <Sparkles className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "cleansing-tone",
      name: "Cleansing Tone",
      description: "741Hz for cleansing and removing toxins from cells",
      frequency: 741,
      duration: 420, // 7 minutes
      type: "spiritual",
      icon: <Waves className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "crown-chakra",
      name: "Crown Chakra",
      description: "963Hz for crown chakra activation and spiritual connection",
      frequency: 963,
      duration: 480, // 8 minutes
      type: "spiritual",
      icon: <Sun className="w-5 h-5" />,
      color: "from-purple-500 to-violet-500",
    },
    {
      id: "grounding-earth",
      name: "Grounding Earth",
      description: "7.83Hz Schumann Resonance for grounding and earth connection",
      frequency: 7.83,
      duration: 900, // 15 minutes
      type: "nature",
      icon: <Moon className="w-5 h-5" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "theta-healing",
      name: "Theta Healing",
      description: "6Hz theta waves for deep healing and meditation",
      frequency: 6,
      duration: 1200, // 20 minutes
      type: "healing",
      icon: <Wind className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "gamma-awareness",
      name: "Gamma Awareness",
      description: "40Hz gamma waves for heightened awareness and consciousness",
      frequency: 40,
      duration: 360, // 6 minutes
      type: "spiritual",
      icon: <Zap className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "aziza-contact",
      name: "Aziza Contact Tone",
      description: "Special frequency sequence when contacting Aziza Okoro: (443) 555-1015",
      frequency: 528, // Love frequency for spiritual connection
      duration: 30, // 30 seconds
      type: "contact",
      icon: <Phone className="w-5 h-5" />,
      color: "from-gold-500 to-amber-500",
    },
  ]

  const initializeAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
    }
  }, [])

  const playSound = useCallback(
    (soundId: string) => {
      const sound = soundEffects.find((s) => s.id === soundId)
      if (!sound) return

      initializeAudioContext()

      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }

      if (audioContextRef.current && gainNodeRef.current) {
        oscillatorRef.current = audioContextRef.current.createOscillator()
        oscillatorRef.current.frequency.setValueAtTime(sound.frequency, audioContextRef.current.currentTime)
        oscillatorRef.current.type = "sine"

        // Create a more pleasant sound with envelope
        const now = audioContextRef.current.currentTime
        gainNodeRef.current.gain.setValueAtTime(0, now)
        gainNodeRef.current.gain.linearRampToValueAtTime((volume[0] / 100) * 0.1, now + 0.1)
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, now + sound.duration)

        oscillatorRef.current.connect(gainNodeRef.current)
        oscillatorRef.current.start(now)
        oscillatorRef.current.stop(now + sound.duration)

        setCurrentSound(soundId)
        setIsPlaying(true)

        // Special sequence for Aziza contact tone
        if (soundId === "aziza-contact") {
          azizaContactSequence()
        }

        oscillatorRef.current.onended = () => {
          setIsPlaying(false)
          setCurrentSound(null)
          if (isLooping) {
            setTimeout(() => playSound(soundId), 1000)
          }
        }
      }
    },
    [volume, isLooping, initializeAudioContext],
  )

  const azizaContactSequence = useCallback(() => {
    // Special sequence: 432Hz -> 528Hz -> 741Hz -> 963Hz
    const frequencies = [432, 528, 741, 963]
    const duration = 7.5 // 30 seconds total / 4 frequencies

    frequencies.forEach((freq, index) => {
      setTimeout(
        () => {
          if (audioContextRef.current && gainNodeRef.current && oscillatorRef.current) {
            oscillatorRef.current.frequency.setValueAtTime(freq, audioContextRef.current.currentTime + index * duration)
          }
        },
        index * duration * 1000,
      )
    })
  }, [])

  const stopSound = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current = null
    }
    setIsPlaying(false)
    setCurrentSound(null)
  }, [])

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      stopSound()
    } else if (currentSound) {
      playSound(currentSound)
    }
  }, [isPlaying, currentSound, playSound, stopSound])

  const handleVolumeChange = useCallback(
    (newVolume: number[]) => {
      setVolume(newVolume)
      if (gainNodeRef.current && !isMuted) {
        gainNodeRef.current.gain.setValueAtTime((newVolume[0] / 100) * 0.1, audioContextRef.current?.currentTime || 0)
      }
    },
    [isMuted],
  )

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? (volume[0] / 100) * 0.1 : 0,
        audioContextRef.current?.currentTime || 0,
      )
    }
  }, [isMuted, volume])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-4 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Waves className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Sacred Sound Healing</CardTitle>
                <p className="text-purple-100 text-sm">Therapeutic frequencies for healing and transformation</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Sound Control Panel */}
          <Card className="mb-6 liberation-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Sound Control</h3>
                <div className="flex items-center gap-2">
                  <Switch checked={isLooping} onCheckedChange={setIsLooping} />
                  <span className="text-sm text-gray-600">Loop</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4">
                <Button variant="ghost" size="sm">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500"
                  disabled={!currentSound}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button variant="ghost" size="sm">
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                  disabled={isMuted}
                />
                <span className="text-sm text-gray-600 w-12">{isMuted ? 0 : volume[0]}%</span>
              </div>

              {currentSound && (
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {soundEffects.find((s) => s.id === currentSound)?.icon}
                    <span className="font-semibold text-gray-800">
                      {soundEffects.find((s) => s.id === currentSound)?.name}
                    </span>
                    <Badge className={`bg-gradient-to-r ${soundEffects.find((s) => s.id === currentSound)?.color}`}>
                      {soundEffects.find((s) => s.id === currentSound)?.frequency}Hz
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {soundEffects.find((s) => s.id === currentSound)?.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sound Effects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soundEffects.map((sound) => (
              <Card
                key={sound.id}
                className={`liberation-card cursor-pointer transition-all hover:scale-105 ${
                  currentSound === sound.id ? "ring-2 ring-purple-400" : ""
                }`}
                onClick={() => playSound(sound.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${sound.color} rounded-full flex items-center justify-center text-white`}
                    >
                      {sound.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{sound.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {sound.frequency}Hz
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {sound.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{sound.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Duration: {Math.floor(sound.duration / 60)}:{(sound.duration % 60).toString().padStart(2, "0")}
                    </span>
                    {currentSound === sound.id && isPlaying && (
                      <Badge className="bg-green-500 text-white">Playing</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="mt-6 liberation-card border-gold-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-gold-600" />
                <h4 className="font-semibold text-gray-800">Spiritual Guidance Available</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                For personalized sound healing sessions and spiritual guidance
              </p>
              <p className="font-semibold text-gold-600">Contact Aziza Okoro: (443) 555-1015</p>
              <p className="text-xs text-gray-500 mt-1">Spiritual Practitioner & Wellness Facilitator</p>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> These sound frequencies are for wellness and meditation purposes. They are not
              intended to replace professional medical treatment. Please consult with healthcare providers for medical
              concerns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
