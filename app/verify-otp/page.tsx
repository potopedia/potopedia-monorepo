"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Camera, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { useSearchParams } from "next/navigation"

export default function VerifyOTPPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const action = searchParams.get("action") || "login"

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(60)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleResendOTP = () => {
    setIsResending(true)
    // In a real app, this would resend the OTP
    setTimeout(() => {
      setTimeLeft(60)
      setIsResending(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would verify the OTP
    if (action === "login") {
      window.location.href = "/dashboard"
    } else if (action === "register") {
      window.location.href = "/dashboard"
    } else if (action === "reset") {
      window.location.href = "/reset-password"
    }
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
          <CardTitle className="text-2xl text-center">Verify your email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification code to {email || "your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      required
                    />
                  ))}
                </div>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  {timeLeft > 0 ? (
                    <>Code expires in {timeLeft} seconds</>
                  ) : (
                    <>
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isResending}
                        className="text-primary hover:underline disabled:opacity-50"
                      >
                        {isResending ? "Sending..." : "Resend OTP"}
                      </button>
                    </>
                  )}
                </p>
              </div>
              <Button type="submit" className="w-full">
                Verify
              </Button>
            </div>
          </form>
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
