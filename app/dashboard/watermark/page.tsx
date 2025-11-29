import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Upload, Paintbrush, ArrowLeft, Eye, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WatermarkPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Watermark Settings</h1>
      </div>
      <p className="text-muted-foreground">Customize and apply watermarks to protect your photos</p>

      <Tabs defaultValue="text">
        <TabsList>
          <TabsTrigger value="text">Text Watermark</TabsTrigger>
          <TabsTrigger value="logo">Logo Watermark</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Text Watermark</CardTitle>
              <CardDescription>Add a text watermark to your photos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="watermark-text">Watermark Text</Label>
                    <Input id="watermark-text" defaultValue="© John Doe Photography" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select defaultValue="arial">
                      <SelectTrigger id="font-family">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="times">Times New Roman</SelectItem>
                        <SelectItem value="georgia">Georgia</SelectItem>
                        <SelectItem value="verdana">Verdana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <Slider defaultValue={[24]} max={72} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded bg-white border"></div>
                      <Input id="text-color" defaultValue="#FFFFFF" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="opacity">Opacity</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Transparent</span>
                      <span>50%</span>
                      <span>Solid</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Position</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Top Left",
                        "Top Center",
                        "Top Right",
                        "Middle Left",
                        "Center",
                        "Middle Right",
                        "Bottom Left",
                        "Bottom Center",
                        "Bottom Right",
                      ].map((position) => (
                        <div
                          key={position}
                          className={`border rounded-md p-2 text-center text-sm cursor-pointer hover:border-primary ${
                            position === "Bottom Right" ? "border-primary bg-primary/10" : ""
                          }`}
                        >
                          {position}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-2">
                    <div className="aspect-[4/3] relative bg-muted">
                      <Image
                        src="/placeholder.svg?height=600&width=800"
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute bottom-4 right-4 text-white text-lg font-semibold opacity-50">
                        © John Doe Photography
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Preview</p>

                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" /> Preview on Photos
                    </Button>
                    <Button className="w-full">
                      <Paintbrush className="mr-2 h-4 w-4" /> Apply to All Photos
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 mt-4">
                    <h3 className="font-medium mb-2">Apply to Specific Events</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="event1" className="mr-2" />
                        <Label htmlFor="event1">Smith Wedding (Apr 15, 2025)</Label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="event2" className="mr-2" />
                        <Label htmlFor="event2">Corporate Gala (Apr 10, 2025)</Label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="event3" className="mr-2" />
                        <Label htmlFor="event3">Johnson Birthday (Apr 5, 2025)</Label>
                      </div>
                    </div>
                    <Button size="sm" className="mt-4">
                      Apply to Selected Events
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="logo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Watermark</CardTitle>
              <CardDescription>Add your logo as a watermark to your photos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-4">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Drag your logo here or click to upload</p>
                        <p className="text-sm text-muted-foreground mt-1">Support for PNG with transparency</p>
                      </div>
                      <Button>Select Logo</Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="logo-size">Logo Size</Label>
                    <Slider defaultValue={[30]} max={100} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="logo-opacity">Opacity</Label>
                    <Slider defaultValue={[70]} max={100} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Transparent</span>
                      <span>70%</span>
                      <span>Solid</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Position</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Top Left",
                        "Top Center",
                        "Top Right",
                        "Middle Left",
                        "Center",
                        "Middle Right",
                        "Bottom Left",
                        "Bottom Center",
                        "Bottom Right",
                      ].map((position) => (
                        <div
                          key={position}
                          className={`border rounded-md p-2 text-center text-sm cursor-pointer hover:border-primary ${
                            position === "Bottom Right" ? "border-primary bg-primary/10" : ""
                          }`}
                        >
                          {position}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-2">
                    <div className="aspect-[4/3] relative bg-muted">
                      <Image
                        src="/placeholder.svg?height=600&width=800"
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute bottom-4 right-4 bg-white/50 rounded p-2">
                        <ImageIcon className="h-8 w-8 text-gray-800" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Preview</p>

                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" /> Preview on Photos
                    </Button>
                    <Button className="w-full">
                      <Paintbrush className="mr-2 h-4 w-4" /> Apply to All Photos
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 mt-4">
                    <h3 className="font-medium mb-2">Apply to Specific Events</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="logo-event1" className="mr-2" />
                        <Label htmlFor="logo-event1">Smith Wedding (Apr 15, 2025)</Label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="logo-event2" className="mr-2" />
                        <Label htmlFor="logo-event2">Corporate Gala (Apr 10, 2025)</Label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="logo-event3" className="mr-2" />
                        <Label htmlFor="logo-event3">Johnson Birthday (Apr 5, 2025)</Label>
                      </div>
                    </div>
                    <Button size="sm" className="mt-4">
                      Apply to Selected Events
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Watermark Settings</CardTitle>
              <CardDescription>Configure default watermark behavior for all uploads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-watermark">Auto-apply watermark to new uploads</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically apply your default watermark to all new photo uploads
                    </p>
                  </div>
                  <div className="h-6 w-11 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="download-watermark">Include watermark on downloads</Label>
                    <p className="text-sm text-muted-foreground">Keep watermark visible when clients download photos</p>
                  </div>
                  <div className="h-6 w-11 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="preview-watermark">Show watermark on previews</Label>
                    <p className="text-sm text-muted-foreground">Display watermark on gallery preview images</p>
                  </div>
                  <div className="h-6 w-11 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="high-res-watermark">Different watermark for high-res</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a different watermark style for high-resolution downloads
                    </p>
                  </div>
                  <div className="h-6 w-11 bg-muted rounded-full relative">
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-muted-foreground"></div>
                  </div>
                </div>

                <div className="grid gap-2 mt-4">
                  <Label htmlFor="default-watermark">Default Watermark Type</Label>
                  <Select defaultValue="text">
                    <SelectTrigger id="default-watermark">
                      <SelectValue placeholder="Select default type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Watermark</SelectItem>
                      <SelectItem value="logo">Logo Watermark</SelectItem>
                      <SelectItem value="both">Both Text and Logo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Batch Processing</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Apply or remove watermarks from multiple photos at once
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <Paintbrush className="mr-2 h-4 w-4" /> Batch Apply Watermark
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Batch Remove Watermark
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
