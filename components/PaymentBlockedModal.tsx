'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface PaymentBlockedModalProps {
  isOpen: boolean
}

export default function PaymentBlockedModal({ isOpen }: PaymentBlockedModalProps) {
  const router = useRouter()
  const { logout } = useAuth()

  if (!isOpen) return null

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="flex flex-row items-center gap-4 border-b">
          <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
          <div>
            <CardTitle className="text-2xl text-gray-900">Payment Required</CardTitle>
            <CardDescription className="mt-1 text-gray-600">
              Your payment status is unpaid
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium">
              You cannot access the calculator until your payment is confirmed.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Next Step:</strong> Please contact the admin to complete your payment.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Once your payment is verified, your payment status will be updated and you'll have full access to the calculator.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 w-full"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
