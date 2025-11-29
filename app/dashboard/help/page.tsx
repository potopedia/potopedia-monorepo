import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search, HelpCircle, Book, Video, MessageSquare, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HelpCenterPage() {
  // Sample help categories
  const helpCategories = [
    { id: "1", title: "Getting Started", icon: Book, articles: 12 },
    { id: "2", title: "Account Management", icon: HelpCircle, articles: 8 },
    { id: "3", title: "Events & Galleries", icon: Book, articles: 15 },
    { id: "4", title: "Uploading & Managing Photos", icon: Book, articles: 10 },
    { id: "5", title: "AI Features", icon: Book, articles: 7 },
    { id: "6", title: "Sharing & Client Access", icon: Book, articles: 9 },
  ]

  // Sample popular articles
  const popularArticles = [
    { id: "1", title: "How to create your first event", category: "Getting Started" },
    { id: "2", title: "Setting up watermarks for your photos", category: "Uploading & Managing Photos" },
    { id: "3", title: "Using AI to enhance your photos", category: "AI Features" },
    { id: "4", title: "Sharing galleries with clients", category: "Sharing & Client Access" },
    { id: "5", title: "Managing face recognition and labeling", category: "AI Features" },
  ]

  // Sample video tutorials
  const videoTutorials = [
    {
      id: "1",
      title: "Getting Started with Photopedia",
      duration: "5:24",
      thumbnail: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "2",
      title: "Advanced Photo Management",
      duration: "8:12",
      thumbnail: "/placeholder.svg?height=600&width=800",
    },
    { id: "3", title: "AI Features Explained", duration: "6:45", thumbnail: "/placeholder.svg?height=600&width=800" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
      </div>
      <p className="text-muted-foreground">Find answers to your questions and learn how to use Photopedia</p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for help articles..." className="pl-10 py-6 text-lg" />
      </div>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles">Help Articles</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Help Categories</CardTitle>
                <CardDescription>Browse help articles by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {helpCategories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4 hover:border-primary cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <category.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">{category.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{category.articles} articles</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Articles</CardTitle>
                <CardDescription>Most frequently read help articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularArticles.map((article) => (
                    <div key={article.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <Link href="#" className="hover:text-primary">
                        <h3 className="font-medium">{article.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{article.category}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recently Updated Articles</CardTitle>
              <CardDescription>Stay up to date with our latest help content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href="#" className="hover:text-primary">
                        <h3 className="font-medium">New AI Enhancement Features Explained</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">AI Features</p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                      New
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    Learn about our latest AI photo enhancement features, including portrait retouching, background
                    enhancement, and color correction.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href="#" className="hover:text-primary">
                        <h3 className="font-medium">Face Recognition and Labeling Guide</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">AI Features</p>
                    </div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-0.5 rounded-full">
                      Updated
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    Updated guide on how to use our face recognition technology to automatically identify and label
                    people in your photos.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href="#" className="hover:text-primary">
                        <h3 className="font-medium">QR Code Sharing Best Practices</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">Sharing & Client Access</p>
                    </div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-0.5 rounded-full">
                      Updated
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    Learn how to effectively use QR codes to share your galleries at events and in printed materials.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Learn how to use Photopedia with step-by-step video guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {videoTutorials.map((video) => (
                  <div key={video.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video relative bg-muted">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-black/50 p-3 cursor-pointer hover:bg-primary/90 transition-colors">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Featured Tutorial</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video relative bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(/placeholder.svg?height=600&width=800)` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/50 p-4 cursor-pointer hover:bg-primary/90 transition-colors">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">Complete Photopedia Walkthrough</h3>
                    <p className="text-sm text-muted-foreground mt-1">15:32 • Comprehensive guide to all features</p>
                    <p className="mt-2">
                      This complete walkthrough covers everything from setting up your account to using advanced AI
                      features and sharing with clients.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="support-name">Your Name</Label>
                    <Input id="support-name" placeholder="Enter your name" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="support-email">Email Address</Label>
                    <Input id="support-email" type="email" placeholder="Enter your email" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="support-subject">Subject</Label>
                    <Input id="support-subject" placeholder="What do you need help with?" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="support-message">Message</Label>
                    <textarea
                      id="support-message"
                      className="w-full h-32 p-3 rounded-md border"
                      placeholder="Describe your issue in detail..."
                    ></textarea>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="support-attachments">Attachments (Optional)</Label>
                    <Input id="support-attachments" type="file" multiple />
                    <p className="text-xs text-muted-foreground">
                      You can attach screenshots or files to help explain your issue
                    </p>
                  </div>

                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>Chat with our support team in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Start a Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our support team is available Monday-Friday, 9am-5pm EST
                    </p>
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" /> Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>Other ways to get help</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:border-primary cursor-pointer">
                      <Book className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Knowledge Base</h3>
                        <p className="text-sm text-muted-foreground">Browse our comprehensive documentation</p>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </div>

                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:border-primary cursor-pointer">
                      <Video className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">YouTube Channel</h3>
                        <p className="text-sm text-muted-foreground">Watch tutorial videos and webinars</p>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </div>

                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:border-primary cursor-pointer">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Community Forum</h3>
                        <p className="text-sm text-muted-foreground">Connect with other Photopedia users</p>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
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
