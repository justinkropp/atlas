// Server-only route that returns the Google Maps key.
// Next.js automatically runs this on the server, so env access is safe.
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  })
}
