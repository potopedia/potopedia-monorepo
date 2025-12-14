import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, Trash2, Edit, MoreHorizontal, Sparkles } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MediaPage() {
  // Generate sample photos
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/placeholder.svg?height=600&width=800`,
    event: i % 3 === 0 ? "Smith Wedding" : i % 3 === 1 ? "Corporate Gala" : "Johnson Birthday",
    date: `Apr ${15 - i}, 2025`,
    enhanced: i % 4 === 0,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Manager</h1>
          <p className="text-muted-foreground">Manage, enhance, and organize your photos and videos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" /> Enhance Selected
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
              placeholder="Search by filename, event, or date..."
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
      </div>

      <Tabs defaultValue="photos">
        <TabsList>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <MediaCard key={photo.id} photo={photo} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <div className="flex items-center justify-center h-40 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No videos available</p>
          </div>
        </TabsContent>

        <TabsContent value="enhanced" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos
              .filter((p) => p.enhanced)
              .map((photo) => (
                <MediaCard key={photo.id} photo={photo} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MediaCardProps {
  photo: {
    id: string
    src: string
    event: string
    date: string
    enhanced: boolean
  }
}

function MediaCard({ photo }: MediaCardProps) {
  return (
    <div className="group relative rounded-lg overflow-hidden border bg-card">
      <div className="aspect-[4/3] relative">
        <Image src={photo.src || "/placeholder.svg"} alt="Media" fill className="object-cover" />
        {photo.enhanced && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Enhanced
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium truncate">{photo.event}</p>
            <p className="text-xs text-muted-foreground">{photo.date}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" /> Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" /> Enhance
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
