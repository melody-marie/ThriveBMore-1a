"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Phone, MapPin, Clock, Shield, Send, X, CheckCircle, Lock, Wifi, WifiOff } from "lucide-react"
import { useEmergency } from "@/components/emergency-provider"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  relationship: string
  priority: number
  encrypted: boolean
}

interface EmergencyResource {
  id: string
  name: string
  phone: string
  description: string
  type: "crisis" | "medical" | "police" | "lgbtq" | "trans"
  available24_7: boolean
  encrypted: boolean
}

export function EmergencySignal() {
  const [isActive, setIsActive] = useState(false)
  const [emergencyLevel, setEmergencyLevel] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [location, setLocation] = useState<string>("")
  const [situation, setSituation] = useState<string>("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [isLocationEnabled, setIsLocationEnabled] = useState(false)
  const [signalSent, setSignalSent] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [countdown, setCountdown] = useState<number | null>(null)

  const { activateEmergency, deactivateEmergency, emergencyActive } = useEmergency()

  const emergencyContacts: EmergencyContact[] = [
    {
      id: "1",
      name: "Trusted Friend",
      phone: "(555) 123-4567",
      relationship: "Friend",
      priority: 1,
      encrypted: true,
    },
    {
      id: "2",
      name: "Family Member",
      phone: "(555) 234-5678",
      relationship: "Family",
      priority: 2,
      encrypted: true,
    },
    {
      id: "3",
      name: "Peer Navigator",
      phone: "(555) 345-6789",
      relationship: "Peer Support",
      priority: 1,
      encrypted: true,
    },
  ]

  const emergencyResources: EmergencyResource[] = [
    {
      id: "988",
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 crisis support and suicide prevention",
      type: "crisis",
      available24_7: true,
      encrypted: true,
    },
    {
      id: "trans-lifeline",
      name: "Trans Lifeline",
      phone: "(877) 565-8860",
      description: "Trans peer support hotline",
      type: "trans",
      available24_7: true,
      encrypted: true,
    },
    {
      id: "crisis-text",
      name: "Crisis Text Line",
      phone: "741741",
      description: "Text HOME for crisis support",
      type: "crisis",
      available24_7: true,
      encrypted: true,
    },
    {
      id: "911",
      name: "Emergency Services",
      phone: "911",
      description: "Police, Fire, Medical Emergency",
      type: "medical",
      available24_7: true,
      encrypted: false,
    },
    {
      id: "lgbt-hotline",
      name: "LGBT National Hotline",
      phone: "(1-888-843-4564)",
      description: "LGBTQ+ support and resources",
      type: "lgbtq",
      available24_7: true,
      encrypted: true,
    },
  ]

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocationEnabled(true)
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`)
        },
        (error) => {
          console.log("Location access denied:", error)
          setIsLocationEnabled(false)
        },
      )
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      handleSendSignal()
      setCountdown(null)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleEmergencyActivate = () => {
    setIsActive(true)
    activateEmergency(emergencyLevel)

    // Auto-select high priority contacts
    const highPriorityContacts = emergencyContacts
      .filter((contact) => contact.priority === 1)
      .map((contact) => contact.id)
    setSelectedContacts(highPriorityContacts)

    // Start 10-second countdown for automatic signal
    setCountdown(10)
  }

  const handleSendSignal = async () => {
    try {
      // Simulate encrypted signal transmission
      const signalData = {
        level: emergencyLevel,
        location: isLocationEnabled ? location : "Location not available",
        situation: situation || "Emergency assistance needed",
        timestamp: new Date().toISOString(),
        contacts: selectedContacts,
        encrypted: true,
        anonymous: true,
      }

      // In a real implementation, this would send encrypted signals
      console.log("Emergency Signal Sent:", signalData)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSignalSent(true)

      // Auto-deactivate after 5 minutes unless manually extended
      setTimeout(
        () => {
          if (emergencyActive) {
            deactivateEmergency()
            setIsActive(false)
            setSignalSent(false)
          }
        },
        5 * 60 * 1000,
      )
    } catch (error) {
      console.error("Failed to send emergency signal:", error)
    }
  }

  const handleCancel = () => {
    setCountdown(null)
    setIsActive(false)
    setSignalSent(false)
    deactivateEmergency()
    setSituation("")
    setSelectedContacts([])
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "from-yellow-500 to-orange-500"
      case 2:
        return "from-orange-500 to-red-500"
      case 3:
        return "from-red-500 to-red-600"
      case 4:
        return "from-red-600 to-red-700"
      case 5:
        return "from-red-700 to-red-800"
      default:
        return "from-red-500 to-red-600"
    }
  }

  const getLevelDescription = (level: number) => {
    switch (level) {
      case 1:
        return "Low - Need support"
      case 2:
        return "Medium - Feeling unsafe"
      case 3:
        return "High - In distress"
      case 4:
        return "Urgent - Immediate help needed"
      case 5:
        return "Critical - Life threatening"
      default:
        return "Emergency"
    }
  }

  if (!isActive && !signalSent) {
    return (
      <Button onClick={handleEmergencyActivate} className="emergency-button text-white font-bold" size="lg">
        <AlertTriangle className="w-5 h-5 mr-2" />
        Emergency Signal
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white border-red-300 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center emergency-pulse">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Emergency Signal Active</CardTitle>
                <p className="text-red-100 text-sm">Encrypted distress beacon system</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isOnline ? (
                <Badge className="bg-green-500 text-white">
                  <Wifi className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              ) : (
                <Badge className="bg-red-700 text-white">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Offline
                </Badge>
              )}
              <Button size="sm" variant="ghost" onClick={handleCancel} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {countdown !== null && (
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">Auto-sending in {countdown} seconds</div>
              <p className="text-sm text-red-700">Signal will be sent automatically unless cancelled</p>
              <Button onClick={() => setCountdown(null)} variant="outline" size="sm" className="mt-2">
                Cancel Auto-Send
              </Button>
            </div>
          )}

          {signalSent ? (
            <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Signal Sent Successfully</h3>
              <p className="text-green-700 mb-4">
                Your encrypted emergency signal has been transmitted to selected contacts and resources.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <Lock className="w-4 h-4" />
                <span>End-to-end encrypted</span>
                <Shield className="w-4 h-4 ml-2" />
                <span>Anonymous transmission</span>
              </div>
            </div>
          ) : (
            <>
              {/* Emergency Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Level</label>
                <Select
                  value={emergencyLevel.toString()}
                  onValueChange={(value) => setEmergencyLevel(Number.parseInt(value) as 1 | 2 | 3 | 4 | 5)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <SelectItem key={level} value={level.toString()}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLevelColor(level)}`} />
                          Level {level} - {getLevelDescription(level)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Situation Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Situation (Optional)</label>
                <Textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Briefly describe your situation..."
                  className="resize-none"
                  rows={3}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {isLocationEnabled ? (
                    <span className="text-sm text-green-600">Location enabled (GPS coordinates)</span>
                  ) : (
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your location manually..."
                      className="flex-1"
                    />
                  )}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notify Contacts</label>
                <div className="space-y-2">
                  {emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedContacts.includes(contact.id)
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => {
                        if (selectedContacts.includes(contact.id)) {
                          setSelectedContacts(selectedContacts.filter((id) => id !== contact.id))
                        } else {
                          setSelectedContacts([...selectedContacts, contact.id])
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-gray-600">
                            {contact.relationship} • {contact.phone}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={contact.priority === 1 ? "default" : "secondary"} className="text-xs">
                            Priority {contact.priority}
                          </Badge>
                          {contact.encrypted && (
                            <Badge className="encrypted-badge text-xs">
                              <Lock className="w-2 h-2 mr-1" />
                              E2E
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Resources */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Available Resources</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {emergencyResources.map((resource) => (
                    <div key={resource.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{resource.name}</div>
                          <div className="text-xs text-gray-600 mb-1">{resource.description}</div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-500" />
                            <span className="text-xs font-mono">{resource.phone}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          {resource.available24_7 && (
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-2 h-2 mr-1" />
                              24/7
                            </Badge>
                          )}
                          {resource.encrypted && (
                            <Badge className="encrypted-badge text-xs">
                              <Lock className="w-2 h-2 mr-1" />
                              E2E
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSendSignal}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold"
                  size="lg"
                  disabled={!isOnline}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Emergency Signal
                </Button>
                <Button onClick={handleCancel} variant="outline" size="lg" className="border-gray-300 bg-transparent">
                  Cancel
                </Button>
              </div>

              {/* Security Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                  <div className="text-xs text-gray-600">
                    <p className="font-medium mb-1">Security & Privacy:</p>
                    <ul className="space-y-1">
                      <li>• All signals are end-to-end encrypted</li>
                      <li>• Your identity remains anonymous to responders</li>
                      <li>• Location data is only shared if you consent</li>
                      <li>• Signal auto-expires after 5 minutes unless extended</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
