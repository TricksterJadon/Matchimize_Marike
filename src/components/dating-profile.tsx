"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart, Users, Target, Star, AlertCircle } from "lucide-react"
import { AISummary } from "@/components/ai-summary"
import Link from "next/link"

interface DatingProfileData {
  age: string
  gender: string
  lookingFor: string
  relationshipGoal: string
  personality: string[]
  interests: string[]
  lifestyle: string
  values: string[]
  dealbreakers: string[]
  selfDescription: string
  timestamp: string
  summary?: string
}

export function DatingProfile() {
  const [profileData, setProfileData] = useState<DatingProfileData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("my-dating-profile")
    if (data) {
      setProfileData(JSON.parse(data))
    }
  }, [])

  if (!profileData) {
    return (
      <Card>
        <CardContent className="py-12 text-center space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Noch kein Profil vorhanden</h3>
            <p className="text-muted-foreground">
              Beantworte zuerst die Dating-Umfrage, um dein personalisiertes Profil zu erstellen.
            </p>
          </div>
          <Button asChild>
            <Link href="/survey">Zur Umfrage</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const relationshipGoalLabels: Record<string, string> = {
    "langfristige-beziehung": "Langfristige Beziehung",
    "etwas-lockeres": "Etwas Lockeres",
    freundschaft: "Freundschaft",
    "noch-unsicher": "Noch unsicher",
  }

  const lifestyleLabels: Record<string, string> = {
    "sehr-aktiv": "Sehr aktiv",
    ausgewogen: "Ausgewogen",
    entspannt: "Entspannt",
  }

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Grundlegende Informationen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Alter</p>
              <p className="font-semibold">{profileData.age} Jahre</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Geschlecht</p>
              <p className="font-semibold capitalize">{profileData.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sucht nach</p>
              <p className="font-semibold capitalize">{profileData.lookingFor}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Beziehungsziel</p>
              <p className="font-semibold">{relationshipGoalLabels[profileData.relationshipGoal]}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Lebensstil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-sm">
              {lifestyleLabels[profileData.lifestyle]}
            </Badge>
          </CardContent>
        </Card>

        {profileData.values.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Wichtige Werte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.values.slice(0, 4).map((value) => (
                  <Badge key={value} variant="secondary" className="text-sm">
                    {value}
                  </Badge>
                ))}
                {profileData.values.length > 4 && (
                  <Badge variant="outline" className="text-sm">
                    +{profileData.values.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {profileData.personality.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="h-4 w-4" />
                Persönlichkeitsmerkmale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.personality.slice(0, 6).map((trait) => (
                  <Badge key={trait} variant="outline" className="text-sm">
                    {trait}
                  </Badge>
                ))}
                {profileData.personality.length > 6 && (
                  <Badge variant="outline" className="text-sm">
                    +{profileData.personality.length - 6}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {profileData.interests.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Top Interessen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.slice(0, 6).map((interest) => (
                  <Badge key={interest} variant="outline" className="text-sm">
                    {interest}
                  </Badge>
                ))}
                {profileData.interests.length > 6 && (
                  <Badge variant="outline" className="text-sm">
                    +{profileData.interests.length - 6}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dealbreakers */}
      {profileData.dealbreakers.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Dealbreakers</CardTitle>
            <CardDescription>Was für dich nicht in Frage kommt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profileData.dealbreakers.map((dealbreaker) => (
                <Badge key={dealbreaker} variant="destructive" className="text-foreground">
                  {dealbreaker}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Self Description */}
      {profileData.selfDescription && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Über mich</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-foreground">{profileData.selfDescription}</p>
          </CardContent>
        </Card>
      )}

      {/* AI Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            KI-Profil-Analyse
          </CardTitle>
          <CardDescription>Lass die KI dein Profil analysieren und Empfehlungen geben</CardDescription>
        </CardHeader>
        <CardContent>
          <AISummary data={profileData} type="profile" autoGenerate={true} />
        </CardContent>
      </Card>
    </div>
  )
}
