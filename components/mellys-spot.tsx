"use client"

import { useState, useEffect } from "react"
import { Heart, Star, Sun, Book, Palette, Music } from "lucide-react"

interface MellysSpotProps {
  isVisible: boolean
  onClose: () => void
}

export default function MellysSpot({ isVisible, onClose }: MellysSpotProps) {
  const [currentActivity, setCurrentActivity] = useState<string>("welcome")
  const [littleAge, setLittleAge] = useState<number>(5)
  const [favoriteColor, setFavoriteColor] = useState<string>("rainbow")
  const [currentStory, setCurrentStory] = useState(0)
  const [coloringPage, setColoringPage] = useState<string>("butterfly")
  const [showStickers, setShowStickers] = useState(false)
  const [collectedStickers, setCollectedStickers] = useState<string[]>([])
  const [currentAffirmation, setCurrentAffirmation] = useState(0)
  const [breathingBubbles, setBreathingBubbles] = useState(false)

  const littleAffirmations = [
    "You are so very loved, little one 💕",
    "It's okay to feel small and safe 🧸",
    "You deserve all the cuddles and comfort 🤗",
    "Your feelings are important and valid 🌈",
    "You are brave and strong, even when you're little 🌟",
    "It's safe to play and have fun here 🎈",
    "You are perfect just the way you are ✨",
    "Big feelings are okay, we'll get through them together 💙",
  ]

  const bedtimeStories = [
    {
      title: "The Brave Little Star",
      content:
        "Once upon a time, there was a little star who felt too small to shine bright. But with the help of their friends in the sky, they learned that even the smallest light can guide someone home...",
      emoji: "⭐",
    },
    {
      title: "The Rainbow Bridge",
      content:
        "In a magical land, there was a bridge made of all the colors of the rainbow. Every time someone crossed it, they felt all their worries melt away and their heart fill with joy...",
      emoji: "🌈",
    },
    {
      title: "The Gentle Dragon",
      content:
        "Everyone was afraid of the big dragon, but one little child discovered that the dragon just wanted a friend. Together, they had the most wonderful adventures...",
      emoji: "🐉",
    },
    {
      title: "The Magic Teddy Bear",
      content:
        "There was a special teddy bear who could absorb all the scary feelings and turn them into warm hugs. Every night, they would protect their little friend from bad dreams...",
      emoji: "🧸",
    },
  ]

  const activities = [
    { id: "coloring", name: "Coloring Pages", icon: Palette, color: "#ff6b9d" },
    { id: "stories", name: "Story Time", icon: Book, color: "#4ecdc4" },
    { id: "breathing", name: "Bubble Breathing", icon: Sun, color: "#45b7d1" },
    { id: "music", name: "Gentle Music", icon: Music, color: "#96ceb4" },
    { id: "stickers", name: "Sticker Collection", icon: Star, color: "#feca57" },
    { id: "comfort", name: "Comfort Corner", icon: Heart, color: "#ff9ff3" },
  ]

  const coloringPages = [
    { id: "butterfly", name: "Pretty Butterfly", emoji: "🦋" },
    { id: "flowers", name: "Happy Flowers", emoji: "🌸" },
    { id: "rainbow", name: "Big Rainbow", emoji: "🌈" },
    { id: "teddy", name: "Cuddly Teddy", emoji: "🧸" },
    { id: "castle", name: "Magic Castle", emoji: "🏰" },
    { id: "unicorn", name: "Sparkly Unicorn", emoji: "🦄" },
  ]

  const availableStickers = [
    "⭐",
    "🌟",
    "✨",
    "🌈",
    "🦋",
    "🌸",
    "🌺",
    "🌻",
    "🧸",
    "🎈",
    "🎀",
    "💖",
    "💕",
    "💙",
    "💜",
    "🍭",
    "🍪",
    "🧁",
    "🎂",
    "🎁",
  ]

  const comfortItems = [
    { name: "Soft Blankie", emoji: "🛏️", description: "Wrap yourself in the softest, warmest blanket" },
    { name: "Favorite Stuffie", emoji: "🧸", description: "Your special friend who's always there for cuddles" },
    { name: "Warm Milk", emoji: "🥛", description: "A cozy drink to make everything feel better" },
    { name: "Night Light", emoji: "🕯️", description: "A gentle glow to keep the scary dark away" },
    { name: "Lullaby", emoji: "🎵", description: "Soft, sleepy songs to calm your heart" },
    { name: "Safe Space", emoji: "🏠", description: "Your very own cozy corner where nothing can hurt you" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % littleAffirmations.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const addSticker = (sticker: string) => {
    if (!collectedStickers.includes(sticker)) {
      setCollectedStickers([...collectedStickers, sticker])
      // Play happy sound
      if ((window as any).thriveBMoreSounds) {
        ;(window as any).thriveBMoreSounds.notification()
      }
    }
  }

  const getAgeAppropriateGreeting = () => {
    if (littleAge <= 3) return "Hi there, tiny one! 👶"
    if (littleAge <= 6) return "Hello, little sweetie! 🌟"
    if (littleAge <= 10) return "Hey there, kiddo! 🌈"
    return "Welcome to your safe space! ✨"
  }

  const getColorTheme = () => {
    const themes = {
      rainbow: "linear-gradient(45deg, #ff6b9d, #feca57, #48dbfb, #ff9ff3, #54a0ff)",
      pink: "linear-gradient(45deg, #ff6b9d, #ff9ff3, #feca57)",
      blue: "linear-gradient(45deg, #48dbfb, #54a0ff, #5f27cd)",
      purple: "linear-gradient(45deg, #a55eea, #ff9ff3, #feca57)",
      green: "linear-gradient(45deg, #26de81, #20bf6b, #4b7bec)",
    }
    return themes[favoriteColor as keyof typeof themes] || themes.rainbow
  }

  if (!isVisible) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3000,
        backdropFilter: "blur(10px)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: getColorTheme(),
          borderRadius: "30px",
          padding: "2rem",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          border: "3px solid white",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "1.5rem",
              marginBottom: "1rem",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                margin: 0,
                background: getColorTheme(),
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                textShadow: "none",
              }}
            >
              🌈 Melly's Spot 🧸
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#666",
                margin: "0.5rem 0 0 0",
                fontWeight: "600",
              }}
            >
              A Safe Haven for Little Hearts
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "15px",
              padding: "1rem",
              fontSize: "1.1rem",
              color: "#333",
              fontWeight: "600",
            }}
          >
            {getAgeAppropriateGreeting()}
          </div>
        </div>

        {/* Age and Color Selection */}
        {currentActivity === "welcome" && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "1.5rem", fontSize: "1.5rem" }}>Tell Melly about yourself! 🌟</h3>

            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "1.2rem",
                  color: "#666",
                  marginBottom: "1rem",
                  fontWeight: "600",
                }}
              >
                How old do you feel right now? 🎂
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                  <button
                    key={age}
                    onClick={() => setLittleAge(age)}
                    style={{
                      background: littleAge === age ? getColorTheme() : "rgba(0, 0, 0, 0.1)",
                      color: littleAge === age ? "white" : "#666",
                      border: "none",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      boxShadow: littleAge === age ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
                    }}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "1.2rem",
                  color: "#666",
                  marginBottom: "1rem",
                  fontWeight: "600",
                }}
              >
                What's your favorite color theme? 🎨
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {["rainbow", "pink", "blue", "purple", "green"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setFavoriteColor(color)}
                    style={{
                      background: favoriteColor === color ? getColorTheme() : "rgba(0, 0, 0, 0.1)",
                      color: "white",
                      border: "none",
                      borderRadius: "15px",
                      padding: "0.8rem 1.5rem",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      transition: "all 0.3s ease",
                      boxShadow: favoriteColor === color ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
                    }}
                  >
                    {color === "rainbow"
                      ? "🌈"
                      : color === "pink"
                        ? "💖"
                        : color === "blue"
                          ? "💙"
                          : color === "purple"
                            ? "💜"
                            : "💚"}{" "}
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentActivity("activities")}
              style={{
                background: getColorTheme(),
                color: "white",
                border: "none",
                borderRadius: "25px",
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              Let's Play! 🎈
            </button>
          </div>
        )}

        {/* Activity Selection */}
        {currentActivity === "activities" && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "2rem",
                fontSize: "1.8rem",
              }}
            >
              What would you like to do? ✨
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {activities.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <button
                    key={activity.id}
                    onClick={() => setCurrentActivity(activity.id)}
                    style={{
                      background: "white",
                      border: `3px solid ${activity.color}`,
                      borderRadius: "20px",
                      padding: "2rem 1rem",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = activity.color
                      e.currentTarget.style.color = "white"
                      e.currentTarget.style.transform = "scale(1.05)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "white"
                      e.currentTarget.style.color = "#333"
                      e.currentTarget.style.transform = "scale(1)"
                    }}
                  >
                    <IconComponent size={40} style={{ marginBottom: "1rem", color: activity.color }} />
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>{activity.name}</div>
                  </button>
                )
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                onClick={() => setCurrentActivity("welcome")}
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  color: "#666",
                  border: "none",
                  borderRadius: "15px",
                  padding: "0.8rem 1.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ← Back to Welcome
              </button>
            </div>
          </div>
        )}

        {/* Coloring Activity */}
        {currentActivity === "coloring" && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "2rem",
                fontSize: "1.8rem",
              }}
            >
              🎨 Coloring Time! 🖍️
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {coloringPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setColoringPage(page.id)}
                  style={{
                    background: coloringPage === page.id ? getColorTheme() : "white",
                    color: coloringPage === page.id ? "white" : "#333",
                    border: "2px solid #ddd",
                    borderRadius: "15px",
                    padding: "1.5rem 1rem",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{page.emoji}</div>
                  <div style={{ fontSize: "1rem", fontWeight: "600" }}>{page.name}</div>
                </button>
              ))}
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "2rem",
                textAlign: "center",
                border: "3px dashed #ddd",
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                {coloringPages.find((p) => p.id === coloringPage)?.emoji}
              </div>
              <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "1rem" }}>
                Imagine all the beautiful colors you'd use! 🌈
              </p>
              <button
                onClick={() => addSticker("🎨")}
                style={{
                  background: getColorTheme(),
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  padding: "0.8rem 1.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                I finished coloring! 🎨
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                onClick={() => setCurrentActivity("activities")}
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  color: "#666",
                  border: "none",
                  borderRadius: "15px",
                  padding: "0.8rem 1.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ← Back to Activities
              </button>
            </div>
          </div>
        )}

        {/* Story Time */}
        {currentActivity === "stories" && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "2rem",
                fontSize: "1.8rem",
              }}
            >
              📚 Story Time with Melly 📖
            </h3>

            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "2rem",
                marginBottom: "2rem",
                border: "3px solid #4ecdc4",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{bedtimeStories[currentStory].emoji}</div>
                <h4 style={{ fontSize: "1.5rem", color: "#333", margin: 0 }}>{bedtimeStories[currentStory].title}</h4>
              </div>

              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  color: "#555",
                  textAlign: "center",
                  marginBottom: "2rem",
                }}
              >
                {bedtimeStories[currentStory].content}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setCurrentStory((prev) => (prev - 1 + bedtimeStories.length) % bedtimeStories.length)}
                  style={{
                    background: "#4ecdc4",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.8rem 1.5rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  ← Previous Story
                </button>
                <button
                  onClick={() => addSticker("📚")}
                  style={{
                    background: getColorTheme(),
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.8rem 1.5rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  I loved this story! 💕
                </button>
                <button
                  onClick={() => setCurrentStory((prev) => (prev + 1) % bedtimeStories.length)}
                  style={{
                    background: "#4ecdc4",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.8rem 1.5rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Next Story →
                </button>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setCurrentActivity("activities")}
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  color: "#666",
                  border: "none",
                  borderRadius: "15px",
                  padding: "0.8rem 1.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ← Back to Activities
              </button>
            </div>
          </div>
        )}

        {/* Bubble Breathing */}
        {currentActivity === "breathing" && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#333",
                marginBottom: "2rem",
                fontSize: "1.8rem",
              }}
            >
              🫧 Bubble Breathing 🫧
            </h3>

            <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>
              Let's blow away our worries with magic bubbles!
            </p>

            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: breathingBubbles
                  ? "radial-gradient(circle, rgba(72, 219, 251, 0.3), rgba(72, 219, 251, 0.1))"
                  : "radial-gradient(circle, rgba(72, 219, 251, 0.1), rgba(72, 219, 251, 0.05))",
                margin: "0 auto 2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 2s ease",
                transform: breathingBubbles ? "scale(1.3)" : "scale(1)",
                border: "3px solid #48dbfb",
              }}
            >
              <div style={{ fontSize: "3rem" }}>🫧</div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "1rem" }}>
                {breathingBubbles ? "Breathe in... make the bubble big! 🫧" : "Ready to make bubbles? 💙"}
              </p>
              <button
                onClick={() => {
                  setBreathingBubbles(!breathingBubbles)
                  if ((window as any).thriveBMoreSounds) {
                    ;(window as any).thriveBMoreSounds.healingChime()
                  }
                }}
                style={{
                  background: breathingBubbles ? "#ff6b9d" : "#48dbfb",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  padding: "1rem 2rem",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                }}
              >
                {breathingBubbles ? "Stop Bubbles 🛑" : "Start Bubbles 🫧"}
              </button>
            </div>

            <div
              style={{
                background: "rgba(72, 219, 251, 0.1)",
                borderRadius: "15px",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <p style={{ fontSize: "1rem", color: "#555", margin: 0 }}>
                <strong>How to play:</strong> Watch the bubble grow big when you breathe in, and get small when you
                breathe out. It helps your heart feel calm! 💙
              </p>
            </div>

            <button
              onClick={() => {
                addSticker("🫧")
                setCurrentActivity("activities")
              }}
              style={{
                background: getColorTheme(),
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "0.8rem 1.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                marginRight: "1rem",
              }}
            >
              I feel better! 🫧
            </button>

            <button
              onClick={() => setCurrentActivity("activities")}
              style={{
                background: "rgba(0, 0, 0, 0.1)",
                color: "#666",
                border: "none",
                borderRadius: "15px",
                padding: "0.8rem 1.5rem",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              ← Back to Activities
            </button>
          </div>
        )}

        {/* Sticker Collection */}
        {currentActivity === "stickers" && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "2rem",
                fontSize: "1.8rem",
              }}
            >
              ⭐ My Sticker Collection ⭐
            </h3>

            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "2rem",
                marginBottom: "2rem",
                border: "3px solid #feca57",
                minHeight: "200px",
              }}
            >
              <h4 style={{ textAlign: "center", color: "#333", marginBottom: "1.5rem" }}>
                My Special Stickers ({collectedStickers.length}/20) 🌟
              </h4>

              {collectedStickers.length === 0 ? (
                <div style={{ textAlign: "center", color: "#666", fontSize: "1.1rem" }}>
                  <p>Do activities to collect special stickers! 🎈</p>
                  <p style={{ fontSize: "2rem", margin: "1rem 0" }}>📝</p>
                  <p>Your sticker book is waiting for you!</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
                    gap: "1rem",
                    justifyItems: "center",
                  }}
                >
                  {collectedStickers.map((sticker, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "2.5rem",
                        background: "rgba(254, 202, 87, 0.2)",
                        borderRadius: "15px",
                        padding: "0.5rem",
                        border: "2px solid #feca57",
                        animation: "bounce 0.5s ease",
                      }}
                    >
                      {sticker}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              style={{
                background: "rgba(254, 202, 87, 0.1)",
                borderRadius: "15px",
                padding: "1.5rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              <h4 style={{ color: "#333", marginBottom: "1rem" }}>Get More Stickers! 🎁</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "1rem",
                }}
              >
                {availableStickers.slice(0, 8).map((sticker, index) => (
                  <button
                    key={index}
                    onClick={() => addSticker(sticker)}
                    disabled={collectedStickers.includes(sticker)}
                    style={{
                      background: collectedStickers.includes(sticker) ? "rgba(0, 0, 0, 0.1)" : "white",
                      border: "2px solid #feca57",
                      borderRadius: "10px",
                      padding: "0.8rem",
                      cursor: collectedStickers.includes(sticker) ? "not-allowed" : "pointer",
                      fontSize: "1.5rem",
                      opacity: collectedStickers.includes(sticker) ? 0.5 : 1,
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      if (!collectedStickers.includes(sticker)) {
                        e.currentTarget.style.transform = "scale(1.1)"
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)"
                    }}
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setCurrentActivity("activities")}
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  color: "#666",
                  border: "none",
                  borderRadius: "15px",
                  padding: "0.8rem 1.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ← Back to Activities
              </button>
            </div>
          </div>
        )}

        {/* Comfort Corner */}
        {currentActivity === "comfort" && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "2rem",
                fontSize: "1.8rem",
              }}
            >
              💕 Comfort Corner 🤗
            </h3>

            <div
              style={{
                background: "rgba(255, 159, 243, 0.1)",
                borderRadius: "15px",
                padding: "2rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.3rem", color: "#333", marginBottom: "1rem", fontWeight: "600" }}>
                {littleAffirmations[currentAffirmation]}
              </div>
              <p style={{ color: "#666", fontSize: "1rem" }}>You are so loved and so special, little one 💖</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              {comfortItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "1.5rem",
                    textAlign: "center",
                    border: "2px solid #ff9ff3",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    addSticker("💕")
                    if ((window as any).thriveBMoreSounds) {
                      ;(window as any).thriveBMoreSounds.healingChime()
                    }
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)"
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(255, 159, 243, 0.3)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{item.emoji}</div>
                  <h4 style={{ color: "#333", marginBottom: "0.5rem", fontSize: "1.2rem" }}>{item.name}</h4>
                  <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: "1.4" }}>{item.description}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "rgba(255, 159, 243, 0.1)",
                borderRadius: "15px",
                padding: "1.5rem",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              <h4 style={{ color: "#333", marginBottom: "1rem" }}>Remember, sweet one: 🌟</h4>
              <ul style={{ listStyle: "none", padding: 0, color: "#555", fontSize: "1rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>💙 It's okay to feel little and need comfort</li>
                <li style={{ marginBottom: "0.5rem" }}>🌈 You are safe here in Melly's Spot</li>
                <li style={{ marginBottom: "0.5rem" }}>🧸 Your feelings are always valid and important</li>
                <li style={{ marginBottom: "0.5rem" }}>✨ You deserve all the love and gentleness</li>
              </ul>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setCurrentActivity("activities")}
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  color: "#666",
                  border: "none",
                  borderRadius: "15px",
                  padding: "0.8rem 1.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ← Back to Activities
              </button>
            </div>
          </div>
        )}

        {/* Music Activity */}
        {currentActivity === "music" && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#333",
                marginBottom: "2rem",
                fontSize: "1.8rem",
              }}
            >
              🎵 Gentle Music Box 🎶
            </h3>

            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "2rem",
                marginBottom: "2rem",
                border: "3px solid #96ceb4",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎠</div>
              <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>
                Close your eyes and imagine the most beautiful, gentle music 🎵
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  { name: "Lullaby", emoji: "🌙", sound: "lullaby" },
                  { name: "Nature Sounds", emoji: "🌿", sound: "nature" },
                  { name: "Music Box", emoji: "🎠", sound: "musicbox" },
                  { name: "Gentle Rain", emoji: "🌧️", sound: "rain" },
                ].map((music) => (
                  <button
                    key={music.sound}
                    onClick={() => {
                      if ((window as any).thriveBMoreSounds) {
                        if (music.sound === "rain") {
                          ;(window as any).thriveBMoreSounds.rain()
                        } else {
                          ;(window as any).thriveBMoreSounds.healingChime()
                        }
                      }
                      addSticker("🎵")
                    }}
                    style={{
                      background: "white",
                      border: "2px solid #96ceb4",
                      borderRadius: "15px",
                      padding: "1.5rem 1rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#96ceb4"
                      e.currentTarget.style.color = "white"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "white"
                      e.currentTarget.style.color = "#333"
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{music.emoji}</div>
                    <div style={{ fontSize: "1rem", fontWeight: "600" }}>{music.name}</div>
                  </button>
                ))}
              </div>

              <p style={{ fontSize: "1rem", color: "#666", fontStyle: "italic" }}>
                Music helps our hearts feel calm and happy 💚
              </p>
            </div>

            <button
              onClick={() => setCurrentActivity("activities")}
              style={{
                background: "rgba(0, 0, 0, 0.1)",
                color: "#666",
                border: "none",
                borderRadius: "15px",
                padding: "0.8rem 1.5rem",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              ← Back to Activities
            </button>
          </div>
        )}

        {/* Floating Stickers Animation */}
        {showStickers && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  fontSize: "2rem",
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                {availableStickers[Math.floor(Math.random() * availableStickers.length)]}
              </div>
            ))}
          </div>
        )}

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>
      </div>
    </div>
  )
}
