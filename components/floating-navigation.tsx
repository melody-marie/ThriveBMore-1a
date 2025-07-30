"use client"

import { useState } from "react"
import { Heart, Users, MessageCircle, Volume2, AlertTriangle, Lock, Mail, UserCheck, Home, Menu, X } from "lucide-react"

interface FloatingNavigationProps {
  onNavigate: (section: string) => void
  currentSection?: string
}

export function FloatingNavigation({ onNavigate, currentSection }: FloatingNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const navigationItems = [
    { id: "home", icon: Home, label: "Home", color: "from-purple-500 to-pink-500" },
    { id: "little-space", icon: Heart, label: "Little Space", color: "from-pink-500 to-purple-500" },
    { id: "mellys-spot", icon: Users, label: "Melly's Spot", color: "from-blue-500 to-cyan-500" },
    { id: "omni-bot", icon: MessageCircle, label: "OmniBot", color: "from-yellow-500 to-orange-500" },
    { id: "sound-healing", icon: Volume2, label: "Sound Healing", color: "from-green-500 to-emerald-500" },
    { id: "peer-connector", icon: UserCheck, label: "Peer Support", color: "from-indigo-500 to-purple-500" },
    { id: "soul-vault", icon: Lock, label: "SoulVault", color: "from-purple-500 to-indigo-500" },
    { id: "liberation-mail", icon: Mail, label: "LiberationMail", color: "from-pink-500 to-rose-500" },
    { id: "emergency", icon: AlertTriangle, label: "Emergency", color: "from-red-500 to-red-600" },
  ]

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId)
    setIsExpanded(false)
  }

  return (
    <div className="floating-nav">
      {/* Main Menu Button */}
      <button
        className="floating-nav-button"
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? "Close Menu" : "Open Menu"}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Items */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-right duration-300">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon
            const isActive = currentSection === item.id

            return (
              <button
                key={item.id}
                className={`floating-nav-button ${isActive ? "ring-2 ring-white" : ""}`}
                onClick={() => handleNavigate(item.id)}
                title={item.label}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${item.color.split(" ")[1]}, ${item.color.split(" ")[3]})`
                    : `linear-gradient(135deg, ${item.color.split(" ")[1]}80, ${item.color.split(" ")[3]}80)`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <IconComponent className="w-5 h-5" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
