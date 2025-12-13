'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface SessionTimeoutModalProps {
  isOpen: boolean
  onLogin: () => void
}

export default function SessionTimeoutModal({ isOpen, onLogin }: SessionTimeoutModalProps) {
  const router = useRouter()
  const { logout } = useAuth()

  if (!isOpen) return null

  const handleGoHome = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <AlertCircle className="w-8 h-8 text-amber-500 flex-shrink-0" />
          <div>
            <CardTitle>Session Expired</CardTitle>
            <CardDescription>Your session has timed out after 30 minutes of inactivity</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            For security reasons, your session has expired. Please log in again to continue using the calculator.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onLogin}
              className="bg-emerald-500 hover:bg-emerald-600 w-full"
            >
              Login Again
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="w-full"
            >
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
