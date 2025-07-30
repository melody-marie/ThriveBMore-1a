"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface EmergencyContextType {
  emergencyActive: boolean
  emergencyLevel: number
  emergencyData: any
  activateEmergency: (level: number, data?: any) => void
  deactivateEmergency: () => void
  updateEmergencyData: (data: any) => void
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined)

export function EmergencyProvider({ children }: { children: React.ReactNode }) {
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [emergencyLevel, setEmergencyLevel] = useState(0)
  const [emergencyData, setEmergencyData] = useState<any>(null)

  const activateEmergency = (level: number, data?: any) => {
    setEmergencyActive(true)
    setEmergencyLevel(level)
    setEmergencyData(data)

    // Store in localStorage for persistence across page reloads
    localStorage.setItem("emergency_active", "true")
    localStorage.setItem("emergency_level", level.toString())
    if (data) {
      localStorage.setItem("emergency_data", JSON.stringify(data))
    }
  }

  const deactivateEmergency = () => {
    setEmergencyActive(false)
    setEmergencyLevel(0)
    setEmergencyData(null)

    // Clear from localStorage
    localStorage.removeItem("emergency_active")
    localStorage.removeItem("emergency_level")
    localStorage.removeItem("emergency_data")
  }

  const updateEmergencyData = (data: any) => {
    setEmergencyData(data)
    localStorage.setItem("emergency_data", JSON.stringify(data))
  }

  // Restore emergency state on page load
  useEffect(() => {
    const savedActive = localStorage.getItem("emergency_active")
    const savedLevel = localStorage.getItem("emergency_level")
    const savedData = localStorage.getItem("emergency_data")

    if (savedActive === "true" && savedLevel) {
      setEmergencyActive(true)
      setEmergencyLevel(Number.parseInt(savedLevel))
      if (savedData) {
        setEmergencyData(JSON.parse(savedData))
      }
    }
  }, [])

  return (
    <EmergencyContext.Provider
      value={{
        emergencyActive,
        emergencyLevel,
        emergencyData,
        activateEmergency,
        deactivateEmergency,
        updateEmergencyData,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  )
}

export function useEmergency() {
  const context = useContext(EmergencyContext)
  if (context === undefined) {
    throw new Error("useEmergency must be used within an EmergencyProvider")
  }
  return context
}
