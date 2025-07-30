"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Mail,
  Send,
  Inbox,
  Star,
  Archive,
  Trash2,
  Lock,
  Shield,
  Bell,
  Heart,
  Users,
  Calendar,
  AlertTriangle,
  EyeOff,
  Plus,
  Search,
  Filter,
  X,
} from "lucide-react"

interface LiberationMailProps {
  isVisible: boolean
  onClose: () => void
}

interface Message {
  id: string
  from: string
  to: string
  subject: string
  content: string
  timestamp: Date
  isRead: boolean
  isStarred: boolean
  isEncrypted: boolean
  priority: "low" | "medium" | "high" | "urgent"
  category: "community" | "resources" | "events" | "healing" | "crisis" | "personal"
  attachments?: string[]
  isAnonymous: boolean
}

interface Subscription {
  id: string
  name: string
  description: string
  category: string
  frequency: "daily" | "weekly" | "monthly"
  isActive: boolean
  lastSent: Date
}

export function LiberationMail({ isVisible, onClose }: LiberationMailProps) {
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      from: "ThriveBMore Community",
      to: "you",
      subject: "Weekly Healing Circle - Tomorrow 7PM",
      content: `Dear Community Member,

Join us tomorrow evening for our weekly healing circle. This week's focus is on "Finding Strength in Vulnerability" - a gentle exploration of how sharing our authentic selves can be a source of power and connection.

What to expect:
• Guided meditation and grounding exercises
• Safe space for sharing (optional)
• Trauma-informed facilitation
• Community support and validation

Location: Virtual (Zoom link will be sent 1 hour before)
Time: Tomorrow, 7:00 PM - 8:30 PM EST

Remember: Your presence is a gift to our community, and you belong here exactly as you are.

With love and solidarity,
The ThriveBMore Team

P.S. If you're having a difficult day, please reach out. We're here for you. 💜`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: false,
      isStarred: true,
      isEncrypted: true,
      priority: "medium",
      category: "community",
      isAnonymous: false,
    },
    {
      id: "2",
      from: "Crisis Support Network",
      to: "you",
      subject: "🚨 Emergency Resources Update",
      content: `URGENT: Updated Crisis Resources

We've updated our crisis support resources with new 24/7 hotlines and local Baltimore services.

NEW RESOURCES:
• Trans Crisis Helpline: (877) 565-8860 (24/7)
• Baltimore Crisis Response: (410) 433-5175
• LGBTQ+ Emergency Housing: (443) 555-0123

REMEMBER:
• You are not alone
• Help is always available
• Your life has value and meaning

If you're in immediate danger, please call 911 or go to your nearest emergency room.

This message is encrypted and your privacy is protected.

Stay safe,
Crisis Support Team`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      isRead: true,
      isStarred: false,
      isEncrypted: true,
      priority: "urgent",
      category: "crisis",
      isAnonymous: false,
    },
    {
      id: "3",
      from: "Aziza Okoro",
      to: "you",
      subject: "Your Daily Affirmation & Spiritual Guidance",
      content: `Beloved Soul,

Today's affirmation: "I am exactly who I'm meant to be, and my existence is a sacred gift to this world."

The ancestors whisper to us in moments of quiet - they remind us that we are the continuation of their dreams, the embodiment of their hopes for freedom and authenticity.

Today, I invite you to:
• Take three deep breaths and feel your connection to the earth
• Speak your name with love and reverence
• Remember that your journey is sacred, even in its difficulty

Spiritual Practice for Today:
Light a candle (or imagine one) and spend 5 minutes in gratitude for your body, your spirit, and your courage to live authentically.

You are held in love and light,
Aziza

"In the quantum field of possibility, all souls are free." 🌟`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      isRead: false,
      isStarred: true,
      isEncrypted: true,
      priority: "low",
      category: "healing",
      isAnonymous: false,
    },
    {
      id: "4",
      from: "Anonymous Community Member",
      to: "you",
      subject: "Thank you for being you",
      content: `Hi,

I don't know if you'll see this, but I wanted to reach out anonymously to say thank you.

I saw your post in Melly's Spot about struggling with family acceptance, and it really resonated with me. Knowing that someone else is going through similar challenges makes me feel less alone.

Your courage to share your story gives others permission to be vulnerable too. That's a gift.

I hope you know how valuable you are to this community, even when things feel hard.

Sending love and solidarity,
A fellow traveler 💜

P.S. The peer support group on Thursdays has been really helpful for me. Maybe it could help you too?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
      isRead: false,
      isStarred: false,
      isEncrypted: true,
      priority: "medium",
      category: "personal",
      isAnonymous: true,
    },
  ])

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      name: "Daily Affirmations",
      description: "Trauma-informed affirmations and spiritual guidance from Aziza",
      category: "Healing",
      frequency: "daily",
      isActive: true,
      lastSent: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
    {
      id: "2",
      name: "Community Events",
      description: "Updates on support groups, workshops, and community gatherings",
      category: "Events",
      frequency: "weekly",
      isActive: true,
      lastSent: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      id: "3",
      name: "Resource Updates",
      description: "New LGBTQ+ resources, healthcare providers, and legal updates",
      category: "Resources",
      frequency: "monthly",
      isActive: false,
      lastSent: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    },
    {
      id: "4",
      name: "Crisis Alerts",
      description: "Important safety information and emergency resource updates",
      category: "Safety",
      frequency: "weekly",
      isActive: true,
      lastSent: new Date(Date.now() - 1000 * 60 * 60 * 6),
    },
  ])

  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    content: "",
    isAnonymous: false,
    priority: "medium" as const,
    isEncrypted: true,
  })

  const handleMarkAsRead = (messageId: string) => {
    setMessages((messages) => messages.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg)))
  }

  const handleStarMessage = (messageId: string) => {
    setMessages((messages) =>
      messages.map((msg) => (msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg)),
    )
  }

  const handleSendMessage = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      from: composeData.isAnonymous ? "Anonymous" : "You",
      to: composeData.to,
      subject: composeData.subject,
      content: composeData.content,
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
      isEncrypted: composeData.isEncrypted,
      priority: composeData.priority,
      category: "personal",
      isAnonymous: composeData.isAnonymous,
    }

    setMessages([newMessage, ...messages])
    setComposeData({
      to: "",
      subject: "",
      content: "",
      isAnonymous: false,
      priority: "medium",
      isEncrypted: true,
    })
    setIsComposing(false)
  }

  const handleToggleSubscription = (subscriptionId: string) => {
    setSubscriptions((subs) =>
      subs.map((sub) => (sub.id === subscriptionId ? { ...sub, isActive: !sub.isActive } : sub)),
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "medium":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "community":
        return Users
      case "resources":
        return Shield
      case "events":
        return Calendar
      case "healing":
        return Heart
      case "crisis":
        return AlertTriangle
      case "personal":
        return Mail
      default:
        return Mail
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.from.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || message.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden border-4 border-pink-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">LiberationMail</h2>
              <p className="text-pink-100 text-sm">Secure trauma-informed communications</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="encrypted-badge">
              <Lock className="w-3 h-3 mr-1" />
              E2E Encrypted
            </Badge>
            <Button onClick={() => setIsComposing(true)} size="sm" className="bg-white/20 hover:bg-white/30">
              <Plus className="w-4 h-4 mr-2" />
              Compose
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-white/50 border-r border-pink-200 p-4">
            <div className="space-y-2">
              <Button
                variant={activeTab === "inbox" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("inbox")}
              >
                <Inbox className="w-4 h-4 mr-2" />
                Inbox ({messages.filter((m) => !m.isRead).length})
              </Button>
              <Button
                variant={activeTab === "starred" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("starred")}
              >
                <Star className="w-4 h-4 mr-2" />
                Starred ({messages.filter((m) => m.isStarred).length})
              </Button>
              <Button
                variant={activeTab === "subscriptions" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("subscriptions")}
              >
                <Bell className="w-4 h-4 mr-2" />
                Subscriptions
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Shield className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Categories</h4>
              <div className="space-y-1">
                {["all", "community", "healing", "crisis", "personal"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-2 py-1 text-sm rounded capitalize ${
                      selectedCategory === category ? "bg-pink-100 text-pink-700" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {isComposing ? (
              /* Compose Message */
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Compose Message</h3>
                  <Button onClick={() => setIsComposing(false)} variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      <Input
                        value={composeData.to}
                        onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                        placeholder="Recipient email or username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={composeData.priority}
                        onChange={(e) => setComposeData({ ...composeData, priority: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input
                      value={composeData.subject}
                      onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                      placeholder="Message subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea
                      value={composeData.content}
                      onChange={(e) => setComposeData({ ...composeData, content: e.target.value })}
                      placeholder="Write your message..."
                      className="min-h-[200px] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={composeData.isAnonymous}
                          onChange={(e) => setComposeData({ ...composeData, isAnonymous: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm">Send anonymously</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Always encrypted</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsComposing(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!composeData.to || !composeData.subject || !composeData.content}
                        className="bg-gradient-to-r from-pink-500 to-purple-500"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedMessage ? (
              /* Message View */
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Button onClick={() => setSelectedMessage(null)} variant="ghost" size="sm">
                    ← Back to Inbox
                  </Button>
                  <div className="flex gap-2">
                    <Button onClick={() => handleStarMessage(selectedMessage.id)} variant="ghost" size="sm">
                      <Star className={`w-4 h-4 ${selectedMessage.isStarred ? "fill-current text-yellow-500" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Card className="liberation-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                          <span>From: {selectedMessage.from}</span>
                          <span>•</span>
                          <span>{selectedMessage.timestamp.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(selectedMessage.priority)}>{selectedMessage.priority}</Badge>
                        {selectedMessage.isEncrypted && (
                          <Badge className="encrypted-badge">
                            <Lock className="w-2 h-2 mr-1" />
                            Encrypted
                          </Badge>
                        )}
                        {selectedMessage.isAnonymous && (
                          <Badge className="anonymous-mode">
                            <EyeOff className="w-2 h-2 mr-1" />
                            Anonymous
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                        {selectedMessage.content}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Message List */
              <div className="p-6">
                {/* Search Bar */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="space-y-2">
                    {filteredMessages.map((message) => {
                      const CategoryIcon = getCategoryIcon(message.category)
                      return (
                        <Card
                          key={message.id}
                          className={`liberation-card cursor-pointer transition-all hover:shadow-md ${
                            !message.isRead ? "border-pink-300 bg-pink-50/50" : ""
                          }`}
                          onClick={() => {
                            setSelectedMessage(message)
                            handleMarkAsRead(message.id)
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <CategoryIcon className="w-4 h-4 text-gray-500" />
                                  <span className={`font-medium ${!message.isRead ? "font-bold" : ""}`}>
                                    {message.from}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {message.timestamp.toLocaleDateString()}
                                  </span>
                                  {message.isEncrypted && <Lock className="w-3 h-3 text-green-500" />}
                                  {message.isAnonymous && <EyeOff className="w-3 h-3 text-gray-500" />}
                                </div>
                                <h4 className={`text-gray-800 mb-1 ${!message.isRead ? "font-bold" : ""}`}>
                                  {message.subject}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {message.content.substring(0, 150)}...
                                </p>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                {message.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                                <Badge className={getPriorityColor(message.priority)} variant="outline">
                                  {message.priority}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Subscriptions Tab */}
            {activeTab === "subscriptions" && !selectedMessage && !isComposing && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Email Subscriptions</h3>
                <div className="space-y-4">
                  {subscriptions.map((subscription) => (
                    <Card key={subscription.id} className="liberation-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{subscription.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{subscription.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="capitalize">{subscription.frequency}</span>
                              <span>•</span>
                              <span>Last sent: {subscription.lastSent.toLocaleDateString()}</span>
                              <Badge variant="outline" className="text-xs">
                                {subscription.category}
                              </Badge>
                            </div>
                          </div>
                          <Switch
                            checked={subscription.isActive}
                            onCheckedChange={() => handleToggleSubscription(subscription.id)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
