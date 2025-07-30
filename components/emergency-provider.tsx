"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, Shield, X } from "lucide-react"

interface EmergencyContextType {
  isEmergencyActive: boolean
  activateEmergency: () => void
  deactivateEmergency: () => void
  emergencyContacts: EmergencyContact[]
}

interface EmergencyContact {
  id: string
  name: string
  phone: string
  type: "crisis" | "medical" | "legal" | "community"
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined)

export function useEmergency(): EmergencyContextType {
  const context = useContext(EmergencyContext)
  if (!context) {
    throw new Error("useEmergency must be used within an EmergencyProvider")
  }
  return context
}

const defaultEmergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "Trans Lifeline",
    phone: "877-565-8860",
    type: "crisis",
  },
  {
    id: "2",
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    type: "crisis",
  },
  {
    id: "3",
    name: "Baltimore Crisis Response",
    phone: "410-433-5175",
    type: "crisis",
  },
  {
    id: "4",
    name: "Emergency Services",
    phone: "911",
    type: "medical",
  },
]

export function EmergencyProvider({ children }: { children: React.ReactNode }) {
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false)
  const [emergencyContacts] = useState<EmergencyContact[]>(defaultEmergencyContacts)

  const activateEmergency = useCallback(() => {
    setIsEmergencyActive(true)
    // Play emergency sound if available
    try {
      const audio = new Audio("/sounds/emergency-alert.mp3")
      audio.volume = 0.3
      audio.play().catch(() => {
        // Silently fail if audio can't play
      })
    } catch {
      // Silently fail if audio creation fails
    }
  }, [])

  const deactivateEmergency = useCallback(() => {
    setIsEmergencyActive(false)
  }, [])

  // Emergency keyboard shortcut (Ctrl/Cmd + Shift + E)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "E") {
        event.preventDefault()
        activateEmergency()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activateEmergency])

  const contextValue: EmergencyContextType = {
    isEmergencyActive,
    activateEmergency,
    deactivateEmergency,
    emergencyContacts,
  }

  return (
    <EmergencyContext.Provider value={contextValue}>
      {children}

      {/* Emergency Modal */}
      {isEmergencyActive && (
        <div className="fixed inset-0 z-[9999] bg-red-900/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-md w-full p-6 border-4 border-red-500 emergency-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Emergency Mode Active</h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={deactivateEmergency}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              You are in a safe space. Choose an emergency contact below or use the quick exit feature.
            </p>

            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <Button
                  key={contact.id}
                  type="button"
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-3 border-red-200 hover:border-red-300 hover:bg-red-50 bg-transparent"
                  onClick={() => {
                    window.open(`tel:${contact.phone}`, "_self")
                  }}
                >
                  <Phone className="h-4 w-4 text-red-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</div>
                  </div>
                </Button>
              ))}

              <Button
                type="button"
                variant="secondary"
                className="w-full gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                onClick={() => {
                  // Quick exit - redirect to a safe site
                  window.location.href = "https://www.google.com"
                }}
              >
                <Shield className="h-4 w-4" />
                Quick Exit to Google
              </Button>
            </div>

            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
              Press Ctrl+Shift+E to activate emergency mode anytime
            </div>
          </div>
        </div>
      )}
    </EmergencyContext.Provider>
  )
}
