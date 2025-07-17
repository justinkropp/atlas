import { createClient } from "@/lib/supabase-server"

// Profile queries
export async function getProfile(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, updates: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) throw error
  return data
}

// Motorcycle queries
export async function getUserMotorcycles(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("motorcycles")
    .select(`
      *,
      motorcycle_images(*),
      motorcycle_modifications(*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getMotorcycleById(motorcycleId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("motorcycles")
    .select(`
      *,
      motorcycle_images(*),
      motorcycle_modifications(*)
    `)
    .eq("id", motorcycleId)
    .single()

  if (error) throw error
  return data
}

// Gear queries
export async function getUserGear(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("gear")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Ride queries
export async function getUserRides(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("rides")
    .select(`
      *,
      motorcycles(name),
      ride_images(*),
      ride_participants(
        user_id,
        profiles(username, avatar_url)
      ),
      profiles(username, avatar_url)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getPublicRides() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("rides")
    .select(`
      *,
      motorcycles(name),
      ride_images(*),
      ride_participants(
        user_id,
        profiles(username, avatar_url)
      ),
      profiles(username, avatar_url)
    `)
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) throw error
  return data
}

export async function getRideById(rideId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("rides")
    .select(`
      *,
      motorcycles(name),
      ride_images(*),
      ride_participants(
        user_id,
        profiles(username, avatar_url)
      ),
      ride_comments(
        *,
        profiles(username, avatar_url)
      ),
      profiles(username, avatar_url)
    `)
    .eq("id", rideId)
    .single()

  if (error) throw error
  return data
}

// File upload helpers
export async function uploadFile(bucket: string, path: string, file: File) {
  const supabase = createClient()

  const { data, error } = await supabase.storage.from(bucket).upload(path, file)

  if (error) throw error
  return data
}

export function getPublicUrl(bucket: string, path: string) {
  const supabase = createClient()

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)

  return data.publicUrl
}
