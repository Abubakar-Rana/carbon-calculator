"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { UserPlus, Trash2, Copy, CheckCircle2, Shield, Users, ArrowLeft, LogOut } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"

type PortalUser = {
  _id?: string
  username: string
  password: string
  role: "admin" | "user"
  createdAt: string
  createdBy: string
}

export default function AdminPortal() {
  const router = useRouter()
  const { user, logout, isLoading: authLoading } = useAuth()
  const [users, setUsers] = useState<PortalUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [newUser, setNewUser] = useState<PortalUser | null>(null)
  const [showNewUserDialog, setShowNewUserDialog] = useState(false)
  const [copiedField, setCopiedField] = useState<string>("")

  // Check if user is authenticated and is admin
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/")
    }
  }, [user, authLoading, router])

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Checking authentication...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user || user.role !== "admin") {
    return null
  }

  const fetchUsers = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      
      if (!res.ok) throw new Error(data?.error || "Failed to load users")
      setUsers(data.users || [])
    } catch (err: any) {
      console.error("Load users error", err)
      setError(err?.message || "Unable to load users. Please check database connection.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreateUser = async () => {
    setError("")
    try {
      const res = await fetch("/api/users", { method: "POST" })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data?.error || "Failed to create user")
      setNewUser(data.user)
      setShowNewUserDialog(true)
      fetchUsers()
    logout()
    } catch (err: any) {
      setError(err?.message || "Unable to create user. Please check database connection.")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    setError("")
    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data?.error || "Failed to delete user")
      fetchUsers()
    } catch (err: any) {
      setError(err?.message || "Unable to delete user. Please check database connection.")
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(""), 2000)
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Admin Portal</h1>
                <p className="text-emerald-100">User Management Dashboard</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              <div className="font-semibold mb-1">Database Connection Error</div>
              <div className="text-sm">{error}</div>
              <div className="text-sm mt-2">
                <strong>Solution:</strong> Add your IP address to MongoDB Atlas Network Access:
                <ol className="list-decimal ml-4 mt-1">
                  <li>Go to MongoDB Atlas → Network Access</li>
                  <li>Click "Add IP Address"</li>
                  <li>Add 0.0.0.0/0 (for testing) or your specific IP</li>
                  <li>Wait 1-2 minutes and refresh this page</li>
                </ol>
              </div>
            </AlertDescription>
          </Alert>
        )}
        {loading && (
          <Alert className="mb-4">
            <AlertDescription>Loading users...</AlertDescription>
          </Alert>
        )}
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-t-4 border-t-emerald-500">
            <CardHeader>
              <CardTitle className="text-2xl">Total Users</CardTitle>
              <CardDescription>Active calculator users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-8 h-8 text-emerald-600" />
                <span className="text-4xl font-bold">{users.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="text-2xl">Admin Access</CardTitle>
              <CardDescription>Full system control</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="text-4xl font-bold">1</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Actions</CardTitle>
              <CardDescription>Manage users</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleCreateUser} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
                <UserPlus className="w-4 h-4 mr-2" />
                Create New User
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">User Management</CardTitle>
                <CardDescription>View and manage calculator access credentials</CardDescription>
              </div>
              <Button onClick={handleCreateUser} className="bg-gradient-to-r from-emerald-600 to-teal-600">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <Alert>
                <Users className="h-4 w-4" />
                <AlertDescription>
                  No users found. Create your first user to get started.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Username</TableHead>
                      <TableHead className="font-semibold">Password</TableHead>
                      <TableHead className="font-semibold">Created At</TableHead>
                      <TableHead className="font-semibold">Created By</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id || user.username}>
                        <TableCell className="font-mono">
                          <div className="flex items-center gap-2">
                            {user.username}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(user.username, `username-${user._id}`)}
                              className="h-6 w-6 p-0"
                            >
                              {copiedField === `username-${user._id}` ? (
                                <CheckCircle2 className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {user.password}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(user.password, `password-${user._id}`)}
                              className="h-6 w-6 p-0"
                            >
                              {copiedField === `password-${user._id}` ? (
                                <CheckCircle2 className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.createdBy}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(user._id || "")}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mt-8 border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Admin Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Database Integration</h3>
              <p className="text-sm text-gray-600">
                Currently using localStorage for user management. MongoDB integration will be configured later for persistent storage.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">User Credentials</h3>
              <p className="text-sm text-gray-600">
                System-generated usernames and passwords are automatically created. Share these credentials securely with authorized users.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New User Dialog */}
      <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-green-600">
              User Created Successfully!
            </DialogTitle>
            <DialogDescription className="text-center">
              Save these credentials securely. They won&apos;t be shown again.
            </DialogDescription>
          </DialogHeader>
          {newUser && (
            <div className="space-y-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Username</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 bg-white border px-3 py-2 rounded font-mono text-sm">
                      {newUser.username}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(newUser.username, "new-username")}
                    >
                      {copiedField === "new-username" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Password</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 bg-white border px-3 py-2 rounded font-mono text-sm">
                      {newUser.password}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(newUser.password, "new-password")}
                    >
                      {copiedField === "new-password" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <Alert>
                <AlertDescription className="text-sm">
                  Make sure to copy and save these credentials before closing this dialog.
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => setShowNewUserDialog(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
