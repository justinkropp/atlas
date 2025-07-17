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
  const [apiKey, setApiKey] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/maps-key")
      .then((r) => r.json())
      .then((d) => setApiKey(d.key ?? ""))
      .catch(() => setApiKey(""))
  }, [])

  if (apiKey === null) {
    // Still loading
    return <div className={`${className} bg-gray-100 rounded-lg`} />
  }

  if (!apiKey) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center rounded-lg`}>
        <div className="text-center p-4">
          <p className="text-gray-600 mb-2">Google Maps API Key Required</p>
          <p className="text-sm text-gray-500">Add it in Project Settings.</p>
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
