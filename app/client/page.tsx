"use client"

import { Calendar, Users, BarChart3, Plus, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Client Dashboard</h1>
                    <p className="text-muted-foreground">Manage your events and photographers</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Event
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">2 upcoming</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Photographers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Connected</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Events */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                    <CardDescription>Your latest event activities</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "Summer Wedding 2025", status: "Active", views: 456, date: "Jun 15, 2025" },
                            { name: "Corporate Gala", status: "Active", views: 234, date: "May 20, 2025" },
                            { name: "Birthday Party", status: "Expired", views: 544, date: "Apr 10, 2025" },
                        ].map((event, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{event.name}</h3>
                                    <p className="text-sm text-muted-foreground">{event.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm">
                                        <Eye className="h-4 w-4 inline mr-1" />
                                        {event.views} views
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs ${event.status === "Active"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                        }`}>
                                        {event.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
