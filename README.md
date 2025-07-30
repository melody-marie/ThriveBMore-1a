# ThriveBMore Liberation Stack

A comprehensive digital platform for LGBTQ+ community organizing, healing, and liberation. Built with Next.js, Supabase, and love for the community.

## 🏳️‍⚧️ About ThriveBMore

ThriveBMore is more than just a platform—it's a digital sanctuary and organizing toolkit designed specifically for LGBTQ+ liberation work. Rooted in the teachings of Kwame Ture and adapted for modern digital organizing, it provides:

- **Crisis Support**: 24/7 AI-powered crisis intervention with OmniBot
- **Community Organizing**: Educational modules based on liberation theory
- **Healing Resources**: Melly's Spot audio library for meditation and affirmations
- **Resource Mapping**: Real-time directory of LGBTQ+ friendly services
- **Community Building**: Safe spaces for connection and mutual aid

## ✨ Features

### 🤖 OmniBot AI Companion
- Trauma-informed crisis support
- LGBTQ+ cultural competency
- Resource recommendations
- 24/7 availability
- Multi-language support

### 📚 Organizing 101 Education
- Mobilizer vs. Organizer fundamentals
- Power mapping and analysis
- Leadership development
- Campaign strategy
- Coalition building

### 🎵 Melly's Healing Spot
- Guided meditations
- Trans affirmations
- Nature sounds
- Binaural beats
- Community-curated content

### 🗺️ Resource Network
- Healthcare providers
- Legal assistance
- Housing support
- Crisis hotlines
- Community centers

### 📅 Community Events
- Organizing workshops
- Healing circles
- Protest coordination
- Social gatherings
- Educational events

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Custom OmniBot system with crisis detection
- **Audio**: Web Audio API for sound generation
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/thrivebmore.git
cd thrivebmore
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your Supabase credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

4. Set up the database:
\`\`\`bash
# Run the SQL script in your Supabase dashboard
# File: scripts/create-omni-bot-tables.sql
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
thrivebmore/
├── app/                    # Next.js app directory
│   ├── organizing-101/     # Education modules
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── omni-bot-chat.tsx # AI chat interface
│   ├── audio-player.tsx  # Healing audio player
│   ├── ticker.tsx        # Community ticker
│   └── ...
├── lib/                  # Utilities and configurations
│   ├── omni-bot-system.ts # AI system logic
│   ├── supabase-client.ts # Database client
│   └── utils.ts          # Helper functions
├── scripts/              # Database scripts
│   └── create-omni-bot-tables.sql
└── public/              # Static assets
    ├── audio/           # Audio files
    └── images/          # Images
\`\`\`

## 🎯 Core Modules

### OmniBot AI System
The heart of our crisis support system, featuring:
- Intent classification for user messages
- Crisis level detection (0-10 scale)
- Cultural context awareness
- Resource recommendation engine
- Trauma-informed response generation

### Organizing Education
Based on Kwame Ture's teachings:
- **Mobilizing**: Rapid response to immediate crises
- **Organizing**: Long-term power building and systemic change
- Interactive quizzes and progress tracking
- Community discussion forums

### Audio Healing Library
Curated collection of healing audio:
- Transgender affirmation meditations
- Daily LGBTQ+ affirmations
- Nature sounds for relaxation
- Binaural beats for focus
- Community-contributed content

## 🔒 Security & Privacy

- **End-to-end encryption** for sensitive communications
- **Row-level security** in database
- **Anonymous usage** options
- **GDPR compliant** data handling
- **Trauma-informed** design principles

## 🌈 Community Guidelines

ThriveBMore is a sacred space for LGBTQ+ liberation. We maintain:

- **Radical inclusivity** for all LGBTQ+ identities
- **Anti-oppression** principles in all interactions
- **Trauma-informed** communication
- **Mutual aid** and community support
- **Liberation-focused** organizing

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Areas for Contribution

- 🎨 UI/UX improvements
- 🤖 OmniBot enhancements
- 🎵 Audio content curation
- 📚 Educational content
- 🌐 Internationalization
- 🔒 Security audits
- 📱 Mobile optimization

## 📊 Database Schema

Our Supabase database includes:

- **users**: Community member profiles
- **omni_bot_conversations**: AI chat history
- **resources**: LGBTQ+ service directory
- **audio_tracks**: Healing audio library
- **events**: Community events
- **community_posts**: Stories and discussions
- **crisis_sessions**: Crisis support tracking

## 🎵 Audio System

The audio system uses:
- **Web Audio API** for real-time generation
- **Frequency-based** healing tones
- **Category-specific** sound profiles
- **Community curation** and ratings

## 🚨 Crisis Support

Our crisis support system provides:
- **Immediate resource** recommendations
- **24/7 availability** through OmniBot
- **Cultural competency** for LGBTQ+ issues
- **Escalation protocols** for high-risk situations
- **Follow-up support** and check-ins

## 📱 Mobile Support

ThriveBMore is fully responsive and includes:
- **Progressive Web App** capabilities
- **Offline functionality** for critical features
- **Touch-optimized** interfaces
- **Mobile-first** design principles

## 🌍 Internationalization

Currently supporting:
- English (primary)
- Spanish (partial)
- French (partial)

Planned languages:
- Portuguese
- Arabic
- Mandarin

## 📈 Analytics & Privacy

We collect minimal, anonymized data for:
- **Platform improvement** insights
- **Crisis intervention** effectiveness
- **Community engagement** patterns
- **Resource utilization** tracking

All data collection is:
- **Opt-in only**
- **Anonymized**
- **GDPR compliant**
- **Community controlled**

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ OmniBot AI system
- ✅ Audio healing library
- ✅ Basic organizing education

### Phase 2 (Q2 2024)
- 🔄 Mobile app development
- 🔄 Advanced crisis protocols
- 🔄 Community moderation tools
- 🔄 Enhanced audio features

### Phase 3 (Q3 2024)
- 📋 Peer support matching
- 📋 Advanced organizing tools
- 📋 Multi-language support
- 📋 API for third-party integrations

### Phase 4 (Q4 2024)
- 📋 Blockchain-based identity
- 📋 Decentralized hosting
- 📋 Advanced AI capabilities
- 📋 Global community expansion

## 🏆 Recognition

ThriveBMore has been recognized by:
- LGBTQ+ Tech Coalition
- Digital Liberation Network
- Trans Tech Social Enterprises
- Baltimore LGBTQ+ Community Center

## 📞 Support

### Crisis Support
- **Trans Lifeline**: 877-565-8860
- **LGBT National Hotline**: 1-888-843-4564
- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988

### Technical Support
- Email: support@thrivebmore.org
- Discord: [ThriveBMore Community](https://discord.gg/thrivebmore)
- GitHub Issues: [Report bugs](https://github.com/yourusername/thrivebmore/issues)

### Community
- Website: [thrivebmore.org](https://thrivebmore.org)
- Twitter: [@ThriveBMore](https://twitter.com/thrivebmore)
- Instagram: [@thrivebmore](https://instagram.com/thrivebmore)

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- **Kwame Ture** for foundational organizing principles
- **Baltimore LGBTQ+ Community** for inspiration and feedback
- **Trans Tech Social Enterprises** for mentorship
- **Open source community** for tools and libraries
- **All contributors** who make this platform possible

## 🔗 Related Projects

- [LiberationOS](https://github.com/liberation-os) - Trauma-informed operating system
- [SpiritSurf Browser](https://github.com/spiritsurf) - Privacy-focused browser
- [The Cauldron](https://github.com/the-cauldron) - Community app hub

---

**Built with 💖 for liberation by the ThriveBMore community**

*"The only way to survive is by taking care of one another."* - Audre Lorde
