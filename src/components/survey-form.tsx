"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { toast } from "sonner"

interface DatingSurveyData {
  age: string
  firstName: string
  gender: string
  lookingFor: string
  relationshipGoal: string
  personality: string[]
  interests: string[]
  lifestyle: string
  values: string[]
  dealbreakers: string[]
  selfDescription: string
  customPersonality: string[]
  customInterests: string[]
  timestamp: string
  summary?: string
}

export function SurveyForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [summaryStatus, setSummaryStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    age: "",
    firstName: "",
    gender: "",
    lookingFor: "",
    relationshipGoal: "",
    personality: [] as string[],
    interests: [] as string[],
    lifestyle: "",
    values: [] as string[],
    dealbreakers: [] as string[],
    selfDescription: "",
    customPersonality: [] as string[],
    customInterests: [] as string[],
  })

  const [customPersonalityInput, setCustomPersonalityInput] = useState("")
  const [customInterestsInput, setCustomInterestsInput] = useState("")

  const handleArrayToggle = (field: "personality" | "interests" | "values" | "dealbreakers", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const addCustomTag = (field: "customPersonality" | "customInterests", value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue && !formData[field].includes(trimmedValue)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], trimmedValue],
      }))
    }
  }

  const removeCustomTag = (field: "customPersonality" | "customInterests", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.age ||
      !formData.firstName ||
      !formData.gender ||
      !formData.lookingFor ||
      !formData.relationshipGoal ||
      !formData.lifestyle
    ) {
      toast.error("Fehler", {
        description: "Bitte fülle alle Pflichtfelder aus.",
      })
      return
    }

    if (formData.personality.length === 0 && formData.customPersonality.length === 0) {
      toast.error("Fehler", {
        description: "Bitte wähle mindestens eine Persönlichkeitseigenschaft aus oder füge eine eigene hinzu.",
      })
      return
    }

    if (formData.interests.length === 0 && formData.customInterests.length === 0) {
      toast.error("Fehler", {
        description: "Bitte wähle mindestens ein Interesse aus oder füge ein eigenes hinzu.",
      })
      return
    }

    if (formData.values.length === 0) {
      toast.error("Fehler", {
        description: "Bitte wähle mindestens einen wichtigen Wert aus.",
      })
      return
    }

    if (formData.dealbreakers.length === 0) {
      toast.error("Fehler", {
        description: "Bitte wähle mindestens einen Dealbreaker aus.",
      })
      return
    }

    setSummaryStatus("idle")
    setIsLoading(true)

    const surveyData: DatingSurveyData = {
      ...formData,
      timestamp: new Date().toISOString(),
    }

    let generatedSummary: string | undefined

    try {
      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: surveyData, type: "profile" }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.summary) {
          generatedSummary = String(result.summary).trim()
        }
      } else {
        setSummaryStatus("error")
      }
    } catch (error) {
      console.error("[survey] Error generating profile summary:", error)
      setSummaryStatus("error")
    }

    const enhancedData: DatingSurveyData = generatedSummary
      ? { ...surveyData, summary: generatedSummary }
      : surveyData

    if (generatedSummary) {
      setSummaryStatus("success")
    } else if (summaryStatus === "idle") {
      setSummaryStatus("error")
    }

    localStorage.setItem("my-dating-profile", JSON.stringify(enhancedData))

    const existingData = localStorage.getItem("all-dating-responses")
    const responses = existingData ? JSON.parse(existingData) : []
    responses.push(enhancedData)
    localStorage.setItem("all-dating-responses", JSON.stringify(responses))
  }

  const handleCompletion = () => {
    setIsLoading(false)
    if (summaryStatus === "error") {
      toast("Profil gespeichert", {
        description:
          "Dein Profil wurde erstellt. Die KI-Zusammenfassung konnte nicht erzeugt werden und kann später erneut generiert werden.",
        duration: 6000,
      })
    } else {
      toast.success("Erfolgreich!", {
        description: "Dein Dating-Profil wurde erstellt.",
      })
    }
    router.push("/profile")
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleCompletion} />}
      <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grundlegende Informationen</CardTitle>
          <CardDescription>Erzähl uns ein bisschen über dich</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Alter *</Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="99"
                value={formData.age}
                onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                placeholder="z.B. 25"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname *</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                placeholder="z.B. Anna"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Geschlecht *</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="männlich" id="männlich" />
                <Label htmlFor="männlich" className="font-normal cursor-pointer">
                  Männlich
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weiblich" id="weiblich" />
                <Label htmlFor="weiblich" className="font-normal cursor-pointer">
                  Weiblich
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="divers" id="divers" />
                <Label htmlFor="divers" className="font-normal cursor-pointer">
                  Divers
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Ich suche nach *</Label>
            <RadioGroup
              value={formData.lookingFor}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, lookingFor: value }))}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="männern" id="männern" />
                <Label htmlFor="männern" className="font-normal cursor-pointer">
                  Männern
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="frauen" id="frauen" />
                <Label htmlFor="frauen" className="font-normal cursor-pointer">
                  Frauen
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="allen" id="allen" />
                <Label htmlFor="allen" className="font-normal cursor-pointer">
                  Allen
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Beziehungsziele *</CardTitle>
          <CardDescription>Was suchst du?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.relationshipGoal}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, relationshipGoal: value }))}
            required
          >
            <div className="grid gap-2 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="langfristige-beziehung" id="langfristige-beziehung" />
                <Label htmlFor="langfristige-beziehung" className="font-normal cursor-pointer">
                  Langfristige Beziehung
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="etwas-lockeres" id="etwas-lockeres" />
                <Label htmlFor="etwas-lockeres" className="font-normal cursor-pointer">
                  Etwas Lockeres
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="freundschaft" id="freundschaft" />
                <Label htmlFor="freundschaft" className="font-normal cursor-pointer">
                  Freundschaft
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noch-unsicher" id="noch-unsicher" />
                <Label htmlFor="noch-unsicher" className="font-normal cursor-pointer">
                  Noch unsicher
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Persönlichkeit *</CardTitle>
          <CardDescription>Welche Eigenschaften beschreiben dich am besten?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Abenteuerlustig",
              "Humorvoll",
              "Introvertiert",
              "Extrovertiert",
              "Kreativ",
              "Sportlich",
              "Intellektuell",
              "Spontan",
              "Zuverlässig",
              "Empathisch",
              "Optimistisch",
              "Gelassen",
              "Ehrgeizig",
              "Romantisch",
              "Pragmatisch",
              "Sensibel",
            ].map((trait) => (
              <div key={trait} className="flex items-center space-x-2">
                <Checkbox
                  id={trait}
                  checked={formData.personality.includes(trait)}
                  onCheckedChange={() => handleArrayToggle("personality", trait)}
                />
                <Label htmlFor={trait} className="font-normal cursor-pointer text-sm">
                  {trait}
                </Label>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-2 border-t">
            <Label htmlFor="customPersonalityInput" className="text-sm font-medium">
              Weitere Eigenschaften hinzufügen
            </Label>
            <div className="flex gap-2">
              <Input
                id="customPersonalityInput"
                value={customPersonalityInput}
                onChange={(e) => setCustomPersonalityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addCustomTag("customPersonality", customPersonalityInput)
                    setCustomPersonalityInput("")
                  }
                }}
                placeholder="z.B. Perfektionistisch"
              />
              <Button
                type="button"
                onClick={() => {
                  addCustomTag("customPersonality", customPersonalityInput)
                  setCustomPersonalityInput("")
                }}
              >
                Hinzufügen
              </Button>
            </div>
            {formData.customPersonality.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.customPersonality.map((trait) => (
                  <Badge key={trait} variant="secondary" className="gap-1">
                    {trait}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeCustomTag("customPersonality", trait)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interessen & Hobbys *</CardTitle>
          <CardDescription>Was machst du gerne in deiner Freizeit?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Reisen",
              "Sport & Fitness",
              "Kochen & Backen",
              "Musik hören",
              "Musik machen",
              "Kunst & Kultur",
              "Gaming",
              "Lesen",
              "Natur & Wandern",
              "Ausgehen & Feiern",
              "Fotografie",
              "Filme & Serien",
              "Tanzen",
              "Yoga & Meditation",
              "DIY & Handwerk",
              "Technologie",
            ].map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={formData.interests.includes(interest)}
                  onCheckedChange={() => handleArrayToggle("interests", interest)}
                />
                <Label htmlFor={interest} className="font-normal cursor-pointer text-sm">
                  {interest}
                </Label>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-2 border-t">
            <Label htmlFor="customInterestsInput" className="text-sm font-medium">
              Weitere Interessen hinzufügen
            </Label>
            <div className="flex gap-2">
              <Input
                id="customInterestsInput"
                value={customInterestsInput}
                onChange={(e) => setCustomInterestsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addCustomTag("customInterests", customInterestsInput)
                    setCustomInterestsInput("")
                  }
                }}
                placeholder="z.B. Astronomie"
              />
              <Button
                type="button"
                onClick={() => {
                  addCustomTag("customInterests", customInterestsInput)
                  setCustomInterestsInput("")
                }}
              >
                Hinzufügen
              </Button>
            </div>
            {formData.customInterests.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.customInterests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="gap-1">
                    {interest}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeCustomTag("customInterests", interest)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lebensstil *</CardTitle>
          <CardDescription>Wie würdest du deinen Lebensstil beschreiben?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.lifestyle}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, lifestyle: value }))}
            required
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sehr-aktiv" id="sehr-aktiv" />
                <Label htmlFor="sehr-aktiv" className="font-normal cursor-pointer">
                  Sehr aktiv (Sport, Outdoor-Aktivitäten)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ausgewogen" id="ausgewogen" />
                <Label htmlFor="ausgewogen" className="font-normal cursor-pointer">
                  Ausgewogen (Mix aus Aktivität und Entspannung)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="entspannt" id="entspannt" />
                <Label htmlFor="entspannt" className="font-normal cursor-pointer">
                  Entspannt (Gemütliche Abende, Filme, Lesen)
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Werte *</CardTitle>
          <CardDescription>Was ist dir in einer Beziehung wichtig?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Ehrlichkeit",
              "Humor",
              "Treue",
              "Kommunikation",
              "Gemeinsame Zeit",
              "Unabhängigkeit",
              "Familie",
              "Karriere",
              "Vertrauen",
              "Respekt",
              "Abenteuer",
              "Stabilität",
            ].map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={value}
                  checked={formData.values.includes(value)}
                  onCheckedChange={() => handleArrayToggle("values", value)}
                />
                <Label htmlFor={value} className="font-normal cursor-pointer text-sm">
                  {value}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dealbreakers *</CardTitle>
          <CardDescription>Was geht für dich gar nicht?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Rauchen",
              "Unehrlichkeit",
              "Keine Ambition",
              "Schlechte Kommunikation",
              "Eifersucht",
              "Keine gemeinsamen Interessen",
              "Respektlosigkeit",
              "Unzuverlässigkeit",
            ].map((dealbreaker) => (
              <div key={dealbreaker} className="flex items-center space-x-2">
                <Checkbox
                  id={dealbreaker}
                  checked={formData.dealbreakers.includes(dealbreaker)}
                  onCheckedChange={() => handleArrayToggle("dealbreakers", dealbreaker)}
                />
                <Label htmlFor={dealbreaker} className="font-normal cursor-pointer text-sm">
                  {dealbreaker}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Über mich</CardTitle>
          <CardDescription>Beschreibe dich in ein paar Sätzen</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.selfDescription}
            onChange={(e) => setFormData((prev) => ({ ...prev, selfDescription: e.target.value }))}
            placeholder="Erzähl etwas über dich, deine Persönlichkeit, was dich ausmacht..."
            rows={5}
            className="resize-none"
          />
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        Profil erstellen
      </Button>
    </form>
    </>
  )
}
