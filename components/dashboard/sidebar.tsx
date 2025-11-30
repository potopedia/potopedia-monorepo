"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Camera,
  LayoutDashboard,
  Calendar,
  Upload,
  ImageIcon,
  Video,
  Settings,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  Share2,
  Paintbrush,
  Tag,
  QrCode,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"

interface SidebarProps {
  userRole?: "photographer" | "client" | "guest" | "admin"
}

export function Sidebar({ userRole = "photographer" }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const photographerLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/events", label: "Events", icon: Calendar },
    { href: "/dashboard/upload", label: "Upload", icon: Upload },
    { href: "/dashboard/media", label: "Media", icon: ImageIcon },
    { href: "/dashboard/videos", label: "Videos", icon: Video },
    { href: "/dashboard/watermark", label: "Watermark", icon: Paintbrush },
    { href: "/dashboard/face-labeling", label: "Face Labeling", icon: Tag },
    { href: "/dashboard/sharing", label: "Sharing", icon: Share2 },
    { href: "/dashboard/qr-code", label: "QR Codes", icon: QrCode },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/help", label: "Help Center", icon: HelpCircle },
  ]

  const clientLinks = [
    { href: "/client", label: "Dashboard", icon: LayoutDashboard },
    { href: "/client/events", label: "My Events", icon: Calendar },
    { href: "/client/photographers", label: "Photographers", icon: Users },
    { href: "/client/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/client/settings", label: "Settings", icon: Settings },
  ]

  const guestLinks = [
    { href: "/guest", label: "Dashboard", icon: LayoutDashboard },
    { href: "/guest/events", label: "Active Events", icon: Calendar },
    { href: "/guest/favorites", label: "Favorites", icon: ImageIcon },
    { href: "/guest/expired", label: "Expired Events", icon: QrCode },
  ]

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/media", label: "Media", icon: ImageIcon },
    { href: "/admin/ai-monitor", label: "AI Monitor", icon: Video },
    { href: "/admin/storage", label: "Storage", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  const links =
    userRole === "admin" ? adminLinks :
      userRole === "client" ? clientLinks :
        userRole === "guest" ? guestLinks :
          photographerLinks

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    router.push("/login")
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <Camera className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Potopedia</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const isActive =
                (link.href === "/dashboard" || link.href === "/admin" || link.href === "/client" || link.href === "/guest")
                  ? pathname === link.href
                  : pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </div>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  )
}
