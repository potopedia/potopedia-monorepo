import { Button } from "@/components/ui/button"
import { Camera, Download, Heart, Share2, Filter, ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function FaceRecognitionPage({ params }: { params: { code: string } }) {
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
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/placeholder.svg?height=600&width=800`,
    width: 800,
    height: 600,
    faces: Math.floor(Math.random() * 3) + 1,
  }))

  // Sample people detected in the event
  const people = [
    { id: "1", name: "John Smith", photos: 45 },
    { id: "2", name: "Sarah Smith", photos: 42 },
    { id: "3", name: "Michael Johnson", photos: 28 },
    { id: "4", name: "Emily Davis", photos: 24 },
    { id: "5", name: "David Wilson", photos: 18 },
    { id: "6", name: "Jessica Taylor", photos: 15 },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Potopedia</span>
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
          <div className="mb-8">
            <Link
              href={`/gallery/${params.code}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all photos
            </Link>
            <h1 className="text-3xl font-bold mb-2">{event.name} - Face Recognition</h1>
            <p className="text-muted-foreground">Find photos of specific people using AI-powered face recognition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-4">People in this Event</h2>
                  <div className="space-y-4">
                    {people.map((person) => (
                      <div key={person.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{person.name}</p>
                          <p className="text-xs text-muted-foreground">{person.photos} photos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Recognition Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Confidence Threshold</label>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Slider defaultValue={[75]} max={100} step={1} />
                      <p className="text-xs text-muted-foreground mt-1">
                        Adjust how confident the AI needs to be to identify a person
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Show only my photos</label>
                      <div className="h-4 w-8 bg-primary rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Include group photos</label>
                      <div className="h-4 w-8 bg-primary rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <Tabs defaultValue="all" className="w-full md:w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All People</TabsTrigger>
                    <TabsTrigger value="me">Just Me</TabsTrigger>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <GalleryPhoto key={photo.id} photo={photo} />
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Load More Photos</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Camera className="h-5 w-5 text-primary" />
            <span className="font-semibold">Potopedia</span>
          </div>
          <p className="text-sm text-muted-foreground">Powered by Potopedia • AI-Enhanced Event Photography</p>
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
    faces: number
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
        {photo.faces > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {photo.faces} {photo.faces === 1 ? "person" : "people"}
          </div>
        )}
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
