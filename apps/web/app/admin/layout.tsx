import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-muted/30">
        <Sidebar userType="admin" />
        <div className="lg:pl-64">
          <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
