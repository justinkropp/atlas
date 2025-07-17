-- Create motorcycles table
CREATE TABLE IF NOT EXISTS motorcycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT,
  engine TEXT,
  type TEXT,
  mileage INTEGER DEFAULT 0,
  last_service_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'sold', 'retired')),
  notes TEXT,
  main_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create motorcycle images table
CREATE TABLE IF NOT EXISTS motorcycle_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  motorcycle_id UUID REFERENCES motorcycles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  is_main BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create motorcycle modifications table
CREATE TABLE IF NOT EXISTS motorcycle_modifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  motorcycle_id UUID REFERENCES motorcycles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2),
  purchase_date DATE,
  purchase_link TEXT,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycle_modifications ENABLE ROW LEVEL SECURITY;

-- Create policies for motorcycles
CREATE POLICY "Users can view own motorcycles" ON motorcycles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own motorcycles" ON motorcycles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own motorcycles" ON motorcycles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own motorcycles" ON motorcycles FOR DELETE USING (auth.uid() = user_id);

-- Create policies for motorcycle images
CREATE POLICY "Users can view own motorcycle images" ON motorcycle_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM motorcycles WHERE motorcycles.id = motorcycle_images.motorcycle_id AND motorcycles.user_id = auth.uid())
);
CREATE POLICY "Users can insert own motorcycle images" ON motorcycle_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM motorcycles WHERE motorcycles.id = motorcycle_images.motorcycle_id AND motorcycles.user_id = auth.uid())
);
CREATE POLICY "Users can update own motorcycle images" ON motorcycle_images FOR UPDATE USING (
  EXISTS (SELECT 1 FROM motorcycles WHERE motorcycles.id = motorcycle_images.motorcycle_id AND motorcycles.user_id = auth.uid())
);
CREATE POLICY "Users can delete own motorcycle images" ON motorcycle_images FOR DELETE USING (
  EXISTS (SELECT 1 FROM motorcycles WHERE motorcycles.id = motorcycle_images.motorcycle_id AND motorcycles.user_id = auth.uid())
);

-- Create policies for motorcycle modifications
CREATE POLICY "Users can view own motorcycle modifications" ON motorcycle_modifications FOR SELECT USING (
  EXISTS (SELECT 1 FROM motorcycles WHERE motorcycles.id = motorcycle_modifications.motorcycle_id AND motorcycles.user_id = auth.uid())
);
CREATE POLICY "Users can insert own motorcycle modifications" ON motorcycle_modifications FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM motorcycles WHERE motorcycles.id = motorcycle_modifications.motorcycle_id AND motorcycles.user_id = auth.uid())
);
CREATE POLICY "Users can update own motorcycle modifications" ON motorcycle_modifications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM motorcycles WHERE motorcycles.id = motorcycle_modifications.motorcycle_id AND motorcycles.user_id = auth.uid())
);
CREATE POLICY "Users can delete own motorcycle modifications" ON motorcycle_modifications FOR DELETE USING (
  EXISTS (SELECT 1 FROM motorcycles WHERE motorcycles.id = motorcycle_modifications.motorcycle_id AND motorcycles.user_id = auth.uid())
);
