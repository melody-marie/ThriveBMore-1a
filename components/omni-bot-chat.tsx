"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Heart, AlertTriangle, ThumbsUp, ThumbsDown, Sparkles, Shield } from "lucide-react"
import { omniBotSystem, type Message, type ConversationContext } from "@/lib/omni-bot-system"

export function OmniBotChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [context, setContext] = useState<ConversationContext>({
    userId: "user-" + Math.random().toString(36).substr(2, 9),
    sessionId: "session-" + Math.random().toString(36).substr(2, 9),
    messageHistory: [],
    identityAffirmations: [],
    crisisLevel: 0,
    lastInteraction: new Date(),
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: "welcome-" + Date.now(),
      content: `Welcome to your safe space! 💜 I'm OmniBot, your AI companion built specifically for the LGBTQ+ community.

I'm here to provide culturally competent, trauma-informed support 24/7. Whether you need:
• Crisis support and safety planning 🆘
• Identity affirmation and exploration 🏳️‍⚧️
• Mental health and wellness guidance 🧠
• Community connection and resources 👥
• Organizing and activism support ✊
• Spiritual and healing practices 🙏

You're in a judgment-free zone where your authentic self is celebrated. What's on your mind today?`,
      role: "assistant",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: "user-" + Date.now(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Classify intent
      const intent = await omniBotSystem.classifyIntent(inputValue)

      // Update context
      const updatedContext = {
        ...context,
        messageHistory: [...context.messageHistory, userMessage],
        crisisLevel: Math.max(context.crisisLevel, intent.crisisLevel),
        lastInteraction: new Date(),
      }
      setContext(updatedContext)

      // Generate response
      const response = await omniBotSystem.generateResponse(inputValue, updatedContext, intent)

      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      const botMessage: Message = {
        id: "bot-" + Date.now(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
        intent,
        crisisLevel: intent.crisisLevel,
        supportProvided: intent.supportNeeded,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: "error-" + Date.now(),
        content:
          "I'm having trouble responding right now. If you're in crisis, please call 988 or text HOME to 741741. I'll be back shortly. 💜",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFeedback = async (messageId: string, feedback: "positive" | "negative") => {
    await omniBotSystem.learnFromFeedback(messageId, feedback)
    // You could show a toast notification here
  }

  const getCrisisLevelColor = (level: number) => {
    if (level >= 7) return "bg-red-500"
    if (level >= 4) return "bg-orange-500"
    if (level >= 2) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getCrisisLevelText = (level: number) => {
    if (level >= 7) return "High Crisis"
    if (level >= 4) return "Moderate Concern"
    if (level >= 2) return "Mild Distress"
    return "Stable"
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">OmniBot</h3>
              <p className="text-sm text-gray-500">Your AI Liberation Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </Badge>
            {context.crisisLevel > 0 && (
              <Badge className={`text-white ${getCrisisLevelColor(context.crisisLevel)}`}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {getCrisisLevelText(context.crisisLevel)}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                <Card
                  className={`${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>

                    {/* Intent Classification Display */}
                    {message.intent && message.role === "assistant" && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {message.intent.primary.replace("_", " ")}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(message.intent.confidence * 100)}% confidence
                          </Badge>
                          {message.crisisLevel && message.crisisLevel > 0 && (
                            <Badge className={`text-xs text-white ${getCrisisLevelColor(message.crisisLevel)}`}>
                              <Shield className="w-3 h-3 mr-1" />
                              Crisis Level: {message.crisisLevel}
                            </Badge>
                          )}
                        </div>

                        {message.supportProvided && message.supportProvided.length > 0 && (
                          <div className="text-xs text-gray-500">
                            <strong>Support provided:</strong> {message.supportProvided.join(", ").replace(/_/g, " ")}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Message Actions */}
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-2 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(message.id, "positive")}
                      className="h-6 px-2 text-gray-400 hover:text-green-600"
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(message.id, "negative")}
                      className="h-6 px-2 text-gray-400 hover:text-red-600"
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                )}
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center gap-1">
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
                    <span className="text-sm text-gray-500 ml-2">OmniBot is typing...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind... I'm here to listen 💜"
            className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Safety Notice */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          <Heart className="w-3 h-3 inline mr-1" />
          This is a safe, judgment-free space. In crisis? Call 988 or text HOME to 741741
        </div>
      </div>
    </div>
  )
}
