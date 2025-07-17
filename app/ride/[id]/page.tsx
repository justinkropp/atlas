"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// Added GoogleMap import for individual ride page
import { GoogleMap } from "@/components/google-map"

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
    // Added map data for individual ride view
    mapCenter: { lat: 34.2804, lng: -118.0104 },
    routeMarkers: [
      { lat: 34.2804, lng: -118.0104, title: "Start - Angeles Crest Highway" },
      { lat: 34.3774, lng: -117.9048, title: "End - Wrightwood" },
    ],
    routeImage: "/placeholder.svg?height=400&width=800",
    timestamp: "2 hours ago",
    initialLikes: 12,
    initialComments: 3,
    // Added weather conditions
    weather: {
      temperature: "58°F",
      condition: "Clear",
      humidity: "45%",
      windSpeed: "8 mph",
      visibility: "10+ miles",
    },
    // Added image gallery
    images: [
      {
        url: "/placeholder.svg?height=300&width=400",
        caption: "Starting the ride at sunrise",
        timestamp: "6:15 AM",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        caption: "Amazing canyon views",
        timestamp: "7:30 AM",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        caption: "Quick photo stop at the overlook",
        timestamp: "8:45 AM",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        caption: "The crew taking a break",
        timestamp: "9:20 AM",
      },
    ],
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
    mapCenter: { lat: 36.2704, lng: -121.8081 },
    routeMarkers: [
      { lat: 36.4581, lng: -121.9018, title: "Start - Carmel" },
      { lat: 36.0827, lng: -121.6564, title: "End - San Simeon" },
    ],
    routeImage: "/placeholder.svg?height=400&width=800",
    timestamp: "4 hours ago",
    initialLikes: 8,
    initialComments: 1,
    weather: {
      temperature: "65°F",
      condition: "Partly Cloudy",
      humidity: "72%",
      windSpeed: "12 mph",
      visibility: "8 miles",
    },
    images: [
      {
        url: "/placeholder.svg?height=300&width=400",
        caption: "Stunning ocean views along PCH",
        timestamp: "10:30 AM",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        caption: "Big Sur coastline",
        timestamp: "11:45 AM",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        caption: "Perfect lunch spot",
        timestamp: "12:30 PM",
      },
    ],
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
  // Added state for image gallery
  const [selectedImage, setSelectedImage] = useState(null)

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
    <div className="container mx-auto px-4 py-8" style={{ maxWidth: "800px" }}>
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.back()}>
          ← Back to Feed
        </Button>
      </div>

      <Card>
        {/* Added Google Map at the top */}
        <div>
          <GoogleMap
            center={ride.mapCenter}
            zoom={11}
            markers={ride.routeMarkers}
            className="w-full h-96 rounded-t-lg"
          />
        </div>

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

          {/* Added Weather Conditions Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-black mb-3">Weather Conditions</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="font-medium text-gray-600">Temperature</p>
                <p className="text-lg font-bold text-black">{ride.weather.temperature}</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">Condition</p>
                <p className="text-lg font-bold text-black">{ride.weather.condition}</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">Humidity</p>
                <p className="text-lg font-bold text-black">{ride.weather.humidity}</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">Wind Speed</p>
                <p className="text-lg font-bold text-black">{ride.weather.windSpeed}</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-600">Visibility</p>
                <p className="text-lg font-bold text-black">{ride.weather.visibility}</p>
              </div>
            </div>
          </div>

          {/* Added Image Gallery Section */}
          <div className="mb-6">
            <h3 className="font-bold text-black mb-4">Ride Photos ({ride.images.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ride.images.map((image, index) => (
                <div key={index} className="cursor-pointer group" onClick={() => setSelectedImage(image)}>
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.caption}
                    className="w-full h-32 object-cover rounded-lg bg-gray-100 group-hover:opacity-90 transition-opacity"
                  />
                  <p className="text-sm text-gray-600 mt-1">{image.timestamp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="max-w-4xl max-h-full">
                <img
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                <div className="bg-white p-4 rounded-b-lg">
                  <p className="font-medium text-black">{selectedImage.caption}</p>
                  <p className="text-sm text-gray-600">{selectedImage.timestamp}</p>
                </div>
              </div>
            </div>
          )}

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
