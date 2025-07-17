-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('avatars', 'avatars', true),
  ('motorcycle-images', 'motorcycle-images', true),
  ('ride-images', 'ride-images', true),
  ('gear-images', 'gear-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE USING (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for motorcycle images
CREATE POLICY "Motorcycle images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'motorcycle-images');
CREATE POLICY "Users can upload their own motorcycle images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'motorcycle-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own motorcycle images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'motorcycle-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can delete their own motorcycle images" ON storage.objects FOR DELETE USING (
  bucket_id = 'motorcycle-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for ride images
CREATE POLICY "Ride images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'ride-images');
CREATE POLICY "Users can upload their own ride images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'ride-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own ride images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'ride-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can delete their own ride images" ON storage.objects FOR DELETE USING (
  bucket_id = 'ride-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for gear images
CREATE POLICY "Gear images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'gear-images');
CREATE POLICY "Users can upload their own gear images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'gear-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own gear images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'gear-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can delete their own gear images" ON storage.objects FOR DELETE USING (
  bucket_id = 'gear-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
