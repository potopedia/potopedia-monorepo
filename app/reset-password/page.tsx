"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Camera, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would reset the password
    setIsSubmitted(true)
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
          <CardTitle className="text-2xl text-center">Set new password</CardTitle>
          <CardDescription className="text-center">
            {!isSubmitted ? "Create a new password for your account" : "Your password has been reset successfully"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 p-4 rounded-md mb-4">
                Your password has been reset successfully!
              </div>
              <Button onClick={() => (window.location.href = "/login")} className="w-full">
                Continue to Login
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground mt-2">
            <Link href="/login" className="text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
