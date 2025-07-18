"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { GoogleMap } from "@/components/google-map"

// ---------- DUMMY RIDES ----------
const myRides = [
  {
    id: 1,
    title: "Morning Canyon Run",
    location: "Angeles Crest Highway Loop",
    distance: "87.3 miles",
    duration: "2h 15min",
    avgSpeed: "38.8 mph",
    motorcycle: "Yamaha MT-09",
    timestamp: "3 days ago",
    mapCenter: { lat: 34.2804, lng: -118.0104 },
    routeMarkers: [
      { lat: 34.2804, lng: -118.0104, title: "Start" },
      { lat: 34.3774, lng: -117.9048, title: "End" },
    ],
    rideWith: [],
    initialLikes: 5,
    initialComments: 2,
  },
  {
    id: 2,
    title: "Weekend Coastal Cruise",
    location: "Pacific Coast Highway",
    distance: "156.2 miles",
    duration: "4h 30min",
    avgSpeed: "34.7 mph",
    motorcycle: "Honda CB650R",
    timestamp: "5 days ago",
    mapCenter: { lat: 36.4581, lng: -121.9018 },
    routeMarkers: [
      { lat: 36.4581, lng: -121.9018, title: "Start" },
      { lat: 36.0827, lng: -121.6564, title: "End" },
    ],
    rideWith: [],
    initialLikes: 8,
    initialComments: 3,
  },
  {
    id: 3,
    title: "Evening City Ride",
    location: "Downtown Circuit",
    distance: "23.2 miles",
    duration: "1h 15min",
    avgSpeed: "18.6 mph",
    motorcycle: "Yamaha MT-09",
    timestamp: "1 day ago",
    mapCenter: { lat: 34.0522, lng: -118.2437 },
    routeMarkers: [
      { lat: 34.0522, lng: -118.2437, title: "Start" },
      { lat: 34.0928, lng: -118.3287, title: "End" },
    ],
    rideWith: [],
    initialLikes: 3,
    initialComments: 1,
  },
]
// ----------------------------------

export default function MyRidesPage() {
  const router = useRouter()
  const [likedRides, setLikedRides] = useState<Set<number>>(new Set())
  const [bookmarkedRides, setBookmarkedRides] = useState<Set<number>>(new Set())

  const navigateToRide = (id: number) => router.push(`/ride/${id}`)
  const toggleLike = (id: number) =>
    setLikedRides((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  const toggleBookmark = (id: number) =>
    setBookmarkedRides((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Rides</h1>
          <p className="text-gray-600">Track and review all your motorcycle adventures</p>
        </div>
        <Button className="flex items-center gap-2">Log New Ride</Button>
      </div>

      <div className="space-y-6">
        {myRides.map((ride) => (
          <Card key={ride.id} className="transition-shadow mx-auto" style={{ maxWidth: "800px" }}>
            {/* Map */}
            <GoogleMap center={ride.mapCenter} zoom={11} markers={ride.routeMarkers} className="w-full h-96" />

            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <span className="text-white font-bold">You</span>
                </div>
                <div>
                  <p className="font-bold text-black">You</p>
                  <p className="text-gray-500">{ride.timestamp}</p>
                </div>
              </div>

              <button
                className="text-xl mb-2 cursor-pointer hover:text-gray-700 transition-colors font-bold text-left w-full"
                onClick={() => navigateToRide(ride.id)}
              >
                {ride.title}
              </button>
              <CardDescription className="text-gray-600 mb-4">{ride.location}</CardDescription>

              <div className="mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">Rode:</span> {ride.motorcycle}
                </p>
              </div>

              {ride.rideWith.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Rode with:</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {ride.rideWith.map((rider, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <img
                          src={rider.avatar || "/placeholder.svg"}
                          alt={`${rider.username} avatar`}
                          className="w-6 h-6 bg-gray-200"
                        />
                        <span className="text-gray-900">{rider.username}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="font-bold text-black">{ride.distance}</p>
                  <p className="text-gray-600">Distance</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-black">{ride.duration}</p>
                  <p className="text-gray-600">Duration</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-black">{ride.avgSpeed}</p>
                  <p className="text-gray-600">Avg Speed</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(ride.id)}
                    className={`flex items-center gap-2 px-3 py-1 transition-colors ${
                      likedRides.has(ride.id) ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <span>{likedRides.has(ride.id) ? "♥" : "♡"}</span>
                    <span>{ride.initialLikes + (likedRides.has(ride.id) ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={() => navigateToRide(ride.id)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <span>💬</span>
                    <span>{ride.initialComments}</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleBookmark(ride.id)}
                  className={`px-3 py-1 transition-colors ${
                    bookmarkedRides.has(ride.id) ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {bookmarkedRides.has(ride.id) ? "★" : "☆"}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}

        {myRides.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-12 h-12 bg-black flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">R</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No rides yet</h3>
              <p className="text-gray-600 mb-4">Start tracking your motorcycle rides to see them here</p>
              <Button>Log Your First Ride</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
