"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function VerificationPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [verificationType, setVerificationType] = useState("email") // 'email' or 'phone'
  const [verificationMethod, setVerificationMethod] = useState("code") // 'code', 'trusted-contact', 'community-vouch'
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [trustedContact, setTrustedContact] = useState("")
  const [communityVouchers, setCommunityVouchers] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)
  const [showSafetyOptions, setShowSafetyOptions] = useState(false)
  const [useSecureMode, setUseSecureMode] = useState(false)

  const languages = {
    en: {
      code: "en",
      name: "English",
      flag: "🇺🇸",
      translations: {
        verifyAccount: "Verify Your Sacred Account",
        subtitle: "Secure your digital sanctuary with community-centered verification",
        chooseMethod: "Choose Your Verification Method",
        emailVerification: "Email Verification",
        phoneVerification: "Phone/SMS Verification",
        codeMethod: "Verification Code",
        trustedContactMethod: "Trusted Community Contact",
        communityVouchMethod: "Community Vouch System",
        enterCode: "Enter the 6-digit code sent to:",
        enterCodePhone: "Enter the 6-digit code sent via SMS to:",
        resendCode: "Resend Code",
        resendIn: "Resend available in",
        verifyButton: "Verify & Enter Sanctuary",
        trustedContactLabel: "Trusted Contact Username/Email",
        trustedContactHelper: "Someone in the community who can vouch for your identity",
        communityVouchLabel: "Request Community Vouch",
        communityVouchHelper: "3 verified community members will validate your identity",
        safetyOptions: "Safety & Privacy Options",
        secureMode: "Ultra-Secure Mode",
        secureModeDesc: "Hide verification details for maximum privacy",
        noPhoneAccess: "Can't access your phone?",
        noEmailAccess: "Can't access your email?",
        alternativeVerification: "Use Alternative Verification",
        emergencyBypass: "Emergency Account Access",
        privacyNotice: "🔒 All verification data is encrypted and automatically deleted after 24 hours",
        communitySupport: "Need community support during verification?",
        crisisSupport: "Crisis Support Available",
        backToLogin: "Back to Login",
        languageSelect: "Select Language",
        emergencyExit: "Quick Exit",
        minutes: "minutes",
        seconds: "seconds",
        codeSent: "Verification code sent successfully",
        trustedContactNotified: "Your trusted contact has been notified",
        communityVouchRequested: "Community vouch request submitted",
        invalidCode: "Invalid verification code",
        accountVerified: "Account verified successfully!",
        enteringSanctuary: "Entering your digital sanctuary...",
      },
    },
    es: {
      code: "es",
      name: "Español",
      flag: "🇪🇸",
      translations: {
        verifyAccount: "Verifica Tu Cuenta Sagrada",
        subtitle: "Asegura tu santuario digital con verificación centrada en la comunidad",
        chooseMethod: "Elige Tu Método de Verificación",
        emailVerification: "Verificación por Email",
        phoneVerification: "Verificación por Teléfono/SMS",
        codeMethod: "Código de Verificación",
        trustedContactMethod: "Contacto de Confianza de la Comunidad",
        communityVouchMethod: "Sistema de Aval Comunitario",
        enterCode: "Ingresa el código de 6 dígitos enviado a:",
        enterCodePhone: "Ingresa el código de 6 dígitos enviado por SMS a:",
        resendCode: "Reenviar Código",
        resendIn: "Reenvío disponible en",
        verifyButton: "Verificar y Entrar al Santuario",
        trustedContactLabel: "Usuario/Email del Contacto de Confianza",
        trustedContactHelper: "Alguien en la comunidad que pueda confirmar tu identidad",
        communityVouchLabel: "Solicitar Aval Comunitario",
        communityVouchHelper: "3 miembros verificados de la comunidad validarán tu identidad",
        safetyOptions: "Opciones de Seguridad y Privacidad",
        secureMode: "Modo Ultra-Seguro",
        secureModeDesc: "Ocultar detalles de verificación para máxima privacidad",
        noPhoneAccess: "¿No puedes acceder a tu teléfono?",
        noEmailAccess: "¿No puedes acceder a tu email?",
        alternativeVerification: "Usar Verificación Alternativa",
        emergencyBypass: "Acceso de Emergencia a la Cuenta",
        privacyNotice:
          "🔒 Todos los datos de verificación están encriptados y se eliminan automáticamente después de 24 horas",
        communitySupport: "¿Necesitas apoyo comunitario durante la verificación?",
        crisisSupport: "Apoyo en Crisis Disponible",
        backToLogin: "Volver al Inicio de Sesión",
        languageSelect: "Seleccionar Idioma",
        emergencyExit: "Salida Rápida",
        minutes: "minutos",
        seconds: "segundos",
        codeSent: "Código de verificación enviado exitosamente",
        trustedContactNotified: "Tu contacto de confianza ha sido notificado",
        communityVouchRequested: "Solicitud de aval comunitario enviada",
        invalidCode: "Código de verificación inválido",
        accountVerified: "¡Cuenta verificada exitosamente!",
        enteringSanctuary: "Entrando a tu santuario digital...",
      },
    },
    fr: {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
      translations: {
        verifyAccount: "Vérifiez Votre Compte Sacré",
        subtitle: "Sécurisez votre sanctuaire numérique avec une vérification centrée sur la communauté",
        chooseMethod: "Choisissez Votre Méthode de Vérification",
        emailVerification: "Vérification par Email",
        phoneVerification: "Vérification par Téléphone/SMS",
        codeMethod: "Code de Vérification",
        trustedContactMethod: "Contact de Confiance Communautaire",
        communityVouchMethod: "Système de Cautionnement Communautaire",
        enterCode: "Entrez le code à 6 chiffres envoyé à:",
        enterCodePhone: "Entrez le code à 6 chiffres envoyé par SMS à:",
        resendCode: "Renvoyer le Code",
        resendIn: "Renvoi disponible dans",
        verifyButton: "Vérifier et Entrer dans le Sanctuaire",
        trustedContactLabel: "Nom d'utilisateur/Email du Contact de Confiance",
        trustedContactHelper: "Quelqu'un dans la communauté qui peut confirmer votre identité",
        communityVouchLabel: "Demander un Cautionnement Communautaire",
        communityVouchHelper: "3 membres vérifiés de la communauté valideront votre identité",
        safetyOptions: "Options de Sécurité et Confidentialité",
        secureMode: "Mode Ultra-Sécurisé",
        secureModeDesc: "Masquer les détails de vérification pour une confidentialité maximale",
        noPhoneAccess: "Impossible d'accéder à votre téléphone?",
        noEmailAccess: "Impossible d'accéder à votre email?",
        alternativeVerification: "Utiliser une Vérification Alternative",
        emergencyBypass: "Accès d'Urgence au Compte",
        privacyNotice:
          "🔒 Toutes les données de vérification sont chiffrées et supprimées automatiquement après 24 heures",
        communitySupport: "Besoin de soutien communautaire pendant la vérification?",
        crisisSupport: "Soutien de Crise Disponible",
        backToLogin: "Retour à la Connexion",
        languageSelect: "Sélectionner la Langue",
        emergencyExit: "Sortie Rapide",
        minutes: "minutes",
        seconds: "secondes",
        codeSent: "Code de vérification envoyé avec succès",
        trustedContactNotified: "Votre contact de confiance a été notifié",
        communityVouchRequested: "Demande de cautionnement communautaire soumise",
        invalidCode: "Code de vérification invalide",
        accountVerified: "Compte vérifié avec succès!",
        enteringSanctuary: "Entrant dans votre sanctuaire numérique...",
      },
    },
  }

  const currentLang = languages[selectedLanguage]
  const t = currentLang.translations

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeRemaining])

  const emergencyExit = () => {
    window.location.href = "https://www.weather.com"
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleVerification = () => {
    const code = verificationCode.join("")
    if (code.length === 6) {
      // Simulate verification
      setTimeout(() => {
        alert(t.accountVerified)
        // Redirect to main app
        window.location.href = "/"
      }, 1000)
    } else {
      alert(t.invalidCode)
    }
  }

  const handleResendCode = () => {
    setTimeRemaining(300)
    setCanResend(false)
    setVerificationCode(["", "", "", "", "", ""])
    alert(t.codeSent)
  }

  const handleTrustedContactVerification = () => {
    if (trustedContact) {
      alert(t.trustedContactNotified)
      // Simulate trusted contact notification
    }
  }

  const handleCommunityVouch = () => {
    alert(t.communityVouchRequested)
    // Simulate community vouch request
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        :root {
          --midnight-blue: #0b1a3d;
          --gold: #f4c430;
          --emerald: #028a0f;
          --sunset-orange: #ff6f3c;
          --text-light: #f0e9d2;
          --text-dark: #111;
          --shadow-glow: 0 0 15px var(--gold);
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
        }
        
        body {
          background: linear-gradient(135deg, var(--midnight-blue) 0%, #1a2b5c 50%, var(--midnight-blue) 100%);
          color: var(--text-light);
          line-height: 1.6;
          min-height: 100vh;
        }

        .verification-container {
          background: rgba(11, 26, 61, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 2px solid var(--emerald);
          box-shadow: 0 0 15px var(--emerald);
          padding: 3rem;
          width: 100%;
          max-width: 600px;
          position: relative;
          overflow: hidden;
          margin: 2rem;
        }

        .verification-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--emerald), var(--gold), var(--sunset-orange));
          border-radius: 20px 20px 0 0;
        }

        .emergency-exit {
          position: fixed;
          top: 20px;
          right: 20px;
          background: var(--sunset-orange);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          z-index: 1000;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 111, 60, 0.3);
        }

        .emergency-exit:hover {
          background: #ff4500;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 111, 60, 0.4);
        }

        .language-selector {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 100;
        }

        .language-button {
          background: rgba(244, 196, 48, 0.9);
          color: var(--midnight-blue);
          border: none;
          padding: 0.8rem 1.2rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .language-button:hover {
          background: var(--gold);
          transform: translateY(-2px);
        }

        .language-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(11, 26, 61, 0.95);
          border: 2px solid var(--gold);
          border-radius: 15px;
          margin-top: 0.5rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .language-option {
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          border-bottom: 1px solid rgba(244, 196, 48, 0.2);
        }

        .language-option:last-child {
          border-bottom: none;
        }

        .language-option:hover {
          background: rgba(244, 196, 48, 0.1);
          color: var(--gold);
        }

        .language-option.selected {
          background: rgba(2, 138, 15, 0.2);
          color: var(--emerald);
        }

        .verification-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .verification-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--emerald);
          margin-bottom: 0.5rem;
          text-shadow: 0 0 10px var(--emerald);
        }

        .verification-subtitle {
          font-size: 1rem;
          color: var(--text-light);
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .method-selector {
          margin-bottom: 2rem;
        }

        .method-selector h3 {
          color: var(--gold);
          font-size: 1.2rem;
          margin-bottom: 1rem;
          text-shadow: 0 0 6px var(--gold);
        }

        .method-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .method-tab {
          flex: 1;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(2, 138, 15, 0.3);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .method-tab.active {
          background: rgba(2, 138, 15, 0.2);
          border-color: var(--emerald);
          color: var(--emerald);
        }

        .method-tab:hover {
          background: rgba(2, 138, 15, 0.1);
          border-color: var(--emerald);
        }

        .verification-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .method-option {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(244, 196, 48, 0.3);
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .method-option.active {
          background: rgba(244, 196, 48, 0.2);
          border-color: var(--gold);
          color: var(--gold);
        }

        .method-option:hover {
          background: rgba(244, 196, 48, 0.1);
          border-color: var(--gold);
        }

        .method-option .icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        .method-option .title {
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }

        .method-option .description {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .verification-content {
          background: rgba(2, 138, 15, 0.1);
          border: 2px solid var(--emerald);
          border-radius: 15px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .code-verification {
          text-align: center;
        }

        .verification-target {
          font-size: 1.1rem;
          color: var(--gold);
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(244, 196, 48, 0.1);
          border-radius: 10px;
          word-break: break-all;
        }

        .code-inputs {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .code-input {
          width: 3rem;
          height: 3rem;
          border: 2px solid rgba(244, 196, 48, 0.5);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-light);
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          transition: all 0.3s ease;
        }

        .code-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 15px rgba(244, 196, 48, 0.3);
        }

        .timer {
          color: var(--sunset-orange);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .resend-button {
          background: transparent;
          border: 2px solid var(--gold);
          color: var(--gold);
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1.5rem;
        }

        .resend-button:hover:not(:disabled) {
          background: var(--gold);
          color: var(--midnight-blue);
        }

        .resend-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .trusted-contact-form,
        .community-vouch-form {
          text-align: left;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid rgba(244, 196, 48, 0.3);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-light);
          font-size: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 15px rgba(244, 196, 48, 0.3);
        }

        .form-helper {
          font-size: 0.8rem;
          color: var(--text-light);
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .verify-button {
          width: 100%;
          padding: 1.2rem;
          background: linear-gradient(135deg, var(--emerald), var(--gold));
          color: var(--midnight-blue);
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
        }

        .verify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(2, 138, 15, 0.3);
        }

        .safety-options {
          background: rgba(255, 111, 60, 0.1);
          border: 2px solid var(--sunset-orange);
          border-radius: 15px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .safety-toggle {
          background: transparent;
          border: 2px solid var(--sunset-orange);
          color: var(--sunset-orange);
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
          width: 100%;
        }

        .safety-toggle:hover {
          background: var(--sunset-orange);
          color: var(--text-light);
        }

        .safety-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .checkbox {
          width: 1.2rem;
          height: 1.2rem;
          accent-color: var(--emerald);
        }

        .alternative-methods {
          text-align: center;
          margin-bottom: 2rem;
        }

        .alternative-link {
          color: var(--gold);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
          margin: 0.5rem 1rem;
        }

        .alternative-link:hover {
          color: var(--emerald);
          text-shadow: 0 0 6px var(--emerald);
        }

        .crisis-support {
          background: rgba(255, 111, 60, 0.2);
          border: 2px solid var(--sunset-orange);
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .crisis-support h4 {
          color: var(--sunset-orange);
          margin-bottom: 1rem;
        }

        .crisis-link {
          background: var(--sunset-orange);
          color: var(--text-light);
          padding: 0.8rem 1.5rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .crisis-link:hover {
          background: #ff4500;
          transform: translateY(-2px);
        }

        .privacy-notice {
          text-align: center;
          margin-bottom: 2rem;
          padding: 1rem;
          background: rgba(2, 138, 15, 0.1);
          border-radius: 10px;
          border: 1px solid var(--emerald);
        }

        .privacy-notice p {
          font-size: 0.8rem;
          color: var(--text-light);
          opacity: 0.9;
        }

        .back-link {
          text-align: center;
        }

        .back-link a {
          color: var(--text-light);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-link a:hover {
          color: var(--gold);
          text-shadow: 0 0 6px var(--gold);
        }

        .rtl {
          direction: rtl;
          text-align: right;
        }

        .secure-mode {
          filter: blur(5px);
          transition: filter 0.3s ease;
        }

        .secure-mode:hover {
          filter: blur(0px);
        }

        @media (max-width: 768px) {
          .verification-container {
            margin: 1rem;
            padding: 2rem;
          }

          .verification-title {
            font-size: 1.8rem;
          }

          .method-tabs {
            flex-direction: column;
          }

          .verification-methods {
            grid-template-columns: 1fr;
          }

          .code-inputs {
            gap: 0.5rem;
          }

          .code-input {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1.2rem;
          }
        }
      `}</style>

      {/* Emergency Exit Button */}
      <button className="emergency-exit" onClick={emergencyExit} title={t.emergencyExit}>
        🚪 {t.emergencyExit}
      </button>

      {/* Language Selector */}
      <div className="language-selector">
        <button
          className="language-button"
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          title={t.languageSelect}
        >
          <span>{currentLang.flag}</span>
          <span>{currentLang.name}</span>
          <span>{showLanguageDropdown ? "▲" : "▼"}</span>
        </button>

        {showLanguageDropdown && (
          <div className="language-dropdown">
            {Object.values(languages).map((lang) => (
              <div
                key={lang.code}
                className={`language-option ${selectedLanguage === lang.code ? "selected" : ""}`}
                onClick={() => {
                  setSelectedLanguage(lang.code)
                  setShowLanguageDropdown(false)
                }}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {selectedLanguage === lang.code && <span style={{ marginLeft: "auto" }}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verification Container */}
      <div className={`verification-container ${selectedLanguage === "ar" ? "rtl" : ""}`}>
        <div className="verification-header">
          <h1 className="verification-title">{t.verifyAccount}</h1>
          <p className="verification-subtitle">{t.subtitle}</p>
        </div>

        {/* Verification Type Selector */}
        <div className="method-selector">
          <h3>{t.chooseMethod}</h3>
          <div className="method-tabs">
            <div
              className={`method-tab ${verificationType === "email" ? "active" : ""}`}
              onClick={() => setVerificationType("email")}
            >
              📧 {t.emailVerification}
            </div>
            <div
              className={`method-tab ${verificationType === "phone" ? "active" : ""}`}
              onClick={() => setVerificationType("phone")}
            >
              📱 {t.phoneVerification}
            </div>
          </div>
        </div>

        {/* Verification Method Options */}
        <div className="verification-methods">
          <div
            className={`method-option ${verificationMethod === "code" ? "active" : ""}`}
            onClick={() => setVerificationMethod("code")}
          >
            <span className="icon">🔐</span>
            <div className="title">{t.codeMethod}</div>
            <div className="description">Traditional verification</div>
          </div>
          <div
            className={`method-option ${verificationMethod === "trusted-contact" ? "active" : ""}`}
            onClick={() => setVerificationMethod("trusted-contact")}
          >
            <span className="icon">🤝</span>
            <div className="title">{t.trustedContactMethod}</div>
            <div className="description">Community-based verification</div>
          </div>
          <div
            className={`method-option ${verificationMethod === "community-vouch" ? "active" : ""}`}
            onClick={() => setVerificationMethod("community-vouch")}
          >
            <span className="icon">👥</span>
            <div className="title">{t.communityVouchMethod}</div>
            <div className="description">Collective community validation</div>
          </div>
        </div>

        {/* Verification Content */}
        <div className={`verification-content ${useSecureMode ? "secure-mode" : ""}`}>
          {verificationMethod === "code" && (
            <div className="code-verification">
              <div className="verification-target">
                {verificationType === "email"
                  ? `${t.enterCode} user@example.com`
                  : `${t.enterCodePhone} +1 (***) ***-1234`}
              </div>

              <div className="code-inputs">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    className="code-input"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleBackspace(index, e)}
                  />
                ))}
              </div>

              <div className="timer">
                {timeRemaining > 0 ? (
                  `${t.resendIn} ${formatTime(timeRemaining)}`
                ) : (
                  <button className="resend-button" onClick={handleResendCode}>
                    {t.resendCode}
                  </button>
                )}
              </div>

              <button className="verify-button" onClick={handleVerification}>
                {t.verifyButton}
              </button>
            </div>
          )}

          {verificationMethod === "trusted-contact" && (
            <div className="trusted-contact-form">
              <div className="form-group">
                <label htmlFor="trustedContact" className="form-label">
                  {t.trustedContactLabel}
                </label>
                <input
                  type="text"
                  id="trustedContact"
                  className="form-input"
                  value={trustedContact}
                  onChange={(e) => setTrustedContact(e.target.value)}
                  placeholder="community_member@thrivebmore"
                />
                <div className="form-helper">{t.trustedContactHelper}</div>
              </div>

              <button className="verify-button" onClick={handleTrustedContactVerification}>
                {t.trustedContactNotified}
              </button>
            </div>
          )}

          {verificationMethod === "community-vouch" && (
            <div className="community-vouch-form">
              <div className="form-group">
                <label className="form-label">{t.communityVouchLabel}</label>
                <div className="form-helper">{t.communityVouchHelper}</div>
              </div>

              <div
                style={{
                  background: "rgba(244, 196, 48, 0.1)",
                  border: "2px solid var(--gold)",
                  borderRadius: "10px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h4 style={{ color: "var(--gold)", marginBottom: "1rem" }}>🌟 Community Vouch Process:</h4>
                <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
                  <li>Your verification request will be sent to 3 verified community members</li>
                  <li>They will validate your identity through established community connections</li>
                  <li>Process typically takes 2-6 hours depending on community availability</li>
                  <li>All vouchers must agree before account activation</li>
                </ul>
              </div>

              <button className="verify-button" onClick={handleCommunityVouch}>
                {t.communityVouchRequested}
              </button>
            </div>
          )}
        </div>

        {/* Safety & Privacy Options */}
        <div className="safety-options">
          <button className="safety-toggle" onClick={() => setShowSafetyOptions(!showSafetyOptions)}>
            🔒 {t.safetyOptions} {showSafetyOptions ? "▲" : "▼"}
          </button>

          {showSafetyOptions && (
            <div>
              <div className="safety-option">
                <input
                  type="checkbox"
                  id="secureMode"
                  className="checkbox"
                  checked={useSecureMode}
                  onChange={(e) => setUseSecureMode(e.target.checked)}
                />
                <label htmlFor="secureMode">
                  <strong>{t.secureMode}</strong>
                  <div style={{ fontSize: "0.8rem", opacity: "0.8" }}>{t.secureModeDesc}</div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Alternative Verification Methods */}
        <div className="alternative-methods">
          <p style={{ marginBottom: "1rem", color: "var(--text-light)" }}>
            {verificationType === "phone" ? t.noPhoneAccess : t.noEmailAccess}
          </p>
          <a href="#" className="alternative-link">
            {t.alternativeVerification}
          </a>
          <a href="#" className="alternative-link">
            {t.emergencyBypass}
          </a>
        </div>

        {/* Crisis Support */}
        <div className="crisis-support">
          <h4>{t.communitySupport}</h4>
          <p style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
            Our community support team is available 24/7 to help with verification issues, especially during crisis
            situations.
          </p>
          <a href="tel:877-565-8860" className="crisis-link">
            {t.crisisSupport}
          </a>
        </div>

        {/* Privacy Notice */}
        <div className="privacy-notice">
          <p>{t.privacyNotice}</p>
        </div>

        {/* Back to Login */}
        <div className="back-link">
          <Link href="/login">← {t.backToLogin}</Link>
        </div>
      </div>
    </div>
  )
}
