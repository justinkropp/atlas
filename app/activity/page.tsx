"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { GoogleMap } from "@/components/google-map"

// Dummy activity data
const followedRiderActivities = [
  {
    id: 1,
    rider: {
      username: "canyon_rider_92",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Epic Sunrise Canyon Run",
    location: "Angeles Crest Highway, CA",
    distance: "127.8 miles",
    duration: "3h 45min",
    avgSpeed: "34.1 mph",
    motorcycle: "Yamaha MT-09",
    rideWith: [
      { username: "speed_demon", avatar: "/placeholder.svg?height=32&width=32" },
      { username: "mountain_rider", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    mapCenter: { lat: 34.2804, lng: -118.0104 },
    routeMarkers: [
      { lat: 34.2804, lng: -118.0104, title: "Start - Angeles Crest Highway" },
      { lat: 34.3774, lng: -117.9048, title: "End - Wrightwood" },
    ],
    routeImage: "/placeholder.svg?height=200&width=400",
    timestamp: "2 hours ago",
    initialLikes: 12,
    initialComments: 3,
  },
  {
    id: 2,
    rider: {
      username: "coastal_cruiser",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Pacific Coast Highway Adventure",
    location: "Big Sur, CA",
    distance: "89.3 miles",
    duration: "2h 30min",
    avgSpeed: "35.7 mph",
    motorcycle: "Honda CB650R",
    rideWith: [],
    mapCenter: { lat: 36.2704, lng: -121.8081 },
    routeMarkers: [
      { lat: 36.4581, lng: -121.9018, title: "Start - Carmel" },
      { lat: 36.0827, lng: -121.6564, title: "End - San Simeon" },
    ],
    routeImage: "/placeholder.svg?height=200&width=400",
    timestamp: "4 hours ago",
    initialLikes: 8,
    initialComments: 1,
  },
  {
    id: 3,
    rider: {
      username: "track_day_hero",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Morning Track Session",
    location: "Laguna Seca Raceway, CA",
    distance: "45.2 miles",
    duration: "1h 15min",
    avgSpeed: "36.2 mph",
    motorcycle: "Kawasaki Ninja ZX-6R",
    rideWith: [{ username: "track_master", avatar: "/placeholder.svg?height=32&width=32" }],
    mapCenter: { lat: 36.5844, lng: -121.7536 },
    routeMarkers: [{ lat: 36.5844, lng: -121.7536, title: "Laguna Seca Raceway" }],
    routeImage: "/placeholder.svg?height=200&width=400",
    timestamp: "6 hours ago",
    initialLikes: 15,
    initialComments: 5,
  },
  {
    id: 4,
    rider: {
      username: "adventure_seeker",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Desert Backroads Exploration",
    location: "Joshua Tree, CA",
    distance: "156.7 miles",
    duration: "4h 20min",
    avgSpeed: "36.1 mph",
    motorcycle: "BMW R1250GS",
    rideWith: [
      { username: "desert_fox", avatar: "/placeholder.svg?height=32&width=32" },
      { username: "off_road_king", avatar: "/placeholder.svg?height=32&width=32" },
      { username: "adventure_buddy", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    mapCenter: { lat: 33.8734, lng: -115.901 },
    routeMarkers: [
      { lat: 33.8734, lng: -115.901, title: "Joshua Tree National Park" },
      { lat: 34.1358, lng: -116.0544, title: "Twentynine Palms" },
    ],
    routeImage: "/placeholder.svg?height=200&width=400",
    timestamp: "8 hours ago",
    initialLikes: 23,
    initialComments: 7,
  },
  {
    id: 5,
    rider: {
      username: "city_commuter",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Downtown Coffee Run",
    location: "Los Angeles, CA",
    distance: "23.4 miles",
    duration: "55min",
    avgSpeed: "25.5 mph",
    motorcycle: "Vespa GTS 300",
    rideWith: [],
    mapCenter: { lat: 34.0522, lng: -118.2437 },
    routeMarkers: [
      { lat: 34.0522, lng: -118.2437, title: "Downtown LA" },
      { lat: 34.0928, lng: -118.3287, title: "West Hollywood" },
    ],
    routeImage: "/placeholder.svg?height=200&width=400",
    timestamp: "12 hours ago",
    initialLikes: 4,
    initialComments: 0,
  },
]

export default function ActivityPage() {
  const router = useRouter()

  // local state for likes / bookmarks
  const [likedRides, setLikedRides] = useState<Set<number>>(new Set())
  const [bookmarkedRides, setBookmarkedRides] = useState<Set<number>>(new Set())

  const navigateToRide = (rideId: number) => router.push(`/ride/${rideId}`)

  const toggleLike = (rideId: number) => {
    setLikedRides((prev) => {
      const next = new Set(prev)
      next.has(rideId) ? next.delete(rideId) : next.add(rideId)
      return next
    })
  }

  const toggleBookmark = (rideId: number) => {
    setBookmarkedRides((prev) => {
      const next = new Set(prev)
      next.has(rideId) ? next.delete(rideId) : next.add(rideId)
      return next
    })
  }

  // ---------- UI ----------
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-bold text-black mb-2">Activity Feed</h1>
        <p className="text-gray-600">See the latest rides from riders you follow</p>
      </div>

      <div className="space-y-6">
        {followedRiderActivities.map((ride) => (
          <Card key={ride.id} className="transition-shadow mx-auto" style={{ maxWidth: "800px" }}>
            {/* Map */}
            <GoogleMap center={ride.mapCenter} zoom={11} markers={ride.routeMarkers} className="w-full h-96" />

            <CardHeader>
              {/* Rider */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={ride.rider.avatar || "/placeholder.svg"}
                  alt={`${ride.rider.username} avatar`}
                  className="w-10 h-10 bg-gray-200"
                />
                <div>
                  <p className="font-bold text-black">{ride.rider.username}</p>
                  <p className="text-gray-500">{ride.timestamp}</p>
                </div>
              </div>

              {/* Title */}
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

              {/* Group ride */}
              {ride.rideWith.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Rode with:</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {ride.rideWith.map((r, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <img
                          src={r.avatar || "/placeholder.svg"}
                          alt={`${r.username} avatar`}
                          className="w-6 h-6 bg-gray-200"
                        />
                        <span className="text-gray-600">{r.username}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent>
              {/* Stats */}
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

              {/* Like / bookmark */}
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

        {followedRiderActivities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-12 h-12 bg-black flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">F</span>
              </div>
              <h3 className="font-bold text-black mb-2">No activity yet</h3>
              <p className="text-gray-600 mb-4">Follow other riders to see their rides in your feed</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
