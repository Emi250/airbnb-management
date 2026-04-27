"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home } from "lucide-react"
import { sidebarNavItems } from "./sidebar"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-5 w-5" />
          <span>Airbnb Manager</span>
        </Link>
        <button 
          onClick={() => setOpen(!open)}
          className="p-2 -mr-2 rounded-md hover:bg-muted"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Fullscreen Overlay Menu */}
      {open && (
        <div className="fixed inset-0 top-[65px] z-50 bg-background/95 backdrop-blur-sm p-4 overflow-y-auto">
          <nav className="grid gap-2">
            {sidebarNavItems.map((item, index) => (
              <Link key={index} href={item.href} onClick={() => setOpen(false)}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-4 text-base font-medium transition-all hover:bg-muted hover:text-primary",
                    pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
