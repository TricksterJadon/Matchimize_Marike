"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Check, User, Brain, FileText, AlertCircle, Sparkles, Heart, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TRAIT_MAPPING } from "@/data/trait_mapping";

interface Question {
  id: string;
  text: string;
  characterTypeId: string;
}



export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: Personal Info, 1-N: Questions, N+1: Result
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Form State
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    lastname: "",
    birthdate: "",
    zodiac: "",
    genderIdentity: "male",
    pronouns: "er/ihm",
  });

  const getZodiacSign = (day: number, month: number): string => {
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Wassermann";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Fische";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Widder";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Stier";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Zwillinge";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Krebs";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Löwe";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Jungfrau";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Waage";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Skorpion";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Schütze";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Steinbock";
    return "";
  };

  const [birthdateError, setBirthdateError] = useState("");

  const validateBirthdate = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const year = date.getFullYear();
    if (year < 1926 || year > 2008) {
      setBirthdateError("Bitte gib dein tatsächliches Geburtsdatum an (1926-2008)");
      return false;
    }
    setBirthdateError("");
    return true;
  };

  const isFormValid = () => {
    return personalInfo.name && personalInfo.birthdate && !birthdateError;
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newInfo = { ...personalInfo, birthdate: val };

    if (val) {
      validateBirthdate(val);
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        const sign = getZodiacSign(date.getDate(), date.getMonth() + 1);
        newInfo.zodiac = sign;
      }
    }
    setPersonalInfo(newInfo);
  };


  const [stylePrefs, setStylePrefs] = useState<{
    tone: string[];
    emojis: boolean;
  }>({
    tone: ["Authentisch & Charmant"], // Default, changes to array logic
    emojis: true,
  });

  const [copied, setCopied] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
        setLoading(false);
      });
  }, []);


  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleAnswer = (questionId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleSubmit = async () => {
    setAnalyzing(true);
    setStep(5); // Move to loading/result view

    // Include the last answer if passed directly (since state update might be async)
    const finalAnswers = { ...answers };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: finalAnswers,
          personalInfo,
          stylePrefs,
        }),
      });

      const data = await response.json();
      setResult(data.profile);
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting survey", error);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-4 border-secondary rounded-full animate-spin reverse-spin"></div>
        </div>
      </div>
    );
  }

  // Step 0: Personal Info
  if (step === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-xl w-full border border-border/60 shadow-2xl bg-card/90 backdrop-blur-sm rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dein Profil-Booster
            </CardTitle>
            <CardDescription className="text-lg">
              Lass uns verstehen wer Du bist, um dein perfektes Dating-Profil zu erstellen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-base">Vorname</Label>
                <Input
                  value={personalInfo.name}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, name: e.target.value })
                  }
                  placeholder="Max"
                  className="h-12 text-lg rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-base">Nachname</Label>
                <Input
                  value={personalInfo.lastname}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      lastname: e.target.value,
                    })
                  }
                  placeholder="Mustermann"
                  className="h-12 text-lg rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-base">Geburtsdatum</Label>
                <Input
                  type="date"
                  value={personalInfo.birthdate}
                  onChange={handleBirthdateChange}
                  className="h-12 text-lg rounded-xl"
                  min="1900-01-01"
                  max={new Date().toISOString().split("T")[0]}
                />
                {birthdateError && (
                  <p className="text-red-500 text-sm font-medium animate-pulse">
                    {birthdateError}
                  </p>
                )}
              </div>
              <div className="space-y-2 hidden">
                <Label className="text-base">Sternzeichen</Label>
                <Input
                  value={personalInfo.zodiac}
                  readOnly
                  placeholder="Automatisch"
                  className="h-12 text-lg bg-secondary/20 rounded-xl"
                  tabIndex={-1}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base">Deine Identität</Label>
              <RadioGroup
                value={personalInfo.genderIdentity}
                onValueChange={(val) =>
                  setPersonalInfo({ ...personalInfo, genderIdentity: val })
                }
                className="flex flex-wrap gap-4"
              >
                {[
                  { id: "male", label: "Männlich" },
                  { id: "non-binary", label: "Non-binary" },
                  { id: "female", label: "Weiblich" },
                ].map((opt) => {
                  const isSelected = personalInfo.genderIdentity === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPersonalInfo({ ...personalInfo, genderIdentity: opt.id })}
                      className={`flex items-center space-x-2 p-3 rounded-xl transition-colors cursor-pointer border border-border/60 bg-card/80 hover:bg-card ${isSelected ? "ring-2 ring-primary/20" : ""}`}
                    >
                      <RadioGroupItem value={opt.id} id={opt.id} />
                      <Label
                        htmlFor={opt.id}
                        className="cursor-pointer font-medium"
                        onClick={(e) => e.stopPropagation()} // Prevent double toggle if Label triggers it too
                      >
                        {opt.label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base text-muted-foreground/80 font-semibold tracking-wide uppercase text-xs">
                Was beschreibt dich am Besten? (Mehrfachauswahl möglich)
              </Label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {[
                  "Rational", "Empathisch", "Abenteuerlustig", "Visionär",
                  "Analytisch", "Sensibel", "Beständig", "Intuitiv"
                ].map((tone) => {
                  const isSelected = stylePrefs.tone.includes(tone);
                  return (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => {
                        let newTones;
                        if (isSelected) {
                          newTones = stylePrefs.tone.filter(t => t !== tone);
                        } else {
                          newTones = [...stylePrefs.tone, tone];
                        }
                        setStylePrefs({ ...stylePrefs, tone: newTones });
                      }}
                      className={`group relative flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${isSelected
                        ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/10"
                        : "border-border/70 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-secondary/20"
                        }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${isSelected
                        ? "bg-primary text-white scale-110"
                        : "border-2 border-muted-foreground/30 group-hover:border-primary/50"
                        }`}>
                        {isSelected && (
                          <Check className="w-3 h-3 stroke-[3]" />
                        )}
                      </div>
                      <span className="text-sm font-semibold tracking-tight">
                        {tone}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleNext}
              className="w-full h-12 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all"
              disabled={!isFormValid()}
            >
              Starten <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Batch Questions (Steps 1 to 4)
  if (step > 0 && step <= 4) {
    const batchIndex = step - 1;
    const questionsPerPage = 10;
    const startIndex = batchIndex * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = questions.slice(startIndex, endIndex);

    // Calculate progress based on batches completed
    const progress =
      (batchIndex / 4) * 100 + (Object.keys(answers).length % 10) * (25 / 10); // Rough progress approximation

    const isBatchComplete = currentQuestions.every((q) => answers[q.id]);

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-start p-4 md:p-8 relative">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress
            value={(Object.keys(answers).length / 40) * 100}
            className="h-2 rounded-none bg-muted"
          />
        </div>

        <div className="w-full max-w-4xl mt-8 mb-24 space-y-12">
          {currentQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-border/70 pb-12 last:border-0"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-medium text-foreground/90 max-w-2xl mx-auto leading-relaxed">
                  {question.text}
                </h3>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <span className="text-sm font-medium text-muted-foreground w-32 text-right hidden md:block">
                  Trifft nicht zu
                </span>

                <div className="flex items-center gap-4 md:gap-6">
                  {/* Mobile Label Left */}
                  <span className="text-xs font-medium text-muted-foreground md:hidden">
                    Trifft nicht zu
                  </span>

                  {[1, 2, 3, 4, 5].map((value) => {
                    const isSelected =
                      answers[question.id] === value.toString();
                    const sizeClass =
                      value === 3
                        ? "w-8 h-8 md:w-10 md:h-10"
                        : value === 2 || value === 4
                          ? "w-10 h-10 md:w-12 md:h-12"
                          : "w-12 h-12 md:w-14 md:h-14";

                    const colorClass =
                      value > 3
                        ? "border-secondary/50 text-muted-foreground" // Agree side (Pink, subtle)
                        : value < 3
                          ? "border-blue-400/60 text-muted-foreground" // Disagree side (Blue, subtle)
                          : "border-muted-foreground/50 text-muted-foreground"; // Neutral (Grey)

                    const selectedFillClass =
                      value > 3
                        ? "bg-secondary border-secondary"
                        : value < 3
                          ? "bg-blue-500 border-blue-500"
                          : "bg-muted-foreground/40 border-muted-foreground/40";

                    return (
                      <button
                        key={value}
                        onClick={() =>
                          handleAnswer(question.id, value.toString())
                        }
                        className={`
                          ${sizeClass} rounded-full border-2 flex items-center justify-center transition-all duration-200 box-border relative overflow-hidden
                          ${colorClass} ${isSelected ? "" : "hover:opacity-70 opacity-60 hover:scale-110"}
                          ${isSelected ? `opacity-100 scale-110 ${selectedFillClass}` : ""}
                          ${isSelected ? "" : "bg-transparent"}
                        `}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className={`absolute inset-0 rounded-full ${selectedFillClass}`}
                          />
                        )}
                      </button>
                    );
                  })}
                  {/* Mobile Label Right */}
                  <span className="text-xs font-medium text-muted-foreground md:hidden">
                    Trifft zu
                  </span>
                </div>

                <span className="text-sm font-medium text-muted-foreground w-32 text-left hidden md:block">
                  Trifft zu
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/85 backdrop-blur-lg border-t border-border/60 flex justify-between items-center z-40 max-w-4xl mx-auto w-full">
          {/* If step 1, showed Back to Personal Info? Maybe just hide back on step 1 or allow */}
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1 && false /* Can go back to info? Yes */}
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Zurück
          </Button>

          <div className="text-sm font-medium text-muted-foreground">
            Seite {step} von 4
          </div>

          <Button
            onClick={step === 4 ? () => handleSubmit() : handleNext}
            disabled={!isBatchComplete}
            className={`px-8 rounded-full ${isBatchComplete ? "shadow-lg shadow-primary/20" : ""}`}
            size="lg"
          >
            {step === 4 ? "Abschließen" : "Weiter"}{" "}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Analyzing / Result View
  if (step > 4) {
    const getTopTraits = () => {
      if (!result?.topTraits) return [];
      return result.topTraits;
    };

    const topTraits = getTopTraits();

    const handleCopy = () => {
      if (result?.profileText) {
        navigator.clipboard.writeText(result.profileText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        {analyzing ? (
          <div className="text-center space-y-8">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-t-4 border-secondary rounded-full animate-spin reverse-spin duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold animate-pulse text-secondary">AI</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-secondary">
                Deine Persönlichkeit wird analysiert...
              </h2>
              <p className="text-muted-foreground">
                Wir erstellen dein perfektes Profil.
              </p>
              <p className="text-sm text-muted-foreground animate-pulse">
                Dies kann bis zu einer Minute dauern...
              </p>
            </div>
          </div>
        ) : !result?.characterName ? (
          <div className="w-full max-w-lg text-center space-y-6 animate-fade-in">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground">Fehler bei der Analyse</h2>
            <p className="text-muted-foreground">
              Entschuldigung, wir konnten keine Ergebnisse laden. Dies könnte daran liegen, dass du die Umfrage bereits abgeschlossen hast.
            </p>

            <Button onClick={() => window.location.reload()} variant="outline">
              Seite neu laden
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Analyse Abgeschlossen</span>
              </div>

            </div>

            {/* Character Type Section */}
            <Card className="p-6 md:p-8 mb-8 shadow-lg animate-fade-in-up delay-100 border border-border/60 bg-card rounded-3xl card-float">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Dein Charaktertyp</h3>
              <div className="bg-muted/30 rounded-2xl p-6 border border-border/60">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-3xl font-bold text-primary">{result?.characterName}</p>
                </div>
              </div>
            </Card>

            {/* Traits Section */}
            <Card className="p-6 md:p-8 mb-8 shadow-lg animate-fade-in-up delay-200 border border-border/60 bg-card rounded-3xl card-float">
              <h3 className="text-2xl font-bold mb-8 text-foreground">Analysierte Eigenschaften</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
                {topTraits.map((trait: any, index: number) => (
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
            <Card className="p-6 md:p-8 shadow-lg animate-fade-in-up delay-300 border border-border/60 bg-card rounded-3xl card-float">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h3 className="text-2xl font-bold text-foreground">Dein Dating-Profil</h3>
                </div>

              </div>

              <div className="relative">
                <div className="bg-muted/40 rounded-2xl p-6 border border-border/70">
                  <p className="text-foreground leading-relaxed text-pretty whitespace-pre-wrap font-medium">
                    {result?.profileText}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mt-4">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="gap-2 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent w-full md:w-auto"
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
              </div>
            </Card>

            {/* Actions */}
            <div className="text-center space-y-4 pb-12">
              <Link href="/profile">
                <Button variant="outline" size="lg" className="rounded-full gap-2 border-primary/20 hover:bg-primary hover:text-white text-foreground transition-all">
                  Zum Profil-Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>


            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
