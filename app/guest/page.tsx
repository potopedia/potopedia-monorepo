"use client"

import { QrCode, Link as LinkIcon, Calendar, Heart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GuestDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Guest Dashboard</h1>
                <p className="text-muted-foreground">Access and view event galleries</p>
            </div>

            {/* Access Event */}
            <Card>
                <CardHeader>
                    <CardTitle>Access Event</CardTitle>
                    <CardDescription>Enter an event code or scan QR code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="event-code">Event Code</Label>
                            <div className="flex gap-2">
                                <Input id="event-code" placeholder="Enter 6-digit code" />
                                <Button>Access</Button>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <Button variant="outline" className="w-full gap-2">
                                <QrCode className="h-4 w-4" />
                                Scan QR Code
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Available to view</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">Photos saved</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expired</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Past events</p>
                    </CardContent>
                </Card>
            </div>

            {/* Active Events */}
            <Card>
                <CardHeader>
                    <CardTitle>Active Events</CardTitle>
                    <CardDescription>Events you can currently access</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "Summer Wedding 2025", host: "John & Sarah", photos: 156, expires: "30 days" },
                            { name: "Birthday Celebration", host: "Mike Johnson", photos: 89, expires: "15 days" },
                        ].map((event, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{event.name}</h3>
                                    <p className="text-sm text-muted-foreground">By {event.host}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        {event.photos} photos
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 inline mr-1" />
                                        {event.expires}
                                    </div>
                                    <Button size="sm">View</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Expired Events */}
            <Card>
                <CardHeader>
                    <CardTitle>Expired Events</CardTitle>
                    <CardDescription>Past events (read-only)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "New Year Party 2025", host: "Sarah Wilson", photos: 234 },
                            { name: "Corporate Event", host: "Tech Corp", photos: 445 },
                        ].map((event, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{event.name}</h3>
                                    <p className="text-sm text-muted-foreground">By {event.host}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        {event.photos} photos
                                    </div>
                                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        Expired
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
