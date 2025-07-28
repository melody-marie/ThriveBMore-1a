"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Volume2, VolumeX, Play, Pause, Waves, Wind, Zap, Heart, Bell, Circle } from "lucide-react"

interface SoundEffect {
  id: string
  name: string
  description: string
  frequency: number
  benefits: string[]
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const soundEffects: SoundEffect[] = [
  {
    id: "singing-bowl",
    name: "Tibetan Singing Bowl",
    description: "Deep, resonant tones for meditation and grounding",
    frequency: 256,
    benefits: ["Stress relief", "Deep meditation", "Chakra balancing"],
    icon: Circle,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "healing-chimes",
    name: "Healing Chimes",
    description: "Crystal-clear tones at the healing frequency",
    frequency: 528,
    benefits: ["DNA repair", "Emotional healing", "Love frequency"],
    icon: Bell,
    color: "from-green-500 to-teal-500",
  },
  {
    id: "gentle-rain",
    name: "Gentle Rain",
    description: "Soothing rainfall sounds for relaxation",
    frequency: 0, // Pink noise
    benefits: ["Sleep aid", "Anxiety relief", "Focus enhancement"],
    icon: Waves,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "wind-chimes",
    name: "Wind Chimes",
    description: "Peaceful chimes in the sacred frequency",
    frequency: 432,
    benefits: ["Harmony", "Peace", "Spiritual connection"],
    icon: Wind,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "heartbeat",
    name: "Heartbeat Rhythm",
    description: "Comforting heartbeat for inner child work",
    frequency: 60, // 60 BPM
    benefits: ["Comfort", "Security", "Age regression support"],
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "mindfulness-bell",
    name: "Mindfulness Bell",
    description: "Clear bell tones for meditation practice",
    frequency: 440,
    benefits: ["Mindfulness", "Present moment", "Meditation anchor"],
    icon: Zap,
    color: "from-amber-500 to-yellow-500",
  },
]

export default function SoundEffects() {
  const [playingSounds, setPlayingSounds] = useState<Set<string>>(new Set())
  const [soundVolumes, setSoundVolumes] = useState<Record<string, number>>(
    soundEffects.reduce((acc, sound) => ({ ...acc, [sound.id]: 50 }), {}),
  )
  const [masterVolume, setMasterVolume] = useState([70])
  const [isMasterMuted, setIsMasterMuted] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<Record<string, OscillatorNode>>({})
  const gainNodesRef = useRef<Record<string, GainNode>>({})
  const masterGainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        masterGainRef.current = audioContextRef.current.createGain()
        masterGainRef.current.connect(audioContextRef.current.destination)
        masterGainRef.current.gain.value = masterVolume[0] / 100
      }
    }

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initAudio()
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }

    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("touchstart", handleFirstInteraction)

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)

      // Cleanup audio context
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMasterMuted ? 0 : masterVolume[0] / 100
    }
  }, [masterVolume, isMasterMuted])

  const generateSound = (soundEffect: SoundEffect) => {
    if (!audioContextRef.current || !masterGainRef.current) return null

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    if (soundEffect.id === "gentle-rain") {
      // Generate pink noise for rain
      const bufferSize = 4096
      const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
      const output = buffer.getChannelData(0)

      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.969 * b2 + white * 0.153852
        b3 = 0.8665 * b3 + white * 0.3104856
        b4 = 0.55 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.016898
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
        output[i] *= 0.11
        b6 = white * 0.115926
      }

      const source = audioContextRef.current.createBufferSource()
      source.buffer = buffer
      source.loop = true
      source.connect(gainNode)
      gainNode.connect(masterGainRef.current)

      return { oscillator: source as any, gainNode }
    } else if (soundEffect.id === "heartbeat") {
      // Generate heartbeat rhythm
      const createHeartbeat = () => {
        const now = audioContextRef.current!.currentTime
        const beat1 = audioContextRef.current!.createOscillator()
        const beat2 = audioContextRef.current!.createOscillator()
        const envelope1 = audioContextRef.current!.createGain()
        const envelope2 = audioContextRef.current!.createGain()

        beat1.frequency.value = 60
        beat2.frequency.value = 80
        beat1.type = "sine"
        beat2.type = "sine"

        beat1.connect(envelope1)
        beat2.connect(envelope2)
        envelope1.connect(gainNode)
        envelope2.connect(gainNode)

        // First beat
        envelope1.gain.setValueAtTime(0, now)
        envelope1.gain.linearRampToValueAtTime(0.3, now + 0.1)
        envelope1.gain.exponentialRampToValueAtTime(0.01, now + 0.3)

        // Second beat
        envelope2.gain.setValueAtTime(0, now + 0.3)
        envelope2.gain.linearRampToValueAtTime(0.2, now + 0.4)
        envelope2.gain.exponentialRampToValueAtTime(0.01, now + 0.6)

        beat1.start(now)
        beat1.stop(now + 0.3)
        beat2.start(now + 0.3)
        beat2.stop(now + 0.6)

        setTimeout(createHeartbeat, 1000) // 60 BPM
      }

      createHeartbeat()
      gainNode.connect(masterGainRef.current)
      return { oscillator: null, gainNode }
    } else {
      // Generate tone-based sounds
      oscillator.frequency.value = soundEffect.frequency
      oscillator.type = soundEffect.id.includes("bell") || soundEffect.id.includes("chime") ? "sine" : "triangle"

      if (soundEffect.id.includes("bowl") || soundEffect.id.includes("bell")) {
        // Add some modulation for more realistic sound
        const lfo = audioContextRef.current.createOscillator()
        const lfoGain = audioContextRef.current.createGain()
        lfo.frequency.value = 2
        lfoGain.gain.value = 10
        lfo.connect(lfoGain)
        lfoGain.connect(oscillator.frequency)
        lfo.start()
      }

      oscillator.connect(gainNode)
      gainNode.connect(masterGainRef.current)
      oscillator.start()

      return { oscillator, gainNode }
    }
  }

  const toggleSound = (soundEffect: SoundEffect) => {
    const isPlaying = playingSounds.has(soundEffect.id)

    if (isPlaying) {
      // Stop sound
      if (oscillatorsRef.current[soundEffect.id]) {
        try {
          oscillatorsRef.current[soundEffect.id].stop()
        } catch (e) {
          // Oscillator might already be stopped
        }
        delete oscillatorsRef.current[soundEffect.id]
      }
      if (gainNodesRef.current[soundEffect.id]) {
        delete gainNodesRef.current[soundEffect.id]
      }

      setPlayingSounds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(soundEffect.id)
        return newSet
      })
    } else {
      // Start sound
      const audioNodes = generateSound(soundEffect)
      if (audioNodes) {
        if (audioNodes.oscillator) {
          oscillatorsRef.current[soundEffect.id] = audioNodes.oscillator
        }
        gainNodesRef.current[soundEffect.id] = audioNodes.gainNode

        // Set initial volume
        audioNodes.gainNode.gain.value = soundVolumes[soundEffect.id] / 100

        setPlayingSounds((prev) => new Set([...prev, soundEffect.id]))
      }
    }
  }

  const handleVolumeChange = (soundId: string, volume: number[]) => {
    setSoundVolumes((prev) => ({ ...prev, [soundId]: volume[0] }))

    if (gainNodesRef.current[soundId]) {
      gainNodesRef.current[soundId].gain.value = volume[0] / 100
    }
  }

  const handleMasterVolumeChange = (volume: number[]) => {
    setMasterVolume(volume)
    if (masterGainRef.current && !isMasterMuted) {
      masterGainRef.current.gain.value = volume[0] / 100
    }
  }

  const toggleMasterMute = () => {
    setIsMasterMuted(!isMasterMuted)
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMasterMuted ? masterVolume[0] / 100 : 0
    }
  }

  const stopAllSounds = () => {
    Object.values(oscillatorsRef.current).forEach((oscillator) => {
      try {
        oscillator.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })

    oscillatorsRef.current = {}
    gainNodesRef.current = {}
    setPlayingSounds(new Set())
  }

  return (
    <div className="space-y-6">
      {/* Master Controls */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-purple-600" />
            Sound Healing Studio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={toggleMasterMute}>
              {isMasterMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Master Volume</label>
              <Slider
                value={isMasterMuted ? [0] : masterVolume}
                onValueChange={handleMasterVolumeChange}
                max={100}
                className="w-full"
              />
            </div>
            <Button variant="outline" onClick={stopAllSounds}>
              Stop All
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Mix and layer therapeutic sounds for your perfect healing environment
            </p>
            <Badge variant="secondary" className="mt-2">
              {playingSounds.size} sounds playing
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sound Effects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {soundEffects.map((sound) => {
          const isPlaying = playingSounds.has(sound.id)
          const IconComponent = sound.icon

          return (
            <Card
              key={sound.id}
              className={`transition-all hover:shadow-lg ${
                isPlaying
                  ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 shadow-md"
                  : "bg-white/60 backdrop-blur-sm border-gray-200"
              }`}
            >
              <CardContent className="p-4 space-y-4">
                {/* Sound Header */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${sound.color} rounded-lg flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{sound.name}</h3>
                    <p className="text-xs text-gray-600">
                      {sound.frequency > 0 ? `${sound.frequency} Hz` : "Pink Noise"}
                    </p>
                  </div>
                  <Button
                    onClick={() => toggleSound(sound)}
                    variant={isPlaying ? "default" : "outline"}
                    size="sm"
                    className={isPlaying ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700">{sound.description}</p>

                {/* Volume Control */}
                {isPlaying && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Volume: {soundVolumes[sound.id]}%</label>
                    <Slider
                      value={[soundVolumes[sound.id]]}
                      onValueChange={(value) => handleVolumeChange(sound.id, value)}
                      max={100}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Benefits */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {sound.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Usage Tips */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">Sound Healing Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-blue-700">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>
              <strong>Layer sounds:</strong> Combine 2-3 sounds for a richer healing experience
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>
              <strong>Use headphones:</strong> For the best therapeutic effect and frequency accuracy
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>
              <strong>Start low:</strong> Begin with lower volumes and gradually increase as needed
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>
              <strong>Focus on breath:</strong> Let the sounds guide your breathing rhythm
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
