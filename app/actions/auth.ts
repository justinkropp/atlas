"use server"

import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

export async function signInWithMagicLink(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { data, success: true }
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  redirect("/")
}
