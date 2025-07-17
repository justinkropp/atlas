"use client"

import type React from "react"
import { useState } from "react"
import { signUp, signIn } from "@/app/actions/auth"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      if (isSignUp) {
        const result = await signUp(email, password)
        if (result.error) {
          setError(result.error)
        } else {
          setMessage("Check your email for a confirmation link!")
        }
      } else {
        const result = await signIn(email, password)
        if (result.error) {
          setError(result.error)
        }
        // If successful, signIn will redirect automatically
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (message) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="geist-card text-center">
            <div
              className="mx-auto w-12 h-12 flex items-center justify-center mb-4"
              style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
            >
              <span className="font-bold">✓</span>
            </div>
            <h2 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
              Check Your Email
            </h2>
            <p className="mb-4" style={{ color: "var(--geist-accents-5)" }}>
              We've sent a confirmation link to <strong>{email}</strong>
            </p>
            <p className="mb-4" style={{ color: "var(--geist-accents-4)" }}>
              Click the link in your email to confirm your account and sign in.
            </p>
            <button
              onClick={() => {
                setMessage("")
                setEmail("")
                setPassword("")
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
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          <p className="mb-6" style={{ color: "var(--geist-accents-5)" }}>
            {isSignUp ? "Create your Atlas account to start tracking rides" : "Sign in to your Atlas account"}
          </p>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="geist-input"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="geist-input"
              minLength={6}
            />
            <button
              type="submit"
              className="geist-button geist-button-primary w-full"
              disabled={isLoading || !email || !password}
            >
              {isLoading
                ? isSignUp
                  ? "Creating Account..."
                  : "Signing In..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
                setMessage("")
              }}
              className="text-sm hover:underline"
              style={{ color: "var(--geist-accents-5)" }}
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Create one"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p style={{ color: "var(--geist-accents-4)" }}>
              By {isSignUp ? "creating an account" : "signing in"}, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="font-medium mb-4" style={{ color: "var(--geist-foreground)" }}>
            What you can do:
          </h2>
          <div className="grid grid-cols-1 gap-3" style={{ color: "var(--geist-accents-5)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2" style={{ background: "var(--geist-foreground)" }}></div>
              Track your daily motorcycle rides and routes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2" style={{ background: "var(--geist-foreground)" }}></div>
              Log detailed ride information and statistics
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2" style={{ background: "var(--geist-foreground)" }}></div>
              Manage your motorcycle garage and maintenance
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
