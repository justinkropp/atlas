"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for rides - in a real app this would come from an API
const rideData = {
  1: {
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
    routeImage: "/placeholder.svg?height=400&width=800",
    timestamp: "2 hours ago",
    initialLikes: 12,
    initialComments: 3,
    comments: [
      {
        id: 1,
        username: "speed_demon",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "Amazing route! Those curves were perfect.",
        timestamp: "1 hour ago",
      },
      {
        id: 2,
        username: "mountain_rider",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "Great ride today! Can't wait for the next one.",
        timestamp: "45 minutes ago",
      },
    ],
  },
  2: {
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
    routeImage: "/placeholder.svg?height=400&width=800",
    timestamp: "4 hours ago",
    initialLikes: 8,
    initialComments: 1,
    comments: [
      {
        id: 1,
        username: "ocean_rider",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "Beautiful coastal views! Love this route.",
        timestamp: "2 hours ago",
      },
    ],
  },
  // Add more ride data as needed
}

export default function RidePage({ params }) {
  const router = useRouter()
  const [newComment, setNewComment] = useState("")
  const [likedRide, setLikedRide] = useState(false)
  const [bookmarkedRide, setBookmarkedRide] = useState(false)

  const ride = rideData[params.id]

  if (!ride) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="font-bold text-black mb-2">Ride not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would save to a database
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.back()}>
          ← Back to Feed
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={ride.rider.avatar || "/placeholder.svg"}
              alt={`${ride.rider.username} avatar`}
              className="w-12 h-12 rounded-full bg-gray-200"
            />
            <div>
              <p className="font-bold text-black">{ride.rider.username}</p>
              <p className="text-gray-500">{ride.timestamp}</p>
            </div>
          </div>

          <CardTitle className="text-2xl mb-2">{ride.title}</CardTitle>
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
          <div className="mb-6">
            <img
              src={ride.routeImage || "/placeholder.svg"}
              alt={`Route map for ${ride.title}`}
              className="w-full h-64 object-cover rounded-lg bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
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

          <div className="flex items-center justify-between mb-6 pt-4 border-t">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLikedRide(!likedRide)}
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                  likedRide ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{likedRide ? "♥" : "♡"}</span>
                <span>{ride.initialLikes + (likedRide ? 1 : 0)}</span>
              </button>
            </div>

            <button
              onClick={() => setBookmarkedRide(!bookmarkedRide)}
              className={`px-3 py-1 rounded-md transition-colors ${
                bookmarkedRide ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {bookmarkedRide ? "★" : "☆"}
            </button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-bold text-black mb-4">Comments ({ride.comments.length})</h3>

            <div className="space-y-4 mb-6">
              {ride.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={`${comment.username} avatar`}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-black">{comment.username}</p>
                      <p className="text-gray-500">{comment.timestamp}</p>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
