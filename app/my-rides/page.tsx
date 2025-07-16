import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Updated rides to be motorcycle-specific
const rides = [
  {
    id: 1,
    title: "Morning Canyon Run",
    date: "2024-01-15",
    startTime: "7:00 AM",
    endTime: "9:15 AM",
    distance: "87.3 miles",
    avgSpeed: "38.8 mph",
    maxSpeed: "65 mph",
    route: "Angeles Crest Highway Loop",
    motorcycle: "Yamaha MT-09",
    weather: "Clear, 58°F",
    fuelUsed: "2.1 gallons",
  },
  {
    id: 2,
    title: "Weekend Coastal Cruise",
    date: "2024-01-13",
    startTime: "10:00 AM",
    endTime: "2:30 PM",
    distance: "156 miles",
    avgSpeed: "34.7 mph",
    maxSpeed: "70 mph",
    route: "Pacific Coast Highway",
    motorcycle: "Honda CB650R",
    weather: "Partly Cloudy, 65°F",
    fuelUsed: "3.8 gallons",
  },
  {
    id: 3,
    title: "Evening City Ride",
    date: "2024-01-12",
    startTime: "6:30 PM",
    endTime: "7:45 PM",
    distance: "23.2 miles",
    avgSpeed: "31.0 mph",
    maxSpeed: "45 mph",
    route: "Downtown Circuit",
    motorcycle: "Kawasaki Ninja 400",
    weather: "Clear, 62°F",
    fuelUsed: "0.8 gallons",
  },
]

export default function MyRidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Rides</h1>
          <p className="text-gray-600">Track and review all your motorcycle adventures</p>
        </div>
        {/* Removed Plus icon from button */}
        <Button className="flex items-center gap-2">Log New Ride</Button>
      </div>

      {/* Rides List */}
      <div className="space-y-6">
        {rides.map((ride) => (
          <Card key={ride.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{ride.title}</CardTitle>
                  {/* Removed Calendar and Clock icons */}
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span>{ride.date}</span>
                    <span>
                      {ride.startTime} - {ride.endTime}
                    </span>
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Completed
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                {/* Removed MapPin and Zap icons */}
                <div>
                  <p className="text-sm font-medium">Distance</p>
                  <p className="text-lg font-bold text-blue-600">{ride.distance}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Speed</p>
                  <p className="text-lg font-bold text-green-600">{ride.avgSpeed}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Max Speed</p>
                  <p className="text-sm font-bold text-orange-600">{ride.maxSpeed}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Motorcycle</p>
                  <p className="text-sm">{ride.motorcycle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Fuel Used</p>
                  <p className="text-sm">{ride.fuelUsed}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Route</p>
                  <p className="text-sm">{ride.route}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Weather</p>
                  <p className="text-sm">{ride.weather}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State Message */}
      {rides.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            {/* Removed MapPin icon */}
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">R</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rides yet</h3>
            <p className="text-gray-600 mb-4">Start tracking your motorcycle rides to see them here</p>
            {/* Removed Plus icon from button */}
            <Button>Log Your First Ride</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
