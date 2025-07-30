"use client"

import type React from "react"
import { createContext, useContext, useCallback, useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

interface SoundEffect {
  id: string
  name: string
  url: string
  category: "healing" | "nature" | "meditation" | "comfort"
}

interface SoundContextType {
  playSound: (soundId: string) => void
  stopSound: (soundId: string) => void
  stopAllSounds: () => void
  setVolume: (volume: number) => void
  volume: number
  isEnabled: boolean
  setIsEnabled: (enabled: boolean) => void
  currentlyPlaying: string[]
}

const SoundContext = createContext<SoundContextType | null>(null)

const SOUND_EFFECTS: SoundEffect[] = [
  {
    id: "rain",
    name: "Gentle Rain",
    url: "/sounds/rain.mp3",
    category: "nature",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    url: "/sounds/ocean.mp3",
    category: "nature",
  },
  {
    id: "forest",
    name: "Forest Sounds",
    url: "/sounds/forest.mp3",
    category: "nature",
  },
  {
    id: "singing-bowl",
    name: "Singing Bowl",
    url: "/sounds/singing-bowl.mp3",
    category: "healing",
  },
  {
    id: "chimes",
    name: "Wind Chimes",
    url: "/sounds/chimes.mp3",
    category: "healing",
  },
  {
    id: "meditation-bell",
    name: "Meditation Bell",
    url: "/sounds/meditation-bell.mp3",
    category: "meditation",
  },
  {
    id: "heartbeat",
    name: "Gentle Heartbeat",
    url: "/sounds/heartbeat.mp3",
    category: "comfort",
  },
  {
    id: "white-noise",
    name: "White Noise",
    url: "/sounds/white-noise.mp3",
    category: "comfort",
  },
]

export function SoundEffectsProvider({ children }: { children: React.ReactNode }) {
  const [volume, setVolumeState] = useState(0.5)
  const [isEnabled, setIsEnabled] = useState(true)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string[]>([])
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map())

  const playSound = useCallback(
    (soundId: string) => {
      if (!isEnabled) return

      const sound = SOUND_EFFECTS.find((s) => s.id === soundId)
      if (!sound) return

      let audio = audioRefs.current.get(soundId)

      if (!audio) {
        audio = new Audio(sound.url)
        audio.loop = true
        audio.volume = volume
        audioRefs.current.set(soundId, audio)
      }

      audio.volume = volume
      audio.play().catch(console.error)

      setCurrentlyPlaying((prev) => [...prev.filter((id) => id !== soundId), soundId])
    },
    [isEnabled, volume],
  )

  const stopSound = useCallback((soundId: string) => {
    const audio = audioRefs.current.get(soundId)
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setCurrentlyPlaying((prev) => prev.filter((id) => id !== soundId))
  }, [])

  const stopAllSounds = useCallback(() => {
    audioRefs.current.forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })
    setCurrentlyPlaying([])
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume)
    audioRefs.current.forEach((audio) => {
      audio.volume = newVolume
    })
  }, [])

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      audioRefs.current.forEach((audio) => {
        audio.pause()
        audio.src = ""
      })
      audioRefs.current.clear()
    }
  }, [])

  const contextValue: SoundContextType = {
    playSound,
    stopSound,
    stopAllSounds,
    setVolume,
    volume,
    isEnabled,
    setIsEnabled,
    currentlyPlaying,
  }

  return <SoundContext.Provider value={contextValue}>{children}</SoundContext.Provider>
}

export function useSoundEffects() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSoundEffects must be used within a SoundEffectsProvider")
  }
  return context
}

export function SoundEffectsPanel() {
  const { playSound, stopSound, stopAllSounds, setVolume, volume, isEnabled, setIsEnabled, currentlyPlaying } =
    useSoundEffects()

  const categories = ["healing", "nature", "meditation", "comfort"] as const

  return (
    <div className="liberation-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold afro-futuristic-text">Sacred Sound Healing</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <VolumeX className="w-4 h-4" />
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={1}
              step={0.1}
              className="w-20"
              disabled={!isEnabled}
            />
            <Volume2 className="w-4 h-4" />
          </div>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} aria-label="Enable sound effects" />
        </div>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-medium text-purple-700 capitalize">{category} Sounds</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SOUND_EFFECTS.filter((sound) => sound.category === category).map((sound) => {
                const isPlaying = currentlyPlaying.includes(sound.id)
                return (
                  <Button
                    key={sound.id}
                    type="button"
                    variant={isPlaying ? "default" : "outline"}
                    size="sm"
                    onClick={() => (isPlaying ? stopSound(sound.id) : playSound(sound.id))}
                    disabled={!isEnabled}
                    className="flex items-center gap-2 text-xs"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {sound.name}
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {currentlyPlaying.length > 0 && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={stopAllSounds}
            className="flex items-center gap-2"
          >
            <VolumeX className="w-4 h-4" />
            Stop All Sounds
          </Button>
        </div>
      )}
    </div>
  )
}
