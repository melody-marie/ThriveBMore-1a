"use client"

import { useState } from "react"

interface EmergencyBypassModalProps {
  isOpen: boolean
  onClose: () => void
  language: string
}

export default function EmergencyBypassModal({ isOpen, onClose, language }: EmergencyBypassModalProps) {
  const [bypassMethod, setBypassMethod] = useState("crisis-support")
  const [emergencyDetails, setEmergencyDetails] = useState("")
  const [crisisLevel, setCrisisLevel] = useState("medium")

  const translations = {
    en: {
      title: "Emergency Account Access",
      subtitle: "Immediate access for crisis situations",
      crisisSupport: "Crisis Support Verification",
      safetyBypass: "Safety-Based Emergency Access",
      communityEmergency: "Community Emergency Verification",
      selectCrisisLevel: "Crisis Level Assessment",
      low: "Low - Need quick access, no immediate danger",
      medium: "Medium - Potentially unsafe situation",
      high: "High - Immediate safety concern or crisis",
      critical: "Critical - Life-threatening emergency",
      emergencyDetails: "Briefly describe your situation (optional)",
      detailsHelper: "This helps our crisis team provide appropriate support",
      contactCrisisLine: "Call Crisis Line: 877-565-8860",
      submitEmergencyRequest: "Submit Emergency Access Request",
      privacyNotice: "Emergency requests are handled with maximum privacy and deleted after 48 hours",
      safetyFirst: "Your safety is our top priority. If you're in immediate danger, call 911.",
    },
    es: {
      title: "Acceso de Emergencia a la Cuenta",
      subtitle: "Acceso inmediato para situaciones de crisis",
      crisisSupport: "Verificación de Apoyo en Crisis",
      safetyBypass: "Acceso de Emergencia Basado en Seguridad",
      communityEmergency: "Verificación de Emergencia Comunitaria",
      selectCrisisLevel: "Evaluación del Nivel de Crisis",
      low: "Bajo - Necesito acceso rápido, sin peligro inmediato",
      medium: "Medio - Situación potencialmente insegura",
      high: "Alto - Problema de seguridad inmediato o crisis",
      critical: "Crítico - Emergencia que amenaza la vida",
      emergencyDetails: "Describe brevemente tu situación (opcional)",
      detailsHelper: "Esto ayuda a nuestro equipo de crisis a brindar el apoyo adecuado",
      contactCrisisLine: "Llama a la Línea de Crisis: 877-565-8860",
      submitEmergencyRequest: "Enviar Solicitud de Acceso de Emergencia",
      privacyNotice: "Las solicitudes de emergencia se manejan con máxima privacidad y se eliminan después de 48 horas",
      safetyFirst: "Tu seguridad es nuestra máxima prioridad. Si tienes peligro inmediato, llama al 911.",
    },
    fr: {
      title: "Accès d'Urgence au Compte",
      subtitle: "Accès immédiat pour les situations de crise",
      crisisSupport: "Vérification du Soutien de Crise",
      safetyBypass: "Accès d'Urgence Basé sur la Sécurité",
      communityEmergency: "Vérification d'Urgence Communautaire",
      selectCrisisLevel: "Évaluation du Niveau de Crise",
      low: "Faible - Besoin d'accès rapide, pas de danger immédiat",
      medium: "Moyen - Situation potentiellement dangereuse",
      high: "Élevé - Préoccupation de sécurité immédiate ou crise",
      critical: "Critique - Urgence mettant la vie en danger",
      emergencyDetails: "Décrivez brièvement votre situation (optionnel)",
      detailsHelper: "Cela aide notre équipe de crise à fournir un soutien approprié",
      contactCrisisLine: "Appelez la Ligne de Crise: 877-565-8860",
      submitEmergencyRequest: "Soumettre une Demande d'Accès d'Urgence",
      privacyNotice:
        "Les demandes d'urgence sont traitées avec un maximum de confidentialité et supprimées après 48 heures",
      safetyFirst: "Votre sécurité est notre priorité absolue. Si vous êtes en danger immédiat, appelez le 911.",
    },
  }

  const t = translations[language] || translations.en

  if (!isOpen) return null

  const handleSubmit = () => {
    // Handle emergency bypass request
    console.log("Emergency bypass request:", {
      method: bypassMethod,
      crisisLevel,
      details: emergencyDetails,
    })
    alert("Emergency access request submitted. Crisis support team will contact you within 15 minutes.")
    onClose()
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(11, 26, 61, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          background: "rgba(11, 26, 61, 0.98)",
          border: "2px solid var(--sunset-orange)",
          borderRadius: "20px",
          padding: "2.5rem",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 0 20px rgba(255, 111, 60, 0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              color: "var(--sunset-orange)",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              textShadow: "0 0 10px var(--sunset-orange)",
            }}
          >
            🚨 {t.title}
          </h2>
          <p style={{ color: "var(--text-light)", opacity: "0.9" }}>{t.subtitle}</p>
        </div>

        {/* Crisis Level Assessment */}
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              color: "var(--gold)",
              fontSize: "1.2rem",
              marginBottom: "1rem",
              textShadow: "0 0 6px var(--gold)",
            }}
          >
            {t.selectCrisisLevel}
          </h3>

          <div style={{ display: "grid", gap: "0.8rem" }}>
            {[
              { level: "low", color: "#28a745", icon: "🟢" },
              { level: "medium", color: "#ffc107", icon: "🟡" },
              { level: "high", color: "#fd7e14", icon: "🟠" },
              { level: "critical", color: "#dc3545", icon: "🔴" },
            ].map(({ level, color, icon }) => (
              <div
                key={level}
                onClick={() => setCrisisLevel(level)}
                style={{
                  padding: "1rem",
                  background:
                    crisisLevel === level
                      ? `rgba(${
                          color === "#28a745"
                            ? "40, 167, 69"
                            : color === "#ffc107"
                              ? "255, 193, 7"
                              : color === "#fd7e14"
                                ? "253, 126, 20"
                                : "220, 53, 69"
                        }, 0.2)`
                      : "rgba(255, 255, 255, 0.1)",
                  border: `2px solid ${crisisLevel === level ? color : "rgba(255, 255, 255, 0.3)"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: crisisLevel === level ? color : "var(--text-light)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {level.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-light)",
                      opacity: "0.9",
                    }}
                  >
                    {t[level]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Details */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "var(--text-light)",
              fontSize: "0.9rem",
            }}
          >
            {t.emergencyDetails}
          </label>
          <textarea
            value={emergencyDetails}
            onChange={(e) => setEmergencyDetails(e.target.value)}
            placeholder={t.detailsHelper}
            style={{
              width: "100%",
              padding: "1rem",
              border: "2px solid rgba(255, 111, 60, 0.3)",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "var(--text-light)",
              fontSize: "1rem",
              resize: "vertical",
              minHeight: "100px",
            }}
          />
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-light)",
              opacity: "0.8",
              marginTop: "0.5rem",
            }}
          >
            {t.detailsHelper}
          </div>
        </div>

        {/* Crisis Line Contact */}
        <div
          style={{
            background: "rgba(255, 111, 60, 0.2)",
            border: "2px solid var(--sunset-orange)",
            borderRadius: "15px",
            padding: "1.5rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <h4 style={{ color: "var(--sunset-orange)", marginBottom: "1rem" }}>Immediate Crisis Support Available</h4>
          <a
            href="tel:877-565-8860"
            style={{
              background: "var(--sunset-orange)",
              color: "var(--text-light)",
              padding: "1rem 2rem",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
              display: "inline-block",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
            }}
          >
            📞 {t.contactCrisisLine}
          </a>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "1.2rem",
            background: "linear-gradient(135deg, var(--sunset-orange), #ff4500)",
            color: "var(--text-light)",
            border: "none",
            borderRadius: "15px",
            fontSize: "1.1rem",
            fontWeight: "700",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "1.5rem",
            transition: "all 0.3s ease",
          }}
        >
          🚨 {t.submitEmergencyRequest}
        </button>

        {/* Privacy Notice */}
        <div
          style={{
            background: "rgba(2, 138, 15, 0.1)",
            border: "1px solid var(--emerald)",
            borderRadius: "10px",
            padding: "1rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-light)",
              opacity: "0.9",
            }}
          >
            🔒 {t.privacyNotice}
          </p>
        </div>

        {/* Safety First Notice */}
        <div
          style={{
            background: "rgba(220, 53, 69, 0.2)",
            border: "2px solid #dc3545",
            borderRadius: "10px",
            padding: "1rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "#dc3545",
              fontWeight: "600",
            }}
          >
            ⚠️ {t.safetyFirst}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "1rem",
            background: "transparent",
            color: "var(--text-light)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
