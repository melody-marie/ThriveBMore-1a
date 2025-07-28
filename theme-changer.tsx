"use client"

import { useState, useEffect } from "react"

interface Theme {
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

const themes: Theme[] = [
  {
    id: "liberation",
    name: "Liberation",
    description: "Original ThriveBMore sanctuary colors",
    icon: "✊",
    colors: {
      primary: "#0b1a3d", // midnight-blue
      secondary: "#f4c430", // gold
      accent: "#028a0f", // emerald
      background: "linear-gradient(135deg, #0b1a3d 0%, #1a2b5c 50%, #0b1a3d 100%)",
      surface: "rgba(11, 26, 61, 0.95)",
      text: "#f0e9d2", // text-light
      textSecondary: "#ff6f3c", // sunset-orange
    },
    gradient: "linear-gradient(90deg, #028a0f, #f4c430, #ff6f3c)",
    culturalSignificance: "Pan-African liberation colors with digital sanctuary energy",
  },
  {
    id: "ancestral",
    name: "Ancestral Wisdom",
    description: "Earth tones honoring our ancestors",
    icon: "🌍",
    colors: {
      primary: "#2d1810", // deep earth brown
      secondary: "#d4af37", // ancient gold
      accent: "#8b4513", // saddle brown
      background: "linear-gradient(135deg, #2d1810 0%, #3d2817 50%, #2d1810 100%)",
      surface: "rgba(45, 24, 16, 0.95)",
      text: "#f5deb3", // wheat
      textSecondary: "#cd853f", // peru
    },
    gradient: "linear-gradient(90deg, #8b4513, #d4af37, #cd853f)",
    culturalSignificance: "Honoring the earth and ancestral wisdom of our elders",
  },
  {
    id: "ocean",
    name: "Ocean Depths",
    description: "Deep waters of healing and reflection",
    icon: "🌊",
    colors: {
      primary: "#001f3f", // navy
      secondary: "#7fdbff", // aqua
      accent: "#39cccc", // teal
      background: "linear-gradient(135deg, #001f3f 0%, #003d7a 50%, #001f3f 100%)",
      surface: "rgba(0, 31, 63, 0.95)",
      text: "#e6f3ff", // light blue
      textSecondary: "#00bcd4", // cyan
    },
    gradient: "linear-gradient(90deg, #39cccc, #7fdbff, #00bcd4)",
    culturalSignificance: "Water as sacred healing element in many African traditions",
  },
  {
    id: "sunset",
    name: "Sunset Celebration",
    description: "Warm celebration of trans joy",
    icon: "🌅",
    colors: {
      primary: "#4a1810", // dark red-brown
      secondary: "#ff6b35", // orange-red
      accent: "#f7931e", // orange
      background: "linear-gradient(135deg, #4a1810 0%, #6b2c1a 50%, #4a1810 100%)",
      surface: "rgba(74, 24, 16, 0.95)",
      text: "#fff8dc", // cornsilk
      textSecondary: "#ff4500", // orange-red
    },
    gradient: "linear-gradient(90deg, #f7931e, #ff6b35, #ff4500)",
    culturalSignificance: "Celebrating the beauty of transition and transformation",
  },
  {
    id: "forest",
    name: "Forest Sanctuary",
    description: "Green healing spaces of growth",
    icon: "🌲",
    colors: {
      primary: "#1a2f1a", // dark forest green
      secondary: "#90ee90", // light green
      accent: "#32cd32", // lime green
      background: "linear-gradient(135deg, #1a2f1a 0%, #2d4a2d 50%, #1a2f1a 100%)",
      surface: "rgba(26, 47, 26, 0.95)",
      text: "#f0fff0", // honeydew
      textSecondary: "#00ff7f", // spring green
    },
    gradient: "linear-gradient(90deg, #32cd32, #90ee90, #00ff7f)",
    culturalSignificance: "Nature as sanctuary and source of healing medicine",
  },
  {
    id: "cosmic",
    name: "Cosmic Afrofuturism",
    description: "Stellar dreams and digital liberation",
    icon: "✨",
    colors: {
      primary: "#0f0f23", // deep space
      secondary: "#9d4edd", // purple
      accent: "#c77dff", // light purple
      background: "linear-gradient(135deg, #0f0f23 0%, #240046 50%, #0f0f23 100%)",
      surface: "rgba(15, 15, 35, 0.95)",
      text: "#e0aaff", // lavender
      textSecondary: "#ff006e", // hot pink
    },
    gradient: "linear-gradient(90deg, #c77dff, #9d4edd, #ff006e)",
    culturalSignificance: "Afrofuturist visions of liberation beyond earthly constraints",
  },
  {
    id: "fire",
    name: "Sacred Fire",
    description: "Transformative flames of revolution",
    icon: "🔥",
    colors: {
      primary: "#2c0a0a", // dark red
      secondary: "#ff4444", // red
      accent: "#ff6b6b", // light red
      background: "linear-gradient(135deg, #2c0a0a 0%, #4a1414 50%, #2c0a0a 100%)",
      surface: "rgba(44, 10, 10, 0.95)",
      text: "#ffe4e1", // misty rose
      textSecondary: "#ff1744", // red accent
    },
    gradient: "linear-gradient(90deg, #ff6b6b, #ff4444, #ff1744)",
    culturalSignificance: "Sacred fire as purification and revolutionary transformation",
  },
  {
    id: "moonlight",
    name: "Moonlight Serenity",
    description: "Gentle lunar guidance and peace",
    icon: "🌙",
    colors: {
      primary: "#1a1a2e", // dark blue-purple
      secondary: "#e6e6fa", // lavender
      accent: "#dda0dd", // plum
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
      surface: "rgba(26, 26, 46, 0.95)",
      text: "#f8f8ff", // ghost white
      textSecondary: "#ba55d3", // medium orchid
    },
    gradient: "linear-gradient(90deg, #dda0dd, #e6e6fa, #ba55d3)",
    culturalSignificance: "Lunar cycles as feminine divine and natural rhythm",
  },
  {
    id: "high-contrast",
    name: "High Contrast",
    description: "Maximum accessibility and clarity",
    icon: "♿",
    colors: {
      primary: "#000000", // pure black
      secondary: "#ffffff", // pure white
      accent: "#ffff00", // pure yellow
      background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
      surface: "rgba(0, 0, 0, 0.98)",
      text: "#ffffff", // white
      textSecondary: "#ffff00", // yellow
    },
    gradient: "linear-gradient(90deg, #ffff00, #ffffff, #ffff00)",
    culturalSignificance: "Ensuring digital sanctuary is accessible to all community members",
  },
]

interface ThemeChangerProps {
  currentTheme?: string
  onThemeChange?: (themeId: string) => void
}

export default function ThemeChanger({ currentTheme = "liberation", onThemeChange }: ThemeChangerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)
  const [showCulturalInfo, setShowCulturalInfo] = useState(false)
  const [previewTheme, setPreviewTheme] = useState<string | null>(null)

  useEffect(() => {
    const theme = themes.find((t) => t.id === selectedTheme) || themes[0]
    applyTheme(theme)
  }, [selectedTheme])

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    root.style.setProperty("--midnight-blue", theme.colors.primary)
    root.style.setProperty("--gold", theme.colors.secondary)
    root.style.setProperty("--emerald", theme.colors.accent)
    root.style.setProperty("--text-light", theme.colors.text)
    root.style.setProperty("--sunset-orange", theme.colors.textSecondary)
    root.style.setProperty("--theme-gradient", theme.gradient)
    root.style.setProperty("--theme-surface", theme.colors.surface)

    // Update body background
    document.body.style.background = theme.colors.background
  }

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    onThemeChange?.(themeId)
    setIsOpen(false)

    // Save to localStorage
    localStorage.setItem("thrivebmore-theme", themeId)

    // Show confirmation
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      // Create a temporary notification
      const notification = document.createElement("div")
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 100px;
          right: 20px;
          background: ${theme.colors.surface};
          border: 2px solid ${theme.colors.secondary};
          border-radius: 15px;
          padding: 1rem 1.5rem;
          color: ${theme.colors.text};
          z-index: 10000;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          animation: slideIn 0.3s ease;
        ">
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <span style="font-size: 1.5rem;">${theme.icon}</span>
            <div>
              <div style="font-weight: 600; margin-bottom: 0.2rem;">${theme.name} Activated</div>
              <div style="font-size: 0.8rem; opacity: 0.8;">${theme.description}</div>
            </div>
          </div>
        </div>
      `
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.remove()
      }, 3000)
    }
  }

  const handlePreview = (themeId: string) => {
    setPreviewTheme(themeId)
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      applyTheme(theme)
    }
  }

  const handlePreviewEnd = () => {
    setPreviewTheme(null)
    const theme = themes.find((t) => t.id === selectedTheme)
    if (theme) {
      applyTheme(theme)
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .theme-changer-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: var(--theme-surface, rgba(11, 26, 61, 0.95));
          border: 2px solid var(--gold);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          z-index: 1000;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 15px rgba(244, 196, 48, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .theme-changer-button:hover {
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 6px 20px rgba(244, 196, 48, 0.5);
        }

        .theme-panel {
          position: fixed;
          bottom: 100px;
          right: 20px;
          background: var(--theme-surface, rgba(11, 26, 61, 0.95));
          border: 2px solid var(--gold);
          border-radius: 20px;
          padding: 2rem;
          width: 400px;
          max-width: 90vw;
          max-height: 80vh;
          overflow-y: auto;
          z-index: 1001;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          transform: translateY(20px);
          opacity: 0;
          animation: panelSlideIn 0.3s ease forwards;
        }

        @keyframes panelSlideIn {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .theme-option {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid transparent;
          border-radius: 15px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .theme-option:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .theme-option.active {
          border-color: var(--gold);
          background: rgba(244, 196, 48, 0.2);
        }

        .theme-option.preview {
          border-color: var(--emerald);
          background: rgba(2, 138, 15, 0.2);
        }

        .theme-preview-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 0 0 15px 15px;
        }

        .cultural-info {
          background: rgba(2, 138, 15, 0.1);
          border: 2px solid var(--emerald);
          border-radius: 15px;
          padding: 1.5rem;
          margin-top: 1rem;
        }

        .accessibility-note {
          background: rgba(255, 111, 60, 0.1);
          border: 2px solid var(--sunset-orange);
          border-radius: 10px;
          padding: 1rem;
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .theme-panel {
            width: 350px;
            bottom: 90px;
            right: 10px;
          }
          
          .theme-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }
        }
      `}</style>

      {/* Theme Changer Button */}
      <button
        className="theme-changer-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme"
        aria-label="Open theme selector"
      >
        🎨
      </button>

      {/* Theme Panel */}
      {isOpen && (
        <div className="theme-panel">
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h3
              style={{
                color: "var(--gold)",
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
                textShadow: "0 0 10px var(--gold)",
              }}
            >
              🎨 Sacred Themes
            </h3>
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "0.9rem",
                opacity: "0.9",
              }}
            >
              Choose your digital sanctuary's energy
            </p>
          </div>

          <div className="theme-grid">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`theme-option ${selectedTheme === theme.id ? "active" : ""} ${
                  previewTheme === theme.id ? "preview" : ""
                }`}
                onClick={() => handleThemeSelect(theme.id)}
                onMouseEnter={() => handlePreview(theme.id)}
                onMouseLeave={handlePreviewEnd}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}dd, ${theme.colors.surface})`,
                  color: theme.colors.text,
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{theme.icon}</div>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    marginBottom: "0.3rem",
                    color: theme.colors.secondary,
                  }}
                >
                  {theme.name}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    opacity: "0.8",
                    lineHeight: "1.3",
                  }}
                >
                  {theme.description}
                </div>
                <div
                  className="theme-preview-bar"
                  style={{
                    background: theme.gradient,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Cultural Significance Toggle */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <button
              onClick={() => setShowCulturalInfo(!showCulturalInfo)}
              style={{
                background: "transparent",
                border: "2px solid var(--emerald)",
                color: "var(--emerald)",
                padding: "0.8rem 1.5rem",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              🌍 {showCulturalInfo ? "Hide" : "Show"} Cultural Significance
            </button>
          </div>

          {/* Cultural Information */}
          {showCulturalInfo && (
            <div className="cultural-info">
              <h4
                style={{
                  color: "var(--emerald)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                  textShadow: "0 0 6px var(--emerald)",
                }}
              >
                🌟 Cultural & Spiritual Significance
              </h4>
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    borderLeft: `4px solid ${theme.colors.secondary}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{theme.icon}</span>
                    <strong style={{ color: theme.colors.secondary }}>{theme.name}</strong>
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.4",
                      color: "var(--text-light)",
                      opacity: "0.9",
                    }}
                  >
                    {theme.culturalSignificance}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Accessibility Note */}
          <div className="accessibility-note">
            <h5
              style={{
                color: "var(--sunset-orange)",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ♿ Accessibility Note
            </h5>
            <p style={{ color: "var(--text-light)", lineHeight: "1.4" }}>
              The <strong>High Contrast</strong> theme provides maximum accessibility for community members with visual
              impairments. All themes are designed with WCAG guidelines in mind.
            </p>
          </div>

          {/* Close Button */}
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "var(--gold)",
                color: "var(--midnight-blue)",
                border: "none",
                padding: "0.8rem 2rem",
                borderRadius: "25px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              ✨ Apply Theme
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
