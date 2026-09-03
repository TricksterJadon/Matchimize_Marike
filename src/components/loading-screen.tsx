"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles, Users, Target } from "lucide-react"

interface LoadingScreenProps {
  onComplete: () => void
}

const loadingSteps = [
  { text: "Analysiere Persönlichkeitsmerkmale...", icon: Heart, duration: 1000 },
  { text: "Bewerte Interessen und Hobbys...", icon: Sparkles, duration: 1200 },
  { text: "Prüfe Werte und Lebensstil...", icon: Users, duration: 1000 },
  { text: "Erstelle personalisiertes Profil...", icon: Target, duration: 1500 },
  { text: "Finalisiere Dating-Profil...", icon: Heart, duration: 800 },
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let totalDuration = 0
    const stepDurations = loadingSteps.map(step => step.duration)
    const totalTime = stepDurations.reduce((sum, duration) => sum + duration, 0)

    const interval = setInterval(() => {
      totalDuration += 100
      const newProgress = Math.min((totalDuration / totalTime) * 100, 100)
      setProgress(newProgress)

      const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
      setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1))

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(onComplete, 500)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  const currentStepData = loadingSteps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Erstelle dein Dating-Profil</h3>
              <p className="text-sm text-muted-foreground animate-fade-in">
                {currentStepData.text}
              </p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round(progress)}% abgeschlossen
              </p>
            </div>

            <div className="flex justify-center space-x-1">
              {loadingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}