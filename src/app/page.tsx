import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, Heart } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-border/60 sticky top-0 bg-background/85 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground shadow-sm">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <span className="tracking-tight">
              <span className="text-primary">Match</span>
              <span className="text-secondary">imize</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">
              Ablauf
            </Link>
            <Link href="#features" className="hover:text-foreground transition-colors">
              Vorteile
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href={userId ? "/profile" : "/vorteaser"}>
              <Button className="rounded-full px-6">{userId ? "Mein Profil" : "Starten"}</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-4 text-center border-b border-border/60">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-border/70 text-sm font-medium mb-8 uppercase tracking-wider rounded-full bg-card/60">
              <Sparkles className="w-4 h-4" />
              <span>KI-Profiloptimierung</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-foreground">
              Dein Profil.<br />
              <span className="text-muted-foreground">Nur besser.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Keine Spielchen. Keine Floskeln. Wir analysieren deine Persönlichkeit und erstellen Texte, die wirklich funktionieren.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/vorteaser">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                  Jetzt optimieren
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                  Mehr erfahren
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 border-b border-border/60">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 border border-border/70 rounded-2xl bg-card/60 flex items-center justify-center mb-4 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Authentizität</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Wir nutzen psychologische Modelle, um deinen wahren Charakter einzufangen. Nichts wirkt aufgesetzt.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 border border-border/70 rounded-2xl bg-card/60 flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Präzision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unsere KI ist auf Dating-Kontexte trainiert. Sie weiß genau, was auf Tinder & Co. funktioniert.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 border border-border/70 rounded-2xl bg-card/60 flex items-center justify-center mb-4 shadow-sm">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Erfolg</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bessere Texte führen zu besseren Matches. So einfach ist die Mathematik des Datings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Der Prozess</h2>
              <p className="text-muted-foreground">Effizient und wirkungsvoll.</p>
            </div>
            <div className="space-y-0 border-l border-border/70 ml-4 md:ml-0">
              <div className="relative pl-8 md:pl-0 pb-12 md:pb-16 md:grid md:grid-cols-5 md:gap-8">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-primary rounded-full md:hidden"></div>
                <div className="md:col-span-1 md:text-right md:pt-1 font-mono text-sm text-muted-foreground">01</div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold mb-2">Analyse</h3>
                  <p className="text-muted-foreground">Starte mit unserem kostenlosen Vorteaser-Check.</p>
                </div>
              </div>
              <div className="relative pl-8 md:pl-0 pb-12 md:pb-16 md:grid md:grid-cols-5 md:gap-8">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-primary rounded-full md:hidden"></div>
                <div className="md:col-span-1 md:text-right md:pt-1 font-mono text-sm text-muted-foreground">02</div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold mb-2">Deep Dive</h3>
                  <p className="text-muted-foreground">Beantworte gezielte Fragen zu deiner Person.</p>
                </div>
              </div>
              <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 md:gap-8">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-primary rounded-full md:hidden"></div>
                <div className="md:col-span-1 md:text-right md:pt-1 font-mono text-sm text-muted-foreground">03</div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold mb-2">Ergebnis</h3>
                  <p className="text-muted-foreground">Erhalte 3 maßgeschneiderte Profiltexte.</p>
                </div>
              </div>
            </div>
            <div className="mt-20 text-center">
              <Link href="/vorteaser">
                <Button size="lg" className="h-14 px-12 text-lg rounded-full">
                  Jetzt starten
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/60">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Matchimize.</p>
        </div>
      </footer>
    </div>
  );
}
