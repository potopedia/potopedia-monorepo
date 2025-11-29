import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, QrCode, Copy, Mail, MessageSquare, Facebook, Instagram, Twitter, Download } from "lucide-react"
import NextLink from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SharingPage() {
  // Sample events
  const events = [
    { id: "1", name: "Smith Wedding", date: "Apr 15, 2025", photos: 342, views: 156 },
    { id: "2", name: "Corporate Gala", date: "Apr 10, 2025", photos: 218, views: 89 },
    { id: "3", name: "Johnson Birthday", date: "Apr 5, 2025", photos: 156, views: 67 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <NextLink href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </NextLink>
        <h1 className="text-3xl font-bold tracking-tight">Sharing Center</h1>
      </div>
      <p className="text-muted-foreground">Share your galleries with clients and on social media</p>

      <div className="grid gap-2 w-full md:w-[300px]">
        <Label htmlFor="event-select">Select Event to Share</Label>
        <Select>
          <SelectTrigger id="event-select">
            <SelectValue placeholder="Select an event" />
          </SelectTrigger>
          <SelectContent>
            {events.map((event) => (
              <SelectItem key={event.id} value={event.id}>
                {event.name} ({event.date})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="links">
        <TabsList>
          <TabsTrigger value="links">Gallery Links</TabsTrigger>
          <TabsTrigger value="qr">QR Codes</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Links</CardTitle>
              <CardDescription>Share direct links to your photo galleries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Public Gallery Link</h3>
                <div className="flex gap-2">
                  <Input value="https://photopedia.com/gallery/smith-wedding" readOnly />
                  <Button variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Anyone with this link can view the gallery. No password required.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password Protected Link</h3>
                <div className="flex gap-2">
                  <Input value="https://photopedia.com/gallery/smith-wedding?protected=true" readOnly />
                  <Button variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gallery-password">Gallery Password</Label>
                  <div className="flex gap-2">
                    <Input id="gallery-password" type="password" value="love2025" readOnly />
                    <Button variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This link requires the password to access the gallery. Share both with your clients.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event Code</h3>
                <div className="flex items-center justify-center p-6 border rounded-lg bg-muted/30">
                  <div className="text-center">
                    <p className="text-3xl font-bold tracking-widest">SMITH2025</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Clients can enter this code at photopedia.com/gallery
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">
                    <Copy className="mr-2 h-4 w-4" /> Copy Code
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Customize Gallery Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-downloads">Allow Downloads</Label>
                    <div className="h-6 w-11 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-sharing">Allow Social Sharing</Label>
                    <div className="h-6 w-11 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="expiry-date">Set Expiry Date</Label>
                    <div className="h-6 w-11 bg-muted rounded-full relative">
                      <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-muted-foreground"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset Settings</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="qr" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>QR Codes</CardTitle>
              <CardDescription>Generate QR codes for easy gallery access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Gallery QR Code</h3>
                  <div className="border rounded-lg p-6 bg-white flex items-center justify-center">
                    <div className="w-48 h-48 bg-muted flex items-center justify-center">
                      <QrCode className="h-32 w-32 text-primary" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" /> PNG
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" /> SVG
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" /> PDF
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">QR Code Settings</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="qr-type">QR Code Type</Label>
                      <Select defaultValue="gallery">
                        <SelectTrigger id="qr-type">
                          <SelectValue placeholder="Select QR type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gallery">Gallery Link</SelectItem>
                          <SelectItem value="code">Event Code</SelectItem>
                          <SelectItem value="download">Download All Photos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="qr-color">QR Code Color</Label>
                      <div className="flex gap-2">
                        <div className="h-10 w-10 rounded bg-primary"></div>
                        <Input id="qr-color" defaultValue="#22C55E" />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="qr-logo">Add Logo (Optional)</Label>
                      <div className="flex gap-2">
                        <Input id="qr-logo" type="file" className="flex-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="qr-frame">Add Decorative Frame</Label>
                      <div className="h-6 w-11 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4">Generate QR Code</Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Usage Ideas</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Print for Event</h4>
                    <p className="text-sm text-muted-foreground">
                      Print and display the QR code at your event for easy gallery access
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Include in Materials</h4>
                    <p className="text-sm text-muted-foreground">
                      Add the QR code to event programs, thank you cards, or invitations
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Share Digitally</h4>
                    <p className="text-sm text-muted-foreground">
                      Send the QR code via email or text message to event attendees
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Sharing</CardTitle>
              <CardDescription>Share your galleries on social media platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Share on Social Media</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                      <Facebook className="h-8 w-8 text-blue-600" />
                      <span>Facebook</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                      <Instagram className="h-8 w-8 text-pink-600" />
                      <span>Instagram</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                      <Twitter className="h-8 w-8 text-blue-400" />
                      <span>Twitter</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                      <MessageSquare className="h-8 w-8 text-green-500" />
                      <span>WhatsApp</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Customize Social Share</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="share-title">Share Title</Label>
                      <Input id="share-title" defaultValue="Smith Wedding Photos Now Available!" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="share-description">Share Description</Label>
                      <Input
                        id="share-description"
                        defaultValue="View and download all photos from John & Sarah's special day"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="share-image">Share Image</Label>
                      <div className="flex gap-2">
                        <Input id="share-image" type="file" className="flex-1" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This image will be displayed when sharing on social media
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Embed Gallery</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Embed this gallery on your website or blog</p>
                  <div className="grid gap-2">
                    <Label htmlFor="embed-code">Embed Code</Label>
                    <div className="relative">
                      <textarea
                        id="embed-code"
                        className="w-full h-24 p-3 rounded-md border bg-muted/50 text-sm font-mono"
                        readOnly
                        value={`<iframe src="https://photopedia.com/embed/smith-wedding" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`}
                      ></textarea>
                      <Button variant="outline" size="sm" className="absolute top-2 right-2">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="embed-download">Allow Downloads in Embed</Label>
                    <div className="h-6 w-11 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Sharing</CardTitle>
              <CardDescription>Share galleries via email with clients and guests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Send Gallery Invitation</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="recipient-email">Recipient Email(s)</Label>
                      <Input id="recipient-email" placeholder="Enter email addresses (separate with commas)" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email-subject">Email Subject</Label>
                      <Input id="email-subject" defaultValue="Your Smith Wedding Photos Are Ready!" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email-message">Email Message</Label>
                      <textarea
                        id="email-message"
                        className="w-full h-32 p-3 rounded-md border"
                        defaultValue="Hello,

I'm excited to share the photos from the Smith Wedding with you! Click the button below to view and download your photos.

Best regards,
John Doe Photography"
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-password">Include Gallery Password</Label>
                      <div className="h-6 w-11 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Mail className="mr-2 h-4 w-4" /> Send Email
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Templates</h3>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Gallery Invitation</h4>
                        <p className="text-sm text-muted-foreground">Basic gallery invitation email</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Thank You</h4>
                        <p className="text-sm text-muted-foreground">Thank clients for their business</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Gallery Expiring Soon</h4>
                        <p className="text-sm text-muted-foreground">Remind clients before gallery expires</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-medium mb-4">Email History</h3>
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Gallery Invitation</p>
                            <p className="text-sm text-muted-foreground">Sent to 12 recipients</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Apr 16, 2025</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                            10 Opened
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                            8 Clicked
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Thank You Email</p>
                            <p className="text-sm text-muted-foreground">Sent to 2 recipients</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Apr 10, 2025</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                            2 Opened
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                            2 Clicked
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
