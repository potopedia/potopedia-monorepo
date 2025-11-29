import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Plus, Sparkles, Music, Palette, Layers, Play, Download, Share2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VideosPage() {
  // Sample data for videos
  const videos = [
    {
      id: "1",
      title: "Smith Wedding Highlights",
      event: "Smith Wedding",
      date: "Apr 15, 2025",
      duration: "3:24",
      thumbnail: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "2",
      title: "Corporate Gala Recap",
      event: "Corporate Gala",
      date: "Apr 10, 2025",
      duration: "2:45",
      thumbnail: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Video Generator</h1>
          <p className="text-muted-foreground">Create stunning videos from your event photos</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Video
        </Button>
      </div>

      <Tabs defaultValue="generator">
        <TabsList>
          <TabsTrigger value="generator">Video Generator</TabsTrigger>
          <TabsTrigger value="library">Video Library</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Video</CardTitle>
              <CardDescription>Use AI to transform your photos into a professional video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">AI Style Selection</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose a style for your video and our AI will apply it
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {["Cinematic", "Documentary", "Vintage", "Modern"].map((style) => (
                        <div
                          key={style}
                          className="border rounded-md p-3 text-center cursor-pointer hover:border-primary"
                        >
                          <p className="text-sm font-medium">{style}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Music className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Music Selection</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose background music or let AI select the perfect track
                    </p>
                    <div className="space-y-2">
                      {["Romantic", "Upbeat", "Emotional", "AI Recommended"].map((music) => (
                        <div
                          key={music}
                          className="border rounded-md p-3 flex items-center justify-between cursor-pointer hover:border-primary"
                        >
                          <p className="text-sm font-medium">{music}</p>
                          <Play className="h-4 w-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Branding Options</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Add your logo and customize colors</p>
                    <div className="space-y-3">
                      <div className="border rounded-md p-3 flex items-center justify-between cursor-pointer hover:border-primary">
                        <p className="text-sm font-medium">Add Logo</p>
                        <Plus className="h-4 w-4" />
                      </div>
                      <div className="border rounded-md p-3 flex items-center justify-between cursor-pointer hover:border-primary">
                        <p className="text-sm font-medium">Color Theme</p>
                        <div className="flex gap-1">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          <div className="h-4 w-4 rounded-full bg-indigo-500"></div>
                          <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Layers className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Transitions & Effects</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Choose transitions or let AI optimize them</p>
                    <div className="space-y-2">
                      {["Fade", "Slide", "Zoom", "AI Optimized"].map((transition) => (
                        <div
                          key={transition}
                          className="border rounded-md p-3 flex items-center justify-between cursor-pointer hover:border-primary"
                        >
                          <p className="text-sm font-medium">{transition}</p>
                          {transition === "AI Optimized" && <Sparkles className="h-4 w-4 text-primary" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Video
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface VideoCardProps {
  video: {
    id: string
    title: string
    event: string
    date: string
    duration: string
    thumbnail: string
  }
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="relative">
        <div
          className="aspect-video bg-muted"
          style={{
            backgroundImage: `url(${video.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 p-3 cursor-pointer hover:bg-primary/90 transition-colors">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{video.title}</h3>
            <p className="text-sm text-muted-foreground">
              {video.event} • {video.date}
            </p>
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
                <Share2 className="mr-2 h-4 w-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Video className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" className="w-full">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button size="sm" className="w-full">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </div>
    </div>
  )
}
