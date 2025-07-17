-- Insert sample profiles (these will be linked to auth.users that get created via signup)
-- Note: In a real scenario, these would be created automatically via the trigger when users sign up
-- For demo purposes, we'll create some sample user IDs

-- First, let's create some sample user profiles
INSERT INTO profiles (id, username, full_name, bio, location, avatar_url, created_at) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  'canyon_rider_92',
  'Alex Rodriguez',
  'Passionate motorcycle rider exploring scenic routes across California. Love canyon runs and weekend adventures.',
  'Los Angeles, CA',
  '/placeholder.svg?height=120&width=120',
  NOW() - INTERVAL '30 days'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'coastal_cruiser',
  'Sarah Chen',
  'Weekend warrior who loves coastal rides and photography. Always looking for the perfect sunset shot.',
  'San Francisco, CA',
  '/placeholder.svg?height=120&width=120',
  NOW() - INTERVAL '25 days'
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'track_day_hero',
  'Mike Johnson',
  'Track day enthusiast and speed demon. When I''m not on the track, I''m planning my next session.',
  'San Diego, CA',
  '/placeholder.svg?height=120&width=120',
  NOW() - INTERVAL '20 days'
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'adventure_seeker',
  'Emma Wilson',
  'Adventure rider who loves exploring off-road trails and remote destinations. Life is about the journey.',
  'Phoenix, AZ',
  '/placeholder.svg?height=120&width=120',
  NOW() - INTERVAL '15 days'
);

-- Insert sample motorcycles
INSERT INTO motorcycles (id, user_id, name, make, model, year, color, engine, type, mileage, last_service_date, status, notes, main_image_url, created_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  'Yamaha MT-09',
  'Yamaha',
  'MT-09',
  2023,
  'Matte Gray',
  '847cc Triple',
  'Naked Sport',
  3247,
  '2024-01-10',
  'active',
  'Primary riding bike, excellent performance and handling',
  '/placeholder.svg?height=300&width=400',
  NOW() - INTERVAL '25 days'
),
(
  '660e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440001',
  'Honda CB650R',
  'Honda',
  'CB650R',
  2022,
  'Pearl White',
  '649cc Inline-4',
  'Neo Sports Cafe',
  8432,
  '2024-01-05',
  'active',
  'Great for long rides, very comfortable',
  '/placeholder.svg?height=300&width=400',
  NOW() - INTERVAL '20 days'
),
(
  '660e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440002',
  'Kawasaki Ninja ZX-6R',
  'Kawasaki',
  'Ninja ZX-6R',
  2023,
  'Lime Green',
  '636cc Inline-4',
  'Sport',
  2156,
  '2024-01-15',
  'active',
  'Track-focused machine, incredible on the circuit',
  '/placeholder.svg?height=300&width=400',
  NOW() - INTERVAL '18 days'
),
(
  '660e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440004',
  'BMW R1250GS',
  'BMW',
  'R1250GS',
  2023,
  'Racing Blue',
  '1254cc Boxer Twin',
  'Adventure',
  5678,
  '2023-12-20',
  'active',
  'Perfect for long-distance adventures and off-road exploration',
  '/placeholder.svg?height=300&width=400',
  NOW() - INTERVAL '22 days'
);

-- Insert motorcycle images
INSERT INTO motorcycle_images (motorcycle_id, image_url, caption, is_main, created_at) VALUES
-- Yamaha MT-09 images
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=300&width=400', 'Side profile view', true, NOW() - INTERVAL '25 days'),
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=300&width=400', 'Front view', false, NOW() - INTERVAL '25 days'),
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=300&width=400', 'Rear view', false, NOW() - INTERVAL '25 days'),
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=300&width=400', 'Engine detail', false, NOW() - INTERVAL '25 days'),

-- Honda CB650R images
('660e8400-e29b-41d4-a716-446655440002', '/placeholder.svg?height=300&width=400', 'Side profile', true, NOW() - INTERVAL '20 days'),
('660e8400-e29b-41d4-a716-446655440002', '/placeholder.svg?height=300&width=400', 'Front angle', false, NOW() - INTERVAL '20 days'),
('660e8400-e29b-41d4-a716-446655440002', '/placeholder.svg?height=300&width=400', 'Dashboard view', false, NOW() - INTERVAL '20 days'),

-- Kawasaki Ninja images
('660e8400-e29b-41d4-a716-446655440003', '/placeholder.svg?height=300&width=400', 'Track ready', true, NOW() - INTERVAL '18 days'),
('660e8400-e29b-41d4-a716-446655440003', '/placeholder.svg?height=300&width=400', 'Racing position', false, NOW() - INTERVAL '18 days'),

-- BMW R1250GS images
('660e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=300&width=400', 'Adventure ready with luggage', true, NOW() - INTERVAL '22 days'),
('660e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=300&width=400', 'Off-road capability', false, NOW() - INTERVAL '22 days'),
('660e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=300&width=400', 'Boxer engine detail', false, NOW() - INTERVAL '22 days');

-- Insert motorcycle modifications
INSERT INTO motorcycle_modifications (motorcycle_id, name, category, price, purchase_date, purchase_link, rating, notes, image_url, created_at) VALUES
-- Yamaha MT-09 modifications
('660e8400-e29b-41d4-a716-446655440001', 'Akrapovic Slip-On Exhaust', 'Exhaust', 899.99, '2023-09-15', 'https://revzilla.com/motorcycle/akrapovic-slip-on-exhaust-yamaha-mt09', 4.9, 'Incredible sound improvement and weight reduction. Installation was straightforward and the build quality is exceptional. Definitely worth the investment.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '20 days'),
('660e8400-e29b-41d4-a716-446655440001', 'Puig Windscreen', 'Bodywork', 129.99, '2023-08-20', 'https://puigusa.com/en/tuning-motorcycles/windscreens/yamaha/mt-09', 4.3, 'Good wind protection for highway riding. Easy to install and looks great with the bike''s design. Could be slightly taller but overall satisfied.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '18 days'),
('660e8400-e29b-41d4-a716-446655440001', 'CRG Folding Levers', 'Controls', 189.99, '2023-07-10', 'https://crgproducts.com/yamaha-mt09-levers', 4.7, 'High quality levers with great adjustability. The folding mechanism works perfectly and they feel much better than stock. Installation required some patience but worth it.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '15 days'),

-- Honda CB650R modifications
('660e8400-e29b-41d4-a716-446655440002', 'Yoshimura R-77 Exhaust', 'Exhaust', 749.99, '2022-11-12', 'https://yoshimura-rd.com/products/honda-cb650r-r77-exhaust', 4.6, 'Great sound and performance gain. The carbon fiber finish looks amazing and complements the bike perfectly.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '12 days'),
('660e8400-e29b-41d4-a716-446655440002', 'Rizoma Bar End Mirrors', 'Mirrors', 299.99, '2022-10-05', 'https://rizoma.com/en/mirrors/bar-end-mirrors/honda-cb650r', 4.4, 'Stylish upgrade that cleans up the front end. Good visibility though takes some getting used to the new position.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '10 days'),

-- Kawasaki Ninja modifications
('660e8400-e29b-41d4-a716-446655440003', 'Two Brothers Racing Exhaust', 'Exhaust', 449.99, '2023-08-15', 'https://tbracing.com/kawasaki-ninja-zx6r-exhaust', 4.5, 'Good value exhaust with nice sound. Not too loud for daily riding but gives the bike more character.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '8 days'),
('660e8400-e29b-41d4-a716-446655440003', 'Vortex Rearsets', 'Controls', 599.99, '2023-07-20', 'https://vortexracing.com/kawasaki-zx6r-rearsets', 4.8, 'Perfect for track days. Excellent build quality and multiple adjustment positions. Installation was straightforward with good instructions.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '6 days'),

-- BMW R1250GS modifications
('660e8400-e29b-41d4-a716-446655440004', 'Touratech Crash Bars', 'Protection', 459.99, '2023-06-10', 'https://touratech-usa.com/bmw-r1250gs-crash-bars', 4.9, 'Essential protection for adventure riding. Excellent build quality and perfect fit. Gives great peace of mind on technical terrain.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '5 days'),
('660e8400-e29b-41d4-a716-446655440004', 'SW-Motech Side Cases', 'Luggage', 899.99, '2023-05-15', 'https://sw-motech.com/bmw-r1250gs-side-cases', 4.7, 'Perfect for long-distance touring. Waterproof and durable with excellent mounting system. Plenty of storage space for extended trips.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '4 days');

-- Insert sample gear
INSERT INTO gear (user_id, name, category, condition, price, purchase_date, purchase_link, rating, notes, review_notes, image_url, created_at) VALUES
-- Alex's gear
('550e8400-e29b-41d4-a716-446655440001', 'Shoei RF-1400 Helmet', 'helmet', 'excellent', 549.99, '2023-08-15', 'https://revzilla.com/motorcycle/shoei-rf-1400-helmet', 4.8, 'Primary helmet, very comfortable for long rides', 'Outstanding helmet with excellent ventilation and noise reduction. The fit is perfect and it''s incredibly comfortable even on 8+ hour rides. The visor mechanism is smooth and the build quality is top-notch.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655440001', 'Alpinestars GP Pro Jacket', 'jacket', 'good', 399.95, '2022-05-20', 'https://alpinestars.com/products/gp-pro-jacket', 4.5, 'Great protection, some wear on elbows', 'Solid protection with good airflow. The armor is substantial and the fit is athletic. Some wear showing after 2 years of regular use but still very functional. Would buy again.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '12 days'),
('550e8400-e29b-41d4-a716-446655440001', 'Dainese Delta 3 Gloves', 'gloves', 'fair', 89.95, '2023-03-10', 'https://dainese.com/us/en/delta-3-gloves', 4.2, 'Need replacement soon, palm wear visible', 'Good gloves with decent protection but the palm material wears out faster than expected. Comfortable fit and good dexterity for controls. Next time I''ll look for something more durable.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '10 days'),
('550e8400-e29b-41d4-a716-446655440001', 'TCX Street Ace Boots', 'boots', 'excellent', 179.99, '2023-11-02', 'https://tcxboots.com/en/street-ace-boots', 4.7, 'New boots, great ankle protection', 'Excellent boots that look great and provide solid protection. Very comfortable for walking and riding. The ankle protection is reassuring and they''re waterproof as advertised. Highly recommend.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '8 days'),

-- Sarah's gear
('550e8400-e29b-41d4-a716-446655440002', 'Arai Corsair-X Helmet', 'helmet', 'excellent', 699.99, '2023-09-01', 'https://revzilla.com/motorcycle/arai-corsair-x-helmet', 4.9, 'Premium helmet for track days', 'The best helmet I''ve ever owned. Perfect fit, excellent ventilation, and the build quality is unmatched. Worth every penny for the safety and comfort it provides.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '14 days'),
('550e8400-e29b-41d4-a716-446655440002', 'Dainese Racing 3 Jacket', 'jacket', 'excellent', 599.99, '2023-07-15', 'https://dainese.com/us/en/racing-3-jacket', 4.8, 'Track-focused protection', 'Incredible protection and fit. The armor is top-notch and the leather quality is exceptional. Perfect for track days and spirited street riding.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '11 days'),

-- Mike's gear
('550e8400-e29b-41d4-a716-446655440003', 'AGV Pista GP RR', 'helmet', 'excellent', 1299.99, '2023-06-20', 'https://agv.com/us/pista-gp-rr', 5.0, 'Track-only helmet, incredible aerodynamics', 'The ultimate track helmet. Aerodynamics are incredible at high speeds and the visibility is perfect. Expensive but worth it for serious track riding.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '9 days'),
('550e8400-e29b-41d4-a716-446655440003', 'Alpinestars GP Plus R v2 Gloves', 'gloves', 'good', 199.99, '2023-04-10', 'https://alpinestars.com/gp-plus-r-v2-gloves', 4.6, 'Track gloves with great feel', 'Excellent track gloves with great feel for the controls. The protection is substantial and they''ve held up well to multiple track days.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '7 days'),

-- Emma's gear
('550e8400-e29b-41d4-a716-446655440004', 'Shoei Hornet X2', 'helmet', 'excellent', 449.99, '2023-05-25', 'https://revzilla.com/motorcycle/shoei-hornet-x2-helmet', 4.7, 'Perfect for adventure riding', 'Great adventure helmet with excellent ventilation. The peak works well and it''s comfortable for long rides. Good value for the quality.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '13 days'),
('550e8400-e29b-41d4-a716-446655440004', 'Klim Badlands Pro Jacket', 'jacket', 'excellent', 799.99, '2023-04-01', 'https://klim.com/badlands-pro-jacket', 4.9, 'Ultimate adventure jacket', 'The best adventure jacket money can buy. Waterproof, breathable, and incredibly durable. Perfect for any weather condition and terrain.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '6 days');

-- Insert sample rides
INSERT INTO rides (id, user_id, motorcycle_id, title, description, location, distance_miles, duration_minutes, avg_speed_mph, max_speed_mph, start_time, end_time, start_latitude, start_longitude, end_latitude, end_longitude, weather_data, is_public, likes_count, comments_count, created_at) VALUES
-- Alex's rides
(
  '770e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  'Epic Sunrise Canyon Run',
  'Started early to catch the sunrise at Angeles Crest Highway. Perfect weather and amazing views throughout the ride.',
  'Angeles Crest Highway, CA',
  127.8,
  225,
  34.1,
  78.5,
  NOW() - INTERVAL '2 hours',
  NOW() - INTERVAL '2 hours' + INTERVAL '225 minutes',
  34.2804,
  -118.0104,
  34.3774,
  -117.9048,
  '{"temperature": "58°F", "condition": "Clear", "humidity": "45%", "windSpeed": "8 mph", "visibility": "10+ miles"}',
  true,
  12,
  3,
  NOW() - INTERVAL '2 hours'
),
(
  '770e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440002',
  'Morning Canyon Run',
  'Quick morning ride through the local canyons before work.',
  'Angeles Crest Highway Loop',
  87.3,
  135,
  38.8,
  65.2,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days' + INTERVAL '135 minutes',
  34.2804,
  -118.0104,
  34.3774,
  -117.9048,
  '{"temperature": "62°F", "condition": "Partly Cloudy", "humidity": "52%", "windSpeed": "6 mph", "visibility": "8 miles"}',
  true,
  8,
  2,
  NOW() - INTERVAL '3 days'
),

-- Sarah's rides
(
  '770e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440002',
  '660e8400-e29b-41d4-a716-446655440003',
  'Pacific Coast Highway Adventure',
  'Beautiful coastal ride with perfect weather. Stopped for photos at several scenic overlooks.',
  'Big Sur, CA',
  89.3,
  150,
  35.7,
  72.1,
  NOW() - INTERVAL '4 hours',
  NOW() - INTERVAL '4 hours' + INTERVAL '150 minutes',
  36.4581,
  -121.9018,
  36.0827,
  -121.6564,
  '{"temperature": "65°F", "condition": "Partly Cloudy", "humidity": "72%", "windSpeed": "12 mph", "visibility": "8 miles"}',
  true,
  8,
  1,
  NOW() - INTERVAL '4 hours'
),

-- Mike's rides
(
  '770e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440003',
  'Morning Track Session',
  'Early morning track day at Laguna Seca. Perfect conditions and great lap times.',
  'Laguna Seca Raceway, CA',
  45.2,
  75,
  36.2,
  142.8,
  NOW() - INTERVAL '6 hours',
  NOW() - INTERVAL '6 hours' + INTERVAL '75 minutes',
  36.5844,
  -121.7536,
  36.5844,
  -121.7536,
  '{"temperature": "55°F", "condition": "Clear", "humidity": "38%", "windSpeed": "5 mph", "visibility": "10+ miles"}',
  true,
  15,
  5,
  NOW() - INTERVAL '6 hours'
),

-- Emma's rides
(
  '770e8400-e29b-41d4-a716-446655440005',
  '550e8400-e29b-41d4-a716-446655440004',
  '660e8400-e29b-41d4-a716-446655440004',
  'Desert Backroads Exploration',
  'Amazing day exploring the desert backroads around Joshua Tree. Some challenging off-road sections.',
  'Joshua Tree, CA',
  156.7,
  260,
  36.1,
  68.3,
  NOW() - INTERVAL '8 hours',
  NOW() - INTERVAL '8 hours' + INTERVAL '260 minutes',
  33.8734,
  -115.901,
  34.1358,
  -116.0544,
  '{"temperature": "72°F", "condition": "Sunny", "humidity": "25%", "windSpeed": "10 mph", "visibility": "10+ miles"}',
  true,
  23,
  7,
  NOW() - INTERVAL '8 hours'
);

-- Insert ride images
INSERT INTO ride_images (ride_id, image_url, caption, timestamp, created_at) VALUES
-- Epic Sunrise Canyon Run images
('770e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=300&width=400', 'Starting the ride at sunrise', NOW() - INTERVAL '2 hours' + INTERVAL '15 minutes', NOW() - INTERVAL '2 hours'),
('770e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=300&width=400', 'Amazing canyon views', NOW() - INTERVAL '2 hours' + INTERVAL '75 minutes', NOW() - INTERVAL '2 hours'),
('770e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=300&width=400', 'Quick photo stop at the overlook', NOW() - INTERVAL '2 hours' + INTERVAL '165 minutes', NOW() - INTERVAL '2 hours'),

-- Pacific Coast Highway images
('770e8400-e29b-41d4-a716-446655440003', '/placeholder.svg?height=300&width=400', 'Stunning ocean views along PCH', NOW() - INTERVAL '4 hours' + INTERVAL '30 minutes', NOW() - INTERVAL '4 hours'),
('770e8400-e29b-41d4-a716-446655440003', '/placeholder.svg?height=300&width=400', 'Big Sur coastline', NOW() - INTERVAL '4 hours' + INTERVAL '105 minutes', NOW() - INTERVAL '4 hours'),

-- Track session images
('770e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=300&width=400', 'Ready for track session', NOW() - INTERVAL '6 hours' + INTERVAL '10 minutes', NOW() - INTERVAL '6 hours'),
('770e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=300&width=400', 'Perfect lean angle through the corkscrew', NOW() - INTERVAL '6 hours' + INTERVAL '45 minutes', NOW() - INTERVAL '6 hours'),

-- Desert exploration images
('770e8400-e29b-41d4-a716-446655440005', '/placeholder.svg?height=300&width=400', 'Desert landscape', NOW() - INTERVAL '8 hours' + INTERVAL '60 minutes', NOW() - INTERVAL '8 hours'),
('770e8400-e29b-41d4-a716-446655440005', '/placeholder.svg?height=300&width=400', 'Off-road section', NOW() - INTERVAL '8 hours' + INTERVAL '180 minutes', NOW() - INTERVAL '8 hours');

-- Insert ride participants (group rides)
INSERT INTO ride_participants (ride_id, user_id, created_at) VALUES
-- Epic Sunrise Canyon Run participants
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '2 hours'),
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '2 hours'),

-- Desert exploration participants
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '8 hours'),
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '8 hours');

-- Insert ride likes
INSERT INTO ride_likes (ride_id, user_id, created_at) VALUES
-- Likes for Epic Sunrise Canyon Run
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '1 hour 30 minutes'),
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '1 hour 15 minutes'),
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '1 hour'),

-- Likes for other rides
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '3 hours 30 minutes'),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '5 hours 30 minutes'),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '5 hours 15 minutes'),
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '7 hours 30 minutes');

-- Insert ride comments
INSERT INTO ride_comments (ride_id, user_id, comment, created_at) VALUES
-- Comments on Epic Sunrise Canyon Run
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Amazing route! Those curves were perfect.', NOW() - INTERVAL '1 hour'),
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'Great ride today! Can''t wait for the next one.', NOW() - INTERVAL '45 minutes'),
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'Wish I could have joined you guys! Next time for sure.', NOW() - INTERVAL '30 minutes'),

-- Comments on Pacific Coast Highway ride
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Beautiful coastal views! Love this route.', NOW() - INTERVAL '2 hours'),

-- Comments on track session
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Incredible lap times! That bike is a rocket.', NOW() - INTERVAL '4 hours 30 minutes'),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Track days are the best! Great photos too.', NOW() - INTERVAL '4 hours 15 minutes'),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Thanks for the tips on turn 5! Really helped my times.', NOW() - INTERVAL '4 hours'),

-- Comments on desert exploration
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'That off-road section looked challenging! Great adventure.', NOW() - INTERVAL '6 hours 30 minutes'),
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'The desert scenery is incredible. Need to plan a trip there soon.', NOW() - INTERVAL '6 hours 15 minutes');
