"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
  themes: Record<string, any>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("liberation")

  const themes = {
    liberation: {
      id: "liberation",
      name: "Liberation",
      colors: {
        primary: "#0b1a3d",
        secondary: "#f4c430",
        accent: "#028a0f",
        text: "#f0e9d2",
        textSecondary: "#ff6f3c",
      },
    },
    ancestral: {
      id: "ancestral",
      name: "Ancestral Wisdom",
      colors: {
        primary: "#2d1810",
        secondary: "#d4af37",
        accent: "#8b4513",
        text: "#f5deb3",
        textSecondary: "#cd853f",
      },
    },
    ocean: {
      id: "ocean",
      name: "Ocean Depths",
      colors: {
        primary: "#001f3f",
        secondary: "#7fdbff",
        accent: "#39cccc",
        text: "#e6f3ff",
        textSecondary: "#00bcd4",
      },
    },
    sunset: {
      id: "sunset",
      name: "Sunset Celebration",
      colors: {
        primary: "#4a1810",
        secondary: "#ff6b35",
        accent: "#f7931e",
        text: "#fff8dc",
        textSecondary: "#ff4500",
      },
    },
    forest: {
      id: "forest",
      name: "Forest Sanctuary",
      colors: {
        primary: "#1a2f1a",
        secondary: "#90ee90",
        accent: "#32cd32",
        text: "#f0fff0",
        textSecondary: "#00ff7f",
      },
    },
    cosmic: {
      id: "cosmic",
      name: "Cosmic Afrofuturism",
      colors: {
        primary: "#0f0f23",
        secondary: "#9d4edd",
        accent: "#c77dff",
        text: "#e0aaff",
        textSecondary: "#ff006e",
      },
    },
    fire: {
      id: "fire",
      name: "Sacred Fire",
      colors: {
        primary: "#2c0a0a",
        secondary: "#ff4444",
        accent: "#ff6b6b",
        text: "#ffe4e1",
        textSecondary: "#ff1744",
      },
    },
    moonlight: {
      id: "moonlight",
      name: "Moonlight Serenity",
      colors: {
        primary: "#1a1a2e",
        secondary: "#e6e6fa",
        accent: "#dda0dd",
        text: "#f8f8ff",
        textSecondary: "#ba55d3",
      },
    },
    "high-contrast": {
      id: "high-contrast",
      name: "High Contrast",
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#ffff00",
        text: "#ffffff",
        textSecondary: "#ffff00",
      },
    },
  }

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("thrivebmore-theme")
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
    }
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("thrivebmore-theme", newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, themes }}>{children}</ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider")
  }
  return context
}
