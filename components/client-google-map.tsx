"use client"

import { useEffect, useState } from "react"
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"

interface ClientGoogleMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  markers?: Array<{ lat: number; lng: number; title?: string }>
  className?: string
}

export function ClientGoogleMap({
  center = { lat: 34.0522, lng: -118.2437 },
  zoom = 10,
  markers = [],
  className = "w-full h-48",
}: ClientGoogleMapProps) {
  const [apiKey, setApiKey] = useState<string>("")

  useEffect(() => {
    fetch("/api/maps-key")
      .then((r) => r.json())
      .then((d) => setApiKey(d.key ?? ""))
      .catch(() => setApiKey(""))
  }, [])

  if (apiKey === "") {
    // Key missing or invalid – instruct project owners how to fix
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-center p-4 max-w-sm">
          <p className="font-semibold text-gray-800 mb-2">Google Maps API key not found</p>
          <p className="text-sm text-gray-600">
            Add <code>GOOGLE_MAPS_API_KEY</code> to your project’s Environment Variables and make sure the “Maps
            JavaScript API” is enabled with billing turned on.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={center} defaultZoom={zoom} gestureHandling="greedy" disableDefaultUI={false}>
          {markers.map((m, i) => (
            <Marker key={i} position={{ lat: m.lat, lng: m.lng }} title={m.title} />
          ))}
        </Map>
      </APIProvider>
    </div>
  )
}
