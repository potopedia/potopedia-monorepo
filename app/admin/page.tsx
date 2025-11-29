import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ImageIcon, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  // Sample data for the admin dashboard
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Events",
      value: "567",
      icon: Calendar,
      change: "+8%",
      trend: "up",
    },
    {
      title: "Total Media",
      value: "45.2K",
      icon: ImageIcon,
      change: "+23%",
      trend: "up",
    },
    {
      title: "Storage Used",
      value: "1.2TB",
      icon: TrendingUp,
      change: "-5%",
      trend: "down",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Photopedia admin dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" /> Generate Report
          </Button>
          <Button>View Analytics</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full p-2 bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Recently registered users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div>
                      <p className="font-medium">User {i}</p>
                      <p className="text-sm text-muted-foreground">user{i}@example.com</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Joined {i} day{i !== 1 ? "s" : ""} ago
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/admin/users">
                <Button variant="link">View all users</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Recently created events on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Event {i}</p>
                    <p className="text-sm text-muted-foreground">
                      Created {i} day{i !== 1 ? "s" : ""} ago
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{i * 50} photos</p>
                      <p className="text-xs text-muted-foreground">{i * 20} views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/admin/events">
                <Button variant="link">View all events</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system performance and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <StatusCard
              title="API Status"
              status="Operational"
              statusColor="green"
              value="99.9%"
              description="Uptime in last 30 days"
            />
            <StatusCard
              title="Storage Service"
              status="Operational"
              statusColor="green"
              value="1.2TB / 5TB"
              description="Current usage"
            />
            <StatusCard
              title="AI Processing"
              status="Degraded"
              statusColor="yellow"
              value="85%"
              description="Processing capacity"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface StatusCardProps {
  title: string
  status: string
  statusColor: "green" | "yellow" | "red"
  value: string
  description: string
}

function StatusCard({ title, status, statusColor, value, description }: StatusCardProps) {
  const statusColorClass = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  }[statusColor]

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${statusColorClass}`}></div>
          <span className="text-sm">{status}</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
