"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuthenticated: (isAdmin: boolean) => void
}

export function AuthModal({ open, onOpenChange, onAuthenticated }: AuthModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(username, password)
      
      // Determine if admin or user based on credentials
      const isAdmin = username === "carbonadmin"
      
      setIsLoading(false)
      onAuthenticated(isAdmin)
      onOpenChange(false)
      resetForm()
    } catch (err: any) {
      console.error("Login error", err)
      setError(
        "Invalid credentials. Please contact the admin at admin@carbonbnu.edu if you need assistance."
      )
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setUsername("")
    setPassword("")
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Access Carbon Calculator</DialogTitle>
          <DialogDescription className="text-center">
            Enter your credentials to access the calculator
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <div className="text-xs text-gray-500 text-center mt-4 pt-4 border-t">
            For support, contact: <strong>admin@carbonbnu.edu</strong>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
