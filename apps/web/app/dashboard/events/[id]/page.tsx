import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Share2, QrCode, ImageIcon, Users, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // Sample event data
  const event = {
    id: params.id,
    name: "Smith Wedding",
    date: "2025-04-15",
    time: "16:00",
    location: "Grand Hotel, New York",
    description: "Wedding ceremony and reception for John and Sarah Smith.",
    photos: 342,
    views: 156,
    galleryPassword: "love2025",
    galleryExpiry: "2026-04-15",
    allowDownloads: true,
    allowSharing: true,
    shareUrl: "https://potopedia.com/gallery/smith-wedding",
    shareCode: "SMITH2025",
  }

  // Sample photos
  const photos = Array.from({ length: 8 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/placeholder.svg?height=600&width=800`,
    width: 800,
    height: 600,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{event.name}</h1>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="sharing">Sharing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>View and edit your event information</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-name">Event Name</Label>
                    <Input id="event-name" defaultValue={event.name} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="event-date">Event Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="event-date" type="date" className="pl-8" defaultValue={event.date} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-time">Event Time</Label>
                      <Input id="event-time" type="time" defaultValue={event.time} />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="event-location">Location</Label>
                    <Input id="event-location" defaultValue={event.location} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea id="event-description" defaultValue={event.description} rows={4} />
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
                      <Label htmlFor="gallery-password">Gallery Password</Label>
                      <Input id="gallery-password" type="password" defaultValue={event.galleryPassword} />
                      <p className="text-xs text-muted-foreground">
                        If set, clients will need this password to access the gallery
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="gallery-expiry">Gallery Expiry</Label>
                      <Input id="gallery-expiry" type="date" defaultValue={event.galleryExpiry} />
                      <p className="text-xs text-muted-foreground">
                        If set, the gallery will no longer be accessible after this date
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allow-downloads"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked={event.allowDownloads}
                      />
                      <Label htmlFor="allow-downloads">Allow clients to download photos</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allow-sharing"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked={event.allowSharing}
                      />
                      <Label htmlFor="allow-sharing">Allow clients to share photos</Label>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Gallery</CardTitle>
              <CardDescription>Manage photos for this event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm font-medium">
                    {event.photos} photos • Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/upload?event=${event.id}`}>
                    <Button>Upload More Photos</Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative rounded-lg overflow-hidden border bg-card">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt="Gallery photo"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div className="w-full flex justify-between items-center">
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Load More Photos</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sharing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sharing Options</CardTitle>
              <CardDescription>Share this event gallery with clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Gallery Link</h3>
                  <div className="flex gap-2">
                    <Input value={event.shareUrl} readOnly />
                    <Button variant="outline">Copy</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Share this link with clients to give them access to the gallery
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" /> Share Link
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Code</h3>
                  <div className="flex items-center justify-center p-6 border rounded-lg bg-muted/30">
                    <div className="text-center">
                      <p className="text-3xl font-bold tracking-widest">{event.shareCode}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Clients can enter this code at potopedia.com/gallery
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" /> Share Code
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">QR Code</h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="border rounded-lg p-6 bg-white">
                    <div className="w-48 h-48 bg-muted flex items-center justify-center">
                      <QrCode className="h-32 w-32 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <p className="text-muted-foreground">
                      This QR code links directly to the gallery. Print it or display it at the event for easy access.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" className="flex-1">
                        Download PNG
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Download SVG
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Print
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Analytics</CardTitle>
              <CardDescription>Track engagement with your event gallery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                      <p className="text-2xl font-bold">{event.views}</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <ImageIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Photos</p>
                      <p className="text-2xl font-bold">{event.photos}</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Days Active</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 h-80 bg-muted/50 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Visitor activity chart will appear here</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Top Photos</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="h-16 w-16 bg-muted rounded-md relative overflow-hidden">
                        <Image src="/placeholder.svg?height=200&width=200" alt="Photo thumbnail" fill />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Photo #{i}</p>
                        <p className="text-sm text-muted-foreground">
                          {120 - i * 20} views • {45 - i * 10} downloads
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
