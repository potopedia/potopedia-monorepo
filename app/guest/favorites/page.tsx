"use client"

import { Heart, Download, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuestFavoritesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Favorites</h1>
                <p className="text-muted-foreground">Your saved photos from all events</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">Across 3 events</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Downloaded</CardTitle>
                        <Download className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">With favorites</p>
                    </CardContent>
                </Card>
            </div>

            {/* Favorites Grid */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Card key={i} className="group relative overflow-hidden">
                        <div className="aspect-square bg-gradient-to-br from-purple-400 to-indigo-600 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-white opacity-50">
                                <Heart className="h-12 w-12" />
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="flex gap-2">
                                    <Button size="icon" variant="secondary">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="absolute top-2 right-2">
                                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                            </div>
                        </div>
                        <CardContent className="p-3">
                            <p className="text-xs text-muted-foreground">Summer Wedding 2025</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
