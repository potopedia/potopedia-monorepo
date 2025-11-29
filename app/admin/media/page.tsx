import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, Download, Trash2, Eye, ImageIcon, Video } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function AdminMediaPage() {
  // Sample media data
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: `photo-${i + 1}`,
    name: `IMG_${1000 + i}.jpg`,
    event: i % 3 === 0 ? "Smith Wedding" : i % 3 === 1 ? "Corporate Gala" : "Johnson Birthday",
    photographer: i % 3 === 0 ? "John Smith" : i % 3 === 1 ? "Sarah Johnson" : "Michael Brown",
    date: `Apr ${15 - i}, 2025`,
    size: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}MB`,
    type: "image/jpeg",
    enhanced: i % 4 === 0,
    src: `/placeholder.svg?height=600&width=800`,
  }))

  const videos = Array.from({ length: 4 }, (_, i) => ({
    id: `video-${i + 1}`,
    name: `VID_${2000 + i}.mp4`,
    event: i % 3 === 0 ? "Smith Wedding" : i % 3 === 1 ? "Corporate Gala" : "Johnson Birthday",
    photographer: i % 3 === 0 ? "John Smith" : i % 3 === 1 ? "Sarah Johnson" : "Michael Brown",
    date: `Apr ${15 - i}, 2025`,
    size: `${Math.floor(Math.random() * 20) + 10}.${Math.floor(Math.random() * 9)}MB`,
    type: "video/mp4",
    duration: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 59)
      .toString()
      .padStart(2, "0")}`,
    src: `/placeholder.svg?height=600&width=800`,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Manager</h1>
          <p className="text-muted-foreground">Manage all photos and videos across the platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search-media" className="text-sm font-medium">
            Search media
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-media"
              type="search"
              placeholder="Search by filename, event, or photographer..."
              className="pl-8"
            />
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
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="photos">
        <TabsList>
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> Photos
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" /> Videos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        <Checkbox />
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Preview</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Filename</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Event</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Photographer</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Size</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {photos.map((photo) => (
                      <tr key={photo.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <Checkbox />
                        </td>
                        <td className="p-4 align-middle">
                          <div className="h-12 w-16 relative rounded overflow-hidden">
                            <Image
                              src={photo.src || "/placeholder.svg"}
                              alt={photo.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-4 align-middle font-medium">{photo.name}</td>
                        <td className="p-4 align-middle">{photo.event}</td>
                        <td className="p-4 align-middle">{photo.photographer}</td>
                        <td className="p-4 align-middle">{photo.date}</td>
                        <td className="p-4 align-middle">{photo.size}</td>
                        <td className="p-4 align-middle">
                          {photo.enhanced && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Enhanced
                            </Badge>
                          )}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Full Size</DropdownMenuItem>
                                <DropdownMenuItem>Edit Photo</DropdownMenuItem>
                                <DropdownMenuItem>Move to Event</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                {photo.enhanced ? (
                                  <DropdownMenuItem>View Original</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>Enhance Photo</DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-destructive">Delete Photo</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        <Checkbox />
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Preview</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Filename</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Event</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Photographer</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Duration</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Size</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map((video) => (
                      <tr key={video.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <Checkbox />
                        </td>
                        <td className="p-4 align-middle">
                          <div className="h-12 w-16 relative rounded overflow-hidden">
                            <Image
                              src={video.src || "/placeholder.svg"}
                              alt={video.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle font-medium">{video.name}</td>
                        <td className="p-4 align-middle">{video.event}</td>
                        <td className="p-4 align-middle">{video.photographer}</td>
                        <td className="p-4 align-middle">{video.date}</td>
                        <td className="p-4 align-middle">{video.duration}</td>
                        <td className="p-4 align-middle">{video.size}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Play Video</DropdownMenuItem>
                                <DropdownMenuItem>Edit Video</DropdownMenuItem>
                                <DropdownMenuItem>Move to Event</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete Video</DropdownMenuItem>
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
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>12</strong> of <strong>120</strong> items
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

function Play({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}
