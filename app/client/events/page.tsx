"use client"

import { Calendar, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ClientEventsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">My Events</h1>
                    <p className="text-muted-foreground">Manage all your events</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Event
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search events..." className="pl-10" />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            {/* Events Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                        name: "Summer Wedding 2025",
                        date: "June 15, 2025",
                        status: "Active",
                        photographer: "John Smith",
                        photos: 156,
                        views: 456,
                        expires: "30 days"
                    },
                    {
                        name: "Corporate Gala",
                        date: "May 20, 2025",
                        status: "Active",
                        photographer: "Sarah Johnson",
                        photos: 89,
                        views: 234,
                        expires: "45 days"
                    },
                    {
                        name: "Birthday Party",
                        date: "April 10, 2025",
                        status: "Expired",
                        photographer: "Mike Davis",
                        photos: 234,
                        views: 544,
                        expires: "Expired"
                    },
                ].map((event, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{event.name}</CardTitle>
                                <span className={`px-2 py-1 rounded-full text-xs ${event.status === "Active"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                    }`}>
                                    {event.status}
                                </span>
                            </div>
                            <CardDescription>{event.date}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-sm">
                                <span className="text-muted-foreground">Photographer:</span> {event.photographer}
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{event.photos} photos</span>
                                <span>{event.views} views</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Expires in: {event.expires}
                            </div>
                            <Button className="w-full mt-4" size="sm">
                                Manage Event
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
