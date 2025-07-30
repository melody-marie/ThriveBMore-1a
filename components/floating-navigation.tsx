"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Heart, Users, MessageCircle, Volume2, UserCheck, Lock, Mail, AlertTriangle, Menu, X } from "lucide-react"

interface FloatingNavigationProps {
  onNavigate: (section: string) => void
  currentSection: string
}

export function FloatingNavigation({ onNavigate, currentSection }: FloatingNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const navigationItems = [
    { id: "home", icon: Home, label: "Home", color: "from-purple-500 to-pink-500" },
    { id: "little-space", icon: Heart, label: "Little Space", color: "from-pink-500 to-purple-500" },
    { id: "mellys-spot", icon: Users, label: "Melly's Spot", color: "from-blue-500 to-cyan-500" },
    { id: "omni-bot", icon: MessageCircle, label: "OmniBot", color: "from-yellow-500 to-orange-500" },
    { id: "sound-healing", icon: Volume2, label: "Sound Healing", color: "from-green-500 to-emerald-500" },
    { id: "peer-connector", icon: UserCheck, label: "Peer Support", color: "from-emerald-500 to-green-500" },
    { id: "soul-vault", icon: Lock, label: "SoulVault", color: "from-indigo-500 to-purple-500" },
    { id: "liberation-mail", icon: Mail, label: "LiberationMail", color: "from-rose-500 to-pink-500" },
    { id: "emergency", icon: AlertTriangle, label: "Emergency", color: "from-red-500 to-red-600" },
  ]

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId)
    setIsExpanded(false)
  }

  return (
    <div className="floating-nav">
      {/* Main Toggle Button */}
      <Button
        className="floating-nav-button mystical-glow"
        onClick={() => setIsExpanded(!isExpanded)}
        title="Navigation Menu"
      >
        {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Navigation Items */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-right duration-300">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon
            const isActive = currentSection === item.id

            return (
              <Button
                key={item.id}
                className={`floating-nav-button ${isActive ? "ring-2 ring-white ring-offset-2" : ""}`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                    : `linear-gradient(135deg, ${item.color.replace("from-", "").replace("to-", ", ")})`,
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => handleNavigate(item.id)}
                title={item.label}
              >
                <IconComponent className="w-4 h-4" />
              </Button>
            )
          })}
        </div>
      )}

      {/* Quick Access Emergency Button */}
      <Button
        className="floating-nav-button bg-gradient-to-r from-red-500 to-red-600 emergency-pulse"
        onClick={() => handleNavigate("emergency")}
        title="Emergency Signal"
      >
        <AlertTriangle className="w-5 h-5" />
      </Button>
    </div>
  )
}
