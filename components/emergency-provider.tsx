"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, MessageSquare, Shield, X } from "lucide-react"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  type: "crisis" | "medical" | "legal" | "community"
  available24h: boolean
}

interface EmergencyContextType {
  isEmergencyMode: boolean
  activateEmergency: () => void
  deactivateEmergency: () => void
  emergencyContacts: EmergencyContact[]
  quickExit: () => void
}

const EmergencyContext = createContext<EmergencyContextType | null>(null)

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: "1",
    name: "ThriveBMore Crisis Line",
    phone: "(443) 555-1015",
    type: "crisis",
    available24h: true,
  },
  {
    id: "2",
    name: "Trans Lifeline",
    phone: "877-565-8860",
    type: "crisis",
    available24h: true,
  },
  {
    id: "3",
    name: "National Suicide Prevention",
    phone: "988",
    type: "crisis",
    available24h: true,
  },
  {
    id: "4",
    name: "Baltimore Crisis Response",
    phone: "410-433-5175",
    type: "medical",
    available24h: true,
  },
  {
    id: "5",
    name: "LGBTQ Legal Aid",
    phone: "(443) 555-2020",
    type: "legal",
    available24h: false,
  },
  {
    id: "6",
    name: "Community Safety Network",
    phone: "(443) 555-3030",
    type: "community",
    available24h: true,
  },
]

export function EmergencyProvider({ children }: { children: React.ReactNode }) {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false)

  const activateEmergency = useCallback(() => {
    setIsEmergencyMode(true)
    // Add emergency mode styling to body
    document.body.classList.add("emergency-mode")
  }, [])

  const deactivateEmergency = useCallback(() => {
    setIsEmergencyMode(false)
    document.body.classList.remove("emergency-mode")
  }, [])

  const quickExit = useCallback(() => {
    // Clear browser history and redirect to a safe site
    window.location.replace("https://www.google.com")
  }, [])

  useEffect(() => {
    // Emergency keyboard shortcut (Ctrl/Cmd + Shift + E)
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "E") {
        event.preventDefault()
        activateEmergency()
      }
      // Quick exit shortcut (Ctrl/Cmd + Shift + Q)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "Q") {
        event.preventDefault()
        quickExit()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activateEmergency, quickExit])

  const contextValue: EmergencyContextType = {
    isEmergencyMode,
    activateEmergency,
    deactivateEmergency,
    emergencyContacts: EMERGENCY_CONTACTS,
    quickExit,
  }

  return (
    <EmergencyContext.Provider value={contextValue}>
      {children}
      {isEmergencyMode && <EmergencyModal />}
    </EmergencyContext.Provider>
  )
}

export function useEmergency() {
  const context = useContext(EmergencyContext)
  if (!context) {
    throw new Error("useEmergency must be used within an EmergencyProvider")
  }
  return context
}

function EmergencyModal() {
  const { deactivateEmergency, emergencyContacts, quickExit } = useEmergency()

  const getContactTypeColor = (type: EmergencyContact["type"]) => {
    switch (type) {
      case "crisis":
        return "bg-red-500 text-white"
      case "medical":
        return "bg-blue-500 text-white"
      case "legal":
        return "bg-purple-500 text-white"
      case "community":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-red-900/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto crisis-alert">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <CardTitle className="text-2xl font-bold text-red-800">Emergency Support</CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={deactivateEmergency}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-red-700 mt-2">You are not alone. Help is available 24/7.</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    <Badge className={getContactTypeColor(contact.type)}>{contact.type}</Badge>
                    {contact.available24h && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        24/7
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-mono text-gray-700">{contact.phone}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => window.open(`tel:${contact.phone}`)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => window.open(`sms:${contact.phone}`)}>
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Text
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="text-center">
              <p className="text-sm text-red-700 mb-3">If you are in immediate danger, call 911</p>
              <div className="flex gap-2 justify-center">
                <Button type="button" onClick={quickExit} variant="destructive" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Quick Exit (Ctrl+Shift+Q)
                </Button>
                <Button
                  type="button"
                  onClick={deactivateEmergency}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                >
                  Close Emergency Panel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
