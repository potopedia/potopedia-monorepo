import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, ImageIcon, X, Check } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Upload Photos</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload to Event</CardTitle>
          <CardDescription>Select an event and upload photos to its gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-2">
              <label htmlFor="event-select" className="text-sm font-medium">
                Select Event
              </label>
              <Select>
                <SelectTrigger id="event-select">
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event1">Smith Wedding (Apr 15, 2025)</SelectItem>
                  <SelectItem value="event2">Corporate Gala (Apr 10, 2025)</SelectItem>
                  <SelectItem value="event3">Johnson Birthday (Apr 5, 2025)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Drag photos here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">Support for JPG, PNG, HEIC, and RAW files</p>
                </div>
                <Button>Select Files</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Uploads (3)</h3>
                <Button variant="outline" size="sm">
                  Clear All
                </Button>
              </div>

              <div className="space-y-3">
                <UploadItem name="IMG_0123.jpg" size="3.2 MB" progress={100} status="complete" />
                <UploadItem name="IMG_0124.jpg" size="2.8 MB" progress={100} status="complete" />
                <UploadItem name="IMG_0125.jpg" size="4.1 MB" progress={65} status="uploading" />
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Process Uploads</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface UploadItemProps {
  name: string
  size: string
  progress: number
  status: "uploading" | "complete" | "error"
}

function UploadItem({ name, size, progress, status }: UploadItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-md">
      <div className="rounded-md bg-muted p-2">
        <ImageIcon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <p className="font-medium truncate">{name}</p>
          <p className="text-sm text-muted-foreground">{size}</p>
        </div>
        <div className="mt-1">
          <Progress value={progress} className="h-1" />
        </div>
      </div>
      <div>
        {status === "uploading" && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
        {status === "complete" && (
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-1">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        )}
        {status === "error" && (
          <div className="rounded-full bg-red-100 dark:bg-red-900 p-1">
            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
        )}
      </div>
    </div>
  )
}
