-- This script inserts sample data for the currently authenticated user
-- Replace 'YOUR_USER_ID_HERE' with your actual user ID from auth.users

-- First, get your user ID by running: SELECT id FROM auth.users WHERE email = 'your-email@example.com';
-- Then replace the placeholder below with your actual user ID

DO $$
DECLARE
    current_user_id UUID := 'YOUR_USER_ID_HERE'; -- Replace with your actual user ID
    motorcycle_1_id UUID := gen_random_uuid();
    motorcycle_2_id UUID := gen_random_uuid();
    ride_1_id UUID := gen_random_uuid();
    ride_2_id UUID := gen_random_uuid();
    ride_3_id UUID := gen_random_uuid();
BEGIN
    -- Insert or update profile for current user
    INSERT INTO profiles (id, username, full_name, bio, location, avatar_url, created_at) 
    VALUES (
        current_user_id,
        'your_username',
        'Your Name',
        'Passionate motorcycle rider exploring scenic routes. Love weekend adventures and canyon runs.',
        'Your City, State',
        '/placeholder.svg?height=120&width=120',
        NOW() - INTERVAL '30 days'
    )
    ON CONFLICT (id) DO UPDATE SET
        username = EXCLUDED.username,
        full_name = EXCLUDED.full_name,
        bio = EXCLUDED.bio,
        location = EXCLUDED.location,
        avatar_url = EXCLUDED.avatar_url;

    -- Insert sample motorcycles for current user
    INSERT INTO motorcycles (id, user_id, name, make, model, year, color, engine, type, mileage, last_service_date, status, notes, main_image_url, created_at) VALUES
    (
        motorcycle_1_id,
        current_user_id,
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
        motorcycle_2_id,
        current_user_id,
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
    );

    -- Insert motorcycle images
    INSERT INTO motorcycle_images (motorcycle_id, image_url, caption, is_main, created_at) VALUES
    -- Yamaha MT-09 images
    (motorcycle_1_id, '/placeholder.svg?height=300&width=400', 'Side profile view', true, NOW() - INTERVAL '25 days'),
    (motorcycle_1_id, '/placeholder.svg?height=300&width=400', 'Front view', false, NOW() - INTERVAL '25 days'),
    (motorcycle_1_id, '/placeholder.svg?height=300&width=400', 'Rear view', false, NOW() - INTERVAL '25 days'),
    (motorcycle_1_id, '/placeholder.svg?height=300&width=400', 'Engine detail', false, NOW() - INTERVAL '25 days'),
    -- Honda CB650R images
    (motorcycle_2_id, '/placeholder.svg?height=300&width=400', 'Side profile', true, NOW() - INTERVAL '20 days'),
    (motorcycle_2_id, '/placeholder.svg?height=300&width=400', 'Front angle', false, NOW() - INTERVAL '20 days'),
    (motorcycle_2_id, '/placeholder.svg?height=300&width=400', 'Dashboard view', false, NOW() - INTERVAL '20 days');

    -- Insert motorcycle modifications
    INSERT INTO motorcycle_modifications (motorcycle_id, name, category, price, purchase_date, purchase_link, rating, notes, image_url, created_at) VALUES
    -- Yamaha MT-09 modifications
    (motorcycle_1_id, 'Akrapovic Slip-On Exhaust', 'Exhaust', 899.99, '2023-09-15', 'https://revzilla.com/motorcycle/akrapovic-slip-on-exhaust-yamaha-mt09', 4.9, 'Incredible sound improvement and weight reduction. Installation was straightforward and the build quality is exceptional.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '20 days'),
    (motorcycle_1_id, 'Puig Windscreen', 'Bodywork', 129.99, '2023-08-20', 'https://puigusa.com/en/tuning-motorcycles/windscreens/yamaha/mt-09', 4.3, 'Good wind protection for highway riding. Easy to install and looks great with the bike design.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '18 days'),
    -- Honda CB650R modifications
    (motorcycle_2_id, 'Yoshimura R-77 Exhaust', 'Exhaust', 749.99, '2022-11-12', 'https://yoshimura-rd.com/products/honda-cb650r-r77-exhaust', 4.6, 'Great sound and performance gain. The carbon fiber finish looks amazing.', '/placeholder.svg?height=200&width=300', NOW() - INTERVAL '12 days');

    -- Insert sample gear for current user
    INSERT INTO gear (user_id, name, category, condition, price, purchase_date, purchase_link, rating, notes, review_notes, image_url, created_at) VALUES
    (current_user_id, 'Shoei RF-1400 Helmet', 'helmet', 'excellent', 549.99, '2023-08-15', 'https://revzilla.com/motorcycle/shoei-rf-1400-helmet', 4.8, 'Primary helmet, very comfortable for long rides', 'Outstanding helmet with excellent ventilation and noise reduction. Perfect fit and incredibly comfortable.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '15 days'),
    (current_user_id, 'Alpinestars GP Pro Jacket', 'jacket', 'good', 399.95, '2022-05-20', 'https://alpinestars.com/products/gp-pro-jacket', 4.5, 'Great protection, some wear on elbows', 'Solid protection with good airflow. Some wear after 2 years but still functional.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '12 days'),
    (current_user_id, 'Dainese Delta 3 Gloves', 'gloves', 'fair', 89.95, '2023-03-10', 'https://dainese.com/us/en/delta-3-gloves', 4.2, 'Need replacement soon, palm wear visible', 'Good gloves but palm material wears out faster than expected.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '10 days'),
    (current_user_id, 'TCX Street Ace Boots', 'boots', 'excellent', 179.99, '2023-11-02', 'https://tcxboots.com/en/street-ace-boots', 4.7, 'New boots, great ankle protection', 'Excellent boots with solid protection. Very comfortable and waterproof.', '/placeholder.svg?height=100&width=100', NOW() - INTERVAL '8 days');

    -- Insert sample rides for current user
    INSERT INTO rides (id, user_id, motorcycle_id, title, description, location, distance_miles, duration_minutes, avg_speed_mph, max_speed_mph, start_time, end_time, start_latitude, start_longitude, end_latitude, end_longitude, weather_data, is_public, likes_count, comments_count, created_at) VALUES
    (
        ride_1_id,
        current_user_id,
        motorcycle_1_id,
        'Morning Canyon Run',
        'Perfect morning ride through the local canyons. Great weather and smooth roads.',
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
        '{"temperature": "62°F", "condition": "Clear", "humidity": "45%", "windSpeed": "8 mph", "visibility": "10+ miles"}',
        true,
        5,
        2,
        NOW() - INTERVAL '3 days'
    ),
    (
        ride_2_id,
        current_user_id,
        motorcycle_2_id,
        'Weekend Coastal Cruise',
        'Beautiful coastal ride with amazing ocean views. Stopped for lunch at a seaside cafe.',
        'Pacific Coast Highway',
        156.2,
        270,
        34.7,
        72.1,
        NOW() - INTERVAL '5 days',
        NOW() - INTERVAL '5 days' + INTERVAL '270 minutes',
        36.4581,
        -121.9018,
        36.0827,
        -121.6564,
        '{"temperature": "68°F", "condition": "Partly Cloudy", "humidity": "65%", "windSpeed": "12 mph", "visibility": "8 miles"}',
        true,
        8,
        3,
        NOW() - INTERVAL '5 days'
    ),
    (
        ride_3_id,
        current_user_id,
        motorcycle_1_id,
        'Evening City Ride',
        'Quick evening ride through the city to clear my head after work.',
        'Downtown Circuit',
        23.2,
        75,
        18.6,
        45.3,
        NOW() - INTERVAL '1 day',
        NOW() - INTERVAL '1 day' + INTERVAL '75 minutes',
        34.0522,
        -118.2437,
        34.0928,
        -118.3287,
        '{"temperature": "72°F", "condition": "Clear", "humidity": "55%", "windSpeed": "6 mph", "visibility": "10+ miles"}',
        true,
        3,
        1,
        NOW() - INTERVAL '1 day'
    );

    -- Insert ride images
    INSERT INTO ride_images (ride_id, image_url, caption, timestamp, created_at) VALUES
    -- Morning Canyon Run images
    (ride_1_id, '/placeholder.svg?height=300&width=400', 'Starting the canyon run', NOW() - INTERVAL '3 days' + INTERVAL '15 minutes', NOW() - INTERVAL '3 days'),
    (ride_1_id, '/placeholder.svg?height=300&width=400', 'Beautiful mountain views', NOW() - INTERVAL '3 days' + INTERVAL '75 minutes', NOW() - INTERVAL '3 days'),
    -- Weekend Coastal Cruise images
    (ride_2_id, '/placeholder.svg?height=300&width=400', 'Ocean views along PCH', NOW() - INTERVAL '5 days' + INTERVAL '60 minutes', NOW() - INTERVAL '5 days'),
    (ride_2_id, '/placeholder.svg?height=300&width=400', 'Lunch stop by the beach', NOW() - INTERVAL '5 days' + INTERVAL '180 minutes', NOW() - INTERVAL '5 days'),
    -- Evening City Ride images
    (ride_3_id, '/placeholder.svg?height=300&width=400', 'City lights at sunset', NOW() - INTERVAL '1 day' + INTERVAL '30 minutes', NOW() - INTERVAL '1 day');

END $$;
