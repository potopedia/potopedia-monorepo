"use client"

import { Calendar, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuestEventsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Active Events</h1>
                <p className="text-muted-foreground">Events you can currently access</p>
            </div>

            {/* Active Events Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                        name: "Summer Wedding 2025",
                        host: "John & Sarah",
                        date: "June 15, 2025",
                        photos: 156,
                        videos: 12,
                        expires: "30 days",
                        thumbnail: null
                    },
                    {
                        name: "Birthday Celebration",
                        host: "Mike Johnson",
                        date: "May 20, 2025",
                        photos: 89,
                        videos: 5,
                        expires: "15 days",
                        thumbnail: null
                    },
                    {
                        name: "Corporate Event 2025",
                        host: "Tech Corp",
                        date: "April 28, 2025",
                        photos: 234,
                        videos: 18,
                        expires: "45 days",
                        thumbnail: null
                    },
                ].map((event, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer group">
                        <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="text-center">
                                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm opacity-75">Event Gallery</p>
                                </div>
                            </div>
                            <div className="absolute top-2 right-2">
                                <span className="px-2 py-1 rounded-full text-xs bg-green-500 text-white">
                                    Active
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
                                <Clock className="h-4 w-4" />
                                Expires in {event.expires}
                            </div>
                            <Button className="w-full group-hover:bg-purple-700 transition-colors">
                                View Gallery
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
