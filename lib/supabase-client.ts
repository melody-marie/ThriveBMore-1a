import { createClient } from "@supabase/supabase-js"

// Fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions for our database tables
export interface MellysSpotPost {
  id: string
  content: string
  post_type: "user" | "bot" | "oracle" | "care_check"
  bot_name?: string
  user_id?: string
  created_at: string
  metadata: Record<string, any>
}

export interface UserMood {
  id?: string
  user_id: string
  mood: string
  energy_level: number
  needs_support: boolean
  created_at: string
}

export interface User {
  id: string
  email: string
  username?: string
  created_at: string
  last_seen?: string
}
