"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  CalendarDays, 
  DollarSign, 
  CreditCard, 
  BarChart3, 
  Home, 
  Sparkles,
  Settings
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Calendario",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "Ingresos",
    href: "/income",
    icon: DollarSign,
  },
  {
    title: "Gastos",
    href: "/expenses",
    icon: CreditCard,
  },
  {
    title: "Reportes",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Propiedades",
    href: "/properties",
    icon: Home,
  },
  {
    title: "Análisis IA",
    href: "/ai-summary",
    icon: Sparkles,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64 h-screen fixed">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-6 lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6" />
            <span className="">Airbnb Manager</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium gap-1">
            {sidebarNavItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href ? "bg-muted text-primary" : ""
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}
