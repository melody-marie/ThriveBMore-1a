import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Server-side Supabase client (for use in API routes and server components)
export const createServerSupabaseClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Database types (generated from Supabase)
export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string
          user_id: string
          session_id: string
          created_at: string
          updated_at: string
          metadata: Record<string, any>
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          created_at?: string
          updated_at?: string
          metadata?: Record<string, any>
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string
          created_at?: string
          updated_at?: string
          metadata?: Record<string, any>
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          content: string
          role: "user" | "assistant"
          timestamp: string
          intent_classification: Record<string, any> | null
          crisis_level: number
          support_provided: string[] | null
          metadata: Record<string, any>
        }
        Insert: {
          id?: string
          conversation_id: string
          content: string
          role: "user" | "assistant"
          timestamp?: string
          intent_classification?: Record<string, any> | null
          crisis_level?: number
          support_provided?: string[] | null
          metadata?: Record<string, any>
        }
        Update: {
          id?: string
          conversation_id?: string
          content?: string
          role?: "user" | "assistant"
          timestamp?: string
          intent_classification?: Record<string, any> | null
          crisis_level?: number
          support_provided?: string[] | null
          metadata?: Record<string, any>
        }
      }
      bot_personalities: {
        Row: {
          id: string
          user_id: string
          empathy: number
          professionalism: number
          creativity: number
          wit: number
          cultural_competency: number
          trauma_informed: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          empathy?: number
          professionalism?: number
          creativity?: number
          wit?: number
          cultural_competency?: number
          trauma_informed?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          empathy?: number
          professionalism?: number
          creativity?: number
          wit?: number
          cultural_competency?: number
          trauma_informed?: number
          created_at?: string
          updated_at?: string
        }
      }
      conversation_contexts: {
        Row: {
          id: string
          conversation_id: string
          current_mood: string | null
          identity_affirmations: string[] | null
          crisis_level: number
          preferred_pronouns: string | null
          cultural_background: string[] | null
          support_needs: string[] | null
          trauma_indicators: string[] | null
          last_interaction: string
          metadata: Record<string, any>
        }
        Insert: {
          id?: string
          conversation_id: string
          current_mood?: string | null
          identity_affirmations?: string[] | null
          crisis_level?: number
          preferred_pronouns?: string | null
          cultural_background?: string[] | null
          support_needs?: string[] | null
          trauma_indicators?: string[] | null
          last_interaction?: string
          metadata?: Record<string, any>
        }
        Update: {
          id?: string
          conversation_id?: string
          current_mood?: string | null
          identity_affirmations?: string[] | null
          crisis_level?: number
          preferred_pronouns?: string | null
          cultural_background?: string[] | null
          support_needs?: string[] | null
          trauma_indicators?: string[] | null
          last_interaction?: string
          metadata?: Record<string, any>
        }
      }
      community_resources: {
        Row: {
          id: string
          name: string
          description: string | null
          resource_type: string
          contact_info: Record<string, any> | null
          location: string | null
          is_lgbtq_friendly: boolean
          specializations: string[] | null
          availability: string | null
          is_crisis_resource: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
          metadata: Record<string, any>
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          resource_type: string
          contact_info?: Record<string, any> | null
          location?: string | null
          is_lgbtq_friendly?: boolean
          specializations?: string[] | null
          availability?: string | null
          is_crisis_resource?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          metadata?: Record<string, any>
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          resource_type?: string
          contact_info?: Record<string, any> | null
          location?: string | null
          is_lgbtq_friendly?: boolean
          specializations?: string[] | null
          availability?: string | null
          is_crisis_resource?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          metadata?: Record<string, any>
        }
      }
      audio_tracks: {
        Row: {
          id: string
          title: string
          artist: string
          duration: number
          category: "meditation" | "affirmations" | "nature" | "binaural"
          description: string | null
          audio_url: string
          image_url: string | null
          tags: string[] | null
          likes: number
          is_featured: boolean
          created_at: string
          updated_at: string
          metadata: Record<string, any>
        }
        Insert: {
          id?: string
          title: string
          artist: string
          duration: number
          category: "meditation" | "affirmations" | "nature" | "binaural"
          description?: string | null
          audio_url: string
          image_url?: string | null
          tags?: string[] | null
          likes?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
          metadata?: Record<string, any>
        }
        Update: {
          id?: string
          title?: string
          artist?: string
          duration?: number
          category?: "meditation" | "affirmations" | "nature" | "binaural"
          description?: string | null
          audio_url?: string
          image_url?: string | null
          tags?: string[] | null
          likes?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
          metadata?: Record<string, any>
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_crisis_resources: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          contact_info: Record<string, any>
          specializations: string[]
          availability: string
          is_lgbtq_friendly: boolean
        }[]
      }
      update_bot_personality: {
        Args: {
          p_empathy?: number
          p_professionalism?: number
          p_creativity?: number
          p_wit?: number
          p_cultural_competency?: number
          p_trauma_informed?: number
        }
        Returns: void
      }
      log_crisis_intervention: {
        Args: {
          p_conversation_id: string
          p_crisis_level: number
          p_intervention_type: string
          p_resources_provided: string[]
          p_notes?: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper functions for common database operations
export const dbHelpers = {
  // Get or create conversation
  async getOrCreateConversation(userId: string, sessionId: string) {
    const { data: existing } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .eq("session_id", sessionId)
      .single()

    if (existing) {
      return existing
    }

    const { data: newConversation, error } = await supabase
      .from("conversations")
      .insert({
        user_id: userId,
        session_id: sessionId,
      })
      .select()
      .single()

    if (error) throw error
    return newConversation
  },

  // Save message
  async saveMessage(
    conversationId: string,
    content: string,
    role: "user" | "assistant",
    intentClassification?: Record<string, any>,
    crisisLevel?: number,
    supportProvided?: string[],
  ) {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        content,
        role,
        intent_classification: intentClassification,
        crisis_level: crisisLevel || 0,
        support_provided: supportProvided,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get conversation history
  async getConversationHistory(conversationId: string, limit = 50) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("timestamp", { ascending: true })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Update conversation context
  async updateConversationContext(
    conversationId: string,
    context: Partial<Database["public"]["Tables"]["conversation_contexts"]["Insert"]>,
  ) {
    const { data, error } = await supabase
      .from("conversation_contexts")
      .upsert({
        conversation_id: conversationId,
        ...context,
        last_interaction: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get crisis resources
  async getCrisisResources() {
    const { data, error } = await supabase.rpc("get_crisis_resources")
    if (error) throw error
    return data || []
  },

  // Log crisis intervention
  async logCrisisIntervention(
    conversationId: string,
    crisisLevel: number,
    interventionType: string,
    resourcesProvided: string[],
    notes?: string,
  ) {
    const { data, error } = await supabase.rpc("log_crisis_intervention", {
      p_conversation_id: conversationId,
      p_crisis_level: crisisLevel,
      p_intervention_type: interventionType,
      p_resources_provided: resourcesProvided,
      p_notes: notes,
    })

    if (error) throw error
    return data
  },

  // Get audio tracks
  async getAudioTracks(category?: string) {
    let query = supabase
      .from("audio_tracks")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("likes", { ascending: false })

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  // Update audio track interaction
  async recordAudioInteraction(trackId: string, interactionType: "like" | "play" | "download" | "share") {
    const { data, error } = await supabase.from("user_audio_interactions").insert({
      track_id: trackId,
      interaction_type: interactionType,
    })

    if (error) throw error
    return data
  },
}
