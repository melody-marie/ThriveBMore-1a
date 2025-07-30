"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Bot,
  User,
  Heart,
  AlertTriangle,
  Phone,
  Shield,
  Clock,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Copy,
  Moon,
  Sun,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "crisis" | "resource" | "system"
  metadata?: {
    crisisLevel?: number
    resources?: Array<{
      name: string
      phone: string
      description: string
    }>
    sentiment?: "positive" | "negative" | "neutral"
    topics?: string[]
  }
}

interface OmniBotChatProps {
  isVisible: boolean
  onClose: () => void
}

export function OmniBotChat({ isVisible, onClose }: OmniBotChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hi there! I'm OmniBot, your trauma-informed AI companion. I'm here to listen, support, and help you find resources. How are you feeling today? 💜",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
      metadata: {
        sentiment: "positive",
        topics: ["greeting", "support"],
      },
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isVisible && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isVisible, isMinimized])

  const playNotificationSound = () => {
    if (soundEnabled) {
      // Create a simple notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
  }

  const detectCrisisLevel = (message: string): number => {
    const crisisKeywords = [
      { words: ["suicide", "kill myself", "end it all", "want to die"], level: 10 },
      { words: ["self harm", "cutting", "hurt myself", "self-harm"], level: 9 },
      { words: ["hopeless", "worthless", "can't go on", "no point"], level: 8 },
      { words: ["panic", "anxiety attack", "can't breathe", "overwhelming"], level: 7 },
      { words: ["depressed", "sad", "down", "struggling"], level: 5 },
      { words: ["stressed", "worried", "anxious", "nervous"], level: 3 },
    ]

    let maxLevel = 0
    const lowerMessage = message.toLowerCase()

    crisisKeywords.forEach(({ words, level }) => {
      if (words.some((word) => lowerMessage.includes(word))) {
        maxLevel = Math.max(maxLevel, level)
      }
    })

    return maxLevel
  }

  const generateBotResponse = (userMessage: string): Message => {
    const crisisLevel = detectCrisisLevel(userMessage)
    const lowerMessage = userMessage.toLowerCase()

    // Crisis response
    if (crisisLevel >= 8) {
      return {
        id: Date.now().toString(),
        content:
          "I'm really concerned about you right now. Your safety is the most important thing. Please consider reaching out to a crisis hotline immediately. Would you like me to provide some crisis resources? You don't have to go through this alone. 💜",
        sender: "bot",
        timestamp: new Date(),
        type: "crisis",
        metadata: {
          crisisLevel,
          resources: [
            {
              name: "National Suicide Prevention Lifeline",
              phone: "988",
              description: "24/7 crisis support",
            },
            {
              name: "Crisis Text Line",
              phone: "Text HOME to 741741",
              description: "24/7 text-based crisis support",
            },
          ],
          sentiment: "negative",
          topics: ["crisis", "safety", "resources"],
        },
      }
    }

    // High concern response
    if (crisisLevel >= 6) {
      return {
        id: Date.now().toString(),
        content:
          "I hear that you're going through a really difficult time right now. That takes courage to share. Have you been able to talk to anyone about how you're feeling? Sometimes it can help to reach out to a counselor or trusted friend. I'm here to listen and support you. 💙",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        metadata: {
          crisisLevel,
          sentiment: "negative",
          topics: ["support", "mental health", "coping"],
        },
      }
    }

    // LGBTQ+ specific support
    if (
      lowerMessage.includes("trans") ||
      lowerMessage.includes("transgender") ||
      lowerMessage.includes("gender") ||
      lowerMessage.includes("dysphoria")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "Thank you for trusting me with this. Gender identity and expression are deeply personal, and your feelings are completely valid. If you're looking for trans-specific support, I can connect you with resources like Trans Lifeline (877-565-8860) or local LGBTQ+ affirming healthcare providers. How can I best support you right now? 🏳️‍⚧️💜",
        sender: "bot",
        timestamp: new Date(),
        type: "resource",
        metadata: {
          crisisLevel,
          resources: [
            {
              name: "Trans Lifeline",
              phone: "(877) 565-8860",
              description: "Trans peer support hotline",
            },
          ],
          sentiment: "neutral",
          topics: ["transgender", "identity", "support", "resources"],
        },
      }
    }

    // Little space / age regression support
    if (
      lowerMessage.includes("little") ||
      lowerMessage.includes("small") ||
      lowerMessage.includes("regression") ||
      lowerMessage.includes("child")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "It sounds like you might be feeling little or need some comfort right now. That's completely okay and valid! Age regression can be a healthy coping mechanism. Would you like me to guide you to our Little Space area where you can find comfort items, activities, and a safe environment? You deserve to feel safe and cared for. 🧸💕",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        metadata: {
          crisisLevel,
          sentiment: "positive",
          topics: ["age regression", "comfort", "coping", "little space"],
        },
      }
    }

    // Anxiety/panic support
    if (
      lowerMessage.includes("panic") ||
      lowerMessage.includes("anxiety") ||
      lowerMessage.includes("anxious") ||
      lowerMessage.includes("overwhelmed")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "I can hear that you're feeling anxious or overwhelmed right now. Let's try to ground you. Can you try the 5-4-3-2-1 technique with me? Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Take slow, deep breaths. You're safe right now. 🌸",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        metadata: {
          crisisLevel,
          sentiment: "neutral",
          topics: ["anxiety", "grounding", "breathing", "coping"],
        },
      }
    }

    // Baltimore resources
    if (
      lowerMessage.includes("baltimore") ||
      lowerMessage.includes("local") ||
      lowerMessage.includes("maryland") ||
      lowerMessage.includes("md")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "I can help you find local Baltimore resources! We have some great LGBTQ+ affirming organizations here including Chase Brexton Health Care, Baltimore LGBT Center, and PFLAG Baltimore. Would you like specific contact information or details about their services? I can also help you find other local support groups or events. 🏙️💜",
        sender: "bot",
        timestamp: new Date(),
        type: "resource",
        metadata: {
          crisisLevel,
          resources: [
            {
              name: "Chase Brexton Health Care",
              phone: "(410) 837-2050",
              description: "LGBTQ+ affirming healthcare",
            },
            {
              name: "Baltimore LGBT Center",
              phone: "(410) 837-5445",
              description: "Community programs and support",
            },
          ],
          sentiment: "positive",
          topics: ["baltimore", "local resources", "healthcare", "community"],
        },
      }
    }

    // Positive/supportive responses
    if (
      lowerMessage.includes("better") ||
      lowerMessage.includes("good") ||
      lowerMessage.includes("happy") ||
      lowerMessage.includes("thank")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "I'm so glad to hear that! It's wonderful when things feel a bit brighter. Remember that healing isn't linear, and it's okay to have ups and downs. You're doing great by reaching out and taking care of yourself. Is there anything specific that's been helping you feel better? ✨💜",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        metadata: {
          crisisLevel,
          sentiment: "positive",
          topics: ["positive", "healing", "self-care", "encouragement"],
        },
      }
    }

    // Default supportive response
    return {
      id: Date.now().toString(),
      content:
        "Thank you for sharing that with me. I'm here to listen and support you however I can. Your feelings are valid, and you deserve care and compassion. Is there anything specific you'd like to talk about or any way I can help you right now? 💜",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
      metadata: {
        crisisLevel,
        sentiment: "neutral",
        topics: ["support", "validation", "listening"],
      },
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse = generateBotResponse(inputValue)
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
        playNotificationSound()
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden border-2 border-purple-200 ${isMinimized ? "h-16" : ""}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">OmniBot</h2>
              <p className="text-purple-100 text-sm">Trauma-informed AI companion</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-white hover:bg-white/20"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-white hover:bg-white/20"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
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
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className={`max-w-[70%] ${message.sender === "user" ? "order-2" : ""}`}>
                      <div
                        className={`rounded-2xl p-3 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : message.type === "crisis"
                              ? "bg-red-50 border border-red-200 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>

                        {message.metadata?.resources && (
                          <div className="mt-3 space-y-2">
                            {message.metadata.resources.map((resource, index) => (
                              <div key={index} className="bg-white/90 rounded-lg p-2 border">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-semibold text-xs text-gray-800">{resource.name}</h4>
                                    <p className="text-xs text-gray-600">{resource.description}</p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-gray-600" />
                                    <span className="text-xs font-mono text-gray-800">{resource.phone}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{formatTime(message.timestamp)}</span>
                        {message.metadata?.crisisLevel && message.metadata.crisisLevel > 5 && (
                          <Badge variant="outline" className="text-xs border-red-300 text-red-600">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            High concern
                          </Badge>
                        )}
                        {message.metadata?.sentiment && (
                          <Badge variant="outline" className="text-xs">
                            {message.metadata.sentiment === "positive"
                              ? "😊"
                              : message.metadata.sentiment === "negative"
                                ? "😔"
                                : "😐"}
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyMessage(message.content)}
                          className="h-4 w-4 p-0 hover:bg-gray-200"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind... I'm here to listen 💜"
                  className="flex-1 border-purple-200 focus:border-purple-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Trauma-informed
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    LGBTQ+ affirming
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    24/7 available
                  </span>
                </div>
                <span>Press Enter to send</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OmniBotChat
