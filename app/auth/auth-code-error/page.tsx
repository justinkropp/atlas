"use client"

import { useRouter } from "next/navigation"

export default function AuthCodeError() {
  const router = useRouter()

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
            Authentication Error
          </h2>
          <p className="mb-4" style={{ color: "var(--geist-accents-5)" }}>
            There was an issue with your magic link. Please try signing in again.
          </p>
          <button onClick={() => router.push("/")} className="geist-button geist-button-primary w-full">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
