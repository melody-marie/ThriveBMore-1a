"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

interface SoulVaultEntry {
  id: string
  title: string
  content: string
  type: "affirmation" | "memory" | "goal" | "gratitude"
  createdAt: Date
  isPrivate: boolean
  tags: string[]
}

interface SoulVaultContextType {
  entries: SoulVaultEntry[]
  addEntry: (entry: Omit<SoulVaultEntry, "id" | "createdAt">) => void
  updateEntry: (id: string, updates: Partial<SoulVaultEntry>) => void
  deleteEntry: (id: string) => void
  getEntriesByType: (type: SoulVaultEntry["type"]) => SoulVaultEntry[]
  searchEntries: (query: string) => SoulVaultEntry[]
  isEncrypted: boolean
  toggleEncryption: () => void
}

const SoulVaultContext = createContext<SoulVaultContextType | null>(null)

const STORAGE_KEY = "thrivebmore-soul-vault"

export function SoulVaultProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<SoulVaultEntry[]>([])
  const [isEncrypted, setIsEncrypted] = useState(true)

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setEntries(
          parsed.map((entry: any) => ({
            ...entry,
            createdAt: new Date(entry.createdAt),
          })),
        )
      }
    } catch (error) {
      console.error("Failed to load soul vault entries:", error)
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch (error) {
      console.error("Failed to save soul vault entries:", error)
    }
  }, [entries])

  const addEntry = useCallback((entryData: Omit<SoulVaultEntry, "id" | "createdAt">) => {
    const newEntry: SoulVaultEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
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

  const searchEntries = useCallback(
    (query: string) => {
      const lowercaseQuery = query.toLowerCase()
      return entries.filter(
        (entry) =>
          entry.title.toLowerCase().includes(lowercaseQuery) ||
          entry.content.toLowerCase().includes(lowercaseQuery) ||
          entry.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
      )
    },
    [entries],
  )

  const toggleEncryption = useCallback(() => {
    setIsEncrypted((prev) => !prev)
  }, [])

  const contextValue: SoulVaultContextType = {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByType,
    searchEntries,
    isEncrypted,
    toggleEncryption,
  }

  return <SoulVaultContext.Provider value={contextValue}>{children}</SoulVaultContext.Provider>
}

export function useSoulVault() {
  const context = useContext(SoulVaultContext)
  if (!context) {
    throw new Error("useSoulVault must be used within a SoulVaultProvider")
  }
  return context
}
