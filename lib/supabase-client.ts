import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  username?: string
  display_name?: string
  pronouns?: string
  identity_tags?: string[]
  location?: string
  bio?: string
  avatar_url?: string
  role: "member" | "organizer" | "admin" | "moderator"
  is_verified: boolean
  crisis_history: boolean
  preferred_language: string
  created_at: string
  updated_at: string
  last_active: string
}

export interface Resource {
  id: string
  name: string
  description: string
  type: "crisis" | "healthcare" | "legal" | "housing" | "community" | "education"
  contact_phone?: string
  contact_email?: string
  website_url?: string
  address?: string
  availability: string
  lgbtq_friendly: boolean
  trans_specific: boolean
  cultural_competency: string[]
  cost: string
  languages: string[]
  verified: boolean
  verified_by?: string
  verified_at?: string
  created_at: string
  updated_at: string
}

export interface AudioTrack {
  id: string
  title: string
  artist: string
  description?: string
  category: "meditation" | "affirmations" | "nature" | "binaural"
  duration: number
  audio_url: string
  image_url?: string
  tags: string[]
  transcript?: string
  likes_count: number
  play_count: number
  rating: number
  uploaded_by?: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  type: "workshop" | "protest" | "meeting" | "social" | "healing" | "education"
  organizer_id: string
  start_time: string
  end_time?: string
  location?: string
  virtual_link?: string
  max_attendees?: number
  is_public: boolean
  requires_approval: boolean
  tags: string[]
  image_url?: string
  created_at: string
  updated_at: string
}

export interface CommunityPost {
  id: string
  author_id: string
  title?: string
  content: string
  type: "story" | "resource" | "question" | "announcement"
  tags: string[]
  is_anonymous: boolean
  is_public: boolean
  likes_count: number
  comments_count: number
  created_at: string
  updated_at: string
}

export interface OmniBotConversation {
  id: string
  session_id: string
  user_id?: string
  user_message: string
  bot_response: string
  intent?: string
  confidence?: number
  crisis_level: number
  cultural_context: string[]
  resources_provided: string[]
  follow_up_actions: string[]
  feedback_rating?: number
  feedback_text?: string
  timestamp: string
}

// Helper functions for database operations
export const dbHelpers = {
  // User operations
  async createUser(userData: Partial<User>) {
    const { data, error } = await supabase.from("users").insert([userData]).select().single()

    if (error) throw error
    return data
  },

  async getUserById(id: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) throw error
    return data
  },

  async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  // Resource operations
  async getResources(filters?: { type?: string; lgbtq_friendly?: boolean; trans_specific?: boolean }) {
    let query = supabase.from("resources").select("*")

    if (filters?.type) {
      query = query.eq("type", filters.type)
    }
    if (filters?.lgbtq_friendly !== undefined) {
      query = query.eq("lgbtq_friendly", filters.lgbtq_friendly)
    }
    if (filters?.trans_specific !== undefined) {
      query = query.eq("trans_specific", filters.trans_specific)
    }

    const { data, error } = await query.order("name")

    if (error) throw error
    return data
  },

  async createResource(resourceData: Partial<Resource>) {
    const { data, error } = await supabase.from("resources").insert([resourceData]).select().single()

    if (error) throw error
    return data
  },

  // Audio track operations
  async getAudioTracks(filters?: { category?: string; is_public?: boolean }) {
    let query = supabase.from("audio_tracks").select("*")

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }
    if (filters?.is_public !== undefined) {
      query = query.eq("is_public", filters.is_public)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async getAudioTrackById(id: string) {
    const { data, error } = await supabase.from("audio_tracks").select("*").eq("id", id).single()

    if (error) throw error
    return data
  },

  async incrementPlayCount(trackId: string) {
    const { error } = await supabase.rpc("increment_play_count", { track_id: trackId })
    if (error) throw error
  },

  // Event operations
  async getEvents(filters?: { type?: string; is_public?: boolean; upcoming?: boolean }) {
    let query = supabase.from("events").select("*")

    if (filters?.type) {
      query = query.eq("type", filters.type)
    }
    if (filters?.is_public !== undefined) {
      query = query.eq("is_public", filters.is_public)
    }
    if (filters?.upcoming) {
      query = query.gte("start_time", new Date().toISOString())
    }

    const { data, error } = await query.order("start_time")

    if (error) throw error
    return data
  },

  async createEvent(eventData: Partial<Event>) {
    const { data, error } = await supabase.from("events").insert([eventData]).select().single()

    if (error) throw error
    return data
  },

  // Community post operations
  async getCommunityPosts(filters?: { type?: string; is_public?: boolean; author_id?: string }) {
    let query = supabase.from("community_posts").select("*")

    if (filters?.type) {
      query = query.eq("type", filters.type)
    }
    if (filters?.is_public !== undefined) {
      query = query.eq("is_public", filters.is_public)
    }
    if (filters?.author_id) {
      query = query.eq("author_id", filters.author_id)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async createCommunityPost(postData: Partial<CommunityPost>) {
    const { data, error } = await supabase.from("community_posts").insert([postData]).select().single()

    if (error) throw error
    return data
  },

  // OmniBot conversation operations
  async saveConversation(conversationData: Partial<OmniBotConversation>) {
    const { data, error } = await supabase.from("omni_bot_conversations").insert([conversationData]).select().single()

    if (error) throw error
    return data
  },

  async getConversationHistory(sessionId: string, userId?: string) {
    let query = supabase.from("omni_bot_conversations").select("*").eq("session_id", sessionId)

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data, error } = await query.order("timestamp")

    if (error) throw error
    return data
  },

  // Crisis session operations
  async createCrisisSession(sessionData: {
    user_id?: string
    session_id: string
    crisis_level: number
    cultural_context: string[]
    resources_provided: string[]
    notes?: string
  }) {
    const { data, error } = await supabase.from("crisis_sessions").insert([sessionData]).select().single()

    if (error) throw error
    return data
  },

  // Notification operations
  async createNotification(notificationData: {
    user_id: string
    title: string
    message: string
    type: "crisis" | "event" | "community" | "system" | "achievement"
    action_url?: string
    priority?: "low" | "normal" | "high" | "urgent"
  }) {
    const { data, error } = await supabase.from("notifications").insert([notificationData]).select().single()

    if (error) throw error
    return data
  },

  async getUserNotifications(userId: string, unreadOnly = false) {
    let query = supabase.from("notifications").select("*").eq("user_id", userId)

    if (unreadOnly) {
      query = query.eq("is_read", false)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async markNotificationAsRead(notificationId: string) {
    const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)

    if (error) throw error
  },
}

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to new community posts
  subscribeToCommunityPosts(callback: (payload: any) => void) {
    return supabase
      .channel("community_posts")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "community_posts" }, callback)
      .subscribe()
  },

  // Subscribe to user notifications
  subscribeToUserNotifications(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe()
  },

  // Subscribe to events
  subscribeToEvents(callback: (payload: any) => void) {
    return supabase
      .channel("events")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, callback)
      .subscribe()
  },
}

export default supabase
