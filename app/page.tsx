"use client"

import type React from "react"
import { useState } from "react"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [linkSent, setLinkSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setLinkSent(true)
  }

  if (linkSent) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="geist-card text-center">
            <div
              className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
            >
              <span className="font-bold">✓</span>
            </div>
            <h2 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
              Check Your Email
            </h2>
            <p className="mb-4" style={{ color: "var(--geist-accents-5)" }}>
              We've sent a magic link to <strong>{email}</strong>
            </p>
            <p className="mb-4" style={{ color: "var(--geist-accents-4)" }}>
              Click the link in your email to sign in to your account.
            </p>
            <button
              onClick={() => {
                setLinkSent(false)
                setEmail("")
              }}
              className="geist-button geist-button-secondary w-full"
            >
              Try Different Email
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
            Welcome to Atlas
          </h1>
          <p style={{ color: "var(--geist-accents-5)" }}>
            Track your motorcycle rides, manage your garage, and stay on the road
          </p>
        </div>

        <div className="geist-card">
          <h2 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
            Sign In with Magic Link
          </h2>
          <p className="mb-6" style={{ color: "var(--geist-accents-5)" }}>
            Enter your email address and we'll send you a secure link to sign in
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="geist-input"
            />
            <button type="submit" className="geist-button geist-button-primary w-full" disabled={isLoading || !email}>
              {isLoading ? "Sending Magic Link..." : "Send Magic Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p style={{ color: "var(--geist-accents-4)" }}>
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="font-medium mb-4" style={{ color: "var(--geist-foreground)" }}>
            What you can do:
          </h2>
          <div className="grid grid-cols-1 gap-3" style={{ color: "var(--geist-accents-5)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "var(--geist-foreground)" }}></div>
              Track your daily motorcycle rides and routes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "var(--geist-foreground)" }}></div>
              Log detailed ride information and statistics
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "var(--geist-foreground)" }}></div>
              Manage your motorcycle garage and maintenance
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
