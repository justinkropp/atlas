"use client"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/activity")
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

        <div className="mb-12">
          <button onClick={handleGetStarted} className="geist-button geist-button-primary text-lg px-8 py-4">
            Get Started
          </button>
        </div>

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
