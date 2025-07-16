"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const motorcycles = [
  {
    id: 1,
    name: "Yamaha MT-09",
    type: "Naked Sport",
    year: "2023",
    color: "Matte Gray",
    mileage: "3,247 miles",
    lastService: "2024-01-10",
    status: "Active",
    notes: "Primary riding bike, excellent performance and handling",
    engine: "847cc Triple",
  },
  {
    id: 2,
    name: "Honda CB650R",
    type: "Neo Sports Cafe",
    year: "2022",
    color: "Pearl White",
    mileage: "8,432 miles",
    lastService: "2024-01-05",
    status: "Active",
    notes: "Great for long rides, very comfortable",
    engine: "649cc Inline-4",
  },
  {
    id: 3,
    name: "Kawasaki Ninja 400",
    type: "Sport",
    year: "2021",
    color: "Lime Green",
    mileage: "12,892 miles",
    lastService: "2023-12-20",
    status: "Maintenance Due",
    notes: "Chain needs adjustment, brake pads wearing thin",
    engine: "399cc Parallel Twin",
  },
]

const gear = [
  {
    id: 1,
    name: "Shoei RF-1400 Helmet",
    category: "Helmet",
    condition: "Excellent",
    purchaseDate: "2023-08-15",
    notes: "Primary helmet, very comfortable for long rides",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Alpinestars GP Pro Jacket",
    category: "Jacket",
    condition: "Good",
    purchaseDate: "2022-05-20",
    notes: "Great protection, some wear on elbows",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Dainese Delta 3 Gloves",
    category: "Gloves",
    condition: "Fair",
    purchaseDate: "2023-03-10",
    notes: "Need replacement soon, palm wear visible",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "TCX Street Ace Boots",
    category: "Boots",
    condition: "Excellent",
    purchaseDate: "2023-11-02",
    notes: "New boots, great ankle protection",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Rev'it Sand 4 Pants",
    category: "Pants",
    condition: "Good",
    purchaseDate: "2022-07-18",
    notes: "Adventure pants, very durable",
    image: "/placeholder.svg?height=100&width=100",
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
  const [activeSection, setActiveSection] = useState("motorcycles")

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
              {motorcycles.map((motorcycle) => (
                <Card key={motorcycle.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">M</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{motorcycle.name}</CardTitle>
                          <CardDescription>
                            {motorcycle.year} {motorcycle.type} • {motorcycle.color} • {motorcycle.engine}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={motorcycle.status === "Active" ? "default" : "destructive"}
                        className={
                          motorcycle.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                        }
                      >
                        {motorcycle.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Total Mileage</p>
                        <p className="text-sm text-gray-600">{motorcycle.mileage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Last Service</p>
                        <p className="text-sm text-gray-600">{motorcycle.lastService}</p>
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
              {gear.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg bg-gray-200 object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>{item.category}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.condition === "Excellent"
                            ? "border-green-200 text-green-700"
                            : item.condition === "Good"
                              ? "border-yellow-200 text-yellow-700"
                              : "border-red-200 text-red-700"
                        }
                      >
                        {item.condition}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600">Purchase Date</p>
                      <p className="text-sm text-gray-700">{item.purchaseDate}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">Notes</p>
                      <p className="text-sm text-gray-700">{item.notes}</p>
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
                      <span className="font-semibold">{motorcycles.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Bikes</span>
                      <span className="font-semibold text-green-600">
                        {motorcycles.filter((m) => m.status === "Active").length}
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
                      <span className="font-semibold">{gear.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Excellent Condition</span>
                      <span className="font-semibold text-green-600">
                        {gear.filter((g) => g.condition === "Excellent").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Need Replacement</span>
                      <span className="font-semibold text-red-600">
                        {gear.filter((g) => g.condition === "Fair").length}
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
