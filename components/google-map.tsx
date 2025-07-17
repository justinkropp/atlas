// Server component wrapper – NO env access, just renders the client map.
import { Suspense } from "react"
import { ClientGoogleMap } from "./client-google-map"

export function GoogleMap(props: Omit<Parameters<typeof ClientGoogleMap>[0], "className"> & { className?: string }) {
  return (
    <Suspense fallback={<div className={props.className ?? "w-full h-48"} />}>
      <ClientGoogleMap {...props} />
    </Suspense>
  )
}
