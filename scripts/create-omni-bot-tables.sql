-- Create comprehensive database schema for ThriveBMore platform

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- Create custom types
CREATE TYPE crisis_level AS ENUM ('none', 'low', 'medium', 'high', 'critical');
CREATE TYPE resource_type AS ENUM ('crisis', 'healthcare', 'legal', 'housing', 'community', 'education');
CREATE TYPE user_role AS ENUM ('member', 'organizer', 'admin', 'moderator');
CREATE TYPE event_type AS ENUM ('workshop', 'protest', 'meeting', 'social', 'healing', 'education');

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    display_name TEXT,
    pronouns TEXT,
    identity_tags TEXT[],
    location TEXT,
    bio TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'member',
    is_verified BOOLEAN DEFAULT false,
    crisis_history BOOLEAN DEFAULT false,
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OmniBot conversations
CREATE TABLE IF NOT EXISTS omni_bot_conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_message TEXT NOT NULL,
    bot_response TEXT NOT NULL,
    intent TEXT,
    confidence DECIMAL(3,2),
    crisis_level INTEGER DEFAULT 0,
    cultural_context TEXT[],
    resources_provided TEXT[],
    follow_up_actions TEXT[],
    feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    feedback_text TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources database
CREATE TABLE IF NOT EXISTS resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    type resource_type NOT NULL,
    contact_phone TEXT,
    contact_email TEXT,
    website_url TEXT,
    address TEXT,
    availability TEXT,
    lgbtq_friendly BOOLEAN DEFAULT true,
    trans_specific BOOLEAN DEFAULT false,
    cultural_competency TEXT[],
    cost TEXT,
    languages TEXT[],
    verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community events
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type event_type NOT NULL,
    organizer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    location TEXT,
    virtual_link TEXT,
    max_attendees INTEGER,
    is_public BOOLEAN DEFAULT true,
    requires_approval BOOLEAN DEFAULT false,
    tags TEXT[],
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event attendees
CREATE TABLE IF NOT EXISTS event_attendees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'attending' CHECK (status IN ('attending', 'maybe', 'not_attending')),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Audio tracks for Melly's Spot
CREATE TABLE IF NOT EXISTS audio_tracks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('meditation', 'affirmations', 'nature', 'binaural')),
    duration INTEGER NOT NULL, -- in seconds
    audio_url TEXT NOT NULL,
    image_url TEXT,
    tags TEXT[],
    transcript TEXT,
    likes_count INTEGER DEFAULT 0,
    play_count INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    uploaded_by UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User audio interactions
CREATE TABLE IF NOT EXISTS user_audio_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    track_id UUID REFERENCES audio_tracks(id) ON DELETE CASCADE,
    is_liked BOOLEAN DEFAULT false,
    is_bookmarked BOOLEAN DEFAULT false,
    play_count INTEGER DEFAULT 0,
    last_played TIMESTAMP WITH TIME ZONE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, track_id)
);

-- Learning modules progress
CREATE TABLE IF NOT EXISTS learning_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    lesson_id TEXT,
    completed BOOLEAN DEFAULT false,
    score INTEGER,
    time_spent INTEGER DEFAULT 0, -- in minutes
    attempts INTEGER DEFAULT 0,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, module_id, lesson_id)
);

-- Community posts/stories
CREATE TABLE IF NOT EXISTS community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'story' CHECK (type IN ('story', 'resource', 'question', 'announcement')),
    tags TEXT[],
    is_anonymous BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post comments
CREATE TABLE IF NOT EXISTS post_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
    is_anonymous BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User likes for posts and comments
CREATE TABLE IF NOT EXISTS user_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('post', 'comment', 'audio')),
    target_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, target_type, target_id)
);

-- Crisis support sessions
CREATE TABLE IF NOT EXISTS crisis_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    crisis_level INTEGER NOT NULL,
    cultural_context TEXT[],
    resources_provided TEXT[],
    follow_up_scheduled BOOLEAN DEFAULT false,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    resolved BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizing campaigns
CREATE TABLE IF NOT EXISTS organizing_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    organizer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    goal TEXT NOT NULL,
    target_date DATE,
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'paused')),
    tags TEXT[],
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign participants
CREATE TABLE IF NOT EXISTS campaign_participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES organizing_campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'volunteer' CHECK (role IN ('volunteer', 'coordinator', 'leader')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, user_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('crisis', 'event', 'community', 'system', 'achievement')),
    action_url TEXT,
    is_read BOOLEAN DEFAULT false,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_type TEXT NOT NULL,
    achievement_name TEXT NOT NULL,
    description TEXT,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_type, achievement_name)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_omni_bot_conversations_user_id ON omni_bot_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_omni_bot_conversations_session_id ON omni_bot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_omni_bot_conversations_timestamp ON omni_bot_conversations(timestamp);
CREATE INDEX IF NOT EXISTS idx_omni_bot_conversations_crisis_level ON omni_bot_conversations(crisis_level);

CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_lgbtq_friendly ON resources(lgbtq_friendly);
CREATE INDEX IF NOT EXISTS idx_resources_trans_specific ON resources(trans_specific);

CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_organizer_id ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_events_is_public ON events(is_public);

CREATE INDEX IF NOT EXISTS idx_audio_tracks_category ON audio_tracks(category);
CREATE INDEX IF NOT EXISTS idx_audio_tracks_is_public ON audio_tracks(is_public);
CREATE INDEX IF NOT EXISTS idx_audio_tracks_created_at ON audio_tracks(created_at);

CREATE INDEX IF NOT EXISTS idx_community_posts_author_id ON community_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_type ON community_posts(type);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_community_posts_is_public ON community_posts(is_public);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Enable Row Level Security policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE omni_bot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_audio_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own data and public profiles
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- OmniBot conversations are private to the user
CREATE POLICY "Users can view own conversations" ON omni_bot_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON omni_bot_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Resources are publicly viewable
CREATE POLICY "Resources are publicly viewable" ON resources FOR SELECT TO authenticated USING (true);

-- Events policies
CREATE POLICY "Public events are viewable" ON events FOR SELECT USING (is_public = true OR organizer_id = auth.uid());
CREATE POLICY "Users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organizers can update own events" ON events FOR UPDATE USING (auth.uid() = organizer_id);

-- Audio tracks policies
CREATE POLICY "Public audio tracks viewable" ON audio_tracks FOR SELECT USING (is_public = true);
CREATE POLICY "Users can interact with audio" ON user_audio_interactions FOR ALL USING (auth.uid() = user_id);

-- Community posts policies
CREATE POLICY "Public posts viewable" ON community_posts FOR SELECT USING (is_public = true OR author_id = auth.uid());
CREATE POLICY "Users can create posts" ON community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own posts" ON community_posts FOR UPDATE USING (auth.uid() = author_id);

-- Notifications are private
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample data
INSERT INTO resources (name, description, type, contact_phone, website_url, lgbtq_friendly, trans_specific, cultural_competency, cost, languages) VALUES
('Trans Lifeline', '24/7 crisis support hotline run by and for transgender people', 'crisis', '877-565-8860', 'https://translifeline.org', true, true, ARRAY['transgender', 'lgbtq'], 'free', ARRAY['English', 'Spanish']),
('LGBT National Hotline', 'Confidential support for LGBTQ+ individuals and families', 'crisis', '1-888-843-4564', 'https://lgbthotline.org', true, false, ARRAY['lgbtq', 'family_support'], 'free', ARRAY['English']),
('Pride Center of Maryland', 'Community center providing resources and support for LGBTQ+ individuals', 'community', '410-777-8145', 'https://pridemd.org', true, true, ARRAY['lgbtq', 'transgender', 'youth', 'seniors'], 'free', ARRAY['English', 'Spanish']),
('Chase Brexton Health Care', 'LGBTQ+ affirming healthcare including HRT and transition services', 'healthcare', '410-837-2050', 'https://chasebrexton.org', true, true, ARRAY['lgbtq', 'transgender', 'hiv_care'], 'sliding_scale', ARRAY['English', 'Spanish']),
('Baltimore LGBTQ+ Legal Aid', 'Free legal services for LGBTQ+ individuals including name changes', 'legal', '410-951-7777', 'https://baltimorelgbtqlegal.org', true, true, ARRAY['lgbtq', 'transgender', 'immigration'], 'free', ARRAY['English', 'Spanish', 'French']),
('Youth Reach Baltimore', 'Housing and support services for LGBTQ+ youth experiencing homelessness', 'housing', '410-685-3101', 'https://youthreach.org', true, true, ARRAY['lgbtq', 'youth', 'trauma_informed'], 'free', ARRAY['English']);

-- Insert sample audio tracks
INSERT INTO audio_tracks (title, artist, description, category, duration, audio_url, image_url, tags, transcript, likes_count, play_count, rating) VALUES
('Trans Affirmation Journey', 'Melly''s Healing Circle', 'A gentle guided meditation affirming your transgender identity and celebrating your authentic self', 'meditation', 900, '/audio/trans-affirmation.mp3', '/placeholder.svg?height=300&width=300&text=Trans+Pride+Colors', ARRAY['transgender', 'identity', 'affirmation', 'self-love', 'guided'], 'Welcome to this sacred space of affirmation. You are exactly who you''re meant to be...', 234, 1247, 4.8),
('I Am Enough - Daily Affirmations', 'Liberation Voices Collective', 'Powerful daily affirmations for LGBTQ+ self-worth, confidence, and inner strength', 'affirmations', 600, '/audio/daily-affirmations.mp3', '/placeholder.svg?height=300&width=300&text=Rainbow+Heart', ARRAY['daily', 'confidence', 'self-worth', 'morning', 'lgbtq'], NULL, 189, 892, 4.9),
('Ocean Waves for Deep Healing', 'Nature''s Sanctuary', 'Calming ocean sounds to wash away stress, trauma, and negative energy', 'nature', 1800, '/audio/ocean-waves.mp3', '/placeholder.svg?height=300&width=300&text=Ocean+Waves', ARRAY['ocean', 'calming', 'sleep', 'stress-relief', 'healing'], NULL, 156, 2341, 4.7),
('40Hz Gamma Focus Frequency', 'Binaural Beats Collective', 'Gamma brain waves to enhance focus, cognitive function, and mental clarity', 'binaural', 1200, '/audio/40hz-focus.mp3', '/placeholder.svg?height=300&width=300&text=Brain+Waves', ARRAY['focus', 'gamma', 'concentration', 'study', 'productivity'], NULL, 98, 567, 4.6),
('Ancestral Strength & Wisdom', 'Black Liberation Healing', 'Connect with the strength and wisdom of your LGBTQ+ ancestors who paved the way', 'meditation', 1080, '/audio/ancestral-strength.mp3', '/placeholder.svg?height=300&width=300&text=Ancestral+Wisdom', ARRAY['ancestors', 'strength', 'black', 'heritage', 'wisdom'], NULL, 267, 1456, 4.9),
('Forest Rain Sanctuary', 'Earth Sounds Collective', 'Gentle rain in an ancient forest for deep relaxation and grounding', 'nature', 2400, '/audio/forest-rain.mp3', '/placeholder.svg?height=300&width=300&text=Forest+Rain', ARRAY['rain', 'forest', 'relaxation', 'nature', 'grounding'], NULL, 143, 1789, 4.8),
('Coming Out Courage Meditation', 'Pride Healing Collective', 'Build courage and self-compassion for your coming out journey', 'meditation', 840, '/audio/coming-out-courage.mp3', '/placeholder.svg?height=300&width=300&text=Pride+Flag', ARRAY['coming-out', 'courage', 'family', 'self-compassion', 'support'], NULL, 312, 987, 4.7),
('Theta Waves for Deep Sleep', 'Sleep Frequency Lab', 'Theta brain waves to promote deep, restorative sleep and dream healing', 'binaural', 3600, '/audio/theta-sleep.mp3', '/placeholder.svg?height=300&width=300&text=Moon+Stars', ARRAY['sleep', 'theta', 'dreams', 'rest', 'healing'], NULL, 445, 3421, 4.9);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_audio_tracks_updated_at BEFORE UPDATE ON audio_tracks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_audio_interactions_updated_at BEFORE UPDATE ON user_audio_interactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_post_comments_updated_at BEFORE UPDATE ON post_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crisis_sessions_updated_at BEFORE UPDATE ON crisis_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizing_campaigns_updated_at BEFORE UPDATE ON organizing_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
