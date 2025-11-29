"use client"

import { Users, Star, MapPin, Camera, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ClientPhotographersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Photographers</h1>
                <p className="text-muted-foreground">Discover and connect with photographers</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Input placeholder="Search photographers..." className="max-w-md" />
            </div>

            {/* Photographers Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                        name: "John Smith",
                        specialty: "Wedding Photography",
                        location: "New York, NY",
                        rating: 4.9,
                        reviews: 127,
                        events: 45,
                        status: "Connected"
                    },
                    {
                        name: "Sarah Johnson",
                        specialty: "Event Photography",
                        location: "Los Angeles, CA",
                        rating: 4.8,
                        reviews: 98,
                        events: 32,
                        status: "Connected"
                    },
                    {
                        name: "Mike Davis",
                        specialty: "Corporate Events",
                        location: "Chicago, IL",
                        rating: 4.7,
                        reviews: 156,
                        events: 67,
                        status: null
                    },
                    {
                        name: "Emily Chen",
                        specialty: "Portrait & Events",
                        location: "San Francisco, CA",
                        rating: 5.0,
                        reviews: 89,
                        events: 28,
                        status: null
                    },
                ].map((photographer, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                    {photographer.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{photographer.name}</CardTitle>
                                    <CardDescription>{photographer.specialty}</CardDescription>
                                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        {photographer.location}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{photographer.rating}</span>
                                    <span className="text-muted-foreground">({photographer.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Camera className="h-4 w-4" />
                                    {photographer.events} events
                                </div>
                            </div>
                            {photographer.status ? (
                                <Badge variant="secondary" className="w-full justify-center">
                                    {photographer.status}
                                </Badge>
                            ) : (
                                <Button className="w-full gap-2" size="sm">
                                    <Send className="h-4 w-4" />
                                    Connect
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
