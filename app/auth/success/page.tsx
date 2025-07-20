"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export default function AuthSuccess() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!loading && user) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push("/activity")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="geist-card text-center">
            <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-black mx-auto mb-4"></div>
            <p style={{ color: "var(--geist-accents-5)" }}>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="geist-card text-center">
            <div
              className="mx-auto w-12 h-12 flex items-center justify-center mb-4"
              style={{ background: "var(--geist-error)", color: "var(--geist-background)" }}
            >
              <span className="font-bold">!</span>
            </div>
            <h2 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
              Authentication Required
            </h2>
            <p className="mb-4" style={{ color: "var(--geist-accents-5)" }}>
              Please sign in to continue.
            </p>
            <button onClick={() => router.push("/")} className="geist-button geist-button-primary w-full">
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="geist-card text-center">
          <div
            className="mx-auto w-12 h-12 flex items-center justify-center mb-4"
            style={{ background: "var(--geist-success)", color: "var(--geist-background)" }}
          >
            <span className="font-bold">✓</span>
          </div>
          <h2 className="font-medium mb-2" style={{ color: "var(--geist-foreground)" }}>
            Welcome to Atlas!
          </h2>
          <p className="mb-4" style={{ color: "var(--geist-accents-5)" }}>
            You've successfully signed in. Get ready to track your motorcycle adventures.
          </p>
          <p className="mb-6" style={{ color: "var(--geist-accents-4)" }}>
            Redirecting to your activity feed in {countdown} seconds...
          </p>
          <div className="space-y-2">
            <button onClick={() => router.push("/activity")} className="geist-button geist-button-primary w-full">
              Go to Activity Feed
            </button>
            <button onClick={() => router.push("/my-garage")} className="geist-button geist-button-secondary w-full">
              Set Up My Garage
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
