import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information and profile settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell clients about yourself..."
                      defaultValue="Professional photographer specializing in weddings and corporate events."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>Customize your brand appearance for client galleries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Logo</h3>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-40 rounded bg-muted flex items-center justify-center border">
                    <span className="text-muted-foreground">Your Logo</span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Colors</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded bg-primary"></div>
                      <Input id="primary-color" defaultValue="#3B82F6" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded bg-muted"></div>
                      <Input id="accent-color" defaultValue="#F3F4F6" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Domain</h3>
                <div className="grid gap-2">
                  <Label htmlFor="custom-domain">Domain</Label>
                  <Input id="custom-domain" placeholder="photos.yourdomain.com" />
                  <p className="text-xs text-muted-foreground">Enter your custom domain to use for client galleries</p>
                </div>
                <Button variant="outline" size="sm">
                  Verify Domain
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gallery Customization</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-logo">Show Logo in Galleries</Label>
                    <Switch id="show-logo" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-watermark">Apply Watermark to Photos</Label>
                    <Switch id="show-watermark" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="custom-footer">Custom Footer Text</Label>
                    <Switch id="custom-footer" defaultChecked />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Input id="footer-text" defaultValue="© 2025 John Doe Photography. All rights reserved." />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-client">New Client Registration</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a new client registers</p>
                    </div>
                    <Switch id="new-client" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="gallery-view">Gallery Views</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a client views your gallery</p>
                    </div>
                    <Switch id="gallery-view" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="photo-download">Photo Downloads</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a client downloads photos</p>
                    </div>
                    <Switch id="photo-download" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                    </div>
                    <Switch id="marketing-emails" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-client">New Client Activity</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications for client activity</p>
                    </div>
                    <Switch id="push-client" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-system">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications for system updates</p>
                    </div>
                    <Switch id="push-system" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Frequency</h3>
                <div className="grid gap-2">
                  <Label htmlFor="notification-frequency">Email Digest Frequency</Label>
                  <select
                    id="notification-frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Digest</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Professional Plan</p>
                      <p className="text-sm text-muted-foreground">$29/month, billed annually</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Upgrade Plan
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Unlimited events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">10,000 photos per month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">AI photo enhancement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Custom branding</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="rounded-lg border">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">April 2025</p>
                        <p className="text-sm text-muted-foreground">Professional Plan - Monthly</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$29.00</p>
                        <p className="text-sm text-muted-foreground">Apr 1, 2025</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">March 2025</p>
                        <p className="text-sm text-muted-foreground">Professional Plan - Monthly</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$29.00</p>
                        <p className="text-sm text-muted-foreground">Mar 1, 2025</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">February 2025</p>
                        <p className="text-sm text-muted-foreground">Professional Plan - Monthly</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$29.00</p>
                        <p className="text-sm text-muted-foreground">Feb 1, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-destructive">
                Cancel Subscription
              </Button>
              <Button>Download Invoices</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
