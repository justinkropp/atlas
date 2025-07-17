"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Dummy motorcycles data
const motorcycles = [
  {
    id: 1,
    name: "Yamaha MT-09",
    type: "Naked Sport",
    year: "2023",
    color: "Matte Gray",
    mileage: "3,247 miles",
    last_service_date: "2024-01-10",
    status: "active",
    notes: "Primary riding bike, excellent performance and handling",
    engine: "847cc Triple",
    main_image_url: "/placeholder.svg?height=300&width=400",
    motorcycle_images: [
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Side profile view", is_main: true },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Front view", is_main: false },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Rear view", is_main: false },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Engine detail", is_main: false },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Dashboard", is_main: false },
    ],
    motorcycle_modifications: [
      {
        id: 1,
        name: "Akrapovic Slip-On Exhaust",
        category: "Exhaust",
        price: "$899.99",
        purchase_date: "2023-09-15",
        purchase_link: "https://revzilla.com/motorcycle/akrapovic-slip-on-exhaust-yamaha-mt09",
        rating: 4.9,
        notes:
          "Incredible sound improvement and weight reduction. Installation was straightforward and the build quality is exceptional. Definitely worth the investment.",
        image_url: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        name: "Puig Windscreen",
        category: "Bodywork",
        price: "$129.99",
        purchase_date: "2023-08-20",
        purchase_link: "https://puigusa.com/en/tuning-motorcycles/windscreens/yamaha/mt-09",
        rating: 4.3,
        notes:
          "Good wind protection for highway riding. Easy to install and looks great with the bike's design. Could be slightly taller but overall satisfied.",
        image_url: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        name: "CRG Folding Levers",
        category: "Controls",
        price: "$189.99",
        purchase_date: "2023-07-10",
        purchase_link: "https://crgproducts.com/yamaha-mt09-levers",
        rating: 4.7,
        notes:
          "High quality levers with great adjustability. The folding mechanism works perfectly and they feel much better than stock. Installation required some patience but worth it.",
        image_url: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: 2,
    name: "Honda CB650R",
    type: "Neo Sports Cafe",
    year: "2022",
    color: "Pearl White",
    mileage: "8,432 miles",
    last_service_date: "2024-01-05",
    status: "active",
    notes: "Great for long rides, very comfortable",
    engine: "649cc Inline-4",
    main_image_url: "/placeholder.svg?height=300&width=400",
    motorcycle_images: [
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Side profile", is_main: true },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Front angle", is_main: false },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Dashboard view", is_main: false },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Rear view", is_main: false },
    ],
    motorcycle_modifications: [
      {
        id: 1,
        name: "Yoshimura R-77 Exhaust",
        category: "Exhaust",
        price: "$749.99",
        purchase_date: "2022-11-12",
        purchase_link: "https://yoshimura-rd.com/products/honda-cb650r-r77-exhaust",
        rating: 4.6,
        notes:
          "Great sound and performance gain. The carbon fiber finish looks amazing and complements the bike perfectly.",
        image_url: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        name: "Rizoma Bar End Mirrors",
        category: "Mirrors",
        price: "$299.99",
        purchase_date: "2022-10-05",
        purchase_link: "https://rizoma.com/en/mirrors/bar-end-mirrors/honda-cb650r",
        rating: 4.4,
        notes:
          "Stylish upgrade that cleans up the front end. Good visibility though takes some getting used to the new position.",
        image_url: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: 3,
    name: "Kawasaki Ninja 400",
    type: "Sport",
    year: "2021",
    color: "Lime Green",
    mileage: "12,892 miles",
    last_service_date: "2023-12-20",
    status: "maintenance",
    notes: "Chain needs adjustment, brake pads wearing thin",
    engine: "399cc Parallel Twin",
    main_image_url: "/placeholder.svg?height=300&width=400",
    motorcycle_images: [
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Track ready", is_main: true },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Racing position", is_main: false },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Side profile", is_main: false },
      { image_url: "/placeholder.svg?height=300&width=400", caption: "Front view", is_main: false },
    ],
    motorcycle_modifications: [
      {
        id: 1,
        name: "Two Brothers Racing Exhaust",
        category: "Exhaust",
        price: "$449.99",
        purchase_date: "2021-08-15",
        purchase_link: "https://tbracing.com/kawasaki-ninja-400-exhaust",
        rating: 4.5,
        notes: "Good value exhaust with nice sound. Not too loud for daily riding but gives the bike more character.",
        image_url: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
]

// Dummy gear data
const gear = [
  {
    id: 1,
    name: "Shoei RF-1400 Helmet",
    category: "Helmet",
    condition: "excellent",
    purchase_date: "2023-08-15",
    notes: "Primary helmet, very comfortable for long rides",
    image_url: "/placeholder.svg?height=100&width=100",
    purchase_link: "https://revzilla.com/motorcycle/shoei-rf-1400-helmet",
    price: "$549.99",
    rating: 4.8,
    review_notes:
      "Outstanding helmet with excellent ventilation and noise reduction. The fit is perfect and it's incredibly comfortable even on 8+ hour rides. The visor mechanism is smooth and the build quality is top-notch.",
  },
  {
    id: 2,
    name: "Alpinestars GP Pro Jacket",
    category: "Jacket",
    condition: "good",
    purchase_date: "2022-05-20",
    notes: "Great protection, some wear on elbows",
    image_url: "/placeholder.svg?height=100&width=100",
    purchase_link: "https://alpinestars.com/products/gp-pro-jacket",
    price: "$399.95",
    rating: 4.5,
    review_notes:
      "Solid protection with good airflow. The armor is substantial and the fit is athletic. Some wear showing after 2 years of regular use but still very functional. Would buy again.",
  },
  {
    id: 3,
    name: "Dainese Delta 3 Gloves",
    category: "Gloves",
    condition: "fair",
    purchase_date: "2023-03-10",
    notes: "Need replacement soon, palm wear visible",
    image_url: "/placeholder.svg?height=100&width=100",
    purchase_link: "https://dainese.com/us/en/delta-3-gloves",
    price: "$89.95",
    rating: 4.2,
    review_notes:
      "Good gloves with decent protection but the palm material wears out faster than expected. Comfortable fit and good dexterity for controls. Next time I'll look for something more durable.",
  },
  {
    id: 4,
    name: "TCX Street Ace Boots",
    category: "Boots",
    condition: "excellent",
    purchase_date: "2023-11-02",
    notes: "New boots, great ankle protection",
    image_url: "/placeholder.svg?height=100&width=100",
    purchase_link: "https://tcxboots.com/en/street-ace-boots",
    price: "$179.99",
    rating: 4.7,
    review_notes:
      "Excellent boots that look great and provide solid protection. Very comfortable for walking and riding. The ankle protection is reassuring and they're waterproof as advertised. Highly recommend.",
  },
  {
    id: 5,
    name: "Rev'it Sand 4 Pants",
    category: "Pants",
    condition: "good",
    purchase_date: "2022-07-18",
    notes: "Adventure pants, very durable",
    image_url: "/placeholder.svg?height=100&width=100",
    purchase_link: "https://revitsport.com/en/sand-4-pants",
    price: "$449.99",
    rating: 4.6,
    review_notes:
      "Outstanding adventure pants with removable liner and excellent ventilation. The knee armor is comfortable and the fit is perfect. Expensive but worth every penny for serious touring.",
  },
]

const maintenanceReminders = [
  {
    motorcycle: "Kawasaki Ninja 400",
    task: "Chain Adjustment & Lubrication",
    dueDate: "2024-01-20",
    priority: "High",
  },
  {
    motorcycle: "Honda CB650R",
    task: "Oil Change & Filter",
    dueDate: "2024-02-15",
    priority: "Medium",
  },
  {
    motorcycle: "Yamaha MT-09",
    task: "Tire Pressure Check",
    dueDate: "2024-02-01",
    priority: "Low",
  },
]

export default function MyGaragePage() {
  const router = useRouter()

  const [activeSection, setActiveSection] = useState<"motorcycles" | "gear">("motorcycles")

  // Pre-select each bike’s main image
  const [selectedImages, setSelectedImages] = useState<Record<number, string>>(() => {
    const init: Record<number, string> = {}
    motorcycles.forEach((m) => {
      const main = m.motorcycle_images.find((img) => img.is_main)?.image_url || m.main_image_url
      init[m.id] = main
    })
    return init
  })

  // ⭐ helpers unchanged
  const renderStars = (rating: number) => {
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

  const handleImageSelect = (id: number, url: string) => setSelectedImages((p) => ({ ...p, [id]: url }))

  const navigateToMotorcycleDetail = (id: number) => router.push(`/my-garage/motorcycle/${id}`)

  // 3️⃣ use the local dummy arrays directly – no try/catch / Supabase calls.
  const userMotorcycles = motorcycles
  const userGear = gear

  // JSX below unchanged except variables now come from the constants above.
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
              {userMotorcycles.map((motorcycle) => (
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
                    <div className="mb-4">
                      <img
                        src={selectedImages[motorcycle.id] || motorcycle.main_image_url}
                        alt={motorcycle.name}
                        className="w-full h-64 object-cover bg-gray-200"
                      />
                    </div>

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

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Total Mileage</p>
                        <p className="text-sm text-gray-600">{motorcycle.mileage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Last Service</p>
                        <p className="text-sm text-gray-600">{motorcycle.last_service_date}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">Notes</p>
                      <p className="text-sm text-gray-700">{motorcycle.notes}</p>
                    </div>
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
            </div>
          </div>
        )}

        {activeSection === "gear" && (
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Gear</h2>
            <div className="space-y-4">
              {userGear.map((item) => (
                <Card key={item.id} className="transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 bg-gray-200 object-cover"
                        />
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
                        <p className="text-sm font-bold text-gray-900">{item.price}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Purchase Date</p>
                        <p className="text-sm text-gray-700">{item.purchase_date}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">My Rating</p>
                      {renderStars(item.rating)}
                    </div>

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

                    <div className="border-t pt-4 mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">Notes</p>
                      <p className="text-sm text-gray-700">{item.notes}</p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">My Review</p>
                      <p className="text-sm text-gray-700">{item.review_notes}</p>
                    </div>

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
            </div>
          </div>
        )}

        <div>
          {activeSection === "motorcycles" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Reminders</CardTitle>
                  <CardDescription>Upcoming service tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceReminders.map((reminder, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">{reminder.task}</h4>
                          <Badge
                            variant="outline"
                            className={
                              reminder.priority === "High"
                                ? "border-red-200 text-red-700"
                                : reminder.priority === "Medium"
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-green-200 text-green-700"
                            }
                          >
                            {reminder.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{reminder.motorcycle}</p>
                        <p className="text-xs text-gray-500">Due: {reminder.dueDate}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Reminders
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Motorcycles</span>
                      <span className="font-semibold">{userMotorcycles.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Bikes</span>
                      <span className="font-semibold text-green-600">
                        {userMotorcycles.filter((m) => m.status === "active").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending Maintenance</span>
                      <span className="font-semibold text-orange-600">{maintenanceReminders.length}</span>
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
                  <CardTitle>Gear Reminders</CardTitle>
                  <CardDescription>Items needing attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm">Replace Gloves</h4>
                        <Badge variant="outline" className="border-red-200 text-red-700">
                          Urgent
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">Dainese Delta 3 Gloves</p>
                      <p className="text-xs text-gray-500">Palm wear visible</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Reminders
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Gear Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Items</span>
                      <span className="font-semibold">{userGear.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Excellent Condition</span>
                      <span className="font-semibold text-green-600">
                        {userGear.filter((g) => g.condition === "excellent").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Need Replacement</span>
                      <span className="font-semibold text-red-600">
                        {userGear.filter((g) => g.condition === "fair").length}
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
