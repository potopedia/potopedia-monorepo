import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, Calendar, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminEventsPage() {
  // Sample events data
  const events = [
    {
      id: "1",
      name: "Smith Wedding",
      photographer: "John Smith",
      date: "Apr 15, 2025",
      location: "Grand Hotel, New York",
      photos: 342,
      views: 156,
      status: "active",
    },
    {
      id: "2",
      name: "Corporate Gala",
      photographer: "Sarah Johnson",
      date: "Apr 10, 2025",
      location: "Convention Center, Chicago",
      photos: 218,
      views: 89,
      status: "active",
    },
    {
      id: "3",
      name: "Johnson Birthday",
      photographer: "Michael Brown",
      date: "Apr 5, 2025",
      location: "Backyard Garden, Los Angeles",
      photos: 156,
      views: 67,
      status: "active",
    },
    {
      id: "4",
      name: "Product Launch",
      photographer: "Emily Davis",
      date: "Mar 28, 2025",
      location: "Tech Hub, San Francisco",
      photos: 203,
      views: 112,
      status: "active",
    },
    {
      id: "5",
      name: "Charity Fundraiser",
      photographer: "David Wilson",
      date: "Mar 15, 2025",
      location: "Community Center, Boston",
      photos: 187,
      views: 78,
      status: "archived",
    },
    {
      id: "6",
      name: "Anniversary Party",
      photographer: "Jessica Taylor",
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
          <p className="text-muted-foreground">Manage all events across the platform</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search-events" className="text-sm font-medium">
            Search events
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-events"
              type="search"
              placeholder="Search by event name, photographer, or location..."
              className="pl-8"
            />
          </div>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="photographer-filter" className="text-sm font-medium">
            Photographer
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="photographer-filter">
              <SelectValue placeholder="Filter by photographer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All photographers</SelectItem>
              <SelectItem value="john">John Smith</SelectItem>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
              <SelectItem value="michael">Michael Brown</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    <Checkbox />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Event Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Photographer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Photos</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Views</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <Checkbox />
                    </td>
                    <td className="p-4 align-middle font-medium">{event.name}</td>
                    <td className="p-4 align-middle">{event.photographer}</td>
                    <td className="p-4 align-middle">{event.date}</td>
                    <td className="p-4 align-middle">{event.location}</td>
                    <td className="p-4 align-middle">{event.photos}</td>
                    <td className="p-4 align-middle">{event.views}</td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant="outline"
                        className={
                          event.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }
                      >
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Event</DropdownMenuItem>
                            <DropdownMenuItem>Edit Event</DropdownMenuItem>
                            <DropdownMenuItem>View Gallery</DropdownMenuItem>
                            {event.status === "active" ? (
                              <DropdownMenuItem>Archive Event</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Restore Event</DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">Delete Event</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>6</strong> of <strong>6</strong> events
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
