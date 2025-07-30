"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

interface SoulVaultEntry {
  id: string
  title: string
  content: string
  type: "journal" | "affirmation" | "memory" | "goal"
  timestamp: Date
  mood?: "joyful" | "peaceful" | "struggling" | "angry" | "hopeful" | "grateful"
  isPrivate: boolean
}

interface SoulVaultContextType {
  entries: SoulVaultEntry[]
  addEntry: (entry: Omit<SoulVaultEntry, "id" | "timestamp">) => void
  updateEntry: (id: string, updates: Partial<SoulVaultEntry>) => void
  deleteEntry: (id: string) => void
  getEntriesByType: (type: SoulVaultEntry["type"]) => SoulVaultEntry[]
  getEntriesByMood: (mood: SoulVaultEntry["mood"]) => SoulVaultEntry[]
  isVaultLocked: boolean
  unlockVault: (password: string) => boolean
  lockVault: () => void
}

const SoulVaultContext = createContext<SoulVaultContextType | undefined>(undefined)

export function useSoulVault(): SoulVaultContextType {
  const context = useContext(SoulVaultContext)
  if (!context) {
    throw new Error("useSoulVault must be used within a SoulVaultProvider")
  }
  return context
}

const VAULT_PASSWORD = "liberation2024" // In production, this would be user-set and encrypted

export function SoulVaultProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<SoulVaultEntry[]>([])
  const [isVaultLocked, setIsVaultLocked] = useState<boolean>(true)

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem("soulVaultEntries")
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }))
        setEntries(parsedEntries)
      }
    } catch (error) {
      console.error("Failed to load soul vault entries:", error)
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem("soulVaultEntries", JSON.stringify(entries))
    } catch (error) {
      console.error("Failed to save soul vault entries:", error)
    }
  }, [entries])

  const addEntry = useCallback((entryData: Omit<SoulVaultEntry, "id" | "timestamp">) => {
    const newEntry: SoulVaultEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }
    setEntries((prev) => [newEntry, ...prev])
  }, [])

  const updateEntry = useCallback((id: string, updates: Partial<SoulVaultEntry>) => {
    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)))
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }, [])

  const getEntriesByType = useCallback(
    (type: SoulVaultEntry["type"]) => {
      return entries.filter((entry) => entry.type === type)
    },
    [entries],
  )

  const getEntriesByMood = useCallback(
    (mood: SoulVaultEntry["mood"]) => {
      return entries.filter((entry) => entry.mood === mood)
    },
    [entries],
  )

  const unlockVault = useCallback((password: string) => {
    if (password === VAULT_PASSWORD) {
      setIsVaultLocked(false)
      return true
    }
    return false
  }, [])

  const lockVault = useCallback(() => {
    setIsVaultLocked(true)
  }, [])

  const contextValue: SoulVaultContextType = {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByType,
    getEntriesByMood,
    isVaultLocked,
    unlockVault,
    lockVault,
  }

  return <SoulVaultContext.Provider value={contextValue}>{children}</SoulVaultContext.Provider>
}
