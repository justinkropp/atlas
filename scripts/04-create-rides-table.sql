-- Create rides table
CREATE TABLE IF NOT EXISTS rides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  motorcycle_id UUID REFERENCES motorcycles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  distance_miles DECIMAL(8,2),
  duration_minutes INTEGER,
  avg_speed_mph DECIMAL(5,2),
  max_speed_mph DECIMAL(5,2),
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  start_latitude DECIMAL(10,8),
  start_longitude DECIMAL(11,8),
  end_latitude DECIMAL(10,8),
  end_longitude DECIMAL(11,8),
  route_data JSONB, -- Store GPS route points
  weather_data JSONB, -- Store weather conditions
  is_public BOOLEAN DEFAULT TRUE,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ride images table
CREATE TABLE IF NOT EXISTS ride_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ride_id UUID REFERENCES rides(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  timestamp TIMESTAMP WITH TIME ZONE,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ride participants table (for group rides)
CREATE TABLE IF NOT EXISTS ride_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ride_id UUID REFERENCES rides(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ride_id, user_id)
);

-- Create ride likes table
CREATE TABLE IF NOT EXISTS ride_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ride_id UUID REFERENCES rides(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ride_id, user_id)
);

-- Create ride comments table
CREATE TABLE IF NOT EXISTS ride_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ride_id UUID REFERENCES rides(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for rides
CREATE POLICY "Users can view public rides" ON rides FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can insert own rides" ON rides FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own rides" ON rides FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own rides" ON rides FOR DELETE USING (auth.uid() = user_id);

-- Create policies for ride images
CREATE POLICY "Users can view ride images for visible rides" ON ride_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_images.ride_id AND (rides.is_public = true OR rides.user_id = auth.uid()))
);
CREATE POLICY "Users can insert images for own rides" ON ride_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_images.ride_id AND rides.user_id = auth.uid())
);
CREATE POLICY "Users can update images for own rides" ON ride_images FOR UPDATE USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_images.ride_id AND rides.user_id = auth.uid())
);
CREATE POLICY "Users can delete images for own rides" ON ride_images FOR DELETE USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_images.ride_id AND rides.user_id = auth.uid())
);

-- Create policies for ride participants
CREATE POLICY "Users can view ride participants for visible rides" ON ride_participants FOR SELECT USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_participants.ride_id AND (rides.is_public = true OR rides.user_id = auth.uid()))
);
CREATE POLICY "Users can add participants to own rides" ON ride_participants FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_participants.ride_id AND rides.user_id = auth.uid())
);
CREATE POLICY "Users can remove participants from own rides" ON ride_participants FOR DELETE USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_participants.ride_id AND rides.user_id = auth.uid())
);

-- Create policies for ride likes
CREATE POLICY "Users can view ride likes for visible rides" ON ride_likes FOR SELECT USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_likes.ride_id AND (rides.is_public = true OR rides.user_id = auth.uid()))
);
CREATE POLICY "Users can like visible rides" ON ride_likes FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_likes.ride_id AND (rides.is_public = true OR rides.user_id = auth.uid()))
  AND auth.uid() = user_id
);
CREATE POLICY "Users can unlike rides they liked" ON ride_likes FOR DELETE USING (auth.uid() = user_id);

-- Create policies for ride comments
CREATE POLICY "Users can view comments for visible rides" ON ride_comments FOR SELECT USING (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_comments.ride_id AND (rides.is_public = true OR rides.user_id = auth.uid()))
);
CREATE POLICY "Users can comment on visible rides" ON ride_comments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM rides WHERE rides.id = ride_comments.ride_id AND (rides.is_public = true OR rides.user_id = auth.uid()))
  AND auth.uid() = user_id
);
CREATE POLICY "Users can update own comments" ON ride_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON ride_comments FOR DELETE USING (auth.uid() = user_id);
