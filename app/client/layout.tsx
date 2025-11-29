import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-muted/30">
            <Sidebar userRole="client" />
            <div className="lg:pl-64">
                <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
            </div>
        </div>
    )
}
