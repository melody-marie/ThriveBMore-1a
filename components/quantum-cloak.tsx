"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { EyeOff, Shield, Zap } from "lucide-react"

export function QuantumCloak() {
  const [isCloaked, setIsCloaked] = useState(false)
  const [isActivating, setIsActivating] = useState(false)

  const handleQuantumCloak = async () => {
    setIsActivating(true)

    // Visual cloaking effect
    document.body.classList.add("quantum-cloak")

    // Simulate quantum encryption process
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (!isCloaked) {
      // Activate cloaking
      setIsCloaked(true)

      // Clear sensitive data from memory
      if (typeof window !== "undefined") {
        // Clear localStorage sensitive data
        const sensitiveKeys = ["user_data", "chat_history", "emergency_data"]
        sensitiveKeys.forEach((key) => {
          const data = localStorage.getItem(key)
          if (data) {
            localStorage.setItem(`${key}_backup`, data)
            localStorage.removeItem(key)
          }
        })

        // Clear sessionStorage
        sessionStorage.clear()

        // Blur page content
        document.body.style.filter = "blur(5px)"
        document.body.style.pointerEvents = "none"

        // Show cloaked overlay
        const overlay = document.createElement("div")
        overlay.id = "quantum-cloak-overlay"
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,30,30,0.95) 100%);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: monospace;
        `
        overlay.innerHTML = `
          <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🛡️</div>
            <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Quantum Cloak Active</h2>
            <p style="opacity: 0.8;">Digital sanctuary secured</p>
            <p style="font-size: 0.8rem; margin-top: 1rem; opacity: 0.6;">
              Press Ctrl+Shift+Q to deactivate
            </p>
          </div>
        `
        document.body.appendChild(overlay)
      }
    } else {
      // Deactivate cloaking
      deactivateCloak()
    }

    document.body.classList.remove("quantum-cloak")
    setIsActivating(false)
  }

  const deactivateCloak = () => {
    setIsCloaked(false)

    if (typeof window !== "undefined") {
      // Restore page
      document.body.style.filter = ""
      document.body.style.pointerEvents = ""

      // Remove overlay
      const overlay = document.getElementById("quantum-cloak-overlay")
      if (overlay) {
        overlay.remove()
      }

      // Restore sensitive data
      const sensitiveKeys = ["user_data", "chat_history", "emergency_data"]
      sensitiveKeys.forEach((key) => {
        const backup = localStorage.getItem(`${key}_backup`)
        if (backup) {
          localStorage.setItem(key, backup)
          localStorage.removeItem(`${key}_backup`)
        }
      })
    }
  }

  // Keyboard shortcut to deactivate
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "Q" && isCloaked) {
        event.preventDefault()
        deactivateCloak()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCloaked])

  // Auto-deactivate after 10 minutes for security
  useEffect(() => {
    if (isCloaked) {
      const timer = setTimeout(
        () => {
          deactivateCloak()
        },
        10 * 60 * 1000,
      ) // 10 minutes

      return () => clearTimeout(timer)
    }
  }, [isCloaked])

  return (
    <Button
      onClick={handleQuantumCloak}
      variant={isCloaked ? "default" : "outline"}
      size="sm"
      className={`quantum-cloak-button ${isCloaked ? "bg-purple-600 text-white" : ""}`}
      disabled={isActivating}
    >
      {isActivating ? (
        <Zap className="w-4 h-4 mr-2 animate-spin" />
      ) : isCloaked ? (
        <Shield className="w-4 h-4 mr-2" />
      ) : (
        <EyeOff className="w-4 h-4 mr-2" />
      )}
      {isActivating ? "Activating..." : isCloaked ? "Cloaked" : "Quantum Cloak"}
    </Button>
  )
}
