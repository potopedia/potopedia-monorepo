import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Download, Share2, Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QrCodePage() {
  // Sample events
  const events = [
    { id: "1", name: "Smith Wedding (Apr 15, 2025)" },
    { id: "2", name: "Corporate Gala (Apr 10, 2025)" },
    { id: "3", name: "Johnson Birthday (Apr 5, 2025)" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
      </div>
      <p className="text-muted-foreground">Generate QR codes for your events to share with clients</p>

      <Card>
        <CardHeader>
          <CardTitle>Generate QR Code</CardTitle>
          <CardDescription>Create a QR code for your event gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="event-select">Select Event</Label>
                <Select>
                  <SelectTrigger id="event-select">
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="qr-type">QR Code Type</Label>
                <Tabs defaultValue="gallery">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="gallery">Gallery Link</TabsTrigger>
                    <TabsTrigger value="code">Event Code</TabsTrigger>
                  </TabsList>
                  <TabsContent value="gallery" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Generate a QR code that links directly to the gallery
                    </p>
                  </TabsContent>
                  <TabsContent value="code" className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Generate a QR code that displays the event code for manual entry
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="qr-size">QR Code Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="qr-size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (200x200px)</SelectItem>
                    <SelectItem value="medium">Medium (400x400px)</SelectItem>
                    <SelectItem value="large">Large (800x800px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="qr-color">QR Code Color</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded bg-primary"></div>
                  <Input id="qr-color" defaultValue="#3B82F6" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="qr-logo">Add Logo (Optional)</Label>
                <div className="flex gap-2">
                  <Input id="qr-logo" type="file" className="flex-1" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Adding a logo may reduce QR code readability. Test before printing.
                </p>
              </div>

              <Button className="w-full">Generate QR Code</Button>
            </div>

            <div className="flex flex-col items-center justify-center border rounded-lg p-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-64 h-64 flex items-center justify-center">
                  <QrCode className="h-48 w-48 text-primary" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> PNG
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> SVG
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" /> Print
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium">Usage Instructions</h3>
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
    </div>
  )
}
