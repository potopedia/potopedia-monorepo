"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  ImageIcon,
  Users,
  TrendingUp,
  Plus,
  Download,
  Share2,
  QrCode,
  Sparkles,
  Zap,
  ArrowRight,
  Share,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Sample data for the dashboard
  const stats = [
    { title: "Total Events", value: "12", icon: Calendar, change: "+2 this month", delay: "0" },
    { title: "Total Photos", value: "1,234", icon: ImageIcon, change: "+156 this week", delay: "100" },
    { title: "Client Views", value: "5,678", icon: Users, change: "+23% from last month", delay: "200" },
    { title: "Downloads", value: "892", icon: TrendingUp, change: "+12% from last week", delay: "300" },
  ]

  const recentEvents = [
    { id: "1", name: "Smith Wedding", date: "Apr 15, 2025", photos: 342, views: 156 },
    { id: "2", name: "Corporate Gala", date: "Apr 10, 2025", photos: 218, views: 89 },
    { id: "3", name: "Johnson Birthday", date: "Apr 5, 2025", photos: 156, views: 67 },
  ]

  const aiProcessing = [
    { id: "1", name: "Photo Enhancement - Smith Wedding", progress: 75, total: 342, completed: 256 },
    { id: "2", name: "Video Generation - Corporate Gala", progress: 40, total: 1, completed: 0 },
    { id: "3", name: "Face Recognition - Johnson Birthday", progress: 90, total: 156, completed: 140 },
  ]

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 md:p-12 text-white shadow-2xl animate-fade-in-up">
        {/* Decorative blurred elements for depth */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="inline-block mb-3 px-4 py-1 bg-purple-500/20 backdrop-blur border border-purple-400/30 rounded-full">
              <p className="text-sm font-semibold text-purple-200">Welcome to Photopedia</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Welcome Back!</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Manage your events, enhance photos with AI, and share stunning galleries with your clients.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link href="/dashboard/events/new">
              <Button className="bg-white text-purple-600 hover:bg-slate-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" /> New Event
              </Button>
            </Link>
            <Link href="/dashboard/upload">
              <Button
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm font-semibold bg-transparent"
              >
                <ImageIcon className="mr-2 h-4 w-4" /> Upload Photos
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-200 border-slate-200 dark:border-slate-700 dark:hover:border-purple-500 animate-fade-in-up"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.title}</p>
                  <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                </div>
                <div className="rounded-lg p-3 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-950/30 animate-glow">
                  <stat.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                <Zap className="h-3 w-3 text-green-500" /> {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* AI Processing Card - spans 1-2 columns */}
        <Card
          className="md:col-span-2 hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 dark:hover:border-purple-500 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              AI Processing Queue
            </CardTitle>
            <CardDescription>Active AI tasks and enhancements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiProcessing.map((task, idx) => (
                <div
                  key={task.id}
                  className="space-y-2 animate-slide-in-right"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-foreground">{task.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-2 py-1 rounded">
                        {task.progress}%
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/20"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {task.completed} of {task.total} completed
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card
          className="md:col-span-1 border-slate-200 dark:border-slate-700 dark:hover:border-purple-500 animate-fade-in-up"
          style={{ animationDelay: "250ms" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">This Month</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">↑ 23%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-lg font-bold text-green-600">↑ 12%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Shares</p>
                <p className="text-lg font-bold text-blue-600">↑ 8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <Tabs defaultValue="recent" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <TabsTrigger value="recent">Recent Events</TabsTrigger>
              <TabsTrigger value="popular">Popular Events</TabsTrigger>
            </TabsList>
            <Link href="/dashboard/events">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-semibold"
              >
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <TabsContent value="recent" className="mt-4">
            <Card className="hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Your most recently created events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvents.map((event, idx) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 py-2 rounded transition-colors duration-200 animate-slide-in-right"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                            {event.photos} photos
                          </p>
                          <p className="text-xs text-muted-foreground">{event.views} views</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-950/30"
                          >
                            <Share2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-950/30"
                          >
                            <QrCode className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popular" className="mt-4">
            <Card className="hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle>Popular Events</CardTitle>
                <CardDescription>Your most viewed events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvents
                    .sort((a, b) => b.views - a.views)
                    .map((event, idx) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 py-2 rounded transition-colors duration-200 animate-slide-in-right"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{event.name}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                              {event.photos} photos
                            </p>
                            <p className="text-xs text-muted-foreground">{event.views} views</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-950/30"
                            >
                              <Share2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-950/30"
                            >
                              <Download className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Card className="border-slate-200 dark:border-slate-700 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with your most-used tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: "/dashboard/upload", icon: ImageIcon, label: "Upload Photos" },
              { href: "/dashboard/events/new", icon: Calendar, label: "Create Event" },
              { href: "/dashboard/sharing", icon: Share2, label: "Share Gallery" },
              { href: "/dashboard/videos", icon: Sparkles, label: "AI Features" },
            ].map((action, idx) => (
              <Link href={action.href} key={action.label}>
                <Button
                  variant="outline"
                  className="w-full h-24 flex flex-col items-center justify-center gap-3 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100/50 dark:hover:from-purple-950/30 dark:hover:to-purple-900/20 transition-all duration-300 group animate-slide-in-right bg-transparent"
                  style={{ animationDelay: `${550 + idx * 50}ms` }}
                >
                  <action.icon className="h-6 w-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-semibold text-foreground">{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
