import { Button } from "@/components/ui/button"
import { Camera, Download, Heart, Share2, Filter } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GalleryPage({ params }: { params: { code: string } }) {
  // Sample data for the gallery
  const event = {
    id: "1",
    name: "Smith Wedding",
    date: "April 15, 2025",
    location: "Grand Hotel, New York",
    photographer: "Jane Doe Photography",
    photoCount: 342,
  }

  // Generate sample photos
  const photos = Array.from({ length: 20 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/placeholder.svg?height=600&width=800`,
    width: 800,
    height: 600,
  }))

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Photopedia</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
            <p className="text-muted-foreground">
              {event.date} • {event.location}
            </p>
            <p className="text-sm mt-1">
              By {event.photographer} • {event.photoCount} photos
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Photos</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button size="sm" className="flex-1 md:flex-none">
                <Download className="mr-2 h-4 w-4" /> Download All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <GalleryPhoto key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Camera className="h-5 w-5 text-primary" />
            <span className="font-semibold">Photopedia</span>
          </div>
          <p className="text-sm text-muted-foreground">Powered by Photopedia • AI-Enhanced Event Photography</p>
        </div>
      </footer>
    </div>
  )
}

interface GalleryPhotoProps {
  photo: {
    id: string
    src: string
    width: number
    height: number
  }
}

function GalleryPhoto({ photo }: GalleryPhotoProps) {
  return (
    <div className="group relative rounded-lg overflow-hidden border bg-card">
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
            <Heart className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
