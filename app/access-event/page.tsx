"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Camera, QrCode, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccessEventPage() {
  const [eventCode, setEventCode] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accessMethod, setAccessMethod] = useState<"code" | "qr">("code")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would verify the event code
    window.location.href = `/gallery/${eventCode}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Camera className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Photopedia</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Access Event Gallery</CardTitle>
          <CardDescription className="text-center">
            Enter your event code or scan QR code to view photos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="code" onValueChange={(value) => setAccessMethod(value as "code" | "qr")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Event Code</TabsTrigger>
              <TabsTrigger value="qr">Scan QR</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-code">Event Code</Label>
                    <Input
                      id="event-code"
                      placeholder="Enter event code (e.g., SMITH2025)"
                      value={eventCode}
                      onChange={(e) => setEventCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Your Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Providing your email helps the photographer track who viewed the gallery
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Gallery Password (If Required)</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter gallery password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Access Gallery <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="qr" className="mt-4">
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                <QrCode className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground mb-4">
                  Point your camera at the QR code provided by your photographer
                </p>
                <Button variant="outline" className="w-full">
                  Open Camera to Scan
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground mt-2">
            Are you a photographer?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in to your account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
