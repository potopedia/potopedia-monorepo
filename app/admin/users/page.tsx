import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, UserPlus, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminUsersPage() {
  // Sample users data
  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "photographer",
      status: "active",
      events: 12,
      joined: "Apr 10, 2025",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "photographer",
      status: "active",
      events: 8,
      joined: "Apr 5, 2025",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "client",
      status: "active",
      events: 3,
      joined: "Apr 2, 2025",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "client",
      status: "active",
      events: 1,
      joined: "Mar 28, 2025",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "photographer",
      status: "inactive",
      events: 5,
      joined: "Mar 15, 2025",
    },
    {
      id: "6",
      name: "Jessica Taylor",
      email: "jessica.taylor@example.com",
      role: "admin",
      status: "active",
      events: 0,
      joined: "Mar 10, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search-users" className="text-sm font-medium">
            Search users
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search-users" type="search" placeholder="Search by name, email, or role..." className="pl-8" />
          </div>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="role-filter" className="text-sm font-medium">
            Role
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="role-filter">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="photographer">Photographer</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="status-filter" className="text-sm font-medium">
            Status
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    <Checkbox />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Events</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Joined</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <Checkbox />
                    </td>
                    <td className="p-4 align-middle font-medium">{user.name}</td>
                    <td className="p-4 align-middle">{user.email}</td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant="outline"
                        className={
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : user.role === "photographer"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant="outline"
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{user.events}</td>
                    <td className="p-4 align-middle">{user.joined}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem>Deactivate User</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Activate User</DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>6</strong> of <strong>6</strong> users
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
