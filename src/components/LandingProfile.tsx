"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LandingProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch");
      })
      .then(data => {
        setProfile(data.profile);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>;

  if (!profile) {
    return null;
    // User is logged in but hasn't done survey? 
    // Or API failed. The header "Starten" button handles the no-survey case. 
    // But maybe we should show a specific "Start Analysis" card here?
    // For now, if no result, show nothing (or fallback).
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-primary/10 to-transparent p-1 rounded-3xl">
        <div className="bg-card rounded-[1.4rem] p-8 border border-border/50 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-primary">Dein Matchimize Profil</h2>
              <p className="text-muted-foreground">Hier sind deine optimierten Texte.</p>
            </div>
            <div className="bg-secondary/50 px-4 py-2 rounded-full text-xs font-medium text-foreground uppercase tracking-wider">
              Bezahlt & Verifiziert
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {Object.entries(profile).map(([key, text]: [string, any], index) => (
              <Card key={key} className="bg-background/50 border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {index === 0 ? "✨ Der Charmeur" : index === 1 ? "🌍 Der Abenteurer" : "🎯 Der Direkt-Treffer"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                    {typeof text === "string" ? text : JSON.stringify(text)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-full text-primary hover:text-primary hover:bg-primary/5"
                    onClick={() => {
                      if (typeof text === "string") navigator.clipboard.writeText(text);
                    }}
                  >
                    Kopieren
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
