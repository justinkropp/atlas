"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Updated to show activities from other riders the user follows
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
    routeImage: "/placeholder.svg?height=200&width=400",
    timestamp: "2 hours ago",
    // Added initial interaction counts
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
    routeImage: "/placeholder.svg?height=200&width=400",
    timestamp: "12 hours ago",
    initialLikes: 4,
    initialComments: 0,
  },
]

export default function ActivityPage() {
  const router = useRouter()
  // Added state for tracking likes and bookmarks
  const [likedRides, setLikedRides] = useState(new Set())
  const [bookmarkedRides, setBookmarkedRides] = useState(new Set())
  // Removed selectedRide and newComment state since we're using separate pages now

  // Added function to navigate to individual ride page
  const navigateToRide = (rideId) => {
    router.push(`/ride/${rideId}`)
  }

  // Added function to handle like toggle
  const toggleLike = (rideId) => {
    const newLikedRides = new Set(likedRides)
    if (newLikedRides.has(rideId)) {
      newLikedRides.delete(rideId)
    } else {
      newLikedRides.add(rideId)
    }
    setLikedRides(newLikedRides)
  }

  // Added function to handle bookmark toggle
  const toggleBookmark = (rideId) => {
    const newBookmarkedRides = new Set(bookmarkedRides)
    if (newBookmarkedRides.has(rideId)) {
      newBookmarkedRides.delete(rideId)
    } else {
      newBookmarkedRides.add(rideId)
    }
    setBookmarkedRides(newBookmarkedRides)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-bold text-black mb-2">Activity Feed</h1>
        <p className="text-gray-600">See the latest rides from riders you follow</p>
      </div>

      <div className="space-y-6">
        {followedRiderActivities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={activity.rider.avatar || "/placeholder.svg"}
                  alt={`${activity.rider.username} avatar`}
                  className="w-10 h-10 rounded-full bg-gray-200"
                />
                <div>
                  <p className="font-bold text-black">{activity.rider.username}</p>
                  <p className="text-gray-500">{activity.timestamp}</p>
                </div>
              </div>

              <CardTitle className="text-xl mb-2">{activity.title}</CardTitle>
              <CardDescription className="text-gray-600 mb-4">{activity.location}</CardDescription>

              <div className="mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">Rode:</span> {activity.motorcycle}
                </p>
              </div>

              {activity.rideWith.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Rode with:</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {activity.rideWith.map((rider, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <img
                          src={rider.avatar || "/placeholder.svg"}
                          alt={`${rider.username} avatar`}
                          className="w-6 h-6 rounded-full bg-gray-200"
                        />
                        <span className="text-gray-600">{rider.username}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <div className="mb-4 cursor-pointer" onClick={() => navigateToRide(activity.id)}>
                <img
                  src={activity.routeImage || "/placeholder.svg"}
                  alt={`Route map for ${activity.title}`}
                  className="w-full h-48 object-cover rounded-lg bg-gray-100 hover:opacity-90 transition-opacity"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="font-bold text-black">{activity.distance}</p>
                  <p className="text-gray-600">Distance</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-black">{activity.duration}</p>
                  <p className="text-gray-600">Duration</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-black">{activity.avgSpeed}</p>
                  <p className="text-gray-600">Avg Speed</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(activity.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                      likedRides.has(activity.id)
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <span>{likedRides.has(activity.id) ? "♥" : "♡"}</span>
                    <span>{activity.initialLikes + (likedRides.has(activity.id) ? 1 : 0)}</span>
                  </button>

                  {/* Updated comment button to navigate to ride page */}
                  <button
                    onClick={() => navigateToRide(activity.id)}
                    className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <span>💬</span>
                    <span>{activity.initialComments}</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleBookmark(activity.id)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    bookmarkedRides.has(activity.id)
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {bookmarkedRides.has(activity.id) ? "★" : "☆"}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {followedRiderActivities.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">F</span>
            </div>
            <h3 className="font-bold text-black mb-2">No activity yet</h3>
            <p className="text-gray-600 mb-4">Follow other riders to see their rides in your feed</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
