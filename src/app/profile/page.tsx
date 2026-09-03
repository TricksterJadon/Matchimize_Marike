"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Copy, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { TRAIT_MAPPING } from "@/data/trait_mapping";

interface ProfileResult {
  characterName: string;
  characterId: string;
  profileText: string;
  scores?: Record<string, number>;
}

interface ProfileData {
  profile: ProfileResult | null;
  createdAt?: string;
  expired?: boolean;
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/profile")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch");
      })
      .then(data => {
        const metadata = user.publicMetadata as any;
        setProfileData({
          profile: data.profile,
          createdAt: metadata?.createdAt
        });
        setExpired(Boolean(data.expired));
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [isLoaded, user]);

  const handleCopy = () => {
    if (profileData?.profile?.profileText) {
      navigator.clipboard.writeText(profileData.profile.profileText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };



  const getTopTraits = () => {
    if (!profileData?.profile?.scores) return [];

    const traits = Object.entries(profileData.profile.scores)
      .map(([id, score]) => {
        const mapping = TRAIT_MAPPING[id];
        if (!mapping) return null;

        const percentage = Math.min(Math.round((score / mapping.maxScore) * 100), 100);
        return {
          id,
          name: mapping.label,
          score: percentage,
          rawScore: score // keep for sorting
        };
      })
      .filter((t): t is NonNullable<typeof t> => t !== null)
      .sort((a, b) => b.score - a.score); // Sort by percentage

    return traits.slice(0, 3);
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full text-center p-8 bg-card border-none shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-secondary">Nicht angemeldet</h2>
          <p className="text-muted-foreground mb-6">Bitte melde dich an, um dein Profil zu sehen.</p>
          <Link href="/vorteaser">
            <Button className="w-full">Zur Anmeldung</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const firstName = user?.firstName || user?.fullName?.split(" ")[0] || "";

  if (expired && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <Card className="border border-border/60 shadow-xl bg-card p-8 text-center max-w-md rounded-3xl">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-foreground">Dein Ergebnis ist abgelaufen</h2>
          <p className="text-muted-foreground mb-6">
            Dein Profil ist älter als 30 Tage. Bitte starte eine neue Analyse, um ein aktuelles Ergebnis zu erhalten.
          </p>
          <Link href="/survey">
            <Button className="rounded-full px-8">Analyse neu starten</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Show empty state if no profile
  if (!profileData?.profile && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <Card className="border border-border/60 shadow-xl bg-card p-8 text-center max-w-md rounded-3xl">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-secondary">Noch kein Ergebnis</h2>
          <p className="text-muted-foreground mb-6">
            Du hast noch keine Analyse durchgeführt. Starte jetzt!
          </p>
          <Link href="/survey">
            <Button className="rounded-full px-8">
              Analyse starten
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  const topTraits = getTopTraits();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-border/60 bg-card sticky top-0 z-10 backdrop-blur-md bg-opacity-85">
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-secondary">Match</span>
              <span className="text-primary">imize</span>
            </h1>
          </div>
          <Link href="/">
            <Button variant="ghost" className="text-sm">Startseite</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="mb-8 md:mb-10">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Willkommen zurück</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Hallo{firstName ? `, ${firstName}` : ""}
          </h2>
          <p className="text-muted-foreground mt-2">
            Hier ist dein aktuelles Profil-Ergebnis.
          </p>
        </div>




        {/* Character Type Section */}
        <Card className="p-6 md:p-8 mb-8 shadow-xl animate-fade-in-up delay-150 border border-border/60 bg-card rounded-3xl card-float">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Dein Charaktertyp</h3>
          <div className="bg-muted/30 rounded-2xl p-6 border border-border/60">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {profileData?.profile?.characterName}
              </p>
            </div>
          </div>
        </Card>

        {/* Traits Section */}
        <Card className="p-6 md:p-8 mb-8 shadow-xl animate-fade-in-up delay-200 border border-border/60 bg-card rounded-3xl card-float">
          <h3 className="text-2xl font-bold mb-8 text-foreground">Analysierte Eigenschaften</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {topTraits.map((trait, index) => (
              trait && (
                <div
                  key={trait.id}
                  className="flex flex-col items-center gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150 + 300}ms` }}
                >
                  <div className="relative w-24 h-24">
                    {/* Background circle */}
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted/30"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - trait.score / 100)}`}
                        className="text-primary transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-foreground">{trait.score}%</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-center text-foreground">{trait.name}</span>
                </div>
              )
            ))}
          </div>
        </Card>

        {/* Dating Profile Section */}
        <Card className="p-6 md:p-8 shadow-xl animate-fade-in-up delay-300 border border-border/60 bg-card rounded-3xl card-float">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h3 className="text-2xl font-bold text-foreground">Dein Dating-Profil</h3>
            </div>

          </div>

          <div className="relative">
            <div className="bg-muted/40 rounded-2xl p-6 border border-border/70">
              <p className="text-foreground leading-relaxed text-pretty whitespace-pre-wrap font-medium">
                {profileData?.profile?.profileText}
              </p>
            </div>

            <Button
              onClick={handleCopy}
              variant="outline"
              className="mt-4 gap-2 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent w-full md:w-auto"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Kopiert!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Text Kopieren
                </>
              )}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
