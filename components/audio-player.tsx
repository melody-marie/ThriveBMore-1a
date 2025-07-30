"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Bookmark,
  Share,
  Search,
  Clock,
  Repeat,
  Shuffle,
  Download,
  MoreHorizontal,
  Headphones,
  Music,
  Waves,
  Brain,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AudioTrack {
  id: string
  title: string
  artist: string
  description?: string
  category: "meditation" | "affirmations" | "nature" | "binaural"
  duration: number
  audio_url: string
  image_url?: string
  tags: string[]
  transcript?: string
  likes_count: number
  play_count: number
  rating: number
  uploaded_by?: string
  is_public: boolean
  created_at: string
  updated_at: string
}

// Sample audio tracks with generated audio URLs
const sampleTracks: AudioTrack[] = [
  {
    id: "1",
    title: "Trans Affirmation Journey",
    artist: "Melly's Healing Circle",
    description: "A gentle guided meditation affirming your transgender identity and celebrating your authentic self",
    category: "meditation",
    duration: 900, // 15 minutes
    audio_url: "/audio/trans-affirmation.mp3",
    image_url: "/placeholder.svg?height=300&width=300&text=Trans+Pride+Colors",
    tags: ["transgender", "identity", "affirmation", "self-love", "guided"],
    transcript: "Welcome to this sacred space of affirmation. You are exactly who you're meant to be...",
    likes_count: 234,
    play_count: 1247,
    rating: 4.8,
    uploaded_by: "melly",
    is_public: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "I Am Enough - Daily Affirmations",
    artist: "Liberation Voices Collective",
    description: "Powerful daily affirmations for LGBTQ+ self-worth, confidence, and inner strength",
    category: "affirmations",
    duration: 600, // 10 minutes
    audio_url: "/audio/daily-affirmations.mp3",
    image_url: "/placeholder.svg?height=300&width=300&text=Rainbow+Heart",
    tags: ["daily", "confidence", "self-worth", "morning", "lgbtq"],
    likes_count: 189,
    play_count: 892,
    rating: 4.9,
    uploaded_by: "liberation_voices",
    is_public: true,
    created_at: "2024-01-14T08:00:00Z",
    updated_at: "2024-01-14T08:00:00Z",
  },
  {
    id: "3",
    title: "Ocean Waves for Deep Healing",
    artist: "Nature's Sanctuary",
    description: "Calming ocean sounds to wash away stress, trauma, and negative energy",
    category: "nature",
    duration: 1800, // 30 minutes
    audio_url: "/audio/ocean-waves.mp3",
    image_url: "/placeholder.svg?height=300&width=300&text=Ocean+Waves",
    tags: ["ocean", "calming", "sleep", "stress-relief", "healing"],
    likes_count: 156,
    play_count: 2341,
    rating: 4.7,
    uploaded_by: "nature_sanctuary",
    is_public: true,
    created_at: "2024-01-13T15:30:00Z",
    updated_at: "2024-01-13T15:30:00Z",
  },
  {
    id: "4",
    title: "40Hz Gamma Focus Frequency",
    artist: "Binaural Beats Collective",
    description: "Gamma brain waves to enhance focus, cognitive function, and mental clarity",
    category: "binaural",
    duration: 1200, // 20 minutes
    audio_url: "/audio/40hz-focus.mp3",
    image_url: "/placeholder.svg?height=300&width=300&text=Brain+Waves",
    tags: ["focus", "gamma", "concentration", "study", "productivity"],
    likes_count: 98,
    play_count: 567,
    rating: 4.6,
    uploaded_by: "binaural_collective",
    is_public: true,
    created_at: "2024-01-12T12:00:00Z",
    updated_at: "2024-01-12T12:00:00Z",
  },
  {
    id: "5",
    title: "Ancestral Strength & Wisdom",
    artist: "Black Liberation Healing",
    description: "Connect with the strength and wisdom of your LGBTQ+ ancestors who paved the way",
    category: "meditation",
    duration: 1080, // 18 minutes
    audio_url: "/audio/ancestral-strength.mp3",
    image_url: "/placeholder.svg?height=300&width=300&text=Ancestral+Wisdom",
    tags: ["ancestors", "strength", "black", "heritage", "wisdom"],
    likes_count: 267,
    play_count: 1456,
    rating: 4.9,
    uploaded_by: "black_liberation",
    is_public: true,
    created_at: "2024-01-11T09:15:00Z",
    updated_at: "2024-01-11T09:15:00Z",
  },
  {
    id: "6",
    title: "Forest Rain Sanctuary",
    artist: "Earth Sounds Collective",
    description: "Gentle rain in an ancient forest for deep relaxation and grounding",
    category: "nature",
    duration: 2400, // 40 minutes
    audio_url: "/audio/forest-rain.mp3",
    image_url: "/placeholder.svg?height=300&width=300&text=Forest+Rain",
    tags: ["rain", "forest", "relaxation", "nature", "grounding"],
    likes_count: 143,
    play_count: 1789,
    rating: 4.8,
    uploaded_by: "earth_sounds",
    is_public: true,
    created_at: "2024-01-10T18:45:00Z",
    updated_at: "2024-01-10T18:45:00Z",
  },
  {
    id: "7",
    title: "Coming Out Courage Meditation",
    artist: "Pride Healing Collective",
    description: "Build courage and self-compassion for your coming out journey",
    category: "meditation",
    duration: 840, // 14 minutes
    audio_url: "/audio/coming-out-courage.mp3",
    image_url: "/placeholder.svg?height=300&width=300&text=Pride+Flag",
    tags: ["coming-out", "courage", "family", "self-compassion", "support"],
    likes_count: 312,
    play_count: 987,
    rating: 4.7,
    uploaded_by: "pride_healing",
    is_public: true,
    created_at: "2024-01-09T14:20:00Z",
    updated_at: "2024-01-09T14:20:00Z",
  },
  {
    id: "8",
    title: "Theta Waves for Deep Sleep",
    artist: "Sleep Frequency Lab",
    description: "Theta brain waves to promote deep, restorative sleep and dream healing",
    category: "binaural",
    duration: 3600, // 60 minutes
    audio_url: "/audio/theta-sleep.mp3",
    image_url: "/placeholder.svg?height=300&width=300&text=Moon+Stars",
    tags: ["sleep", "theta", "dreams", "rest", "healing"],
    likes_count: 445,
    play_count: 3421,
    rating: 4.9,
    uploaded_by: "sleep_lab",
    is_public: true,
    created_at: "2024-01-08T21:00:00Z",
    updated_at: "2024-01-08T21:00:00Z",
  },
]

export function AudioPlayer() {
  const [tracks] = useState<AudioTrack[]>(sampleTracks)
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set())
  const [bookmarkedTracks, setBookmarkedTracks] = useState<Set<string>>(new Set())
  const [showTrackDetails, setShowTrackDetails] = useState(false)
  const [selectedTrackForDetails, setSelectedTrackForDetails] = useState<AudioTrack | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Generate audio using Web Audio API for demonstration
  const generateAudio = (track: AudioTrack) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different frequencies for different categories
    switch (track.category) {
      case "meditation":
        oscillator.frequency.value = 432 // Healing frequency
        oscillator.type = "sine"
        break
      case "affirmations":
        oscillator.frequency.value = 528 // Love frequency
        oscillator.type = "triangle"
        break
      case "nature":
        oscillator.frequency.value = 256 // Natural frequency
        oscillator.type = "sawtooth"
        break
      case "binaural":
        oscillator.frequency.value = 40 // Gamma waves
        oscillator.type = "square"
        break
    }

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume * 0.1, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)

    // Stop after track duration (shortened for demo)
    setTimeout(
      () => {
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
        oscillator.stop(audioContext.currentTime + 1)
      },
      Math.min(track.duration * 1000, 30000),
    ) // Max 30 seconds for demo
  }

  // Filter tracks based on search and category
  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || track.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const playTrack = (track: AudioTrack) => {
    if (currentTrack?.id === track.id && isPlaying) {
      setIsPlaying(false)
      return
    }

    setCurrentTrack(track)
    setIsPlaying(true)
    setCurrentTime(0)

    // Generate audio for demonstration
    generateAudio(track)
  }

  const togglePlayPause = () => {
    if (!currentTrack) return

    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      generateAudio(currentTrack)
    }
  }

  const skipToNext = () => {
    if (!currentTrack) return

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    let nextIndex

    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * tracks.length)
    } else {
      nextIndex = (currentIndex + 1) % tracks.length
    }

    playTrack(tracks[nextIndex])
  }

  const skipToPrevious = () => {
    if (!currentTrack) return

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1

    playTrack(tracks[prevIndex])
  }

  const toggleLike = (trackId: string) => {
    setLikedTracks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(trackId)) {
        newSet.delete(trackId)
      } else {
        newSet.add(trackId)
      }
      return newSet
    })
  }

  const toggleBookmark = (trackId: string) => {
    setBookmarkedTracks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(trackId)) {
        newSet.delete(trackId)
      } else {
        newSet.add(trackId)
      }
      return newSet
    })
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
        return <Music className="w-4 h-4" />
      case "nature":
        return <Waves className="w-4 h-4" />
      case "binaural":
        return <Brain className="w-4 h-4" />
      default:
        return <Music className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "meditation":
        return "from-purple-500 to-indigo-500"
      case "affirmations":
        return "from-pink-500 to-rose-500"
      case "nature":
        return "from-green-500 to-emerald-500"
      case "binaural":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  // Simulate progress for demo
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          if (newTime >= currentTrack.duration) {
            if (isRepeat) {
              return 0
            } else {
              skipToNext()
              return 0
            }
          }
          return newTime
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTrack, isRepeat])

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              Melly's Healing Spot
            </h1>
            <p className="text-white/70">Sacred audio library for meditation, affirmations, and healing</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30">{tracks.length} tracks</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Community curated</Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input
              placeholder="Search tracks, artists, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all" ? "bg-white/20 text-white" : "border-white/30 text-white hover:bg-white/10"
              }
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "meditation" ? "default" : "outline"}
              onClick={() => setSelectedCategory("meditation")}
              className={
                selectedCategory === "meditation"
                  ? "bg-white/20 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
              }
            >
              <Headphones className="w-4 h-4 mr-2" />
              Meditation
            </Button>
            <Button
              variant={selectedCategory === "affirmations" ? "default" : "outline"}
              onClick={() => setSelectedCategory("affirmations")}
              className={
                selectedCategory === "affirmations"
                  ? "bg-white/20 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
              }
            >
              <Music className="w-4 h-4 mr-2" />
              Affirmations
            </Button>
            <Button
              variant={selectedCategory === "nature" ? "default" : "outline"}
              onClick={() => setSelectedCategory("nature")}
              className={
                selectedCategory === "nature"
                  ? "bg-white/20 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
              }
            >
              <Waves className="w-4 h-4 mr-2" />
              Nature
            </Button>
            <Button
              variant={selectedCategory === "binaural" ? "default" : "outline"}
              onClick={() => setSelectedCategory("binaural")}
              className={
                selectedCategory === "binaural"
                  ? "bg-white/20 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
              }
            >
              <Brain className="w-4 h-4 mr-2" />
              Binaural
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Track List */}
        <div className="flex-1 p-6">
          <ScrollArea className="h-full">
            <div className="grid gap-4">
              {filteredTracks.map((track) => (
                <Card
                  key={track.id}
                  className={`bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer ${
                    currentTrack?.id === track.id ? "ring-2 ring-pink-500/50 bg-white/20" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Album Art */}
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${getCategoryColor(track.category)} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        {getCategoryIcon(track.category)}
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{track.title}</h3>
                          <Badge className="bg-purple-500/20 text-purple-200 border-purple-300/30 text-xs">
                            {track.category}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm mb-1">{track.artist}</p>
                        <p className="text-white/60 text-xs line-clamp-1">{track.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {track.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="border-white/20 text-white/60 text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {track.tags.length > 3 && (
                            <Badge variant="outline" className="border-white/20 text-white/60 text-xs">
                              +{track.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right text-sm text-white/70 flex-shrink-0">
                        <div className="flex items-center gap-1 mb-1">
                          <Heart className="w-3 h-3" />
                          {track.likes_count}
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <Play className="w-3 h-3" />
                          {track.play_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(track.duration)}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          onClick={() => playTrack(track)}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                        >
                          {currentTrack?.id === track.id && isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleLike(track.id)}
                          className={`text-white/70 hover:text-white hover:bg-white/10 ${
                            likedTracks.has(track.id) ? "text-pink-400" : ""
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedTracks.has(track.id) ? "fill-current" : ""}`} />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleBookmark(track.id)}
                          className={`text-white/70 hover:text-white hover:bg-white/10 ${
                            bookmarkedTracks.has(track.id) ? "text-yellow-400" : ""
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedTracks.has(track.id) ? "fill-current" : ""}`} />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedTrackForDetails(track)
                                setShowTrackDetails(true)
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="w-4 h-4 mr-2" />
                              Share Track
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Now Playing Sidebar */}
        {currentTrack && (
          <div className="w-80 border-l border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Music className="w-4 h-4" />
                Now Playing
              </h3>

              {/* Current Track Display */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-6">
                <CardContent className="p-4">
                  <div
                    className={`w-full h-48 bg-gradient-to-r ${getCategoryColor(currentTrack.category)} rounded-lg flex items-center justify-center mb-4`}
                  >
                    {getCategoryIcon(currentTrack.category)}
                  </div>

                  <h4 className="font-semibold mb-1">{currentTrack.title}</h4>
                  <p className="text-white/70 text-sm mb-3">{currentTrack.artist}</p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Slider
                      value={[currentTime]}
                      max={currentTrack.duration}
                      step={1}
                      className="w-full"
                      onValueChange={(value) => setCurrentTime(value[0])}
                    />
                    <div className="flex justify-between text-xs text-white/60">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(currentTrack.duration)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <div className="space-y-4">
                {/* Main Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`text-white/70 hover:text-white hover:bg-white/10 ${isShuffle ? "text-purple-400" : ""}`}
                  >
                    <Shuffle className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={skipToPrevious}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>

                  <Button
                    size="lg"
                    onClick={togglePlayPause}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full w-12 h-12"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={skipToNext}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsRepeat(!isRepeat)}
                    className={`text-white/70 hover:text-white hover:bg-white/10 ${isRepeat ? "text-purple-400" : ""}`}
                  >
                    <Repeat className="w-4 h-4" />
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.1}
                    className="flex-1"
                    onValueChange={(value) => {
                      setVolume(value[0])
                      setIsMuted(value[0] === 0)
                    }}
                  />
                </div>

                {/* Track Actions */}
                <div className="flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleLike(currentTrack.id)}
                    className={`text-white/70 hover:text-white hover:bg-white/10 ${
                      likedTracks.has(currentTrack.id) ? "text-pink-400" : ""
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${likedTracks.has(currentTrack.id) ? "fill-current" : ""}`} />
                    Like
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleBookmark(currentTrack.id)}
                    className={`text-white/70 hover:text-white hover:bg-white/10 ${
                      bookmarkedTracks.has(currentTrack.id) ? "text-yellow-400" : ""
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 mr-1 ${bookmarkedTracks.has(currentTrack.id) ? "fill-current" : ""}`}
                    />
                    Save
                  </Button>

                  <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Track Details Modal */}
      <Dialog open={showTrackDetails} onOpenChange={setShowTrackDetails}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-900 to-pink-900 border-purple-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Track Details
            </DialogTitle>
          </DialogHeader>

          {selectedTrackForDetails && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <div
                  className={`w-32 h-32 bg-gradient-to-r ${getCategoryColor(selectedTrackForDetails.category)} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  {getCategoryIcon(selectedTrackForDetails.category)}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{selectedTrackForDetails.title}</h3>
                  <p className="text-white/80 mb-2">{selectedTrackForDetails.artist}</p>
                  <p className="text-white/70 text-sm mb-4">{selectedTrackForDetails.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Duration:</span>
                      <span className="ml-2">{formatTime(selectedTrackForDetails.duration)}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Category:</span>
                      <span className="ml-2 capitalize">{selectedTrackForDetails.category}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Likes:</span>
                      <span className="ml-2">{selectedTrackForDetails.likes_count}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Plays:</span>
                      <span className="ml-2">{selectedTrackForDetails.play_count}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="font-semibold mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrackForDetails.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-white/20 text-white/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Transcript */}
              {selectedTrackForDetails.transcript && (
                <div>
                  <h4 className="font-semibold mb-2">Transcript</h4>
                  <div className="bg-white/10 rounded-lg p-4 text-white/80 text-sm">
                    {selectedTrackForDetails.transcript}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    playTrack(selectedTrackForDetails)
                    setShowTrackDetails(false)
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Track
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleLike(selectedTrackForDetails.id)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${likedTracks.has(selectedTrackForDetails.id) ? "fill-current text-pink-400" : ""}`}
                  />
                  {likedTracks.has(selectedTrackForDetails.id) ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
