"use client"

import { BarChart3, TrendingUp, Eye, Download, Users, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-muted-foreground">Track your event performance</p>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,345</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                        <Download className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,456</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            +15.3% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3,789</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>
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
            </div>

            {/* Charts Placeholder */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Views Over Time</CardTitle>
                        <CardDescription>Daily views for the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                            <div className="text-center text-muted-foreground">
                                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                                <p>Chart visualization coming soon</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Top Events</CardTitle>
                        <CardDescription>Most viewed events this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Summer Wedding 2025", views: 4567, percentage: 37 },
                                { name: "Corporate Gala", views: 3421, percentage: 28 },
                                { name: "Birthday Party", views: 2890, percentage: 23 },
                                { name: "Anniversary Event", views: 1467, percentage: 12 },
                            ].map((event, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{event.name}</span>
                                        <span className="text-muted-foreground">{event.views} views</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-600 rounded-full"
                                            style={{ width: `${event.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Geographic Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription>Where your visitors are from</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { country: "United States", visitors: 1234, percentage: 45 },
                            { country: "United Kingdom", visitors: 567, percentage: 21 },
                            { country: "Canada", visitors: 432, percentage: 16 },
                            { country: "Australia", visitors: 289, percentage: 11 },
                            { country: "Others", visitors: 189, percentage: 7 },
                        ].map((location, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">{location.country}</span>
                                        <span className="text-muted-foreground">{location.visitors} visitors</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-600 rounded-full"
                                            style={{ width: `${location.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
