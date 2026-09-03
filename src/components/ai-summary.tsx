"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"

interface AISummaryProps {
  data: any
  type: "profile"
  onAnalyze?: () => void
  onComplete?: () => void
  autoGenerate?: boolean
}

export function AISummary({ data, type, onAnalyze, onComplete, autoGenerate = false }: AISummaryProps) {
  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (autoGenerate && data && !summary && !loading) {
      // Check if summary already exists in data
      if (data.summary) {
        setSummary(data.summary)
      } else {
        generateSummary()
      }
    }
  }, [autoGenerate, data, summary, loading])

  const generateSummary = async () => {
    setLoading(true)
    onAnalyze?.()
    try {
      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, type }),
      })

      if (!response.ok) throw new Error("Fehler beim Generieren der Zusammenfassung")

      const result = await response.json()
      setSummary(result.summary)
    } catch (error) {
      console.error("[v0] Error generating summary:", error)
      setSummary("Fehler beim Generieren der Zusammenfassung. Bitte versuche es erneut.")
    } finally {
      setLoading(false)
      onComplete?.()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">KI analysiert die Daten... (bis zu 1 Minute)</span>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="text-center py-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Lass die KI dein Profil analysieren und personalisierte Empfehlungen geben.
        </p>
        <Button onClick={generateSummary} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Profil analysieren
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">{summary}</div>
      </div>
      <Button onClick={generateSummary} variant="outline" size="sm" className="gap-2 bg-transparent">
        <Sparkles className="h-4 w-4" />
        Neu generieren
      </Button>
    </div>
  )
}
