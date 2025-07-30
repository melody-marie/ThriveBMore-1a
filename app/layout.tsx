import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SoulVaultProvider } from "@/components/soul-vault-provider"
import { EmergencyProvider } from "@/components/emergency-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "ThriveBMore Liberation Stack",
  description: "Underground Railroad of Trans Liberation - Digital Sanctuary & Community Support",
  generator: "ThriveBMore Liberation Stack",
  keywords: ["LGBTQ+", "Trans", "Baltimore", "Community", "Support", "Liberation", "Safety"],
  authors: [{ name: "Aziza Okoro", url: "https://thrivebmore.org" }],
  creator: "ThriveBMore Liberation Stack",
  publisher: "ThriveBMore Community",
  robots: "noindex, nofollow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ThriveBMore" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
          
          /* Aziza Sigil Background */
          .aziza-sigil-background {
            background-image: url('/aziza-sigil-branding.png');
            background-size: 400px 200px;
            background-repeat: repeat;
            background-position: center;
            background-attachment: fixed;
            opacity: 0.03;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -2;
            pointer-events: none;
          }
          
          /* Enhanced Sigil Pattern */
          .sigil-pattern {
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              url('/aziza-sigil-branding.png');
            background-size: 
              200px 200px,
              200px 200px,
              300px 150px;
            background-repeat: repeat;
            background-position: 
              0 0,
              100px 100px,
              center;
            opacity: 0.05;
          }
          
          /* Floating Navigation */
          .floating-nav {
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .floating-nav-button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #8B5CF6, #EC4899);
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            position: relative;
          }
          
          .floating-nav-button::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(45deg, #8B5CF6, #EC4899, #F59E0B, #10B981);
            border-radius: inherit;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .floating-nav-button:hover::before {
            opacity: 0.7;
            animation: mystical-rotate 2s linear infinite;
          }
          
          .floating-nav-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
          }
          
          /* Carousel Animations */
          .carousel-slide {
            animation: carousel-slide 0.8s ease-out;
          }
          
          @keyframes carousel-slide {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          /* Emergency Signal Styles */
          .emergency-pulse {
            animation: emergency-pulse 1s ease-in-out infinite alternate;
          }
          
          @keyframes emergency-pulse {
            from { box-shadow: 0 0 20px rgba(239, 68, 68, 0.7); }
            to { box-shadow: 0 0 40px rgba(239, 68, 68, 1); }
          }
          
          /* Quantum Cloak Animation */
          .quantum-cloak {
            animation: quantum-fade 0.3s ease-out forwards;
          }
          
          @keyframes quantum-fade {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.95); }
            100% { opacity: 0; transform: scale(0.9); }
          }
          
          /* Sacred Animations */
          .sacred-breathe {
            animation: sacred-breathe 4s ease-in-out infinite;
          }
          
          @keyframes sacred-breathe {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          
          .ancestral-glow {
            animation: ancestral-glow 3s ease-in-out infinite alternate;
          }
          
          @keyframes ancestral-glow {
            from { 
              box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
              filter: hue-rotate(0deg);
            }
            to { 
              box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
              filter: hue-rotate(30deg);
            }
          }
          
          /* Liberation Card Styles */
          .liberation-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(168, 85, 247, 0.2);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .liberation-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('/aziza-sigil-branding.png');
            background-size: 200px 100px;
            background-repeat: no-repeat;
            background-position: top right;
            opacity: 0.02;
            pointer-events: none;
          }
          
          .liberation-card:hover {
            border-color: rgba(168, 85, 247, 0.4);
            box-shadow: 0 12px 40px rgba(168, 85, 247, 0.15);
            transform: translateY(-2px);
          }
          
          /* Afro-futuristic Text */
          .afro-futuristic-text {
            background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            text-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
            position: relative;
          }
          
          .afro-futuristic-text::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('/aziza-sigil-branding.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            opacity: 0.05;
            pointer-events: none;
          }
          
          /* Floating Animation */
          .floating {
            animation: floating 6s ease-in-out infinite;
          }
          
          @keyframes floating {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(1deg); }
            66% { transform: translateY(-10px) rotate(-1deg); }
          }
          
          /* Spiritual Pulse */
          .spiritual-pulse {
            animation: spiritual-pulse 2s ease-in-out infinite;
          }
          
          @keyframes spiritual-pulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
          }
          
          /* Mystical Glow */
          .mystical-glow {
            position: relative;
          }
          
          .mystical-glow::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(45deg, #8B5CF6, #EC4899, #F59E0B, #10B981);
            border-radius: inherit;
            z-index: -1;
            opacity: 0.7;
            animation: mystical-rotate 4s linear infinite;
          }
          
          @keyframes mystical-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Sanctuary Gradient */
          .sanctuary-gradient {
            background: linear-gradient(135deg, 
              rgba(139, 92, 246, 0.1) 0%, 
              rgba(236, 72, 153, 0.1) 25%,
              rgba(245, 158, 11, 0.1) 50%,
              rgba(16, 185, 129, 0.1) 75%,
              rgba(139, 92, 246, 0.1) 100%
            );
            position: relative;
          }
          
          .sanctuary-gradient::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('/aziza-sigil-branding.png');
            background-size: 300px 150px;
            background-repeat: repeat;
            opacity: 0.03;
            pointer-events: none;
          }
          
          /* Crisis Alert Styles */
          .crisis-alert {
            background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
            border: 2px solid #F87171;
            animation: crisis-pulse 2s ease-in-out infinite;
          }
          
          @keyframes crisis-pulse {
            0%, 100% { border-color: #F87171; }
            50% { border-color: #EF4444; }
          }
          
          /* Spiritual Border */
          .spiritual-border {
            border: 2px solid transparent;
            background: linear-gradient(white, white) padding-box,
                        linear-gradient(45deg, #8B5CF6, #EC4899, #F59E0B) border-box;
            position: relative;
          }
          
          .spiritual-border::after {
            content: '';
            position: absolute;
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            background: url('/aziza-sigil-branding.png');
            background-size: contain;
            background-repeat: no-repeat;
            opacity: 0.1;
            pointer-events: none;
          }
          
          /* Comfort Item Animation */
          .comfort-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .comfort-item:hover {
            transform: translateY(-4px) scale(1.02);
          }
          
          /* Encrypted Badge */
          .encrypted-badge {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            animation: encrypted-pulse 3s ease-in-out infinite;
          }
          
          @keyframes encrypted-pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          /* Anonymous Mode Badge */
          .anonymous-mode {
            background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
            color: white;
          }
          
          /* Safe Space Indicator */
          .safe-space-indicator {
            background: linear-gradient(135deg, #EC4899 0%, #BE185D 100%);
            color: white;
          }
          
          /* Ticker Animation */
          .ticker-scroll {
            animation: ticker-scroll 30s linear infinite;
          }
          
          @keyframes ticker-scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          
          /* Copyright Footer with Aziza Branding */
          .copyright-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(139, 92, 246, 0.2) 100%);
            color: white;
            text-align: center;
            padding: 8px 20px;
            font-size: 11px;
            z-index: 999;
            backdrop-filter: blur(15px);
            border-top: 1px solid rgba(139, 92, 246, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }
          
          .copyright-footer::before {
            content: '';
            width: 30px;
            height: 30px;
            background: url('/aziza-sigil-branding.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: left center;
            opacity: 0.7;
            flex-shrink: 0;
          }
          
          .copyright-footer::after {
            content: '';
            width: 30px;
            height: 30px;
            background: url('/aziza-sigil-branding.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: right center;
            opacity: 0.7;
            flex-shrink: 0;
          }
          
          .copyright-text {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          
          .copyright-main {
            font-weight: 600;
            color: #F59E0B;
            text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
          }
          
          .copyright-sub {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.8);
            font-style: italic;
          }
          
          /* Mobile Optimizations */
          @media (max-width: 768px) {
            .liberation-card {
              backdrop-filter: blur(8px);
            }
            
            .mystical-glow::before {
              animation-duration: 6s;
            }
            
            .floating-nav {
              right: 10px;
              gap: 8px;
            }
            
            .floating-nav-button {
              width: 45px;
              height: 45px;
            }
            
            .copyright-footer {
              padding: 6px 15px;
              font-size: 10px;
              flex-direction: column;
              gap: 5px;
            }
            
            .copyright-footer::before,
            .copyright-footer::after {
              width: 20px;
              height: 20px;
            }
            
            .aziza-sigil-background {
              background-size: 300px 150px;
            }
          }
          
          /* Reduced Motion */
          @media (prefers-reduced-motion: reduce) {
            .floating,
            .spiritual-pulse,
            .sacred-breathe,
            .ancestral-glow,
            .mystical-glow::before,
            .emergency-pulse,
            .crisis-pulse,
            .encrypted-pulse,
            .ticker-scroll,
            .carousel-slide {
              animation: none;
            }
          }
          
          /* High Contrast Mode */
          @media (prefers-contrast: high) {
            .liberation-card {
              border: 2px solid #000;
              background: #fff;
            }
            
            .afro-futuristic-text {
              -webkit-text-fill-color: #000;
              text-shadow: none;
            }
            
            .aziza-sigil-background {
              opacity: 0.1;
            }
          }
          
          /* Print Styles */
          @media print {
            .floating-nav,
            .copyright-footer,
            .aziza-sigil-background {
              display: none;
            }
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative">
        {/* Aziza Sigil Background */}
        <div className="aziza-sigil-background"></div>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <EmergencyProvider>
            <SoulVaultProvider>
              {children}
              <Toaster />

              {/* Enhanced Copyright Footer with Aziza Branding */}
              <div className="copyright-footer">
                <div className="copyright-text">
                  <div className="copyright-main">
                    © 2024 ThriveBMore Liberation Stack | Aziza Okoro, Spiritual Practitioner
                  </div>
                  <div className="copyright-sub">
                    Underground Railroad of Trans Liberation | Built with love for the Black Trans community |
                    www.thrivebmore.org | (205) 390-7506
                  </div>
                </div>
              </div>
            </SoulVaultProvider>
          </EmergencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
