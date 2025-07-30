"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Play, Pause, RotateCcw, Waves, Wind, Zap, Moon } from "lucide-react"

interface SoundEffect {
  id: string
  name: string
  category: string
  icon: any
  frequency: number
  type: "oscillator" | "noise" | "nature"
  color: string
  description: string
}

export function SoundEffects() {
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({})
  const [volumes, setVolumes] = useState<Record<string, number>>({})
  const [masterVolume, setMasterVolume] = useState([70])
  const [isMuted, setIsMuted] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<Record<string, OscillatorNode>>({})
  const gainNodesRef = useRef<Record<string, GainNode>>({})
  const masterGainRef = useRef<GainNode | null>(null)

  const soundEffects: SoundEffect[] = [
    {
      id: "rain",
      name: "Gentle Rain",
      category: "nature",
      icon: Waves,
      frequency: 200,
      type: "noise",
      color: "from-blue-400 to-cyan-400",
      description: "Soothing rainfall for relaxation",
    },
    {
      id: "ocean",
      name: "Ocean Waves",
      category: "nature",
      icon: Waves,
      frequency: 100,
      type: "noise",
      color: "from-blue-500 to-teal-500",
      description: "Rhythmic ocean sounds",
    },
    {
      id: "wind",
      name: "Forest Wind",
      category: "nature",
      icon: Wind,
      frequency: 150,
      type: "noise",
      color: "from-green-400 to-emerald-400",
      description: "Gentle wind through trees",
    },
    {
      id: "meditation",
      name: "Meditation Bell",
      category: "ambient",
      icon: Zap,
      frequency: 432,
      type: "oscillator",
      color: "from-purple-400 to-violet-400",
      description: "Healing frequency bell",
    },
    {
      id: "focus",
      name: "Focus Tone",
      category: "focus",
      icon: Zap,
      frequency: 40,
      type: "oscillator",
      color: "from-yellow-400 to-orange-400",
      description: "Binaural beats for concentration",
    },
    {
      id: "sleep",
      name: "Sleep Drone",
      category: "sleep",
      icon: Moon,
      frequency: 60,
      type: "oscillator",
      color: "from-indigo-400 to-purple-400",
      description: "Deep sleep induction",
    },
    {
      id: "anxiety",
      name: "Calm Waves",
      category: "healing",
      icon: Waves,
      frequency: 528,
      type: "oscillator",
      color: "from-pink-400 to-rose-400",
      description: "Anxiety relief frequency",
    },
    {
      id: "energy",
      name: "Energy Boost",
      category: "focus",
      icon: Zap,
      frequency: 10,
      type: "oscillator",
      color: "from-red-400 to-pink-400",
      description: "Energizing alpha waves",
    },
  ]

  // Initialize audio context
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        masterGainRef.current = audioContextRef.current.createGain()
        masterGainRef.current.connect(audioContextRef.current.destination)
        masterGainRef.current.gain.value = masterVolume[0] / 100
      }
    }

    // Initialize volumes
    const initialVolumes: Record<string, number> = {}
    soundEffects.forEach((sound) => {
      initialVolumes[sound.id] = 50
    })
    setVolumes(initialVolumes)

    // Initialize audio on first user interaction
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

  // Update master volume
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMuted ? 0 : masterVolume[0] / 100
    }
  }, [masterVolume, isMuted])

  const createNoiseBuffer = (duration = 2) => {
    if (!audioContextRef.current) return null

    const bufferSize = audioContextRef.current.sampleRate * duration
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
    const output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    return buffer
  }

  const playSound = (soundId: string) => {
    if (!audioContextRef.current || !masterGainRef.current) return

    const sound = soundEffects.find((s) => s.id === soundId)
    if (!sound) return

    // Stop existing sound if playing
    if (oscillatorsRef.current[soundId]) {
      stopSound(soundId)
    }

    // Create gain node for this sound
    const gainNode = audioContextRef.current.createGain()
    gainNode.connect(masterGainRef.current)
    gainNode.gain.value = (volumes[soundId] || 50) / 100
    gainNodesRef.current[soundId] = gainNode

    if (sound.type === "oscillator") {
      // Create oscillator
      const oscillator = audioContextRef.current.createOscillator()
      oscillator.frequency.setValueAtTime(sound.frequency, audioContextRef.current.currentTime)
      oscillator.type = "sine"

      // Add some modulation for more interesting sound
      const lfo = audioContextRef.current.createOscillator()
      const lfoGain = audioContextRef.current.createGain()
      lfo.frequency.setValueAtTime(0.5, audioContextRef.current.currentTime)
      lfo.type = "sine"
      lfoGain.gain.setValueAtTime(sound.frequency * 0.1, audioContextRef.current.currentTime)

      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)

      oscillator.connect(gainNode)
      oscillator.start()
      lfo.start()

      oscillatorsRef.current[soundId] = oscillator
    } else if (sound.type === "noise") {
      // Create noise buffer
      const noiseBuffer = createNoiseBuffer()
      if (noiseBuffer) {
        const source = audioContextRef.current.createBufferSource()
        source.buffer = noiseBuffer
        source.loop = true

        // Filter the noise based on sound type
        const filter = audioContextRef.current.createBiquadFilter()
        filter.type = "lowpass"
        filter.frequency.setValueAtTime(sound.frequency * 10, audioContextRef.current.currentTime)
        filter.Q.setValueAtTime(1, audioContextRef.current.currentTime)

        source.connect(filter)
        filter.connect(gainNode)
        source.start()

        oscillatorsRef.current[soundId] = source as any
      }
    }

    setIsPlaying((prev) => ({ ...prev, [soundId]: true }))
  }

  const stopSound = (soundId: string) => {
    if (oscillatorsRef.current[soundId]) {
      try {
        oscillatorsRef.current[soundId].stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
      delete oscillatorsRef.current[soundId]
    }

    if (gainNodesRef.current[soundId]) {
      gainNodesRef.current[soundId].disconnect()
      delete gainNodesRef.current[soundId]
    }

    setIsPlaying((prev) => ({ ...prev, [soundId]: false }))
  }

  const toggleSound = (soundId: string) => {
    if (isPlaying[soundId]) {
      stopSound(soundId)
    } else {
      playSound(soundId)
    }
  }

  const updateSoundVolume = (soundId: string, volume: number) => {
    setVolumes((prev) => ({ ...prev, [soundId]: volume }))

    if (gainNodesRef.current[soundId]) {
      gainNodesRef.current[soundId].gain.value = volume / 100
    }
  }

  const stopAllSounds = () => {
    Object.keys(isPlaying).forEach((soundId) => {
      if (isPlaying[soundId]) {
        stopSound(soundId)
      }
    })
  }

  const categories = ["all", "nature", "ambient", "focus", "sleep", "healing"]
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredSounds =
    selectedCategory === "all" ? soundEffects : soundEffects.filter((sound) => sound.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="liberation-card text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mystical-glow">
              <Waves className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl afro-futuristic-text">Sacred Sound Healing</CardTitle>
          <p className="text-muted-foreground">Therapeutic frequencies and nature sounds for wellness</p>
        </CardHeader>
      </Card>

      {/* Master Controls */}
      <Card className="liberation-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-cyan-400" />
            Master Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className={isMuted ? "bg-red-500/20 border-red-500" : ""}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <div className="flex-1">
              <Slider
                value={masterVolume}
                onValueChange={setMasterVolume}
                max={100}
                step={1}
                className="w-full"
                disabled={isMuted}
              />
            </div>
            <span className="text-sm font-medium w-12">{masterVolume[0]}%</span>
          </div>
          <div className="flex justify-center">
            <Button variant="destructive" size="sm" onClick={stopAllSounds} className="flex items-center">
              <RotateCcw className="w-4 h-4 mr-2" />
              Stop All Sounds
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="liberation-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sound Effects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSounds.map((sound) => (
          <Card key={sound.id} className="liberation-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${sound.color} flex items-center justify-center ${isPlaying[sound.id] ? "spiritual-pulse" : ""}`}
                >
                  <sound.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs capitalize">
                  {sound.category}
                </Badge>
              </div>

              <h3 className="font-semibold text-foreground mb-1">{sound.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{sound.description}</p>

              {sound.type === "oscillator" && (
                <p className="text-xs text-muted-foreground mb-3">Frequency: {sound.frequency}Hz</p>
              )}

              <div className="space-y-3">
                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <Slider
                    value={[volumes[sound.id] || 50]}
                    onValueChange={(value) => updateSoundVolume(sound.id, value[0])}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs w-8">{volumes[sound.id] || 50}%</span>
                </div>

                {/* Play/Pause Button */}
                <Button
                  onClick={() => toggleSound(sound.id)}
                  className={`w-full ${
                    isPlaying[sound.id]
                      ? "bg-red-500 hover:bg-red-600"
                      : `bg-gradient-to-r ${sound.color} hover:opacity-90`
                  }`}
                >
                  {isPlaying[sound.id] ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Tips */}
      <Card className="liberation-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Sound Healing Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-purple-400 mb-2">For Focus & Concentration:</h4>
              <p className="text-muted-foreground">
                Try binaural beats (40Hz) or gentle nature sounds like forest wind. Keep volume low to avoid
                distraction.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-400 mb-2">For Sleep & Relaxation:</h4>
              <p className="text-muted-foreground">
                Use low-frequency drones (60Hz) or rain sounds. Gradually lower volume as you drift off.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-2">For Anxiety Relief:</h4>
              <p className="text-muted-foreground">
                528Hz "love frequency" or ocean waves can help calm racing thoughts. Combine with deep breathing.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-pink-400 mb-2">For Meditation:</h4>
              <p className="text-muted-foreground">
                432Hz meditation bells or gentle ambient tones. Layer multiple sounds for deeper immersion.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Visualization */}
      {Object.keys(isPlaying).some((key) => isPlaying[key]) && (
        <Card className="liberation-card">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full spiritual-pulse`}
                  style={{
                    height: `${Math.random() * 40 + 20}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {Object.keys(isPlaying).filter((key) => isPlaying[key]).length} sound(s) playing
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
