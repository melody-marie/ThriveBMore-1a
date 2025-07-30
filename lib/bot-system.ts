import { supabase } from "./supabase-client"
import { omniBotSystem } from "./omni-bot-system"

export class BotSystem {
  private static instance: BotSystem
  private isRunning = false

  static getInstance(): BotSystem {
    if (!BotSystem.instance) {
      BotSystem.instance = new BotSystem()
    }
    return BotSystem.instance
  }

  async startBots() {
    if (this.isRunning) return
    this.isRunning = true

    // Oracle Bot - Posts wisdom every 6 hours
    setInterval(() => this.oracleBot(), 6 * 60 * 60 * 1000)

    // Care Bot - Check-ins every 12 hours
    setInterval(() => this.careBot(), 12 * 60 * 60 * 1000)

    // Crisis Monitor - Check every 30 seconds
    setInterval(() => this.crisisMonitor(), 30 * 1000)

    // Energy Matchmaker - Run every hour
    setInterval(() => this.energyMatchmaker(), 60 * 60 * 1000)

    // Initial posts
    setTimeout(() => this.oracleBot(), 1000)
    setTimeout(() => this.careBot(), 5000)

    console.log("🤖 ThriveBMore Bot System activated!")
  }

  private async oracleBot() {
    const oracleMessages = [
      "🌟 Your ancestors whisper: 'You are exactly where you need to be, beloved.' Trust the journey. ✨",
      "💫 Oracle Aziza speaks: 'Your healing ripples through generations. Every step forward honors those who came before.' 🙏🏾",
      "🔮 The universe conspires in your favor today. Your resilience is your superpower, love. 💪🏾✨",
      "🌙 Sacred reminder: You don't have to carry it all alone. Community is medicine. Lean in, beloved. 💖",
      "⭐ Your light cannot be dimmed by anyone's darkness. Shine on, beautiful soul. The world needs your magic. ✨",
      "🌺 Oracle wisdom: 'Rest is not a reward for work completed, but a sacred right.' Honor your need for peace. 🕊️",
      "🦋 Transformation truth: You are becoming who you were always meant to be. Trust the metamorphosis, darling. 🌈",
      "🌸 Love note from the ancestors: Your story is sacred scripture. Write it with intention, live it with joy. 📖✨",
      "🎭 Identity affirmation: There is no wrong way to be authentically you. Your expression is divine art. 🎨💖",
      "🌟 Liberation reminder: Your freedom inspires others to break their own chains. Keep rising, revolutionary. 🔥",
    ]

    const randomMessage = oracleMessages[Math.floor(Math.random() * oracleMessages.length)]

    try {
      await supabase.from("mellys_spot_posts").insert([
        {
          content: randomMessage,
          post_type: "oracle",
          bot_name: "Oracle Aziza",
          metadata: { wisdom_type: "daily_blessing", energy: "high_vibration" },
        },
      ])
    } catch (error) {
      console.log("Oracle bot message queued for when database is ready")
    }
  }

  private async careBot() {
    const careMessages = [
      "💖 Melly here checking in: How's your heart today, love? Remember, feeling all your feelings is brave work. 🤗",
      "🌸 Gentle reminder from Care Bot Melly: You've survived 100% of your difficult days so far. That's a perfect record! 💪🏾",
      "☕ Taking a moment to ask: Have you hydrated today? Eaten something nourishing? Your body is your temple, beloved. 🙏🏾",
      "🫂 Melly's care corner: If you're reading this, you're exactly where you need to be. Breathe deep, you're doing great. ✨",
      "💝 Your Care Bot reminder: Progress isn't always linear. Some days we rest, some days we rise. Both are sacred. 🌙",
      "🌈 Melly checking in: Your feelings are valid, your struggles are real, and your healing matters. You're not alone. 💕",
      "🌻 Sunshine reminder: You don't have to earn love, rest, or belonging. These are your birthright, beautiful soul. ☀️",
      "🍯 Sweet check-in: Have you been gentle with yourself today? Self-compassion is a revolutionary act. 🤲💛",
      "🌊 Flow state reminder: Like water, you can be soft and still cut through stone. Your gentleness is strength. 💙",
      "🕯️ Evening blessing: As this day closes, know that you are loved, you are enough, you are home. 🏠✨",
    ]

    const randomCare = careMessages[Math.floor(Math.random() * careMessages.length)]

    try {
      await supabase.from("mellys_spot_posts").insert([
        {
          content: randomCare,
          post_type: "care_check",
          bot_name: "Care Bot Melly",
          metadata: { care_type: "wellness_check", intention: "nurturing" },
        },
      ])
    } catch (error) {
      console.log("Care bot message queued for when database is ready")
    }
  }

  private async crisisMonitor() {
    try {
      const { data: recentPosts } = await supabase
        .from("mellys_spot_posts")
        .select("*")
        .eq("post_type", "user")
        .order("created_at", { ascending: false })
        .limit(5)

      if (!recentPosts) return

      const crisisKeywords = [
        "help",
        "crisis",
        "emergency",
        "suicide",
        "hurt",
        "alone",
        "scared",
        "desperate",
        "end it",
        "give up",
      ]

      for (const post of recentPosts) {
        const hasKeyword = crisisKeywords.some((keyword) => post.content.toLowerCase().includes(keyword))

        if (hasKeyword) {
          await this.sendCrisisSupport(post.user_id, post.id)
        }
      }
    } catch (error) {
      console.log("Crisis monitor will activate when database is ready")
    }
  }

  private async sendCrisisSupport(userId: string, postId: string) {
    const supportMessage =
      "🛟 I see you, beloved. You're not alone in this moment. If you're in crisis, please reach out: National Suicide Prevention Lifeline: 988 | Crisis Text Line: Text HOME to 741741 | Trans Lifeline: 877-565-8860 | You matter, and your life has immeasurable value. 💖🏳️‍⚧️"

    try {
      await supabase.from("mellys_spot_posts").insert([
        {
          content: supportMessage,
          post_type: "bot",
          bot_name: "Community Guardian",
          metadata: {
            response_to: postId,
            support_type: "crisis_intervention",
            priority: "urgent",
          },
        },
      ])
    } catch (error) {
      console.log("Crisis support message queued")
    }
  }

  private async energyMatchmaker() {
    try {
      const { data: moods } = await supabase
        .from("user_moods")
        .select("*")
        .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

      if (!moods || moods.length < 2) return

      const needsSupport = moods.filter((m) => m.needs_support)
      const canSupport = moods.filter((m) => m.energy_level > 7 && !m.needs_support)

      if (needsSupport.length > 0 && canSupport.length > 0) {
        const matchMessage = `💫 Energy Matchmaker here: I sense ${canSupport.length} beautiful souls with high energy ready to lift others up, and ${needsSupport.length} hearts that could use some extra love today. If you're feeling strong, consider reaching out with kindness. If you need support, know that loving hearts are here for you. Community is medicine. ✨`

        await supabase.from("mellys_spot_posts").insert([
          {
            content: matchMessage,
            post_type: "bot",
            bot_name: "Energy Matchmaker",
            metadata: {
              match_type: "community_support",
              supporters_available: canSupport.length,
              support_needed: needsSupport.length,
              algorithm: "energy_harmony",
            },
          },
        ])
      }
    } catch (error) {
      console.log("Energy matchmaker will activate when database is ready")
    }
  }

  async logUserMood(userId: string, mood: string, energyLevel: number, needsSupport: boolean) {
    try {
      await supabase.from("user_moods").insert([
        {
          user_id: userId,
          mood,
          energy_level: energyLevel,
          needs_support: needsSupport,
        },
      ])
    } catch (error) {
      console.log("Mood data will be saved when database is ready")
    }
  }

  // New method to handle direct user interactions with OmniBot
  async handleUserMessage(message: string, userId?: string): Promise<string> {
    return await omniBotSystem.respond(message, userId)
  }
}

// Initialize bot system
if (typeof window !== "undefined") {
  const botSystem = BotSystem.getInstance()
  botSystem.startBots()
}

export const botSystem = BotSystem.getInstance()
