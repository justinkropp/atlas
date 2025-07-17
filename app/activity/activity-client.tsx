"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { GoogleMap } from "@/components/google-map"

export function ActivityClient({ rides }) {
  const router = useRouter()
  const [likedRides, setLikedRides] = useState(new Set())
  const [bookmarkedRides, setBookmarkedRides] = useState(new Set())

  const navigateToRide = (rideId) => {
    router.push(`/ride/${rideId}`)
  }

  const toggleLike = (rideId) => {
    const newLikedRides = new Set(likedRides)
    if (newLikedRides.has(rideId)) {
      newLikedRides.delete(rideId)
    } else {
      newLikedRides.add(rideId)
    }
    setLikedRides(newLikedRides)
  }

  const toggleBookmark = (rideId) => {
    const newBookmarkedRides = new Set(bookmarkedRides)
    if (newBookmarkedRides.has(rideId)) {
      newBookmarkedRides.delete(rideId)
    } else {
      newBookmarkedRides.add(rideId)
    }
    setBookmarkedRides(newBookmarkedRides)
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    return `${diffInDays} days ago`
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-bold text-black mb-2">Activity Feed</h1>
        <p className="text-gray-600">See the latest rides from riders you follow</p>
      </div>

      <div className="space-y-6">
        {rides?.map((ride) => (
          <Card key={ride.id} className="transition-shadow mx-auto" style={{ maxWidth: "800px" }}>
            {/* Show map if we have GPS coordinates */}
            {ride.start_latitude && ride.start_longitude && (
              <div>
                <GoogleMap
                  center={{ lat: ride.start_latitude, lng: ride.start_longitude }}
                  zoom={11}
                  markers={[
                    { lat: ride.start_latitude, lng: ride.start_longitude, title: "Start" },
                    ...(ride.end_latitude && ride.end_longitude
                      ? [{ lat: ride.end_latitude, lng: ride.end_longitude, title: "End" }]
                      : []),
                  ]}
                  className="w-full h-96"
                />
              </div>
            )}

            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={ride.profiles?.avatar_url || "/placeholder.svg?height=40&width=40"}
                  alt={`${ride.profiles?.username} avatar`}
                  className="w-10 h-10 bg-gray-200"
                />
                <div>
                  <p className="font-bold text-black">{ride.profiles?.username || "Unknown User"}</p>
                  <p className="text-gray-500">{formatTimeAgo(ride.created_at)}</p>
                </div>
              </div>

              <button
                className="text-xl mb-2 cursor-pointer hover:text-gray-700 transition-colors font-bold text-left w-full"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  navigateToRide(ride.id)
                }}
              >
                {ride.title}
              </button>
              <CardDescription className="text-gray-600 mb-4">{ride.location}</CardDescription>

              <div className="mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">Rode:</span> {ride.motorcycles?.name || "Unknown Motorcycle"}
                </p>
              </div>

              {ride.ride_participants?.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Rode with:</span>
                  </p>
                  <div className="flex items-center gap-2">
                    {ride.ride_participants.map((participant, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <img
                          src={participant.profiles?.avatar_url || "/placeholder.svg?height=24&width=24"}
                          alt={`${participant.profiles?.username} avatar`}
                          className="w-6 h-6 bg-gray-200"
                        />
                        <span className="text-gray-600">{participant.profiles?.username}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="font-bold text-black">{ride.distance_miles ? `${ride.distance_miles} mi` : "N/A"}</p>
                  <p className="text-gray-600">Distance</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-black">
                    {ride.duration_minutes
                      ? `${Math.floor(ride.duration_minutes / 60)}h ${ride.duration_minutes % 60}m`
                      : "N/A"}
                  </p>
                  <p className="text-gray-600">Duration</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-black">{ride.avg_speed_mph ? `${ride.avg_speed_mph} mph` : "N/A"}</p>
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
                    <span>{ride.likes_count + (likedRides.has(ride.id) ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={() => navigateToRide(ride.id)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <span>💬</span>
                    <span>{ride.comments_count}</span>
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

        {(!rides || rides.length === 0) && (
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
