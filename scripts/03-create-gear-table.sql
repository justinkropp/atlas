-- Create gear table
CREATE TABLE IF NOT EXISTS gear (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('helmet', 'jacket', 'pants', 'gloves', 'boots', 'other')),
  condition TEXT DEFAULT 'excellent' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  price DECIMAL(10,2),
  purchase_date DATE,
  purchase_link TEXT,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  notes TEXT,
  review_notes TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE gear ENABLE ROW LEVEL SECURITY;

-- Create policies for gear
CREATE POLICY "Users can view own gear" ON gear FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own gear" ON gear FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own gear" ON gear FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own gear" ON gear FOR DELETE USING (auth.uid() = user_id);
