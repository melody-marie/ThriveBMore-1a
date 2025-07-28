-- Create the mellys_spot_posts table
CREATE TABLE IF NOT EXISTS mellys_spot_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    post_type VARCHAR(20) NOT NULL CHECK (post_type IN ('user', 'bot', 'oracle', 'care_check')),
    bot_name VARCHAR(100),
    user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create the user_moods table
CREATE TABLE IF NOT EXISTS user_moods (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    mood VARCHAR(50) NOT NULL,
    energy_level INTEGER NOT NULL CHECK (energy_level >= 1 AND energy_level <= 10),
    needs_support BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the users table (basic structure)
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mellys_spot_posts_created_at ON mellys_spot_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mellys_spot_posts_post_type ON mellys_spot_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_mellys_spot_posts_user_id ON mellys_spot_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_moods_created_at ON user_moods(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_moods_user_id ON user_moods(user_id);

-- Enable Row Level Security (RLS) for privacy
ALTER TABLE mellys_spot_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to posts (for community feed)
CREATE POLICY "Public posts are viewable by everyone" ON mellys_spot_posts
    FOR SELECT USING (true);

-- Create policies for authenticated users to insert posts
CREATE POLICY "Users can insert their own posts" ON mellys_spot_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for mood data (private to user)
CREATE POLICY "Users can view their own moods" ON user_moods
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own moods" ON user_moods
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for user profiles
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Insert some sample data to populate the feed
INSERT INTO mellys_spot_posts (content, post_type, bot_name, metadata) VALUES
(
    '🌟 Your ancestors whisper: "You are exactly where you need to be, beloved." Trust the journey. ✨',
    'oracle',
    'Oracle Aziza',
    '{"wisdom_type": "daily_blessing", "energy": "high_vibration"}'
),
(
    '💖 Melly here checking in: How''s your heart today, love? Remember, feeling all your feelings is brave work. 🤗',
    'care_check',
    'Care Bot Melly',
    '{"care_type": "wellness_check", "intention": "nurturing"}'
),
(
    '🔮 The universe conspires in your favor today. Your resilience is your superpower, love. 💪🏾✨',
    'oracle',
    'Oracle Aziza',
    '{"wisdom_type": "empowerment", "energy": "motivational"}'
),
(
    '💫 Energy Matchmaker here: I sense beautiful souls in our community ready to lift each other up. If you''re feeling strong today, consider reaching out to someone who might need a kind word. Community is medicine. ✨',
    'bot',
    'Energy Matchmaker',
    '{"match_type": "community_support", "algorithm": "energy_harmony"}'
),
(
    '🌸 Gentle reminder from Care Bot Melly: You''ve survived 100% of your difficult days so far. That''s a perfect record! 💪🏾',
    'care_check',
    'Care Bot Melly',
    '{"care_type": "encouragement", "intention": "strength_building"}'
);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update timestamps
CREATE TRIGGER update_mellys_spot_posts_updated_at 
    BEFORE UPDATE ON mellys_spot_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
