'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'

interface TourStep {
  title: string
  description: string
  icon: React.ReactNode
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome to Carbon Calculator',
    description: 'This is your first time using the carbon emissions calculator. Let us guide you through the key features.',
    icon: '🌍'
  },
  {
    title: 'Enter Your Data',
    description: 'Input your energy consumption data including diesel, natural gas, LPG, vehicle distance, electricity, and waste generation. The calculator will compute your carbon footprint.',
    icon: '📊'
  },
  {
    title: 'View Your Results',
    description: 'See your total carbon emissions broken down by source. Visual charts help you understand where most of your emissions come from.',
    icon: '📈'
  },
  {
    title: 'Generate Reports',
    description: 'Export detailed reports in PDF or Excel format with your carbon analysis and emissions breakdown for record keeping and analysis.',
    icon: '📄'
  },
  {
    title: 'Track Progress',
    description: 'Regular use of the calculator helps you monitor and reduce your carbon footprint over time. Make sustainable choices!',
    icon: '✅'
  }
]

interface SystemTourProps {
  isOpen: boolean
  onClose: () => void
}

export default function SystemTour({ isOpen, onClose }: SystemTourProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const step = tourSteps[currentStep]
  const progress = ((currentStep + 1) / tourSteps.length) * 100

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div>
            <CardTitle className="text-2xl text-gray-900">{step.title}</CardTitle>
            <CardDescription className="mt-1 text-gray-600">
              Step {currentStep + 1} of {tourSteps.length}
            </CardDescription>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-center text-6xl mb-4">{step.icon}</div>
          <p className="text-gray-800 text-center leading-relaxed font-medium">{step.description}</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === tourSteps.length - 1 ? (
              <Button
                onClick={onClose}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                Got It!
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentStep(Math.min(tourSteps.length - 1, currentStep + 1))}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Skip Button */}
          <button
            onClick={onClose}
            className="w-full text-sm text-gray-600 hover:text-gray-800 py-2 transition-colors font-medium"
          >
            Skip Tour
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
