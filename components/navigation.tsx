"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import { signOut } from "@/app/actions/auth"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/activity", label: "Activity" },
  { href: "/my-rides", label: "My Rides" },
  { href: "/my-garage", label: "My Garage" },
]

export function Navigation() {
  const pathname = usePathname()
  const { user, loading } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "var(--geist-accents-2)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-medium" style={{ color: "var(--geist-foreground)" }}>
              Atlas
            </Link>
          </div>
          <div className="flex space-x-2 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "geist-button transition-colors",
                  pathname === item.href ? "geist-button-primary" : "geist-button-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}

            {!loading && (
              <>
                <Link href="/profile" className="geist-button geist-button-secondary">
                  Profile
                </Link>
                {user && (
                  <button onClick={handleSignOut} className="geist-button geist-button-secondary">
                    Sign Out
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
