"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email?: string
  isAnonymous: boolean
  preferences: {
    theme: "light" | "dark" | "auto"
    notifications: boolean
    privacy: "public" | "private" | "anonymous"
  }
  vaultUnlocked: boolean
  lastActive: Date
}

interface SoulVaultContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: Partial<User>) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  lockVault: () => void
  unlockVault: () => void
}

const SoulVaultContext = createContext<SoulVaultContextType | undefined>(undefined)

export function SoulVaultProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || Date.now().toString(),
      name: userData.name || "Anonymous User",
      email: userData.email,
      isAnonymous: userData.isAnonymous ?? true,
      preferences: {
        theme: "light",
        notifications: true,
        privacy: "anonymous",
        ...userData.preferences,
      },
      vaultUnlocked: false,
      lastActive: new Date(),
    }

    setUser(newUser)
    setIsAuthenticated(true)

    // Store in localStorage for persistence
    localStorage.setItem("soul_vault_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("soul_vault_user")
    localStorage.removeItem("vault_unlocked")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates, lastActive: new Date() }
      setUser(updatedUser)
      localStorage.setItem("soul_vault_user", JSON.stringify(updatedUser))
    }
  }

  const lockVault = () => {
    if (user) {
      updateUser({ vaultUnlocked: false })
      localStorage.removeItem("vault_unlocked")
    }
  }

  const unlockVault = () => {
    if (user) {
      updateUser({ vaultUnlocked: true })
      localStorage.setItem("vault_unlocked", "true")
    }
  }

  // Restore user session on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("soul_vault_user")
    const vaultUnlocked = localStorage.getItem("vault_unlocked")

    if (savedUser) {
      const userData = JSON.parse(savedUser)
      userData.vaultUnlocked = vaultUnlocked === "true"
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  // Auto-lock vault after inactivity
  useEffect(() => {
    if (user?.vaultUnlocked) {
      const timer = setTimeout(
        () => {
          lockVault()
        },
        15 * 60 * 1000,
      ) // 15 minutes

      return () => clearTimeout(timer)
    }
  }, [user?.vaultUnlocked, user?.lastActive])

  return (
    <SoulVaultContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        lockVault,
        unlockVault,
      }}
    >
      {children}
    </SoulVaultContext.Provider>
  )
}

export function useSoulVault() {
  const context = useContext(SoulVaultContext)
  if (context === undefined) {
    throw new Error("useSoulVault must be used within a SoulVaultProvider")
  }
  return context
}
