"use client"

import { useState } from "react"
import Link from "next/link"
import { Ticker } from "@/components/ticker"
import { FloatingNavigation } from "@/components/floating-navigation"

export default function LoginPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const languages = {
    en: {
      code: "en",
      name: "English",
      flag: "🇺🇸",
      translations: {
        welcome: "Welcome to ThriveBMore",
        subtitle: "Your Digital Sanctuary of Trans Liberation",
        signIn: "Sign In to Your Sacred Space",
        email: "Email or Username",
        password: "Password",
        rememberMe: "Remember me on this device",
        forgotPassword: "Forgot your password?",
        loginButton: "Enter Sanctuary",
        noAccount: "New to our community?",
        createAccount: "Create Sacred Account",
        or: "or",
        guestAccess: "Continue as Guest",
        privacy: "Your privacy is sacred. All data is encrypted end-to-end.",
        emergencyExit: "Quick Exit",
        languageSelect: "Select Language",
        showPassword: "Show password",
        hidePassword: "Hide password",
      },
    },
    es: {
      code: "es",
      name: "Español",
      flag: "🇪🇸",
      translations: {
        welcome: "Bienvenidx a ThriveBMore",
        subtitle: "Tu Santuario Digital de Liberación Trans",
        signIn: "Inicia Sesión en Tu Espacio Sagrado",
        email: "Correo o Nombre de Usuario",
        password: "Contraseña",
        rememberMe: "Recordarme en este dispositivo",
        forgotPassword: "¿Olvidaste tu contraseña?",
        loginButton: "Entrar al Santuario",
        noAccount: "¿Nuevx en nuestra comunidad?",
        createAccount: "Crear Cuenta Sagrada",
        or: "o",
        guestAccess: "Continuar como Invitadx",
        privacy: "Tu privacidad es sagrada. Todos los datos están encriptados de extremo a extremo.",
        emergencyExit: "Salida Rápida",
        languageSelect: "Seleccionar Idioma",
        showPassword: "Mostrar contraseña",
        hidePassword: "Ocultar contraseña",
      },
    },
    fr: {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
      translations: {
        welcome: "Bienvenue à ThriveBMore",
        subtitle: "Votre Sanctuaire Numérique de Libération Trans",
        signIn: "Connectez-vous à Votre Espace Sacré",
        email: "Email ou Nom d'utilisateur",
        password: "Mot de passe",
        rememberMe: "Se souvenir de moi sur cet appareil",
        forgotPassword: "Mot de passe oublié?",
        loginButton: "Entrer dans le Sanctuaire",
        noAccount: "Nouveau dans notre communauté?",
        createAccount: "Créer un Compte Sacré",
        or: "ou",
        guestAccess: "Continuer en tant qu'Invité",
        privacy: "Votre vie privée est sacrée. Toutes les données sont chiffrées de bout en bout.",
        emergencyExit: "Sortie Rapide",
        languageSelect: "Sélectionner la Langue",
        showPassword: "Afficher le mot de passe",
        hidePassword: "Masquer le mot de passe",
      },
    },
    pt: {
      code: "pt",
      name: "Português",
      flag: "🇧🇷",
      translations: {
        welcome: "Bem-vindx ao ThriveBMore",
        subtitle: "Seu Santuário Digital de Liberação Trans",
        signIn: "Entre no Seu Espaço Sagrado",
        email: "Email ou Nome de Usuário",
        password: "Senha",
        rememberMe: "Lembrar-me neste dispositivo",
        forgotPassword: "Esqueceu sua senha?",
        loginButton: "Entrar no Santuário",
        noAccount: "Novx em nossa comunidade?",
        createAccount: "Criar Conta Sagrada",
        or: "ou",
        guestAccess: "Continuar como Convidadx",
        privacy: "Sua privacidade é sagrada. Todos os dados são criptografados ponta a ponta.",
        emergencyExit: "Saída Rápida",
        languageSelect: "Selecionar Idioma",
        showPassword: "Mostrar senha",
        hidePassword: "Ocultar senha",
      },
    },
    ar: {
      code: "ar",
      name: "العربية",
      flag: "🇸🇦",
      translations: {
        welcome: "مرحباً بك في ThriveBMore",
        subtitle: "ملاذك الرقمي لتحرير المتحولين جنسياً",
        signIn: "تسجيل الدخول إلى مساحتك المقدسة",
        email: "البريد الإلكتروني أو اسم المستخدم",
        password: "كلمة المرور",
        rememberMe: "تذكرني على هذا الجهاز",
        forgotPassword: "نسيت كلمة المرور؟",
        loginButton: "دخول الملاذ",
        noAccount: "جديد في مجتمعنا؟",
        createAccount: "إنشاء حساب مقدس",
        or: "أو",
        guestAccess: "المتابعة كضيف",
        privacy: "خصوصيتك مقدسة. جميع البيانات مشفرة من طرف إلى طرف.",
        emergencyExit: "خروج سريع",
        languageSelect: "اختيار اللغة",
        showPassword: "إظهار كلمة المرور",
        hidePassword: "إخفاء كلمة المرور",
      },
    },
    zh: {
      code: "zh",
      name: "中文",
      flag: "🇨🇳",
      translations: {
        welcome: "欢迎来到 ThriveBMore",
        subtitle: "您的跨性别解放数字圣所",
        signIn: "登录您的神圣空间",
        email: "邮箱或用户名",
        password: "密码",
        rememberMe: "在此设备上记住我",
        forgotPassword: "忘记密码？",
        loginButton: "进入圣所",
        noAccount: "初来我们社区？",
        createAccount: "创建神圣账户",
        or: "或",
        guestAccess: "以访客身份继续",
        privacy: "您的隐私是神圣的。所有数据都经过端到端加密。",
        emergencyExit: "快速退出",
        languageSelect: "选择语言",
        showPassword: "显示密码",
        hidePassword: "隐藏密码",
      },
    },
  }

  const currentLang = languages[selectedLanguage]
  const t = currentLang.translations

  const emergencyExit = () => {
    window.location.href = "https://www.weather.com"
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", formData)
  }

  const handleNavigate = (section: string) => {
    if (section === "home") {
      window.location.href = "/"
    }
    // Other navigation logic can be added here
  }

  return (
    <div className="min-h-screen flex flex-col relative sigil-background">
      {/* Ticker at top */}
      <Ticker />

      {/* Floating Navigation */}
      <FloatingNavigation onNavigate={handleNavigate} currentSection="login" />

      <div className="flex-1 flex items-center justify-center relative">
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

          .login-container {
            background: rgba(11, 26, 61, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 2px solid var(--gold);
            box-shadow: var(--shadow-glow);
            padding: 3rem;
            width: 100%;
            max-width: 450px;
            position: relative;
            overflow: hidden;
            animation: carousel-slide 0.8s ease-out;
          }

          .login-container::before {
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
            top: 80px;
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
            top: 80px;
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
            animation: carousel-slide 0.3s ease-out;
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

          .login-header {
            text-align: center;
            margin-bottom: 2.5rem;
          }

          .login-title {
            font-size: 2.2rem;
            font-weight: 700;
            color: var(--gold);
            margin-bottom: 0.5rem;
            text-shadow: 0 0 10px var(--gold);
            animation: spiritual-pulse 2s ease-in-out infinite;
          }

          .login-subtitle {
            font-size: 1rem;
            color: var(--text-light);
            opacity: 0.9;
            margin-bottom: 1rem;
          }

          .login-form-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--emerald);
            margin-bottom: 1.5rem;
            text-align: center;
            text-shadow: 0 0 6px var(--emerald);
          }

          .form-group {
            margin-bottom: 1.5rem;
            position: relative;
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
            background: rgba(255, 255, 255, 0.15);
          }

          .form-input::placeholder {
            color: rgba(240, 233, 210, 0.6);
          }

          .password-container {
            position: relative;
          }

          .password-toggle {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--gold);
            cursor: pointer;
            font-size: 1.1rem;
            transition: all 0.3s ease;
          }

          .password-toggle:hover {
            color: var(--emerald);
          }

          .checkbox-container {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 1.5rem;
          }

          .checkbox {
            width: 1.2rem;
            height: 1.2rem;
            accent-color: var(--emerald);
          }

          .checkbox-label {
            font-size: 0.9rem;
            color: var(--text-light);
            cursor: pointer;
          }

          .forgot-password {
            text-align: center;
            margin-bottom: 2rem;
          }

          .forgot-password a {
            color: var(--gold);
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }

          .forgot-password a:hover {
            color: var(--emerald);
            text-shadow: 0 0 6px var(--emerald);
          }

          .login-button {
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

          .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(2, 138, 15, 0.3);
          }

          .divider {
            text-align: center;
            margin: 1.5rem 0;
            position: relative;
          }

          .divider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: rgba(244, 196, 48, 0.3);
          }

          .divider span {
            background: rgba(11, 26, 61, 0.95);
            padding: 0 1rem;
            color: var(--text-light);
            font-size: 0.9rem;
          }

          .guest-access {
            width: 100%;
            padding: 1rem;
            background: transparent;
            color: var(--gold);
            border: 2px solid var(--gold);
            border-radius: 15px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 2rem;
          }

          .guest-access:hover {
            background: var(--gold);
            color: var(--midnight-blue);
            transform: translateY(-2px);
          }

          .signup-link {
            text-align: center;
            margin-top: 1.5rem;
          }

          .signup-link p {
            color: var(--text-light);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }

          .signup-link a {
            color: var(--emerald);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .signup-link a:hover {
            color: var(--gold);
            text-shadow: 0 0 6px var(--gold);
          }

          .privacy-notice {
            text-align: center;
            margin-top: 2rem;
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

          .rtl {
            direction: rtl;
            text-align: right;
          }

          .rtl .form-input {
            text-align: right;
          }

          .rtl .password-toggle {
            left: 1rem;
            right: auto;
          }

          .rtl .checkbox-container {
            flex-direction: row-reverse;
          }

          @media (max-width: 768px) {
            .login-container {
              margin: 1rem;
              padding: 2rem;
            }

            .login-title {
              font-size: 1.8rem;
            }

            .emergency-exit,
            .language-button {
              padding: 0.6rem 1rem;
              font-size: 0.8rem;
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

        {/* Login Container */}
        <div className={`login-container ${selectedLanguage === "ar" ? "rtl" : ""}`}>
          <div className="login-header">
            <h1 className="login-title">{t.welcome}</h1>
            <p className="login-subtitle">{t.subtitle}</p>
          </div>

          <h2 className="login-form-title">{t.signIn}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t.email}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.email}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {t.password}
              </label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t.password}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                {t.rememberMe}
              </label>
            </div>

            <div className="forgot-password">
              <Link href="/forgot-password">{t.forgotPassword}</Link>
            </div>

            <button type="submit" className="login-button">
              {t.loginButton}
            </button>
          </form>

          <div className="divider">
            <span>{t.or}</span>
          </div>

          <Link href="/">
            <button className="guest-access">{t.guestAccess}</button>
          </Link>

          <div className="signup-link">
            <p>{t.noAccount}</p>
            <Link href="/signup">{t.createAccount}</Link>
          </div>

          <div className="privacy-notice">
            <p>🔒 {t.privacy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
