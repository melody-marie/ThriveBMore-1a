-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    intent_classification JSONB,
    crisis_level INTEGER DEFAULT 0 CHECK (crisis_level >= 0 AND crisis_level <= 10),
    support_provided TEXT[],
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create bot_personalities table
CREATE TABLE IF NOT EXISTS bot_personalities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    empathy INTEGER DEFAULT 95 CHECK (empathy >= 0 AND empathy <= 100),
    professionalism INTEGER DEFAULT 85 CHECK (professionalism >= 0 AND professionalism <= 100),
    creativity INTEGER DEFAULT 90 CHECK (creativity >= 0 AND creativity <= 100),
    wit INTEGER DEFAULT 75 CHECK (wit >= 0 AND wit <= 100),
    cultural_competency INTEGER DEFAULT 95 CHECK (cultural_competency >= 0 AND cultural_competency <= 100),
    trauma_informed INTEGER DEFAULT 98 CHECK (trauma_informed >= 0 AND trauma_informed <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create conversation_contexts table
CREATE TABLE IF NOT EXISTS conversation_contexts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    current_mood TEXT,
    identity_affirmations TEXT[],
    crisis_level INTEGER DEFAULT 0 CHECK (crisis_level >= 0 AND crisis_level <= 10),
    preferred_pronouns TEXT,
    cultural_background TEXT[],
    support_needs TEXT[],
    trauma_indicators TEXT[],
    last_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(conversation_id)
);

-- Create feedback table for learning
CREATE TABLE IF NOT EXISTS message_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    feedback_type TEXT NOT NULL CHECK (feedback_type IN ('positive', 'negative')),
    feedback_context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create crisis_interventions table
CREATE TABLE IF NOT EXISTS crisis_interventions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    crisis_level INTEGER NOT NULL CHECK (crisis_level >= 0 AND crisis_level <= 10),
    intervention_type TEXT NOT NULL,
    resources_provided TEXT[],
    follow_up_needed BOOLEAN DEFAULT true,
    follow_up_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    follow_up_date TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Create user_documents table for SoulVault
CREATE TABLE IF NOT EXISTS user_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    document_type TEXT NOT NULL,
    is_encrypted BOOLEAN DEFAULT true,
    encryption_key_id TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create liberation_mail table
CREATE TABLE IF NOT EXISTS liberation_mail (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    is_encrypted BOOLEAN DEFAULT true,
    auto_erase_at TIMESTAMP WITH TIME ZONE,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create community_resources table
CREATE TABLE IF NOT EXISTS community_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    resource_type TEXT NOT NULL,
    contact_info JSONB,
    location TEXT,
    is_lgbtq_friendly BOOLEAN DEFAULT true,
    specializations TEXT[],
    availability TEXT,
    is_crisis_resource BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create audio_tracks table for Melly's Spot
CREATE TABLE IF NOT EXISTS audio_tracks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    duration INTEGER NOT NULL, -- in seconds
    category TEXT NOT NULL CHECK (category IN ('meditation', 'affirmations', 'nature', 'binaural')),
    description TEXT,
    audio_url TEXT NOT NULL,
    image_url TEXT,
    tags TEXT[],
    likes INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create user_audio_interactions table
CREATE TABLE IF NOT EXISTS user_audio_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    track_id UUID REFERENCES audio_tracks(id) ON DELETE CASCADE,
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'play', 'download', 'share')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_messages_crisis_level ON messages(crisis_level);
CREATE INDEX IF NOT EXISTS idx_crisis_interventions_user_id ON crisis_interventions(user_id);
CREATE INDEX IF NOT EXISTS idx_crisis_interventions_follow_up ON crisis_interventions(follow_up_needed, follow_up_completed);
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_liberation_mail_recipient ON liberation_mail(recipient_id, is_read);
CREATE INDEX IF NOT EXISTS idx_community_resources_type ON community_resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_community_resources_crisis ON community_resources(is_crisis_resource);
CREATE INDEX IF NOT EXISTS idx_audio_tracks_category ON audio_tracks(category);
CREATE INDEX IF NOT EXISTS idx_user_audio_interactions_user_track ON user_audio_interactions(user_id, track_id);

-- Row Level Security Policies

-- Conversations: Users can only see their own conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own conversations" ON conversations
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON conversations
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON conversations
    FOR UPDATE USING (auth.uid() = user_id);

-- Messages: Users can only see messages from their conversations
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (
        conversation_id IN (
            SELECT id FROM conversations WHERE user_id = auth.uid()
        )
    );
CREATE POLICY "Users can insert own messages" ON messages
    FOR INSERT WITH CHECK (
        conversation_id IN (
            SELECT id FROM conversations WHERE user_id = auth.uid()
        )
    );

-- Bot personalities: Users can only manage their own personality settings
ALTER TABLE bot_personalities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own personality" ON bot_personalities
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own personality" ON bot_personalities
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own personality" ON bot_personalities
    FOR UPDATE USING (auth.uid() = user_id);

-- Conversation contexts: Users can only see their own contexts
ALTER TABLE conversation_contexts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own contexts" ON conversation_contexts
    FOR SELECT USING (
        conversation_id IN (
            SELECT id FROM conversations WHERE user_id = auth.uid()
        )
    );
CREATE POLICY "Users can insert own contexts" ON conversation_contexts
    FOR INSERT WITH CHECK (
        conversation_id IN (
            SELECT id FROM conversations WHERE user_id = auth.uid()
        )
    );
CREATE POLICY "Users can update own contexts" ON conversation_contexts
    FOR UPDATE USING (
        conversation_id IN (
            SELECT id FROM conversations WHERE user_id = auth.uid()
        )
    );

-- Message feedback: Users can only provide feedback on messages they can see
ALTER TABLE message_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own feedback" ON message_feedback
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own feedback" ON message_feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Crisis interventions: Users can only see their own interventions
ALTER TABLE crisis_interventions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own interventions" ON crisis_interventions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own interventions" ON crisis_interventions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User documents: Users can only access their own documents
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own documents" ON user_documents
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON user_documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON user_documents
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON user_documents
    FOR DELETE USING (auth.uid() = user_id);

-- Liberation mail: Users can see mail they sent or received
ALTER TABLE liberation_mail ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own mail" ON liberation_mail
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send mail" ON liberation_mail
    FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update received mail" ON liberation_mail
    FOR UPDATE USING (auth.uid() = recipient_id);

-- Community resources: Public read access, admin write access
ALTER TABLE community_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view community resources" ON community_resources
    FOR SELECT USING (true);

-- Audio tracks: Public read access
ALTER TABLE audio_tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view audio tracks" ON audio_tracks
    FOR SELECT USING (true);

-- User audio interactions: Users can only see their own interactions
ALTER TABLE user_audio_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own audio interactions" ON user_audio_interactions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own audio interactions" ON user_audio_interactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions for common operations

-- Function to get crisis resources
CREATE OR REPLACE FUNCTION get_crisis_resources()
RETURNS TABLE (
    name TEXT,
    contact_info JSONB,
    specializations TEXT[],
    availability TEXT,
    is_lgbtq_friendly BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cr.name,
        cr.contact_info,
        cr.specializations,
        cr.availability,
        cr.is_lgbtq_friendly
    FROM community_resources cr
    WHERE cr.is_crisis_resource = true
    AND cr.is_verified = true
    ORDER BY cr.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update bot personality
CREATE OR REPLACE FUNCTION update_bot_personality(
    p_empathy INTEGER DEFAULT NULL,
    p_professionalism INTEGER DEFAULT NULL,
    p_creativity INTEGER DEFAULT NULL,
    p_wit INTEGER DEFAULT NULL,
    p_cultural_competency INTEGER DEFAULT NULL,
    p_trauma_informed INTEGER DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO bot_personalities (
        user_id, empathy, professionalism, creativity, wit, cultural_competency, trauma_informed
    ) VALUES (
        auth.uid(),
        COALESCE(p_empathy, 95),
        COALESCE(p_professionalism, 85),
        COALESCE(p_creativity, 90),
        COALESCE(p_wit, 75),
        COALESCE(p_cultural_competency, 95),
        COALESCE(p_trauma_informed, 98)
    )
    ON CONFLICT (user_id) DO UPDATE SET
        empathy = COALESCE(p_empathy, bot_personalities.empathy),
        professionalism = COALESCE(p_professionalism, bot_personalities.professionalism),
        creativity = COALESCE(p_creativity, bot_personalities.creativity),
        wit = COALESCE(p_wit, bot_personalities.wit),
        cultural_competency = COALESCE(p_cultural_competency, bot_personalities.cultural_competency),
        trauma_informed = COALESCE(p_trauma_informed, bot_personalities.trauma_informed),
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log crisis intervention
CREATE OR REPLACE FUNCTION log_crisis_intervention(
    p_conversation_id UUID,
    p_crisis_level INTEGER,
    p_intervention_type TEXT,
    p_resources_provided TEXT[],
    p_notes TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    intervention_id UUID;
BEGIN
    INSERT INTO crisis_interventions (
        user_id,
        conversation_id,
        crisis_level,
        intervention_type,
        resources_provided,
        notes,
        follow_up_date
    ) VALUES (
        auth.uid(),
        p_conversation_id,
        p_crisis_level,
        p_intervention_type,
        p_resources_provided,
        p_notes,
        NOW() + INTERVAL '24 hours'
    )
    RETURNING id INTO intervention_id;
    
    RETURN intervention_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers to relevant tables
CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bot_personalities_updated_at
    BEFORE UPDATE ON bot_personalities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_documents_updated_at
    BEFORE UPDATE ON user_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_resources_updated_at
    BEFORE UPDATE ON community_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audio_tracks_updated_at
    BEFORE UPDATE ON audio_tracks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample crisis resources
INSERT INTO community_resources (name, description, resource_type, contact_info, specializations, availability, is_crisis_resource, is_lgbtq_friendly, is_verified) VALUES
('Trans Lifeline', 'Peer support hotline for transgender people', 'crisis_hotline', '{"phone": "877-565-8860"}', ARRAY['transgender', 'crisis', 'peer support'], '24/7', true, true, true),
('LGBT National Hotline', 'National hotline providing information and local resources', 'crisis_hotline', '{"phone": "1-888-843-4564"}', ARRAY['lgbtq', 'crisis', 'counseling'], 'Daily 4pm-12am ET', true, true, true),
('Crisis Text Line', 'Free crisis support via text message', 'crisis_text', '{"text": "HOME to 741741"}', ARRAY['crisis', 'text support', 'all ages'], '24/7', true, true, true),
('National Suicide Prevention Lifeline', 'National network of local crisis centers', 'crisis_hotline', '{"phone": "988"}', ARRAY['suicide prevention', 'crisis', 'mental health'], '24/7', true, true, true),
('The Trevor Project', 'Crisis intervention and suicide prevention for LGBTQ youth', 'crisis_hotline', '{"phone": "1-866-488-7386", "text": "START to 678-678"}', ARRAY['lgbtq youth', 'suicide prevention', 'crisis'], '24/7', true, true, true),
('LGBTQ Health Resource Center of Chase Brexton', 'Comprehensive healthcare for LGBTQ+ community', 'healthcare', '{"website": "https://chasebrexton.org", "location": "Baltimore, MD"}', ARRAY['healthcare', 'mental health', 'transgender care'], 'Business hours', false, true, true),
('FreeState Justice', 'Legal advocacy for LGBTQ+ Marylanders', 'legal', '{"website": "https://freestate-justice.org", "location": "Baltimore, MD"}', ARRAY['legal advocacy', 'transgender rights', 'discrimination'], 'Business hours', false, true, true),
('Baltimore Safe Haven', 'Emergency shelter and support services', 'shelter', '{"location": "Baltimore, MD"}', ARRAY['emergency shelter', 'lgbtq youth', 'crisis housing'], '24/7', true, true, true);

-- Insert sample audio tracks for Melly's Spot
INSERT INTO audio_tracks (title, artist, duration, category, description, audio_url, image_url, tags, likes, is_featured) VALUES
('Trans Affirmation Meditation', 'Melly''s Healing Circle', 900, 'meditation', 'A gentle guided meditation affirming your identity and worth', '/audio/trans-affirmation.mp3', '/placeholder.svg?height=300&width=300&text=Trans+Pride', ARRAY['identity', 'affirmation', 'transgender', 'self-love'], 234, true),
('I Am Enough - Daily Affirmations', 'Liberation Voices', 600, 'affirmations', 'Powerful daily affirmations for LGBTQ+ self-worth and confidence', '/audio/daily-affirmations.mp3', '/placeholder.svg?height=300&width=300&text=Rainbow+Heart', ARRAY['daily', 'confidence', 'self-worth', 'morning'], 189, true),
('Ocean Waves for Healing', 'Nature''s Sanctuary', 1800, 'nature', 'Calming ocean sounds to wash away stress and trauma', '/audio/ocean-waves.mp3', '/placeholder.svg?height=300&width=300&text=Ocean+Waves', ARRAY['ocean', 'calming', 'sleep', 'stress-relief'], 156, false),
('40Hz Focus Frequency', 'Binaural Beats Collective', 1200, 'binaural', 'Gamma waves to enhance focus and cognitive function', '/audio/40hz-focus.mp3', '/placeholder.svg?height=300&width=300&text=Brain+Waves', ARRAY['focus', 'gamma', 'concentration', 'study'], 98, false),
('Ancestral Strength Meditation', 'Black Liberation Healing', 1080, 'meditation', 'Connect with the strength and wisdom of your ancestors', '/audio/ancestral-strength.mp3', '/placeholder.svg?height=300&width=300&text=Ancestral+Wisdom', ARRAY['ancestors', 'strength', 'black', 'heritage'], 267, true),
('Forest Rain Sanctuary', 'Earth Sounds', 2400, 'nature', 'Gentle rain in an ancient forest for deep relaxation', '/audio/forest-rain.mp3', '/placeholder.svg?height=300&width=300&text=Forest+Rain', ARRAY['rain', 'forest', 'relaxation', 'nature'], 143, false),
('Black Trans Joy Affirmations', 'Voices of Liberation', 720, 'affirmations', 'Celebrating the beauty and strength of Black trans identity', '/audio/black-trans-joy.mp3', '/placeholder.svg?height=300&width=300&text=Black+Trans+Joy', ARRAY['black', 'transgender', 'joy', 'celebration'], 312, true),
('Healing Trauma with Compassion', 'Trauma-Informed Healing', 1500, 'meditation', 'Gentle meditation for trauma survivors with self-compassion practices', '/audio/trauma-healing.mp3', '/placeholder.svg?height=300&width=300&text=Healing+Light', ARRAY['trauma', 'healing', 'compassion', 'recovery'], 198, false),
('Thunderstorm for Deep Sleep', 'Storm Sounds', 3600, 'nature', 'Powerful thunderstorm sounds for deep, restorative sleep', '/audio/thunderstorm.mp3', '/placeholder.svg?height=300&width=300&text=Thunder+Storm', ARRAY['thunderstorm', 'sleep', 'deep', 'restorative'], 87, false),
('528Hz Love Frequency', 'Healing Frequencies', 1800, 'binaural', 'The love frequency for heart chakra healing and self-acceptance', '/audio/528hz-love.mp3', '/placeholder.svg?height=300&width=300&text=Love+Frequency', ARRAY['love', 'heart chakra', 'healing', '528hz'], 156, false);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Comments for documentation
COMMENT ON TABLE conversations IS 'Stores user conversation sessions with the OmniBot';
COMMENT ON TABLE messages IS 'Individual messages within conversations, including intent classification and crisis levels';
COMMENT ON TABLE bot_personalities IS 'User-customizable bot personality settings';
COMMENT ON TABLE conversation_contexts IS 'Contextual information about ongoing conversations';
COMMENT ON TABLE message_feedback IS 'User feedback on bot responses for learning and improvement';
COMMENT ON TABLE crisis_interventions IS 'Logs of crisis interventions and follow-up tracking';
COMMENT ON TABLE user_documents IS 'Encrypted document storage for the SoulVault feature';
COMMENT ON TABLE liberation_mail IS 'Secure, auto-erasing email system';
COMMENT ON TABLE community_resources IS 'Database of LGBTQ+ friendly resources and services';
COMMENT ON TABLE audio_tracks IS 'Audio content library for Melly''s Spot healing sounds';
COMMENT ON TABLE user_audio_interactions IS 'User interactions with audio content (likes, plays, etc.)';
