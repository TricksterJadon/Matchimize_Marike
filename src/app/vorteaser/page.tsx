"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Define the questions and their scoring values
const questions = [
  {
    id: 1,
    question: "Lass uns verstehen wer Du bist, um dein perfektes Dating-Profil zu erstellen",
    options: [
      { text: "Mein Profil zeigt mich genauso, wie ich bin, echt, spontan und unverstellt.", score: 10 },
      { text: "Ich zeige schon mein echtes Ich, aber natürlich etwas geschliffener oder humorvoller.", score: 7 },
      { text: "Ich präsentiere eher die Version, die ich gern wäre, etwas cooler, sicherer oder spannender.", score: 3 }
    ]
  },
  {
    id: 2,
    question: "Welches deiner Fotos würde jemanden am ehesten dazu bringen, dich anzuschreiben, und warum?",
    options: [
      { text: "Ein natürliches Foto, auf dem ich lache oder mitten im Moment bin.", score: 10 },
      { text: "Ein Bild, das mich bei einer Aktivität zeigt, zum Beispiel beim Sport, Reisen oder meinem Hobby.", score: 8 },
      { text: "Ein gestelltes oder besonders cooles Bild, auf dem ich richtig gut aussehe.", score: 4 }
    ]
  },
  {
    id: 3,
    question: "Sieht man auf deinen Fotos verschiedene Facetten deines Lebens (z. B. Alltag, Lächeln, Hobby, Bewegung)?",
    options: [
      { text: "Ja, absolut, meine Fotos zeigen mich in unterschiedlichen Situationen: entspannt, aktiv und im Alltag.", score: 10 },
      { text: "Teilweise, es gibt ein paar unterschiedliche Fotos, aber vieles wirkt noch ähnlich.", score: 6 },
      { text: "Eher nicht, meine Fotos sind ziemlich ähnlich oder wirken alle inszeniert.", score: 2 }
    ]
  },
  {
    id: 4,
    question: "Lächelst du auf mindestens einem deiner Profilbilder?",
    options: [
      { text: "Ja, klar, ich lache auf mehreren Fotos ganz natürlich.", score: 10 },
      { text: "Auf einem oder zwei Bildern, aber eher dezent oder zurückhaltend.", score: 6 },
      { text: "Nein, ich bleibe lieber ernst oder cool auf meinen Fotos.", score: 2 }
    ]
  },
  {
    id: 5,
    question: "Wirken deine Fotos aktuell, natürlich und klar beleuchtet?",
    options: [
      { text: "Ja, absolut, meine Fotos sind aktuell, gut ausgeleuchtet und zeigen mich ganz natürlich.", score: 10 },
      { text: "Teils, einige Bilder sind natürlich und klar, andere wirken älter oder etwas bearbeitet.", score: 6 },
      { text: "Eher nicht, meine Fotos sind älter, dunkel oder zu stark bearbeitet.", score: 2 }
    ]
  },
  {
    id: 6,
    question: "Spiegelt dein Profiltext deine Persönlichkeit und Energie wider, oder ist er eher neutral/generisch?",
    options: [
      { text: "Ja, total, mein Text klingt nach mir: lebendig, echt und mit eigener Energie.", score: 10 },
      { text: "Teilweise, mein Text beschreibt mich schon, aber eher sachlich oder zurückhaltend.", score: 6 },
      { text: "Nicht wirklich, mein Text ist kurz, generisch oder verrät wenig über mich.", score: 2 }
    ]
  }
];

export default function VorteaserPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Removed local storage logic as requested

  const handleAnswer = (score: number) => {
    // Prevent rapid double-firing
    if (showResult) return;

    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    // Small delay to show selection before moving
    setTimeout(() => {
      if (newAnswers.length < questions.length) {
        setCurrentQuestionIndex(newAnswers.length);
      } else {
        setShowResult(true);
      }
    }, 250);
  };

  const calculateTotalScore = () => {
    return answers.reduce((a, b) => a + b, 0);
  };

  // Max possible raw score is 60 (6 questions * 10 points)
  const maxRawScore = 60;
  const currentRawScore = calculateTotalScore();

  // Clamp at 30 to prevent overflow if stale state exists
  const finalPercentage = Math.min(30, Math.round((currentRawScore / maxRawScore) * 30));

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };

  // Check if we just came back from login to redirect to survey
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      const params = new URLSearchParams(window.location.search);
      if (params.get("redirected")) {
        router.push("/survey");
      }
    }
  }, [isSignedIn, isLoaded, router]);

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full border border-border/60 rounded-[2rem] relative overflow-hidden shadow-xl card-float">
          <CardHeader className="text-center pb-2 relative z-10 bg-card/90 backdrop-blur-sm">
            <CardTitle className="text-3xl font-bold mb-2">Dein Profil-Score</CardTitle>
            <CardDescription>Basierend auf deinen Antworten</CardDescription>
          </CardHeader>

          {/* Score Display */}
          <CardContent className="flex flex-col items-center py-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Circular progress background */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-secondary/30"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${(finalPercentage / 100) * 440} 440`}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000"
                />
              </svg>
              <span className="text-5xl font-bold text-foreground">{finalPercentage}%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Dein Profil-Optimierungspotenzial
            </p>
          </CardContent>

          {/* Unlocked Result - Button triggers login/redirect */}
          <CardFooter className="flex flex-col gap-3 pt-2 pb-8 relative z-20">
            {/* If not signed in, SignInButton triggers modal, then redirects back. We handle the redirect in useEffect above or use redirectUrl */}
            {!isSignedIn ? (
              <SignInButton mode="modal" forceRedirectUrl="/survey">
                <Button
                  size="lg"
                  className="w-full text-lg h-14 rounded-full group shadow-lg shadow-primary/25"
                >
                  Weiter zum idealen Profil
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </SignInButton>
            ) : (
              <Button
                size="lg"
                className="w-full text-lg h-14 rounded-full group shadow-lg shadow-primary/25"
                onClick={() => router.push('/survey')}
              >
                Weiter zum idealen Profil
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}

            <Button variant="ghost" onClick={resetQuiz} className="text-xs text-muted-foreground hover:text-foreground">
              Analyse wiederholen (Reset)
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Startet die detaillierte Analyse & Erstellung (Schritt 2 von 2)
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Guard against invalid state
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Button onClick={resetQuiz} variant="outline">
          Fehler: Quiz zurücksetzen
        </Button>
      </div>
    );
  }

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span>Frage {currentQuestionIndex + 1} von {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3 rounded-full bg-muted" />
      </div>

      <Card className="max-w-lg w-full border border-border/60 shadow-xl rounded-[2rem] min-h-[600px] flex flex-col justify-center bg-card/95 backdrop-blur-sm card-float">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl leading-tight">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="group flex items-center p-5 rounded-2xl border border-border/70 bg-card hover:bg-secondary/20 hover:border-primary/50 cursor-pointer transition-all"
              >
                <div className="flex-1 text-base font-normal leading-relaxed">
                  {option.text}
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
