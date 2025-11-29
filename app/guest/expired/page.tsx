"use client"

import { Calendar, Clock, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuestExpiredPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Expired Events</h1>
                <p className="text-muted-foreground">Past events (read-only access)</p>
            </div>

            {/* Expired Events Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                        name: "New Year Party 2025",
                        host: "Sarah Wilson",
                        date: "January 1, 2025",
                        photos: 234,
                        videos: 15,
                        views: 1234,
                        expiredOn: "March 1, 2025"
                    },
                    {
                        name: "Corporate Event",
                        host: "Tech Corp",
                        date: "December 15, 2024",
                        photos: 445,
                        videos: 28,
                        views: 2456,
                        expiredOn: "February 15, 2025"
                    },
                    {
                        name: "Holiday Gathering",
                        host: "Johnson Family",
                        date: "December 25, 2024",
                        photos: 178,
                        videos: 8,
                        views: 892,
                        expiredOn: "February 25, 2025"
                    },
                ].map((event, i) => (
                    <Card key={i} className="opacity-75 hover:opacity-100 transition-opacity">
                        <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="text-center">
                                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm opacity-75">Event Gallery</p>
                                </div>
                            </div>
                            <div className="absolute top-2 right-2">
                                <span className="px-2 py-1 rounded-full text-xs bg-gray-500 text-white">
                                    Expired
                                </span>
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg">{event.name}</CardTitle>
                            <CardDescription>By {event.host}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{event.photos} photos</span>
                                <span>{event.videos} videos</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                {event.views} views
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                Expired on {event.expiredOn}
                            </div>
                            <div className="text-xs text-muted-foreground italic">
                                This event is no longer accessible
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
