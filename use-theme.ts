"use client"

import { useState, useEffect } from "react"

export interface Theme {
  id: string
  name: string
  description: string
  icon: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
  gradient: string
  culturalSignificance?: string
}

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("liberation")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("thrivebmore-theme")
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }
    setIsLoading(false)
  }, [])

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId)
    localStorage.setItem("thrivebmore-theme", themeId)

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: { themeId } }))
  }

  const getThemeColors = (themeId: string) => {
    const themes = {
      liberation: {
        primary: "#0b1a3d",
        secondary: "#f4c430",
        accent: "#028a0f",
        background: "linear-gradient(135deg, #0b1a3d 0%, #1a2b5c 50%, #0b1a3d 100%)",
        surface: "rgba(11, 26, 61, 0.95)",
        text: "#f0e9d2",
        textSecondary: "#ff6f3c",
      },
      ancestral: {
        primary: "#2d1810",
        secondary: "#d4af37",
        accent: "#8b4513",
        background: "linear-gradient(135deg, #2d1810 0%, #3d2817 50%, #2d1810 100%)",
        surface: "rgba(45, 24, 16, 0.95)",
        text: "#f5deb3",
        textSecondary: "#cd853f",
      },
      ocean: {
        primary: "#001f3f",
        secondary: "#7fdbff",
        accent: "#39cccc",
        background: "linear-gradient(135deg, #001f3f 0%, #003d7a 50%, #001f3f 100%)",
        surface: "rgba(0, 31, 63, 0.95)",
        text: "#e6f3ff",
        textSecondary: "#00bcd4",
      },
      // Add other themes as needed
    }

    return themes[themeId] || themes.liberation
  }

  return {
    currentTheme,
    changeTheme,
    getThemeColors,
    isLoading,
  }
}
