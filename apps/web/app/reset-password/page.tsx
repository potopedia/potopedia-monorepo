"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSearchParams, useRouter } from "next/navigation"
import { confirmPasswordReset } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (!oobCode) {
      setError('Invalid or missing reset code. Please request a new password reset link.')
    }
  }, [oobCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!oobCode) {
      setError('Invalid reset code')
      return
    }

    setLoading(true)

    try {
      await confirmPasswordReset(auth, oobCode, password)
      setIsSubmitted(true)
      toast.success('Password reset successful!')
      setTimeout(() => router.push('/login'), 2000)
    } catch (err: any) {
      if (err.code === 'auth/invalid-action-code') {
        setError('Reset link has expired or is invalid. Please request a new one.')
      } else {
        setError(err.message || 'Failed to reset password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Camera className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Potopedia</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Set new password</CardTitle>
          <CardDescription className="text-center">
            {!isSubmitted ? "Create a new password for your account" : "Your password has been reset successfully"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
                    disabled={loading || !oobCode}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading || !oobCode}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading || !oobCode}>
                  {loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="bg-primary/10 text-primary p-4 rounded-md mb-4">
                Your password has been successfully reset!
              </div>
              <p className="text-sm text-muted-foreground">
                Redirecting to login...
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground mt-2">
            <Link href="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
