"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Music,
  Heart,
  Brain,
  Sparkles,
} from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  category: "meditation" | "healing" | "identity" | "music"
  description: string
  benefits: string[]
  audioUrl: string
}

const tracks: Track[] = [
  {
    id: "1",
    title: "Morning Affirmations for Trans Joy",
    artist: "ThriveBMore Collective",
    duration: "12:34",
    category: "identity",
    description: "Powerful affirmations celebrating transgender identity and self-love",
    benefits: ["Self-acceptance", "Confidence building", "Identity affirmation"],
    audioUrl: "/audio/morning-affirmations.mp3",
  },
  {
    id: "2",
    title: "BIPOC Healing Meditation",
    artist: "Ancestral Voices",
    duration: "18:45",
    category: "healing",
    description: "Trauma-informed meditation honoring ancestral strength and resilience",
    benefits: ["Trauma healing", "Cultural connection", "Emotional regulation"],
    audioUrl: "/audio/bipoc-healing.mp3",
  },
  {
    id: "3",
    title: "Anxiety Relief Breathing",
    artist: "Calm Collective",
    duration: "8:22",
    category: "meditation",
    description: "Guided breathing exercises for anxiety and panic management",
    benefits: ["Anxiety reduction", "Stress relief", "Grounding techniques"],
    audioUrl: "/audio/anxiety-relief.mp3",
  },
  {
    id: "4",
    title: "Queer Liberation Anthem",
    artist: "Pride Voices",
    duration: "4:17",
    category: "music",
    description: "Uplifting anthem celebrating LGBTQ+ pride and liberation",
    benefits: ["Empowerment", "Community connection", "Joy cultivation"],
    audioUrl: "/audio/liberation-anthem.mp3",
  },
  {
    id: "5",
    title: "Little Space Lullaby",
    artist: "Gentle Hearts",
    duration: "15:30",
    category: "healing",
    description: "Soothing sounds for age regression and inner child healing",
    benefits: ["Inner child work", "Comfort", "Safe space creation"],
    audioUrl: "/audio/little-space-lullaby.mp3",
  },
  {
    id: "6",
    title: "Neurodivergent Focus Flow",
    artist: "Mind Harmony",
    duration: "25:00",
    category: "meditation",
    description: "Specially designed meditation for ADHD and neurodivergent minds",
    benefits: ["Focus enhancement", "Sensory regulation", "Mind clarity"],
    audioUrl: "/audio/neurodivergent-focus.mp3",
  },
]

export default function AudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([70])
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "one" | "all">("off")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const audioRef = useRef<HTMLAudioElement>(null)

  const filteredTracks =
    selectedCategory === "all" ? tracks : tracks.filter((track) => track.category === selectedCategory)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleTrackEnd)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleTrackEnd)
    }
  }, [currentTrack])

  const handleTrackEnd = () => {
    if (repeatMode === "one") {
      audioRef.current?.play()
    } else if (repeatMode === "all" || isShuffled) {
      playNext()
    } else {
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    const currentIndex = filteredTracks.findIndex((track) => track.id === currentTrack.id)
    let nextIndex

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * filteredTracks.length)
    } else {
      nextIndex = (currentIndex + 1) % filteredTracks.length
    }

    setCurrentTrack(filteredTracks[nextIndex])
    setIsPlaying(true)
  }

  const playPrevious = () => {
    const currentIndex = filteredTracks.findIndex((track) => track.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? filteredTracks.length - 1 : currentIndex - 1
    setCurrentTrack(filteredTracks[prevIndex])
    setIsPlaying(true)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value[0] / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    setVolume(value)
    audio.volume = value[0] / 100
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume[0] / 100
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "meditation":
        return <Brain className="w-4 h-4" />
      case "healing":
        return <Heart className="w-4 h-4" />
      case "identity":
        return <Sparkles className="w-4 h-4" />
      case "music":
        return <Music className="w-4 h-4" />
      default:
        return <Music className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "meditation":
        return "from-blue-500 to-purple-500"
      case "healing":
        return "from-green-500 to-teal-500"
      case "identity":
        return "from-pink-500 to-purple-500"
      case "music":
        return "from-orange-500 to-red-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <audio ref={audioRef} src={currentTrack.audioUrl} />

      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Filter by category:</span>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="meditation">Meditation</SelectItem>
            <SelectItem value="healing">Healing</SelectItem>
            <SelectItem value="identity">Identity</SelectItem>
            <SelectItem value="music">Music</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Now Playing Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            {/* Album Art */}
            <div
              className={`w-24 h-24 bg-gradient-to-r ${getCategoryColor(currentTrack.category)} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              {getCategoryIcon(currentTrack.category)}
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{currentTrack.title}</h3>
              <p className="text-gray-600 truncate">{currentTrack.artist}</p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {currentTrack.category}
              </Badge>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsShuffled(!isShuffled)}
                className={isShuffled ? "text-purple-600" : "text-gray-600"}
              >
                <Shuffle className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" onClick={playPrevious}>
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={playNext}>
                <SkipForward className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRepeatMode(repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off")}
                className={repeatMode !== "off" ? "text-purple-600" : "text-gray-600"}
              >
                <Repeat className="w-4 h-4" />
                {repeatMode === "one" && <span className="text-xs ml-1">1</span>}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 space-y-2">
            <Slider
              value={[duration ? (currentTime / duration) * 100 : 0]}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="mt-4 flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={toggleMute}>
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider value={isMuted ? [0] : volume} onValueChange={handleVolumeChange} max={100} className="w-24" />
          </div>
        </CardContent>
      </Card>

      {/* Track Description */}
      <Card className="bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">About This Track</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">{currentTrack.description}</p>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {currentTrack.benefits.map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Playlist */}
      <Card className="bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Playlist ({filteredTracks.length} tracks)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => {
                  setCurrentTrack(track)
                  setIsPlaying(true)
                }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  track.id === currentTrack.id ? "bg-purple-100 border border-purple-200" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(track.category)} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  {getCategoryIcon(track.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{track.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{track.artist}</p>
                </div>

                <div className="text-right">
                  <Badge variant="outline" className="text-xs capitalize mb-1">
                    {track.category}
                  </Badge>
                  <p className="text-xs text-gray-500">{track.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
