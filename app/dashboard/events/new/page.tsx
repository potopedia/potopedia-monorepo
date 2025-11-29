import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Enter the details for your new photography event</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="event-name">Event Name</Label>
                <Input id="event-name" placeholder="e.g. Smith Wedding" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-date">Event Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="event-date" type="date" className="pl-8" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-time">Event Time</Label>
                  <Input id="event-time" type="time" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-location">Location</Label>
                <Input id="event-location" placeholder="e.g. Grand Hotel, New York" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea id="event-description" placeholder="Add details about the event..." rows={4} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Gallery Settings</h3>
                <p className="text-sm text-muted-foreground">Configure how clients will access and view photos</p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="gallery-password">Gallery Password (Optional)</Label>
                  <Input id="gallery-password" type="password" placeholder="Leave blank for no password" />
                  <p className="text-xs text-muted-foreground">
                    If set, clients will need this password to access the gallery
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gallery-expiry">Gallery Expiry (Optional)</Label>
                  <Input id="gallery-expiry" type="date" />
                  <p className="text-xs text-muted-foreground">
                    If set, the gallery will no longer be accessible after this date
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="allow-downloads" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="allow-downloads">Allow clients to download photos</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="allow-sharing" className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor="allow-sharing">Allow clients to share photos</Label>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create Event</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
