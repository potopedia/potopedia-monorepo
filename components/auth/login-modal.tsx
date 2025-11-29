"use client"

import type React from "react"

import { useState } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenRegister: () => void
}

export function LoginModal({ isOpen, onClose, onOpenRegister }: LoginModalProps) {
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [userRole, setUserRole] = useState<"photographer" | "client" | "guest">("photographer")

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send an OTP to the user's email
    setOtpSent(true)
  }

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would authenticate the user
    const dashboardRoutes = {
      photographer: "/dashboard",
      client: "/client",
      guest: "/guest"
    }
    window.location.href = dashboardRoutes[userRole]
  }

  const handleOTPLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would verify the OTP
    const dashboardRoutes = {
      photographer: "/dashboard",
      client: "/client",
      guest: "/guest"
    }
    window.location.href = dashboardRoutes[userRole]
  }

  const handleRegisterClick = () => {
    onClose()
    onOpenRegister()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Photopedia</span>
            </div>
          </div>
          <DialogTitle className="text-xl">Welcome back</DialogTitle>
          <DialogDescription className="text-sm">Sign in to your Photopedia account</DialogDescription>
        </DialogHeader>

        {/* Role Selection */}
        <div className="space-y-3 mb-4">
          <Label className="text-sm font-medium">I am a...</Label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setUserRole("photographer")}
              className={`p-3 rounded-lg border-2 transition-all ${userRole === "photographer"
                  ? "border-purple-600 bg-purple-50 dark:bg-purple-950"
                  : "border-gray-200 dark:border-gray-800 hover:border-purple-300"
                }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">📸</div>
                <div className="text-xs font-medium">Photographer</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setUserRole("client")}
              className={`p-3 rounded-lg border-2 transition-all ${userRole === "client"
                  ? "border-purple-600 bg-purple-50 dark:bg-purple-950"
                  : "border-gray-200 dark:border-gray-800 hover:border-purple-300"
                }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">👤</div>
                <div className="text-xs font-medium">Client</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setUserRole("guest")}
              className={`p-3 rounded-lg border-2 transition-all ${userRole === "guest"
                  ? "border-purple-600 bg-purple-50 dark:bg-purple-950"
                  : "border-gray-200 dark:border-gray-800 hover:border-purple-300"
                }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🎫</div>
                <div className="text-xs font-medium">Guest</div>
              </div>
            </button>
          </div>
        </div>

        <Tabs defaultValue="password" onValueChange={(value) => setLoginMethod(value as "password" | "otp")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="otp">Email OTP</TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <form onSubmit={handlePasswordLogin} className="mt-3">
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-9"
                  />
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm">
                      Password
                    </Label>
                    <Button variant="link" className="p-0 h-auto text-xs" onClick={onClose}>
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-9"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="otp">
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="mt-3">
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label htmlFor="email-otp" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="email-otp"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-9"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send OTP
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOTPLogin} className="mt-3">
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label htmlFor="otp" className="text-sm">
                      Enter OTP sent to {email}
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="h-9"
                    />
                    <p className="text-xs text-muted-foreground">
                      Didn't receive the code?{" "}
                      <button type="button" onClick={() => setOtpSent(false)} className="text-primary hover:underline">
                        Resend OTP
                      </button>
                    </p>
                  </div>
                  <Button type="submit" className="w-full">
                    Verify & Sign In
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>
        </Tabs>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="w-full h-9">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" type="button" className="w-full h-9">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Facebook
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-2">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 h-auto text-xs" onClick={handleRegisterClick}>
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
