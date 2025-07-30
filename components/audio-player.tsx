"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Share,
  Download,
  Shuffle,
  Repeat,
  Music,
  Headphones,
  Waves,
  Brain,
} from "lucide-react"

interface AudioTrack {
  id: string
  title: string
  artist: string
  duration: number
  category: "meditation" | "affirmations" | "nature" | "binaural"
  description: string
  audioUrl: string
  imageUrl: string
  tags: string[]
  likes: number
  isLiked: boolean
}

const sampleTracks: AudioTrack[] = [
  {
    id: "1",
    title: "Trans Affirmation Meditation",
    artist: "Melly's Healing Circle",
    duration: 900, // 15 minutes
    category: "meditation",
    description: "A gentle guided meditation affirming your identity and worth",
    audioUrl: "/audio/trans-affirmation.mp3",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Trans+Pride",
    tags: ["identity", "affirmation", "transgender", "self-love"],
    likes: 234,
    isLiked: false,
  },
  {
    id: "2",
    title: "I Am Enough - Daily Affirmations",
    artist: "Liberation Voices",
    duration: 600, // 10 minutes
    category: "affirmations",
    description: "Powerful daily affirmations for LGBTQ+ self-worth and confidence",
    audioUrl: "/audio/daily-affirmations.mp3",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Rainbow+Heart",
    tags: ["daily", "confidence", "self-worth", "morning"],
    likes: 189,
    isLiked: true,
  },
  {
    id: "3",
    title: "Ocean Waves for Healing",
    artist: "Nature's Sanctuary",
    duration: 1800, // 30 minutes
    category: "nature",
    description: "Calming ocean sounds to wash away stress and trauma",
    audioUrl: "/audio/ocean-waves.mp3",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Ocean+Waves",
    tags: ["ocean", "calming", "sleep", "stress-relief"],
    likes: 156,
    isLiked: false,
  },
  {
    id: "4",
    title: "40Hz Focus Frequency",
    artist: "Binaural Beats Collective",
    duration: 1200, // 20 minutes
    category: "binaural",
    description: "Gamma waves to enhance focus and cognitive function",
    audioUrl: "/audio/40hz-focus.mp3",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Brain+Waves",
    tags: ["focus", "gamma", "concentration", "study"],
    likes: 98,
    isLiked: false,
  },
  {
    id: "5",
    title: "Ancestral Strength Meditation",
    artist: "Black Liberation Healing",
    duration: 1080, // 18 minutes
    category: "meditation",
    description: "Connect with the strength and wisdom of your ancestors",
    audioUrl: "/audio/ancestral-strength.mp3",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Ancestral+Wisdom",
    tags: ["ancestors", "strength", "black", "heritage"],
    likes: 267,
    isLiked: true,
  },
  {
    id: "6",
    title: "Forest Rain Sanctuary",
    artist: "Earth Sounds",
    duration: 2400, // 40 minutes
    category: "nature",
    description: "Gentle rain in an ancient forest for deep relaxation",
    audioUrl: "/audio/forest-rain.mp3",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Forest+Rain",
    tags: ["rain", "forest", "relaxation", "nature"],
    likes: 143,
    isLiked: false,
  },
]

export function AudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(sampleTracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"none" | "one" | "all">("none")
  const [tracks, setTracks] = useState(sampleTracks)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0
        audio.play()
      } else {
        handleNext()
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [repeatMode])

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

  const handleNext = () => {
    const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
    let nextIndex = currentIndex + 1

    if (nextIndex >= tracks.length) {
      nextIndex = repeatMode === "all" ? 0 : currentIndex
    }

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * tracks.length)
    }

    setCurrentTrack(tracks[nextIndex])
    setCurrentTime(0)
  }

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
    let prevIndex = currentIndex - 1

    if (prevIndex < 0) {
      prevIndex = tracks.length - 1
    }

    setCurrentTrack(tracks[prevIndex])
    setCurrentTime(0)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value[0] / 100) * currentTrack.duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0]
    setVolume(newVolume)
    audio.volume = newVolume / 100
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume / 100
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const toggleLike = (trackId: string) => {
    setTracks((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? { ...track, isLiked: !track.isLiked, likes: track.isLiked ? track.likes - 1 : track.likes + 1 }
          : track,
      ),
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "meditation":
        return <Headphones className="w-4 h-4" />
      case "affirmations":
        return <Heart className="w-4 h-4" />
      case "nature":
        return <Waves className="w-4 h-4" />
      case "binaural":
        return <Brain className="w-4 h-4" />
      default:
        return <Music className="w-4 h-4" />
    }
  }

  const filteredTracks = activeCategory === "all" ? tracks : tracks.filter((track) => track.category === activeCategory)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume / 100
          }
        }}
      />

      {/* Main Player */}
      <Card className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm border-white/20 text-white">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Album Art */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={currentTrack.imageUrl || "/placeholder.svg"}
                  alt={currentTrack.title}
                  className="w-48 h-48 rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              </div>
            </div>

            {/* Track Info & Controls */}
            <div className="space-y-6 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold mb-2">{currentTrack.title}</h3>
                <p className="text-purple-200 text-lg">{currentTrack.artist}</p>
                <p className="text-purple-300 text-sm mt-2">{currentTrack.description}</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {currentTrack.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-purple-300 text-purple-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <Slider
                  value={[currentTrack.duration > 0 ? (currentTime / currentTrack.duration) * 100 : 0]}
                  onValueChange={handleSeek}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-purple-200">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentTrack.duration)}</span>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`text-white hover:bg-white/20 ${isShuffled ? "text-pink-300" : ""}`}
                >
                  <Shuffle className="w-4 h-4" />
                </Button>

                <Button variant="ghost" size="sm" onClick={handlePrevious} className="text-white hover:bg-white/20">
                  <SkipBack className="w-5 h-5" />
                </Button>

                <Button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white text-purple-900 hover:bg-purple-100"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </Button>

                <Button variant="ghost" size="sm" onClick={handleNext} className="text-white hover:bg-white/20">
                  <SkipForward className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRepeatMode(repeatMode === "none" ? "all" : repeatMode === "all" ? "one" : "none")}
                  className={`text-white hover:bg-white/20 ${repeatMode !== "none" ? "text-pink-300" : ""}`}
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === "one" && <span className="text-xs ml-1">1</span>}
                </Button>
              </div>
            </div>

            {/* Volume & Actions */}
            <div className="space-y-6">
              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  className="flex-1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(currentTrack.id)}
                  className={`text-white hover:bg-white/20 ${currentTrack.isLiked ? "text-pink-300" : ""}`}
                >
                  <Heart className={`w-4 h-4 ${currentTrack.isLiked ? "fill-current" : ""}`} />
                  <span className="ml-1 text-sm">{currentTrack.likes}</span>
                </Button>

                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Share className="w-4 h-4" />
                </Button>

                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Track Library */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Healing Audio Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="meditation" className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                Meditation
              </TabsTrigger>
              <TabsTrigger value="affirmations" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Affirmations
              </TabsTrigger>
              <TabsTrigger value="nature" className="flex items-center gap-2">
                <Waves className="w-4 h-4" />
                Nature
              </TabsTrigger>
              <TabsTrigger value="binaural" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Binaural
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="space-y-4">
              {filteredTracks.map((track) => (
                <Card
                  key={track.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentTrack.id === track.id ? "ring-2 ring-purple-500 bg-purple-50" : ""
                  }`}
                  onClick={() => setCurrentTrack(track)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={track.imageUrl || "/placeholder.svg"}
                        alt={track.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getCategoryIcon(track.category)}
                          <h4 className="font-semibold truncate">{track.title}</h4>
                          {currentTrack.id === track.id && <Badge className="bg-purple-500">Now Playing</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{track.artist}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{track.description}</p>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{formatTime(track.duration)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(track.id)
                          }}
                          className={`${track.isLiked ? "text-pink-500" : "text-gray-400"} hover:text-pink-500`}
                        >
                          <Heart className={`w-4 h-4 ${track.isLiked ? "fill-current" : ""}`} />
                          <span className="ml-1">{track.likes}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
