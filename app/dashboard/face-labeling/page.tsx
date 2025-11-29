import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, Search, Tag, Plus, X, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FaceLabelingPage() {
  // Sample data for people
  const people = [
    { id: "1", name: "John Smith", photos: 45, labeled: true },
    { id: "2", name: "Sarah Smith", photos: 42, labeled: true },
    { id: "3", name: "Michael Johnson", photos: 28, labeled: false },
    { id: "4", name: "Emily Davis", photos: 24, labeled: false },
    { id: "5", name: "David Wilson", photos: 18, labeled: true },
    { id: "6", name: "Jessica Taylor", photos: 15, labeled: false },
  ]

  // Sample data for events
  const events = [
    { id: "1", name: "Smith Wedding", date: "Apr 15, 2025", photos: 342, peopleLabeled: 12 },
    { id: "2", name: "Corporate Gala", date: "Apr 10, 2025", photos: 218, peopleLabeled: 8 },
    { id: "3", name: "Johnson Birthday", date: "Apr 5, 2025", photos: 156, peopleLabeled: 5 },
  ]

  // Sample photos with faces
  const photos = Array.from({ length: 6 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/placeholder.svg?height=600&width=800`,
    faces: Math.floor(Math.random() * 3) + 1,
    event: i % 3 === 0 ? "Smith Wedding" : i % 3 === 1 ? "Corporate Gala" : "Johnson Birthday",
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Face Labeling</h1>
      </div>
      <p className="text-muted-foreground">Organize photos by identifying and labeling people</p>

      <Tabs defaultValue="people">
        <TabsList>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="unlabeled">Unlabeled Faces</TabsTrigger>
        </TabsList>

        <TabsContent value="people" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>People</CardTitle>
                  <CardDescription>Manage people identified in your photos</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Person
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
                <div className="grid gap-2 flex-1">
                  <label htmlFor="search-people" className="text-sm font-medium">
                    Search people
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="search-people" type="search" placeholder="Search by name..." className="pl-8" />
                  </div>
                </div>
                <div className="grid gap-2 w-full md:w-[180px]">
                  <label htmlFor="event-filter" className="text-sm font-medium">
                    Event
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger id="event-filter">
                      <SelectValue placeholder="Filter by event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All events</SelectItem>
                      <SelectItem value="wedding">Smith Wedding</SelectItem>
                      <SelectItem value="gala">Corporate Gala</SelectItem>
                      <SelectItem value="birthday">Johnson Birthday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {people.map((person) => (
                  <div key={person.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-[4/3] relative bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <User className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{person.name}</h3>
                          <p className="text-sm text-muted-foreground">{person.photos} photos</p>
                        </div>
                        {person.labeled ? (
                          <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                            Labeled
                          </div>
                        ) : (
                          <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs px-2 py-1 rounded-full">
                            Needs Review
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          <Tag className="mr-2 h-4 w-4" /> Label
                        </Button>
                        <Button size="sm" className="w-full">
                          View Photos
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Manage face labeling by event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.date} • {event.photos} photos • {event.peopleLabeled} people labeled
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Users className="mr-2 h-4 w-4" /> View People
                        </Button>
                        <Button size="sm">
                          <Tag className="mr-2 h-4 w-4" /> Label Faces
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(event.peopleLabeled / 20) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((event.peopleLabeled / 20) * 100)}% of people labeled
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unlabeled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Unlabeled Faces</CardTitle>
              <CardDescription>Review and label faces that haven't been identified yet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
                <div className="grid gap-2 w-full md:w-[180px]">
                  <label htmlFor="event-filter-unlabeled" className="text-sm font-medium">
                    Event
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger id="event-filter-unlabeled">
                      <SelectValue placeholder="Filter by event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All events</SelectItem>
                      <SelectItem value="wedding">Smith Wedding</SelectItem>
                      <SelectItem value="gala">Corporate Gala</SelectItem>
                      <SelectItem value="birthday">Johnson Birthday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 w-full md:w-[180px]">
                  <label htmlFor="sort-by" className="text-sm font-medium">
                    Sort By
                  </label>
                  <Select defaultValue="recent">
                    <SelectTrigger id="sort-by">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="faces">Most Faces</SelectItem>
                      <SelectItem value="confidence">Confidence Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt="Photo with unlabeled faces"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {photo.faces} {photo.faces === 1 ? "face" : "faces"}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Unlabeled Faces</h3>
                          <p className="text-sm text-muted-foreground">{photo.event}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          <X className="mr-2 h-4 w-4" /> Skip
                        </Button>
                        <Button size="sm" className="w-full">
                          <Tag className="mr-2 h-4 w-4" /> Label
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Load More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
