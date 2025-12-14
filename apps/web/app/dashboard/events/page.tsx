import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Plus, Search, Share2, QrCode, MoreHorizontal, ImageIcon, Users } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EventsPage() {
  // Sample data for events
  const events = [
    {
      id: "1",
      name: "Smith Wedding",
      date: "Apr 15, 2025",
      location: "Grand Hotel, New York",
      photos: 342,
      views: 156,
      status: "active",
    },
    {
      id: "2",
      name: "Corporate Gala",
      date: "Apr 10, 2025",
      location: "Convention Center, Chicago",
      photos: 218,
      views: 89,
      status: "active",
    },
    {
      id: "3",
      name: "Johnson Birthday",
      date: "Apr 5, 2025",
      location: "Backyard Garden, Los Angeles",
      photos: 156,
      views: 67,
      status: "active",
    },
    {
      id: "4",
      name: "Product Launch",
      date: "Mar 28, 2025",
      location: "Tech Hub, San Francisco",
      photos: 203,
      views: 112,
      status: "active",
    },
    {
      id: "5",
      name: "Charity Fundraiser",
      date: "Mar 15, 2025",
      location: "Community Center, Boston",
      photos: 187,
      views: 78,
      status: "archived",
    },
    {
      id: "6",
      name: "Anniversary Party",
      date: "Mar 10, 2025",
      location: "Seaside Restaurant, Miami",
      photos: 124,
      views: 45,
      status: "archived",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Manage your photography events and galleries</p>
        </div>
        <Link href="/dashboard/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search" className="text-sm font-medium">
            Search events
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" type="search" placeholder="Search by event name or location..." className="pl-8" />
          </div>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="status-filter" className="text-sm font-medium">
            Status
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All events</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="date-filter" className="text-sm font-medium">
            Date
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="date-filter">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
              <SelectItem value="last-month">Last month</SelectItem>
              <SelectItem value="this-year">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-primary/10 p-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Link href={`/dashboard/events/${event.id}`}>
                      <h3 className="text-lg font-semibold hover:text-primary">{event.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.location}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ImageIcon className="mr-1 h-4 w-4" />
                        {event.photos} photos
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {event.views} views
                      </div>
                      <div className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {event.status === "active" ? "Active" : "Archived"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <QrCode className="mr-2 h-4 w-4" /> QR Code
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit event</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate event</DropdownMenuItem>
                      <DropdownMenuItem>
                        {event.status === "active" ? "Archive event" : "Restore event"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete event</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
