"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data - in a real app this would come from an API or database
const motorcycleData = {
  1: {
    id: 1,
    name: "Yamaha MT-09",
    type: "Naked Sport",
    year: "2023",
    color: "Matte Gray",
    engine: "847cc Triple",
    modifications: [
      {
        id: 1,
        name: "Akrapovic Slip-On Exhaust",
        category: "Exhaust",
        price: "$899.99",
        purchaseDate: "2023-09-15",
        purchaseLink: "https://revzilla.com/motorcycle/akrapovic-slip-on-exhaust-yamaha-mt09",
        rating: 4.9,
        notes:
          "Incredible sound improvement and weight reduction. Installation was straightforward and the build quality is exceptional. Definitely worth the investment.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        name: "Puig Windscreen",
        category: "Bodywork",
        price: "$129.99",
        purchaseDate: "2023-08-20",
        purchaseLink: "https://puigusa.com/en/tuning-motorcycles/windscreens/yamaha/mt-09",
        rating: 4.3,
        notes:
          "Good wind protection for highway riding. Easy to install and looks great with the bike's design. Could be slightly taller but overall satisfied.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        name: "CRG Folding Levers",
        category: "Controls",
        price: "$189.99",
        purchaseDate: "2023-07-10",
        purchaseLink: "https://crgproducts.com/yamaha-mt09-levers",
        rating: 4.7,
        notes:
          "High quality levers with great adjustability. The folding mechanism works perfectly and they feel much better than stock. Installation required some patience but worth it.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  2: {
    id: 2,
    name: "Honda CB650R",
    type: "Neo Sports Cafe",
    year: "2022",
    color: "Pearl White",
    engine: "649cc Inline-4",
    modifications: [
      {
        id: 1,
        name: "Yoshimura R-77 Exhaust",
        category: "Exhaust",
        price: "$749.99",
        purchaseDate: "2022-11-12",
        purchaseLink: "https://yoshimura-rd.com/products/honda-cb650r-r77-exhaust",
        rating: 4.6,
        notes:
          "Great sound and performance gain. The carbon fiber finish looks amazing and complements the bike perfectly.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        name: "Rizoma Bar End Mirrors",
        category: "Mirrors",
        price: "$299.99",
        purchaseDate: "2022-10-05",
        purchaseLink: "https://rizoma.com/en/mirrors/bar-end-mirrors/honda-cb650r",
        rating: 4.4,
        notes:
          "Stylish upgrade that cleans up the front end. Good visibility though takes some getting used to the new position.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  3: {
    id: 3,
    name: "Kawasaki Ninja 400",
    type: "Sport",
    year: "2021",
    color: "Lime Green",
    engine: "399cc Parallel Twin",
    modifications: [
      {
        id: 1,
        name: "Two Brothers Racing Exhaust",
        category: "Exhaust",
        price: "$449.99",
        purchaseDate: "2021-08-15",
        purchaseLink: "https://tbracing.com/kawasaki-ninja-400-exhaust",
        rating: 4.5,
        notes: "Good value exhaust with nice sound. Not too loud for daily riding but gives the bike more character.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
}

export default function MotorcycleDetailPage({ params }) {
  const router = useRouter()
  const motorcycle = motorcycleData[params.id]

  if (!motorcycle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="font-bold text-black mb-2">Motorcycle not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  // Helper function to render star rating
  const renderStars = (rating) => {
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

  return (
    <div className="container mx-auto px-4 py-8" style={{ maxWidth: "800px" }}>
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.back()}>
          ← Back to My Garage
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{motorcycle.name}</h1>
        <p className="text-gray-600">
          {motorcycle.year} {motorcycle.type} • {motorcycle.color} • {motorcycle.engine}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Modifications ({motorcycle.modifications.length})</h2>
          <Button className="flex items-center gap-2">Add Modification</Button>
        </div>

        {motorcycle.modifications.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-12 h-12 bg-black flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">M</span>
              </div>
              <h3 className="font-bold text-black mb-2">No modifications yet</h3>
              <p className="text-gray-600 mb-4">Start customizing your bike by adding modifications</p>
              <Button>Add First Modification</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {motorcycle.modifications.map((mod) => (
              <Card key={mod.id} className="transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <img
                        src={mod.image || "/placeholder.svg"}
                        alt={mod.name}
                        className="w-16 h-16 bg-gray-200 object-cover"
                      />
                      <div>
                        <CardTitle className="text-xl">{mod.name}</CardTitle>
                        <CardDescription className="text-gray-600">{mod.category}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{mod.price}</p>
                      <p className="text-sm text-gray-500">Purchased {mod.purchaseDate}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">My Rating</p>
                    {renderStars(mod.rating)}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">Purchase Link</p>
                    <a
                      href={mod.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      View Product Page
                    </a>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Notes</p>
                    <p className="text-gray-700">{mod.notes}</p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove Modification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
