"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithMagicLink } from "@/app/actions/auth"
import { useAuth } from "@/components/auth-provider"

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleGetStarted = () => {
    router.push("/activity")
  }

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const result = await signInWithMagicLink(email)
      if (result.error) {
        setError(result.error)
      } else {
        setMessage("Check your email for a magic link to sign in!")
        setEmail("")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Show different content if user is already signed in
  if (!loading && user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="font-medium mb-4" style={{ color: "var(--geist-foreground)", fontSize: "48px" }}>
              Welcome back to Atlas
            </h1>
            <p className="text-xl mb-8" style={{ color: "var(--geist-accents-5)" }}>
              Ready to track your next motorcycle adventure?
            </p>
          </div>

          <div className="max-w-md mx-auto mb-12">
            <div className="geist-card">
              <h2 className="font-medium mb-4" style={{ color: "var(--geist-foreground)" }}>
                You're signed in!
              </h2>
              <div className="space-y-3">
                <button onClick={() => router.push("/activity")} className="geist-button geist-button-primary w-full">
                  View Activity Feed
                </button>
                <button onClick={() => router.push("/my-rides")} className="geist-button geist-button-secondary w-full">
                  My Rides
                </button>
                <button
                  onClick={() => router.push("/my-garage")}
                  className="geist-button geist-button-secondary w-full"
                >
                  My Garage
                </button>
              </div>
            </div>
          </div>

          {/* ... existing code ... */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="geist-card text-center">
              <div
                className="mx-auto w-16 h-16 flex items-center justify-center mb-4"
                style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
              >
                <span className="font-bold text-xl">R</span>
              </div>
              <h3 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
                Track Your Rides
              </h3>
              <p style={{ color: "var(--geist-accents-5)" }}>
                Log detailed ride information, routes, and statistics for every motorcycle adventure
              </p>
            </div>

            <div className="geist-card text-center">
              <div
                className="mx-auto w-16 h-16 flex items-center justify-center mb-4"
                style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
              >
                <span className="font-bold text-xl">G</span>
              </div>
              <h3 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
                Manage Your Garage
              </h3>
              <p style={{ color: "var(--geist-accents-5)" }}>
                Keep track of your motorcycles, gear, modifications, and maintenance schedules
              </p>
            </div>

            <div className="geist-card text-center">
              <div
                className="mx-auto w-16 h-16 flex items-center justify-center mb-4"
                style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
              >
                <span className="font-bold text-xl">C</span>
              </div>
              <h3 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
                Connect with Riders
              </h3>
              <p style={{ color: "var(--geist-accents-5)" }}>
                Share your rides, discover new routes, and connect with the motorcycle community
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-medium mb-8" style={{ color: "var(--geist-foreground)", fontSize: "32px" }}>
              Everything you need to track your rides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2" style={{ background: "var(--geist-foreground)" }}></div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                    Route Mapping
                  </h4>
                  <p style={{ color: "var(--geist-accents-5)" }}>
                    Interactive maps with GPS tracking and route visualization
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2" style={{ background: "var(--geist-foreground)" }}></div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                    Ride Statistics
                  </h4>
                  <p style={{ color: "var(--geist-accents-5)" }}>Distance, duration, speed, and weather tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2" style={{ background: "var(--geist-foreground)" }}></div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                    Garage Management
                  </h4>
                  <p style={{ color: "var(--geist-accents-5)" }}>
                    Track motorcycles, gear, modifications, and maintenance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2" style={{ background: "var(--geist-foreground)" }}></div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                    Social Features
                  </h4>
                  <p style={{ color: "var(--geist-accents-5)" }}>
                    Share rides, follow other riders, and discover new routes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="font-medium mb-4" style={{ color: "var(--geist-foreground)", fontSize: "48px" }}>
            Welcome to Atlas
          </h1>
          <p className="text-xl mb-8" style={{ color: "var(--geist-accents-5)" }}>
            Track your motorcycle rides, manage your garage, and stay on the road
          </p>
        </div>

        {/* Getting Started Section */}
        <div className="max-w-md mx-auto mb-12">
          <div className="geist-card">
            <h2 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
              Get Started
            </h2>
            <p className="mb-6" style={{ color: "var(--geist-accents-5)" }}>
              Sign in or create an account with just your email
            </p>

            {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700">{message}</div>}

            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700">{error}</div>}

            <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="geist-input"
                disabled={isLoading}
              />
              <button type="submit" className="geist-button geist-button-primary w-full" disabled={isLoading || !email}>
                {isLoading ? "Sending magic link..." : "Send Magic Link"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={handleGetStarted}
                className="text-sm hover:underline"
                style={{ color: "var(--geist-accents-5)" }}
              >
                Or continue without signing in
              </button>
            </div>
          </div>
        </div>

        {/* ... existing code ... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="geist-card text-center">
            <div
              className="mx-auto w-16 h-16 flex items-center justify-center mb-4"
              style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
            >
              <span className="font-bold text-xl">R</span>
            </div>
            <h3 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
              Track Your Rides
            </h3>
            <p style={{ color: "var(--geist-accents-5)" }}>
              Log detailed ride information, routes, and statistics for every motorcycle adventure
            </p>
          </div>

          <div className="geist-card text-center">
            <div
              className="mx-auto w-16 h-16 flex items-center justify-center mb-4"
              style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
            >
              <span className="font-bold text-xl">G</span>
            </div>
            <h3 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
              Manage Your Garage
            </h3>
            <p style={{ color: "var(--geist-accents-5)" }}>
              Keep track of your motorcycles, gear, modifications, and maintenance schedules
            </p>
          </div>

          <div className="geist-card text-center">
            <div
              className="mx-auto w-16 h-16 flex items-center justify-center mb-4"
              style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
            >
              <span className="font-bold text-xl">C</span>
            </div>
            <h3 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
              Connect with Riders
            </h3>
            <p style={{ color: "var(--geist-accents-5)" }}>
              Share your rides, discover new routes, and connect with the motorcycle community
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-medium mb-8" style={{ color: "var(--geist-foreground)", fontSize: "32px" }}>
            Everything you need to track your rides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2" style={{ background: "var(--geist-foreground)" }}></div>
              <div>
                <h4 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                  Route Mapping
                </h4>
                <p style={{ color: "var(--geist-accents-5)" }}>
                  Interactive maps with GPS tracking and route visualization
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2" style={{ background: "var(--geist-foreground)" }}></div>
              <div>
                <h4 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                  Ride Statistics
                </h4>
                <p style={{ color: "var(--geist-accents-5)" }}>Distance, duration, speed, and weather tracking</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2" style={{ background: "var(--geist-foreground)" }}></div>
              <div>
                <h4 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                  Garage Management
                </h4>
                <p style={{ color: "var(--geist-accents-5)" }}>
                  Track motorcycles, gear, modifications, and maintenance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2" style={{ background: "var(--geist-foreground)" }}></div>
              <div>
                <h4 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                  Social Features
                </h4>
                <p style={{ color: "var(--geist-accents-5)" }}>
                  Share rides, follow other riders, and discover new routes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
