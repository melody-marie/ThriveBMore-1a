"use client"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  intent?: string
  crisisLevel?: number
  supportProvided?: string[]
}

export interface IntentClassification {
  primary: string
  confidence: number
  categories: string[]
  crisisLevel: number
  supportNeeded: string[]
  culturalContext?: string[]
  traumaIndicators?: string[]
}

export interface BotMessage {
  id: string
  content: string
  type: "user" | "bot"
  timestamp: Date
  metadata?: {
    intent?: string
    confidence?: number
    resources?: Resource[]
    crisis_level?: number
    cultural_context?: string[]
    follow_up_actions?: string[]
  }
}

export interface Resource {
  id: string
  name: string
  description: string
  type: "crisis" | "healthcare" | "legal" | "housing" | "community" | "education"
  contact_info: {
    phone?: string
    email?: string
    website?: string
    address?: string
  }
  availability: string
  lgbtq_friendly: boolean
  trans_specific: boolean
  cultural_competency: string[]
  cost: "free" | "sliding_scale" | "insurance" | "paid"
  languages: string[]
}

export interface ConversationContext {
  userId?: string
  sessionId: string
  messageHistory: Message[]
  identityAffirmations: string[]
  crisisLevel: number
  lastInteraction: Date
  preferredPronouns?: string
  culturalBackground?: string[]
  currentMood?: string
  supportNeeds?: string[]
  conversation_history: BotMessage[]
  user_profile?: {
    pronouns?: string
    identity?: string[]
    location?: string
    crisis_history?: boolean
    preferred_language?: string
  }
  active_resources: Resource[]
}

export interface BotPersonality {
  empathy: number // 1-10
  professionalism: number // 1-10
  creativity: number // 1-10
  wit: number // 1-10
  culturalCompetency: number // 1-10
  traumaInformed: number // 1-10
}

// Crisis keywords and phrases with cultural context
const CRISIS_INDICATORS = {
  immediate: [
    "suicide",
    "kill myself",
    "end it all",
    "not worth living",
    "better off dead",
    "hurt myself",
    "self harm",
    "cutting",
    "overdose",
    "pills",
    "can't go on",
    "no point",
    "hopeless",
    "worthless",
  ],
  high: [
    "depressed",
    "depression",
    "anxiety",
    "panic",
    "scared",
    "afraid",
    "alone",
    "isolated",
    "rejected",
    "kicked out",
    "homeless",
    "family disowned",
    "lost job",
    "discrimination",
    "harassment",
  ],
  medium: [
    "struggling",
    "difficult",
    "hard time",
    "stressed",
    "overwhelmed",
    "confused",
    "questioning",
    "unsure",
    "worried",
    "concerned",
  ],
}

// LGBTQ+ and cultural context keywords
const CULTURAL_CONTEXTS = {
  transgender: ["trans", "transgender", "transition", "hrt", "hormones", "surgery", "dysphoria", "deadname"],
  black_lgbtq: ["black", "african american", "poc", "racism", "intersectional", "church", "family rejection"],
  youth: ["teen", "teenager", "young", "school", "parents", "family", "coming out"],
  religious: ["church", "faith", "religion", "christian", "muslim", "jewish", "spiritual", "god"],
  family: ["family", "parents", "mom", "dad", "siblings", "relatives", "home", "kicked out"],
  workplace: ["work", "job", "employer", "coworkers", "discrimination", "harassment", "fired"],
}

// Intent classification patterns
const INTENT_PATTERNS = {
  crisis_support: ["help", "crisis", "emergency", "suicide", "hurt", "scared", "alone", "hopeless"],
  resource_request: ["find", "need", "looking for", "where can i", "how do i", "resources", "services"],
  identity_support: ["am i", "questioning", "confused", "identity", "gay", "lesbian", "trans", "bisexual", "queer"],
  coming_out: ["coming out", "tell", "family", "parents", "friends", "how to come out"],
  healthcare: ["doctor", "healthcare", "medical", "hrt", "hormones", "therapy", "counseling"],
  legal: ["legal", "lawyer", "name change", "discrimination", "rights", "law"],
  housing: ["housing", "homeless", "shelter", "place to stay", "kicked out", "safe place"],
  community: ["community", "friends", "support group", "meet people", "events", "social"],
  education: ["school", "college", "university", "education", "learning", "training"],
  general_support: ["talk", "listen", "support", "advice", "guidance", "encouragement"],
}

// Sample resources database
const RESOURCES_DATABASE: Resource[] = [
  {
    id: "trans-lifeline",
    name: "Trans Lifeline",
    description: "24/7 crisis support hotline run by and for transgender people",
    type: "crisis",
    contact_info: {
      phone: "877-565-8860",
      website: "https://translifeline.org",
    },
    availability: "24/7",
    lgbtq_friendly: true,
    trans_specific: true,
    cultural_competency: ["transgender", "lgbtq"],
    cost: "free",
    languages: ["English", "Spanish"],
  },
  {
    id: "lgbt-national-hotline",
    name: "LGBT National Hotline",
    description: "Confidential support for LGBTQ+ individuals and families",
    type: "crisis",
    contact_info: {
      phone: "1-888-843-4564",
      website: "https://lgbthotline.org",
    },
    availability: "24/7",
    lgbtq_friendly: true,
    trans_specific: false,
    cultural_competency: ["lgbtq", "family_support"],
    cost: "free",
    languages: ["English"],
  },
  {
    id: "baltimore-pride-center",
    name: "Pride Center of Maryland",
    description: "Community center providing resources and support for LGBTQ+ individuals",
    type: "community",
    contact_info: {
      phone: "410-777-8145",
      email: "info@pridemd.org",
      website: "https://pridemd.org",
      address: "2530 N Charles St, Baltimore, MD 21218",
    },
    availability: "Mon-Fri 9AM-5PM",
    lgbtq_friendly: true,
    trans_specific: true,
    cultural_competency: ["lgbtq", "transgender", "youth", "seniors"],
    cost: "free",
    languages: ["English", "Spanish"],
  },
  {
    id: "chase-brexton",
    name: "Chase Brexton Health Care",
    description: "LGBTQ+ affirming healthcare including HRT and transition services",
    type: "healthcare",
    contact_info: {
      phone: "410-837-2050",
      website: "https://chasebrexton.org",
      address: "1001 Cathedral St, Baltimore, MD 21201",
    },
    availability: "Mon-Fri 8AM-5PM",
    lgbtq_friendly: true,
    trans_specific: true,
    cultural_competency: ["lgbtq", "transgender", "hiv_care"],
    cost: "sliding_scale",
    languages: ["English", "Spanish"],
  },
]

export class OmniBotSystem {
  private personality: BotPersonality = {
    empathy: 9,
    professionalism: 7,
    creativity: 8,
    wit: 6,
    culturalCompetency: 10,
    traumaInformed: 10,
  }

  private context: ConversationContext
  private resources: Resource[]

  constructor(sessionId: string, userId?: string) {
    this.context = {
      userId: userId,
      sessionId: sessionId,
      messageHistory: [],
      identityAffirmations: [],
      crisisLevel: 0,
      lastInteraction: new Date(),
      culturalBackground: [],
      conversation_history: [],
      active_resources: [],
    }
    this.resources = RESOURCES_DATABASE
  }

  async processMessage(userMessage: string): Promise<Message> {
    // Add user message to history
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      content: userMessage,
      role: "user",
      timestamp: new Date(),
    }
    this.context.messageHistory.push(userMsg)

    // Analyze message
    const analysis = this.analyzeMessage(userMessage)

    // Update context
    this.context.crisisLevel = Math.max(this.context.crisisLevel, analysis.crisisLevel)
    this.context.culturalBackground = [...new Set([...this.context.culturalBackground, ...analysis.culturalContext])]

    // Generate response
    const botResponse = await this.generateResponse(userMessage, analysis)

    // Add bot response to history
    this.context.messageHistory.push(botResponse)

    return botResponse
  }

  private analyzeMessage(message: string): {
    primaryIntent: string
    confidence: number
    crisisLevel: number
    culturalContext: string[]
    keywords: string[]
  } {
    const lowerMessage = message.toLowerCase()

    // Crisis level detection
    let crisisLevel = 0
    if (CRISIS_INDICATORS.immediate.some((keyword) => lowerMessage.includes(keyword))) {
      crisisLevel = 10
    } else if (CRISIS_INDICATORS.high.some((keyword) => lowerMessage.includes(keyword))) {
      crisisLevel = 7
    } else if (CRISIS_INDICATORS.medium.some((keyword) => lowerMessage.includes(keyword))) {
      crisisLevel = 4
    }

    // Cultural context detection
    const culturalContext: string[] = []
    Object.entries(CULTURAL_CONTEXTS).forEach(([context, keywords]) => {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        culturalContext.push(context)
      }
    })

    // Intent classification
    let bestIntent = "general_support"
    let bestScore = 0

    Object.entries(INTENT_PATTERNS).forEach(([intent, patterns]) => {
      const score = patterns.reduce((acc, pattern) => {
        return acc + (lowerMessage.includes(pattern) ? 1 : 0)
      }, 0)

      if (score > bestScore) {
        bestScore = score
        bestIntent = intent
      }
    })

    return {
      primaryIntent: bestIntent,
      confidence: Math.min(bestScore / 3, 1),
      crisisLevel,
      culturalContext,
      keywords: lowerMessage.split(" "),
    }
  }

  private async generateResponse(message: string, analysis: any): Promise<Message> {
    let response = ""
    let supportProvided: string[] = []

    // Handle crisis situations first
    if (analysis.crisisLevel >= 8) {
      response = this.generateCrisisResponse(analysis.culturalContext)
      supportProvided = ["immediate_crisis_support", "safety_planning", "professional_help"]
    } else if (analysis.crisisLevel >= 5) {
      response = this.generateSupportResponse(analysis.culturalContext)
      supportProvided = ["crisis_resources", "community_support", "self_care"]
    } else {
      // Handle based on intent
      switch (analysis.primaryIntent) {
        case "resource_request":
          response = this.generateResourceResponse(analysis.culturalContext)
          supportProvided = ["resource_recommendation"]
          break
        case "identity_support":
          response = this.generateIdentityResponse(analysis.culturalContext)
          supportProvided = ["identity_affirmation"]
          break
        case "coming_out":
          response = this.generateComingOutResponse(analysis.culturalContext)
          supportProvided = ["coming_out_support"]
          break
        case "healthcare":
          response = this.generateHealthcareResponse(analysis.culturalContext)
          supportProvided = ["healthcare_resources"]
          break
        case "legal":
          response = this.generateLegalResponse(analysis.culturalContext)
          supportProvided = ["legal_resources"]
          break
        case "housing":
          response = this.generateHousingResponse(analysis.culturalContext)
          supportProvided = ["housing_resources"]
          break
        case "community":
          response = this.generateCommunityResponse(analysis.culturalContext)
          supportProvided = ["community_connections"]
          break
        default:
          response = this.generateGeneralResponse(analysis.culturalContext)
          break
      }
    }

    return {
      id: `bot_${Date.now()}`,
      content: response,
      role: "assistant",
      timestamp: new Date(),
      intent: analysis.primaryIntent,
      crisisLevel: analysis.crisisLevel,
      supportProvided,
    }
  }

  private generateCrisisResponse(culturalContext: string[]): string {
    const responses = [
      "I'm really concerned about you right now. Your life has value and you matter. Let's get you connected with immediate support.",
      "Thank you for reaching out - that takes courage. You don't have to go through this alone. There are people who want to help.",
      "I hear that you're in a lot of pain right now. Crisis support is available 24/7, and I want to make sure you're safe.",
    ]

    let response = responses[Math.floor(Math.random() * responses.length)]

    if (culturalContext.includes("transgender")) {
      response +=
        " The Trans Lifeline (877-565-8860) is staffed by trans people who understand what you're going through."
    }

    if (culturalContext.includes("black_lgbtq")) {
      response += " I understand that being Black and LGBTQ+ can bring unique challenges and intersectional stress."
    }

    response += "\n\n🚨 **IMMEDIATE CRISIS RESOURCES:**\n"
    response += "• Trans Lifeline: 877-565-8860\n"
    response += "• LGBT National Hotline: 1-888-843-4564\n"
    response += "• National Suicide Prevention Lifeline: 988\n"
    response += "• Crisis Text Line: Text HOME to 741741"

    return response
  }

  private generateSupportResponse(culturalContext: string[]): string {
    const responses = [
      "I can hear that you're going through a difficult time. It's okay to not be okay, and reaching out shows strength.",
      "Thank you for sharing what you're experiencing. You deserve support and care during this challenging time.",
      "I want you to know that your feelings are valid, and there are people and resources that can help.",
    ]

    let response = responses[Math.floor(Math.random() * responses.length)]

    if (culturalContext.includes("family")) {
      response +=
        " Family rejection is incredibly painful, especially in our community. You are worthy of love and acceptance."
    }

    if (culturalContext.includes("youth")) {
      response +=
        " Being young and LGBTQ+ can feel isolating, but there are supportive communities and resources specifically for LGBTQ+ youth."
    }

    return response
  }

  private generateIdentityResponse(culturalContext: string[]): string {
    const responses = [
      "Questioning your identity is a normal and brave part of self-discovery. There's no rush to label yourself - take your time.",
      "Your identity is yours to define, and it's okay if it evolves over time. The LGBTQ+ community is here to support you.",
      "Exploring your identity can bring up many feelings. Remember that you're not alone in this journey.",
    ]

    let response = responses[Math.floor(Math.random() * responses.length)]

    if (culturalContext.includes("transgender")) {
      response +=
        " If you're questioning your gender identity, know that trans experiences are diverse and valid. Consider connecting with other trans people who can share their experiences."
    }

    if (culturalContext.includes("religious")) {
      response +=
        " Reconciling faith and LGBTQ+ identity can be challenging. There are affirming religious communities and resources that can help."
    }

    return response
  }

  private generateComingOutResponse(culturalContext: string[]): string {
    let response =
      "Coming out is a personal journey that happens at your own pace. You get to decide when, how, and to whom you come out. Your safety and well-being come first."

    if (culturalContext.includes("family")) {
      response +=
        "\n\nComing out to family can be especially challenging. Consider having a support system in place and resources ready to share."
    }

    if (culturalContext.includes("black_lgbtq")) {
      response +=
        "\n\nI understand that coming out in Black families and communities can involve unique cultural considerations and potential challenges."
    }

    response += "\n\n💡 **Coming Out Tips:**\n"
    response += "• Start with someone you trust\n"
    response += "• Have resources ready to share\n"
    response += "• Plan for different reactions\n"
    response += "• Remember: their reaction is about them, not you"

    return response
  }

  private generateHealthcareResponse(culturalContext: string[]): string {
    let response =
      "Finding LGBTQ+-affirming healthcare is crucial for your well-being. You deserve respectful, knowledgeable care from providers who understand LGBTQ+ health needs."

    if (culturalContext.includes("transgender")) {
      response +=
        "\n\nFor transgender healthcare including HRT and transition-related care, look for providers with specific experience in transgender medicine."
    }

    response += "\n\n🏥 **Healthcare Tips:**\n"
    response += "• Research LGBTQ+-friendly providers\n"
    response += "• Ask about their experience with LGBTQ+ patients\n"
    response += "• Bring a support person if helpful\n"
    response += "• Know your rights as a patient"

    return response
  }

  private generateLegalResponse(culturalContext: string[]): string {
    let response =
      "Legal issues affecting LGBTQ+ people can be complex. It's important to work with attorneys who understand LGBTQ+ legal needs and anti-discrimination laws."

    if (culturalContext.includes("transgender")) {
      response +=
        "\n\nFor transgender legal needs like name changes and gender marker updates, look for attorneys with specific experience in transgender law."
    }

    response += "\n\n⚖️ **Legal Resources:**\n"
    response += "• Name and gender marker changes\n"
    response += "• Discrimination and harassment\n"
    response += "• Family law and adoption\n"
    response += "• Employment rights"

    return response
  }

  private generateHousingResponse(culturalContext: string[]): string {
    let response =
      "Safe, affirming housing is a basic need. If you're experiencing housing insecurity or discrimination, there are resources and legal protections available."

    if (culturalContext.includes("youth")) {
      response +=
        "\n\nLGBTQ+ youth experiencing family rejection or homelessness have specific resources and shelters designed to provide safe, affirming care."
    }

    response += "\n\n🏠 **Housing Support:**\n"
    response += "• LGBTQ+-affirming shelters\n"
    response += "• Housing discrimination resources\n"
    response += "• Emergency housing assistance\n"
    response += "• Transitional housing programs"

    return response
  }

  private generateCommunityResponse(culturalContext: string[]): string {
    let response =
      "Building community connections is so important for LGBTQ+ well-being. Baltimore has a vibrant LGBTQ+ community with many ways to get involved and find your people."

    if (culturalContext.includes("black_lgbtq")) {
      response +=
        "\n\nThere are specific groups and events for Black LGBTQ+ individuals that celebrate the intersection of racial and LGBTQ+ identity."
    }

    response += "\n\n🌈 **Community Connections:**\n"
    response += "• Pride Center of Maryland events\n"
    response += "• LGBTQ+ support groups\n"
    response += "• Social and recreational activities\n"
    response += "• Volunteer opportunities"

    return response
  }

  private generateGeneralResponse(culturalContext: string[]): string {
    const responses = [
      "I'm here to listen and support you. What's on your mind today?",
      "Thank you for reaching out. How can I help you today?",
      "I'm glad you're here. What would you like to talk about or learn more about?",
    ]

    let response = responses[Math.floor(Math.random() * responses.length)]

    response += "\n\n💖 **I can help with:**\n"
    response += "• Crisis support and resources\n"
    response += "• LGBTQ+ identity questions\n"
    response += "• Coming out support\n"
    response += "• Healthcare and legal resources\n"
    response += "• Community connections\n"
    response += "• General support and encouragement"

    return response
  }

  getConversationHistory(): Message[] {
    return this.context.messageHistory
  }

  getCurrentCrisisLevel(): number {
    return this.context.crisisLevel
  }

  getCulturalContext(): string[] {
    return this.context.culturalBackground || []
  }

  getActiveResources(): Resource[] {
    return this.context.active_resources
  }
}

export const omniBotSystem = new OmniBotSystem("session123")
