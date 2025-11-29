import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, Calendar, ArrowUpRight, ArrowDownRight, Users, ImageIcon, Video } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track platform usage and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Date Range
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="time-filter" className="text-sm font-medium">
            Time Period
          </label>
          <Select defaultValue="30d">
            <SelectTrigger id="time-filter">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Users" value="1,234" change="+12%" trend="up" icon={Users} />
        <MetricCard title="Active Events" value="156" change="+8%" trend="up" icon={Calendar} />
        <MetricCard title="Photos Uploaded" value="45.2K" change="+23%" trend="up" icon={ImageIcon} />
        <MetricCard title="Videos Generated" value="342" change="-5%" trend="down" icon={Video} />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="ai">AI Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted/50 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart: User Growth</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Metrics</CardTitle>
                <CardDescription>Photos and videos uploaded over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full bg-muted/50 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart: Content Metrics</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Detailed user engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-3xl font-bold mt-2">876</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <p className="text-xs text-green-500">+12% from last month</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">Avg. Session Duration</p>
                    <p className="text-3xl font-bold mt-2">8:24</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <p className="text-xs text-green-500">+3% from last month</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                    <p className="text-3xl font-bold mt-2">24%</p>
                    <div className="flex items-center mt-2">
                      <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                      <p className="text-xs text-green-500">-2% from last month</p>
                    </div>
                  </div>
                </div>

                <div className="h-80 bg-muted/50 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart: User Engagement</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Analytics</CardTitle>
              <CardDescription>Photo and video metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Photos</p>
                    <p className="text-3xl font-bold mt-2">45.2K</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <p className="text-xs text-green-500">+23% from last month</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Videos</p>
                    <p className="text-3xl font-bold mt-2">342</p>
                    <div className="flex items-center mt-2">
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      <p className="text-xs text-red-500">-5% from last month</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                    <p className="text-3xl font-bold mt-2">1.2TB</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-yellow-500 mr-1" />
                      <p className="text-xs text-yellow-500">+18% from last month</p>
                    </div>
                  </div>
                </div>

                <div className="h-80 bg-muted/50 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart: Content Growth</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Usage Analytics</CardTitle>
              <CardDescription>AI feature usage and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">AI Enhancements</p>
                    <p className="text-3xl font-bold mt-2">12.4K</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <p className="text-xs text-green-500">+32% from last month</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">AI Videos</p>
                    <p className="text-3xl font-bold mt-2">342</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <p className="text-xs text-green-500">+15% from last month</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground">Face Recognition</p>
                    <p className="text-3xl font-bold mt-2">8.7K</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <p className="text-xs text-green-500">+28% from last month</p>
                    </div>
                  </div>
                </div>

                <div className="h-80 bg-muted/50 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart: AI Feature Usage</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
}

function MetricCard({ title, value, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="rounded-full p-2 bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="flex items-center mt-2">
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <p className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change} from last month</p>
        </div>
      </CardContent>
    </Card>
  )
}
