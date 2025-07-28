"use client"

import { useState } from "react"
import Link from "next/link"

export default function SignupPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeUpdates: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const languages = {
    en: {
      code: "en",
      name: "English",
      flag: "🇺🇸",
      translations: {
        welcome: "Join ThriveBMore",
        subtitle: "Create Your Sacred Digital Sanctuary",
        signUp: "Create Your Sacred Account",
        username: "Choose Your Sacred Name",
        email: "Email Address",
        password: "Create Password",
        confirmPassword: "Confirm Password",
        agreeToTerms: "I agree to the Community Guidelines and Privacy Policy",
        subscribeUpdates: "Send me community updates and liberation resources",
        signupButton: "Create Sacred Account",
        alreadyMember: "Already part of our community?",
        signIn: "Sign In Here",
        or: "or",
        guestAccess: "Continue as Guest",
        privacy: "Your privacy is sacred. All data is encrypted end-to-end.",
        emergencyExit: "Quick Exit",
        languageSelect: "Select Language",
        showPassword: "Show password",
        hidePassword: "Hide password",
        passwordMismatch: "Passwords do not match",
        strongPassword: "Use 8+ characters with letters, numbers, and symbols",
      },
    },
    es: {
      code: "es",
      name: "Español",
      flag: "🇪🇸",
      translations: {
        welcome: "Únete a ThriveBMore",
        subtitle: "Crea Tu Santuario Digital Sagrado",
        signUp: "Crea Tu Cuenta Sagrada",
        username: "Elige Tu Nombre Sagrado",
        email: "Dirección de Correo",
        password: "Crear Contraseña",
        confirmPassword: "Confirmar Contraseña",
        agreeToTerms: "Acepto las Pautas Comunitarias y Política de Privacidad",
        subscribeUpdates: "Envíame actualizaciones comunitarias y recursos de liberación",
        signupButton: "Crear Cuenta Sagrada",
        alreadyMember: "¿Ya eres parte de nuestra comunidad?",
        signIn: "Inicia Sesión Aquí",
        or: "o",
        guestAccess: "Continuar como Invitadx",
        privacy: "Tu privacidad es sagrada. Todos los datos están encriptados de extremo a extremo.",
        emergencyExit: "Salida Rápida",
        languageSelect: "Seleccionar Idioma",
        showPassword: "Mostrar contraseña",
        hidePassword: "Ocultar contraseña",
        passwordMismatch: "Las contraseñas no coinciden",
        strongPassword: "Usa 8+ caracteres con letras, números y símbolos",
      },
    },
    fr: {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
      translations: {
        welcome: "Rejoignez ThriveBMore",
        subtitle: "Créez Votre Sanctuaire Numérique Sacré",
        signUp: "Créez Votre Compte Sacré",
        username: "Choisissez Votre Nom Sacré",
        email: "Adresse Email",
        password: "Créer un Mot de Passe",
        confirmPassword: "Confirmer le Mot de Passe",
        agreeToTerms: "J'accepte les Directives Communautaires et la Politique de Confidentialité",
        subscribeUpdates: "Envoyez-moi les mises à jour communautaires et les ressources de libération",
        signupButton: "Créer un Compte Sacré",
        alreadyMember: "Déjà membre de notre communauté?",
        signIn: "Se Connecter Ici",
        or: "ou",
        guestAccess: "Continuer en tant qu'Invité",
        privacy: "Votre vie privée est sacrée. Toutes les données sont chiffrées de bout en bout.",
        emergencyExit: "Sortie Rapide",
        languageSelect: "Sélectionner la Langue",
        showPassword: "Afficher le mot de passe",
        hidePassword: "Masquer le mot de passe",
        passwordMismatch: "Les mots de passe ne correspondent pas",
        strongPassword: "Utilisez 8+ caractères avec lettres, chiffres et symboles",
      },
    },
    pt: {
      code: "pt",
      name: "Português",
      flag: "🇧🇷",
      translations: {
        welcome: "Junte-se ao ThriveBMore",
        subtitle: "Crie Seu Santuário Digital Sagrado",
        signUp: "Crie Sua Conta Sagrada",
        username: "Escolha Seu Nome Sagrado",
        email: "Endereço de Email",
        password: "Criar Senha",
        confirmPassword: "Confirmar Senha",
        agreeToTerms: "Concordo com as Diretrizes da Comunidade e Política de Privacidade",
        subscribeUpdates: "Envie-me atualizações da comunidade e recursos de liberação",
        signupButton: "Criar Conta Sagrada",
        alreadyMember: "Já faz parte da nossa comunidade?",
        signIn: "Entre Aqui",
        or: "ou",
        guestAccess: "Continuar como Convidadx",
        privacy: "Sua privacidade é sagrada. Todos os dados são criptografados ponta a ponta.",
        emergencyExit: "Saída Rápida",
        languageSelect: "Selecionar Idioma",
        showPassword: "Mostrar senha",
        hidePassword: "Ocultar senha",
        passwordMismatch: "As senhas não coincidem",
        strongPassword: "Use 8+ caracteres com letras, números e símbolos",
      },
    },
    ar: {
      code: "ar",
      name: "العربية",
      flag: "🇸🇦",
      translations: {
        welcome: "انضم إلى ThriveBMore",
        subtitle: "أنشئ ملاذك الرقمي المقدس",
        signUp: "أنشئ حسابك المقدس",
        username: "اختر اسمك المقدس",
        email: "عنوان البريد الإلكتروني",
        password: "إنشاء كلمة مرور",
        confirmPassword: "تأكيد كلمة المرور",
        agreeToTerms: "أوافق على إرشادات المجتمع وسياسة الخصوصية",
        subscribeUpdates: "أرسل لي تحديثات المجتمع وموارد التحرير",
        signupButton: "إنشاء حساب مقدس",
        alreadyMember: "عضو بالفعل في مجتمعنا؟",
        signIn: "تسجيل الدخول هنا",
        or: "أو",
        guestAccess: "المتابعة كضيف",
        privacy: "خصوصيتك مقدسة. جميع البيانات مشفرة من طرف إلى طرف.",
        emergencyExit: "خروج سريع",
        languageSelect: "اختيار اللغة",
        showPassword: "إظهار كلمة المرور",
        hidePassword: "إخفاء كلمة المرور",
        passwordMismatch: "كلمات المرور غير متطابقة",
        strongPassword: "استخدم 8+ أحرف مع حروف وأرقام ورموز",
      },
    },
    zh: {
      code: "zh",
      name: "中文",
      flag: "🇨🇳",
      translations: {
        welcome: "加入 ThriveBMore",
        subtitle: "创建您的神圣数字圣所",
        signUp: "创建您的神圣账户",
        username: "选择您的神圣名字",
        email: "邮箱地址",
        password: "创建密码",
        confirmPassword: "确认密码",
        agreeToTerms: "我同意社区准则和隐私政策",
        subscribeUpdates: "向我发送社区更新和解放资源",
        signupButton: "创建神圣账户",
        alreadyMember: "已经是我们社区的一员？",
        signIn: "在此登录",
        or: "或",
        guestAccess: "以访客身份继续",
        privacy: "您的隐私是神圣的。所有数据都经过端到端加密。",
        emergencyExit: "快速退出",
        languageSelect: "选择语言",
        showPassword: "显示密码",
        hidePassword: "隐藏密码",
        passwordMismatch: "密码不匹配",
        strongPassword: "使用8+个字符，包含字母、数字和符号",
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
    if (formData.password !== formData.confirmPassword) {
      alert(t.passwordMismatch)
      return
    }
    // Handle signup logic here
    console.log("Signup attempt:", formData)
  }

  const passwordsMatch = formData.password === formData.confirmPassword || formData.confirmPassword === ""

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

        .signup-container {
          background: rgba(11, 26, 61, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 2px solid var(--emerald);
          box-shadow: 0 0 15px var(--emerald);
          padding: 3rem;
          width: 100%;
          max-width: 500px;
          position: relative;
          overflow: hidden;
          margin: 2rem;
        }

        .signup-container::before {
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

        .signup-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .signup-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--emerald);
          margin-bottom: 0.5rem;
          text-shadow: 0 0 10px var(--emerald);
        }

        .signup-subtitle {
          font-size: 1rem;
          color: var(--text-light);
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .signup-form-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--gold);
          margin-bottom: 1.5rem;
          text-align: center;
          text-shadow: 0 0 6px var(--gold);
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
          border: 2px solid rgba(2, 138, 15, 0.3);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-light);
          font-size: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--emerald);
          box-shadow: 0 0 15px rgba(2, 138, 15, 0.3);
          background: rgba(255, 255, 255, 0.15);
        }

        .form-input.error {
          border-color: var(--sunset-orange);
          box-shadow: 0 0 15px rgba(255, 111, 60, 0.3);
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

        .password-strength {
          font-size: 0.8rem;
          color: var(--text-light);
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .error-message {
          font-size: 0.8rem;
          color: var(--sunset-orange);
          margin-top: 0.5rem;
        }

        .checkbox-container {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .checkbox {
          width: 1.2rem;
          height: 1.2rem;
          accent-color: var(--emerald);
          margin-top: 0.2rem;
        }

        .checkbox-label {
          font-size: 0.9rem;
          color: var(--text-light);
          cursor: pointer;
          line-height: 1.4;
        }

        .checkbox-label a {
          color: var(--gold);
          text-decoration: none;
        }

        .checkbox-label a:hover {
          color: var(--emerald);
          text-shadow: 0 0 6px var(--emerald);
        }

        .signup-button {
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

        .signup-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(2, 138, 15, 0.3);
        }

        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
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
          background: rgba(2, 138, 15, 0.3);
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
          color: var(--emerald);
          border: 2px solid var(--emerald);
          border-radius: 15px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }

        .guest-access:hover {
          background: var(--emerald);
          color: var(--midnight-blue);
          transform: translateY(-2px);
        }

        .signin-link {
          text-align: center;
          margin-top: 1.5rem;
        }

        .signin-link p {
          color: var(--text-light);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .signin-link a {
          color: var(--gold);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .signin-link a:hover {
          color: var(--emerald);
          text-shadow: 0 0 6px var(--emerald);
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
          .signup-container {
            margin: 1rem;
            padding: 2rem;
          }

          .signup-title {
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

      {/* Signup Container */}
      <div className={`signup-container ${selectedLanguage === "ar" ? "rtl" : ""}`}>
        <div className="signup-header">
          <h1 className="signup-title">{t.welcome}</h1>
          <p className="signup-subtitle">{t.subtitle}</p>
        </div>

        <h2 className="signup-form-title">{t.signUp}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              {t.username}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleInputChange}
              placeholder={t.username}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t.email}
            </label>
            <input
              type="email"
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
            <div className="password-strength">{t.strongPassword}</div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              {t.confirmPassword}
            </label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className={`form-input ${!passwordsMatch ? "error" : ""}`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t.confirmPassword}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? t.hidePassword : t.showPassword}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {!passwordsMatch && formData.confirmPassword && <div className="error-message">{t.passwordMismatch}</div>}
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              className="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="agreeToTerms" className="checkbox-label">
              {t.agreeToTerms.split("Community Guidelines").map((part, index) => (
                <span key={index}>
                  {part}
                  {index === 0 && (
                    <Link href="/community-guidelines">
                      <span style={{ color: "var(--gold)" }}>Community Guidelines</span>
                    </Link>
                  )}
                  {index === 0 && t.agreeToTerms.includes("Privacy Policy") && " and "}
                  {index === 0 && t.agreeToTerms.includes("Privacy Policy") && (
                    <Link href="/privacy-policy">
                      <span style={{ color: "var(--gold)" }}>Privacy Policy</span>
                    </Link>
                  )}
                </span>
              ))}
            </label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="subscribeUpdates"
              name="subscribeUpdates"
              className="checkbox"
              checked={formData.subscribeUpdates}
              onChange={handleInputChange}
            />
            <label htmlFor="subscribeUpdates" className="checkbox-label">
              {t.subscribeUpdates}
            </label>
          </div>

          <button type="submit" className="signup-button" disabled={!formData.agreeToTerms || !passwordsMatch}>
            {t.signupButton}
          </button>
        </form>

        <div className="divider">
          <span>{t.or}</span>
        </div>

        <Link href="/">
          <button className="guest-access">{t.guestAccess}</button>
        </Link>

        <div className="signin-link">
          <p>{t.alreadyMember}</p>
          <Link href="/login">{t.signIn}</Link>
        </div>

        <div className="privacy-notice">
          <p>🔒 {t.privacy}</p>
        </div>
      </div>
    </div>
  )
}
