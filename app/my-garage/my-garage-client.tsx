"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function MyGarageClient({ motorcycles, gear }) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("motorcycles")
  const [selectedImages, setSelectedImages] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    motorcycles?.forEach((motorcycle) => {
      const mainImage =
        motorcycle.motorcycle_images?.find((img) => img.is_main)?.image_url ||
        motorcycle.motorcycle_images?.[0]?.image_url ||
        motorcycle.main_image_url
      initial[motorcycle.id] = mainImage
    })
    return initial
  })

  const renderStars = (rating) => {
    if (!rating) return null
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} style={{ color: "var(--geist-foreground)" }}>
            ★
          </span>
        ))}
        {hasHalfStar && <span style={{ color: "var(--geist-foreground)" }}>☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} style={{ color: "var(--geist-accents-3)" }}>
            ☆
          </span>
        ))}
        <span className="ml-1" style={{ color: "var(--geist-accents-5)" }}>
          ({rating})
        </span>
      </div>
    )
  }

  const handleImageSelect = (motorcycleId: string, imageUrl: string) => {
    setSelectedImages((prev) => ({
      ...prev,
      [motorcycleId]: imageUrl,
    }))
  }

  const navigateToMotorcycleDetail = (motorcycleId: string) => {
    router.push(`/my-garage/motorcycle/${motorcycleId}`)
  }

  // ... existing code ...

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Garage</h1>
          <p className="text-gray-600">Manage your motorcycles and gear</p>
        </div>
        <Button className="flex items-center gap-2">
          {activeSection === "motorcycles" ? "Add Motorcycle" : "Add Gear"}
        </Button>
      </div>

      <div className="flex gap-2 mb-8">
        <Button
          variant={activeSection === "motorcycles" ? "default" : "outline"}
          onClick={() => setActiveSection("motorcycles")}
          className={activeSection === "motorcycles" ? "bg-black text-white" : ""}
        >
          My Motorcycles
        </Button>
        <Button
          variant={activeSection === "gear" ? "default" : "outline"}
          onClick={() => setActiveSection("gear")}
          className={activeSection === "gear" ? "bg-black text-white" : ""}
        >
          My Gear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeSection === "motorcycles" && (
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Motorcycles</h2>
            <div className="space-y-4">
              {motorcycles?.map((motorcycle) => (
                <Card key={motorcycle.id} className="transition-shadow mx-auto" style={{ maxWidth: "800px" }}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black flex items-center justify-center">
                          <span className="text-white font-bold">M</span>
                        </div>
                        <div>
                          <button
                            onClick={() => navigateToMotorcycleDetail(motorcycle.id)}
                            className="text-lg font-bold text-left hover:text-gray-700 transition-colors cursor-pointer"
                          >
                            {motorcycle.name}
                          </button>
                          <CardDescription>
                            {motorcycle.year} {motorcycle.type} • {motorcycle.color} • {motorcycle.engine}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={motorcycle.status === "active" ? "default" : "destructive"}
                        className={
                          motorcycle.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                        }
                      >
                        {motorcycle.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedImages[motorcycle.id] && (
                      <div className="mb-4">
                        <img
                          src={selectedImages[motorcycle.id] || "/placeholder.svg"}
                          alt={motorcycle.name}
                          className="w-full h-64 object-cover bg-gray-200"
                        />
                      </div>
                    )}

                    {motorcycle.motorcycle_images?.length > 0 && (
                      <div className="mb-4">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {motorcycle.motorcycle_images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => handleImageSelect(motorcycle.id, image.image_url)}
                              className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors ${
                                selectedImages[motorcycle.id] === image.image_url
                                  ? "border-black"
                                  : "border-gray-200 hover:border-gray-400"
                              }`}
                            >
                              <img
                                src={image.image_url || "/placeholder.svg"}
                                alt={`${motorcycle.name} view ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Total Mileage</p>
                        <p className="text-sm text-gray-600">
                          {motorcycle.mileage ? `${motorcycle.mileage} miles` : "Not recorded"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Last Service</p>
                        <p className="text-sm text-gray-600">{motorcycle.last_service_date || "Not recorded"}</p>
                      </div>
                    </div>
                    {motorcycle.notes && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-gray-600 mb-1">Notes</p>
                        <p className="text-sm text-gray-700">{motorcycle.notes}</p>
                      </div>
                    )}
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Service Log
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!motorcycles || motorcycles.length === 0) && (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="w-12 h-12 bg-black flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <h3 className="font-bold text-black mb-2">No motorcycles yet</h3>
                    <p className="text-gray-600 mb-4">Add your first motorcycle to start tracking</p>
                    <Button>Add Motorcycle</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeSection === "gear" && (
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Gear</h2>
            <div className="space-y-4">
              {gear?.map((item) => (
                <Card key={item.id} className="transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {item.image_url && (
                          <img
                            src={item.image_url || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 bg-gray-200 object-cover"
                          />
                        )}
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>{item.category}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.condition === "excellent"
                            ? "border-green-200 text-green-700"
                            : item.condition === "good"
                              ? "border-yellow-200 text-yellow-700"
                              : "border-red-200 text-red-700"
                        }
                      >
                        {item.condition}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Price Paid</p>
                        <p className="text-sm font-bold text-gray-900">
                          {item.price ? `$${item.price}` : "Not recorded"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Purchase Date</p>
                        <p className="text-sm text-gray-700">{item.purchase_date || "Not recorded"}</p>
                      </div>
                    </div>

                    {item.rating && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-1">My Rating</p>
                        {renderStars(item.rating)}
                      </div>
                    )}

                    {item.purchase_link && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-1">Purchased From</p>
                        <a
                          href={item.purchase_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          View Product Page
                        </a>
                      </div>
                    )}

                    {item.notes && (
                      <div className="border-t pt-4 mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-1">Notes</p>
                        <p className="text-sm text-gray-700">{item.notes}</p>
                      </div>
                    )}

                    {item.review_notes && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-gray-600 mb-1">My Review</p>
                        <p className="text-sm text-gray-700">{item.review_notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Edit Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Replace Item
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!gear || gear.length === 0) && (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="w-12 h-12 bg-black flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">G</span>
                    </div>
                    <h3 className="font-bold text-black mb-2">No gear yet</h3>
                    <p className="text-gray-600 mb-4">Add your first piece of gear to start tracking</p>
                    <Button>Add Gear</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* ... existing sidebar code ... */}
        <div>
          {activeSection === "motorcycles" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Motorcycles</span>
                      <span className="font-semibold">{motorcycles?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Bikes</span>
                      <span className="font-semibold text-green-600">
                        {motorcycles?.filter((m) => m.status === "active").length || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "gear" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Gear Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Items</span>
                      <span className="font-semibold">{gear?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Excellent Condition</span>
                      <span className="font-semibold text-green-600">
                        {gear?.filter((g) => g.condition === "excellent").length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Need Replacement</span>
                      <span className="font-semibold text-red-600">
                        {gear?.filter((g) => g.condition === "fair" || g.condition === "poor").length || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
