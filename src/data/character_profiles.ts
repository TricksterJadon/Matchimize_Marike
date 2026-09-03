export interface CharacterProfile {
  id: string;
  name: string;
  englishName: string;
  description: string;
  datingProfilePrompts: string[];
}

// ─── MenschenMensch: texts #1–50 (identical) ───────────────────────────────
const mm_1_50 = "Du blühst auf, wenn Menschen um dich herum sind und Energie in den Raum bringen. Gespräche, kleine Begegnungen und gemeinsame Momente geben dir neue Ideen und Motivation. Du spürst oft sofort, wie andere sich fühlen und reagierst intuitiv darauf. Alleinsein kann für dich schnell langweilig wirken, weil dein Kopf soziale Impulse liebt. Du motivierst andere mit deiner offenen Art und schaffst schnell Verbindungen. Menschen fühlen sich bei dir gesehen, verstanden und willkommen.";

// ─── MenschenMensch: texts #51–100 (10 variations × 5) ─────────────────────
const mm_B: string[] = [
  "Du tankst Energie durch echte Begegnungen und gute Gespräche. Du spürst oft intuitiv, wie andere denken oder fühlen. Du fühlst dich lebendig, wenn du Teil einer Gruppe bist. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Andere Menschen geben dir oft neue Motivation. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Menschen inspirieren dich mehr als Ruhe oder Routine. Du spürst oft intuitiv, wie andere denken oder fühlen. Zwischenmenschliche Momente bleiben dir lange im Kopf. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Du liebst es, Ideen gemeinsam mit anderen entstehen zu lassen. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Dein Kopf springt sofort an, wenn andere um dich herum sind. Du spürst oft intuitiv, wie andere denken oder fühlen. Du merkst schnell, welche Stimmung in einem Raum herrscht. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Smalltalk wird bei dir oft schnell zu echten Gesprächen. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Du fühlst dich lebendig, wenn du Teil einer Gruppe bist. Du spürst oft intuitiv, wie andere denken oder fühlen. Andere Menschen geben dir oft neue Motivation. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Du brauchst Verbindung, um dich richtig wohlzufühlen. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Zwischenmenschliche Momente bleiben dir lange im Kopf. Du spürst oft intuitiv, wie andere denken oder fühlen. Du liebst es, Ideen gemeinsam mit anderen entstehen zu lassen. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Du tankst Energie durch echte Begegnungen und gute Gespräche. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Du merkst schnell, welche Stimmung in einem Raum herrscht. Du spürst oft intuitiv, wie andere denken oder fühlen. Smalltalk wird bei dir oft schnell zu echten Gesprächen. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Menschen inspirieren dich mehr als Ruhe oder Routine. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Andere Menschen geben dir oft neue Motivation. Du spürst oft intuitiv, wie andere denken oder fühlen. Du brauchst Verbindung, um dich richtig wohlzufühlen. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Dein Kopf springt sofort an, wenn andere um dich herum sind. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Du liebst es, Ideen gemeinsam mit anderen entstehen zu lassen. Du spürst oft intuitiv, wie andere denken oder fühlen. Du tankst Energie durch echte Begegnungen und gute Gespräche. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Du fühlst dich lebendig, wenn du Teil einer Gruppe bist. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Smalltalk wird bei dir oft schnell zu echten Gesprächen. Du spürst oft intuitiv, wie andere denken oder fühlen. Menschen inspirieren dich mehr als Ruhe oder Routine. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Zwischenmenschliche Momente bleiben dir lange im Kopf. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
  "Du brauchst Verbindung, um dich richtig wohlzufühlen. Du spürst oft intuitiv, wie andere denken oder fühlen. Dein Kopf springt sofort an, wenn andere um dich herum sind. Alleinsein kann sich für dich schnell leer anfühlen, weil dein Gehirn auf Austausch reagiert. Du merkst schnell, welche Stimmung in einem Raum herrscht. Deine offene Art macht es leicht, neue Kontakte zu knüpfen. Viele Menschen fühlen sich von deiner Energie angezogen und vertrauen dir schnell.",
];

// ─── MenschenMensch: texts #101–150 (10 variations × 5) ────────────────────
const mm_C: string[] = [
  "Du fühlst dich am stärksten, wenn du mit anderen verbunden bist. Du merkst oft sofort, wenn jemand sich ausgeschlossen fühlt. In Gruppen fühlst du dich meistens sicherer und motivierter. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Dadurch wirst du oft zur Person, die andere emotional zusammenhält.",
  "Dein Gehirn liebt Austausch, Gespräche und echte Begegnungen. Andere fühlen sich durch deine offene Art schnell verstanden. Gespräche inspirieren dich oft mehr als lange Zeit allein. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Menschen erinnern sich oft lange an deine warme Ausstrahlung.",
  "Menschen geben dir oft mehr Energie als Ruhe oder Rückzug. Du brauchst Menschen um dich herum, um richtig aufzutanken. Du gibst anderen das Gefühl, wichtig zu sein. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Deine soziale Energie macht dich für viele unersetzbar.",
  "Du nimmst soziale Stimmungen unglaublich schnell wahr. In Gruppen fühlst du dich meistens sicherer und motivierter. Deine Energie steckt andere häufig an. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Mit deiner Art schaffst du schnell eine besondere Atmosphäre.",
  "Du denkst selten nur an dich allein, sondern immer auch an andere. Gespräche inspirieren dich oft mehr als lange Zeit allein. Du kannst schnell Vertrauen zu neuen Menschen aufbauen. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Du bringst Leben, Dynamik und Nähe in jede Gruppe.",
  "Gemeinsame Erlebnisse bedeuten dir oft mehr als materielle Dinge. Du gibst anderen das Gefühl, wichtig zu sein. Du hörst oft zwischen den Zeilen, was andere wirklich meinen. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Dadurch fühlen sich andere bei dir schnell zuhause.",
  "Du kannst mit deiner Art ganze Gruppen mitziehen. Deine Energie steckt andere häufig an. Freundschaften und Nähe bedeuten dir extrem viel. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Dein Umfeld profitiert stark von deiner positiven Präsenz.",
  "Dein Herz reagiert stark auf zwischenmenschliche Momente. Du kannst schnell Vertrauen zu neuen Menschen aufbauen. Du merkst oft sofort, wenn jemand sich ausgeschlossen fühlt. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Viele suchen deine Nähe, weil du echte Verbindung schaffst.",
  "Du liebst es, Teil von etwas Größerem zu sein. Du hörst oft zwischen den Zeilen, was andere wirklich meinen. Andere fühlen sich durch deine offene Art schnell verstanden. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Du bist jemand, der Menschen wirklich zusammenbringen kann.",
  "Verbindungen zu Menschen machen dein Leben lebendig. Freundschaften und Nähe bedeuten dir extrem viel. Du brauchst Menschen um dich herum, um richtig aufzutanken. Du fühlst dich meistens dann am besten, wenn du dich austauschen und gemeinsam etwas erleben kannst. Alleinsein ist für dich manchmal anstrengender als für andere, weil dein Kopf soziale Impulse liebt. Genau diese Offenheit macht dich für andere besonders.",
];

// ─── MenschenMensch: texts #151–200 (10 variations × 5) ────────────────────
const mm_D: string[] = [
  "Du ziehst Kraft aus Gesprächen, Nähe und gemeinsamen Momenten. Du spürst oft intuitiv, was andere brauchen oder fühlen. Du hörst aufmerksam zu und gibst anderen Raum. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Dadurch wirst du oft zu einer wichtigen Bezugsperson für andere.",
  "Menschen sind für dich mehr als Gesellschaft – sie geben dir Energie. Andere fühlen sich durch deine offene Art schnell verstanden. Neue Kontakte entstehen bei dir oft ganz natürlich. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Deine Energie macht Gruppen oft lebendiger und offener.",
  "Du fühlst dich lebendig, wenn um dich herum etwas passiert. Du kannst Menschen motivieren, ohne es bewusst zu planen. Du denkst selten nur an dich selbst, sondern auch an dein Umfeld. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Menschen schätzen deine herzliche und verbindende Art.",
  "Dein Kopf reagiert stark auf soziale Eindrücke und Begegnungen. In Gruppen bringst du oft Wärme und Dynamik hinein. Gemeinsame Erlebnisse bleiben dir lange im Gedächtnis. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Du bringst andere dazu, sich gesehen und akzeptiert zu fühlen.",
  "Du liebst es, mit anderen Ideen auszutauschen und gemeinsam zu wachsen. Du hörst aufmerksam zu und gibst anderen Raum. Du fühlst dich oft wohler mit Menschen als komplett allein. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Genau diese Offenheit macht dich für viele besonders.",
  "Zwischenmenschliche Verbindungen bedeuten dir unglaublich viel. Neue Kontakte entstehen bei dir oft ganz natürlich. Soziale Nähe gibt dir ein Gefühl von Sicherheit. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Mit deiner Art schaffst du schnell echte Verbindungen.",
  "Du merkst schnell, welche Stimmung andere mit sich tragen. Du denkst selten nur an dich selbst, sondern auch an dein Umfeld. Du spürst oft intuitiv, was andere brauchen oder fühlen. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Viele erinnern sich lange daran, wie du ihnen begegnet bist.",
  "Für dich entstehen die besten Momente oft gemeinsam mit anderen. Gemeinsame Erlebnisse bleiben dir lange im Gedächtnis. Andere fühlen sich durch deine offene Art schnell verstanden. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Dein Umfeld profitiert stark von deiner positiven Ausstrahlung.",
  "Du brauchst Austausch, damit dein Kopf richtig in Bewegung kommt. Du fühlst dich oft wohler mit Menschen als komplett allein. Du kannst Menschen motivieren, ohne es bewusst zu planen. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Du kannst Menschen emotional zusammenbringen wie kaum jemand sonst.",
  "Menschen inspirieren dich jeden Tag aufs Neue. Soziale Nähe gibt dir ein Gefühl von Sicherheit. In Gruppen bringst du oft Wärme und Dynamik hinein. Du tankst Energie durch echte Begegnungen und gemeinsame Erfahrungen. Lange Isolation kann dich schnell ausbremsen, weil dein Gehirn auf soziale Impulse reagiert. Diese Stärke macht dich zu einem echten Menschenmenschen.",
];

const menschenMenschTexts: string[] = [
  ...Array(50).fill(mm_1_50),                     // #1–50
  ...mm_B, ...mm_B, ...mm_B, ...mm_B, ...mm_B,    // #51–100 (each B repeated 5×)
  ...mm_C, ...mm_C, ...mm_C, ...mm_C, ...mm_C,    // #101–150 (each C repeated 5×)
  ...mm_D, ...mm_D, ...mm_D, ...mm_D, ...mm_D,    // #151–200 (each D repeated 5×)
];

// ─── KopfMensch: texts #1–50 (5 variations × 10) ────────────────────────────
const km_A: string[] = [
  "Du denkst gerne gründlich nach, bevor du handelst. Oft erkennst du Muster, die anderen entgehen. Komplexe Themen faszinieren dich mehr als einfache Antworten. Du nimmst dir häufig Zeit, um Informationen zu ordnen und einzuordnen. Oberflächliche Antworten reichen dir selten aus, weil du die Dinge wirklich verstehen möchtest. Dadurch wirkst du oft klug, reflektiert und vorausschauend.",
  "Dein Kopf ist oft mit Ideen, Fragen und Zusammenhängen beschäftigt. Du hinterfragst vieles und suchst nach dem tieferen Sinn. Du brauchst Zeit, um neue Informationen wirklich zu durchdringen. Du nimmst dir häufig Zeit, um Informationen zu ordnen und einzuordnen. Oberflächliche Antworten reichen dir selten aus, weil du die Dinge wirklich verstehen möchtest. Menschen schätzen deine Fähigkeit, Dinge differenziert zu betrachten.",
  "Du analysierst Dinge lieber selbst, statt vorschnelle Antworten zu übernehmen. Komplexe Themen faszinieren dich mehr als einfache Antworten. Bevor du eine Meinung bildest, denkst du meist mehrere Möglichkeiten durch. Du nimmst dir häufig Zeit, um Informationen zu ordnen und einzuordnen. Oberflächliche Antworten reichen dir selten aus, weil du die Dinge wirklich verstehen möchtest. Deine Stärke liegt darin, Zusammenhänge zu verstehen und zu erklären.",
  "Du liebst es, hinter die Oberfläche zu schauen. Du brauchst Zeit, um neue Informationen wirklich zu durchdringen. Oft erkennst du Muster, die anderen entgehen. Du nimmst dir häufig Zeit, um Informationen zu ordnen und einzuordnen. Oberflächliche Antworten reichen dir selten aus, weil du die Dinge wirklich verstehen möchtest. Mit deinem analytischen Denken findest du oft ungewöhnliche Lösungen.",
  "Gedanken und Überlegungen spielen in deinem Leben eine große Rolle. Bevor du eine Meinung bildest, denkst du meist mehrere Möglichkeiten durch. Du hinterfragst vieles und suchst nach dem tieferen Sinn. Du nimmst dir häufig Zeit, um Informationen zu ordnen und einzuordnen. Oberflächliche Antworten reichen dir selten aus, weil du die Dinge wirklich verstehen möchtest. Genau diese Tiefe macht deine Persönlichkeit besonders.",
];

// ─── KopfMensch: texts #51–100 (10 variations × 5) ──────────────────────────
const km_B: string[] = [
  "Du verbringst viel Zeit damit, über Ideen und Möglichkeiten nachzudenken. Dadurch erkennst du oft Muster, die anderen entgehen. Du suchst nach Logik und Klarheit. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Diese Fähigkeit macht dich zu einem starken Problemlöser.",
  "Dein Verstand sucht ständig nach Zusammenhängen und Bedeutungen. Neue Informationen vergleichst du automatisch mit deinem vorhandenen Wissen. Deine Gedanken gehen häufig in die Tiefe. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Menschen schätzen deine durchdachten Ansichten.",
  "Du möchtest Dinge wirklich verstehen und nicht nur auswendig lernen. Du prüfst verschiedene Perspektiven, bevor du zu einem Schluss kommst. Komplexe Themen schrecken dich nicht ab. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Deine Tiefe hebt dich oft von anderen ab.",
  "Gedanken sind für dich oft spannender als schnelle Aktionen. Oberflächliche Erklärungen reichen dir selten aus. Du stellst Fragen, die andere oft nicht stellen. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Du bringst Ruhe und Klarheit in schwierige Situationen.",
  "Du hinterfragst vieles, was andere einfach akzeptieren. Du suchst nach Logik und Klarheit. Manchmal denkst du länger nach als dein Umfeld. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Dadurch entwickelst du oft ungewöhnliche Ideen.",
  "Dein Kopf arbeitet oft weiter, auch wenn andere längst fertig sind. Deine Gedanken gehen häufig in die Tiefe. Du möchtest Zusammenhänge möglichst genau verstehen. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Dein analytischer Blick ist eine besondere Stärke.",
  "Du denkst gerne mehrere Schritte voraus. Komplexe Themen schrecken dich nicht ab. Dadurch erkennst du oft Muster, die anderen entgehen. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Viele vertrauen auf deine überlegten Entscheidungen.",
  "Du liebst es, komplexe Fragen auseinanderzunehmen. Du stellst Fragen, die andere oft nicht stellen. Neue Informationen vergleichst du automatisch mit deinem vorhandenen Wissen. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Du findest häufig Lösungen, die andere übersehen.",
  "Oft beschäftigst du dich mit dem Warum hinter den Dingen. Manchmal denkst du länger nach als dein Umfeld. Du prüfst verschiedene Perspektiven, bevor du zu einem Schluss kommst. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Genau das macht deine Persönlichkeit einzigartig.",
  "Du beobachtest und analysierst mehr, als andere vermuten. Du möchtest Zusammenhänge möglichst genau verstehen. Oberflächliche Erklärungen reichen dir selten aus. Du nimmst dir Zeit, Informationen zu sortieren und ihre Bedeutung zu verstehen. Dein Denken eröffnet neue Blickwinkel.",
];

// ─── KopfMensch: texts #101–150 (10 variations × 5) ─────────────────────────
const km_C: string[] = [
  "Dein Kopf ist selten wirklich still, weil ständig neue Gedanken entstehen. Dadurch erkennst du oft Verbindungen, die andere übersehen. Komplexität schreckt dich nicht ab, sondern zieht dich an. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Dadurch entwickelst du oft eine beeindruckende innere Klarheit.",
  "Du denkst gerne über Fragen nach, die andere kaum bemerken. Du hinterfragst Annahmen und suchst nach eigenen Antworten. Du liebst es, verschiedene Perspektiven miteinander zu vergleichen. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Menschen schätzen deine reflektierte Sichtweise.",
  "Du suchst nach Wahrheit statt nach einfachen Antworten. Viele deiner Gedanken beschäftigen sich mit dem großen Ganzen. Oft denkst du tiefer, als dein Umfeld erwartet. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Deine Stärke liegt im Verstehen komplexer Zusammenhänge.",
  "Gedankenexperimente faszinieren dich. Du prüfst Informationen sorgfältig, bevor du sie akzeptierst. Du versuchst Muster und Prinzipien zu erkennen. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Du bringst Tiefe in Gespräche und Entscheidungen.",
  "Du möchtest verstehen, wie die Welt wirklich funktioniert. Komplexität schreckt dich nicht ab, sondern zieht dich an. Dein Verstand sucht ständig nach Bedeutung. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Viele bewundern deine Fähigkeit, über den Tellerrand hinauszudenken.",
  "Hinter jedem Ereignis vermutest du tiefere Zusammenhänge. Du liebst es, verschiedene Perspektiven miteinander zu vergleichen. Du nimmst dir Zeit für gründliche Überlegungen. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Dein analytischer Blick hilft dir, gute Entscheidungen zu treffen.",
  "Du analysierst Situationen oft lange nach ihrem Ende. Oft denkst du tiefer, als dein Umfeld erwartet. Dadurch erkennst du oft Verbindungen, die andere übersehen. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Genau diese Nachdenklichkeit macht dich besonders.",
  "Wissen bedeutet für dich mehr als nur Fakten. Du versuchst Muster und Prinzipien zu erkennen. Du hinterfragst Annahmen und suchst nach eigenen Antworten. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Du findest oft Antworten auf Fragen, die andere gar nicht stellen.",
  "Du bist neugierig auf Ideen, Konzepte und Möglichkeiten. Dein Verstand sucht ständig nach Bedeutung. Viele deiner Gedanken beschäftigen sich mit dem großen Ganzen. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Dein Denken eröffnet neue Wege und Möglichkeiten.",
  "Dein Denken geht oft weit über das Offensichtliche hinaus. Du nimmst dir Zeit für gründliche Überlegungen. Du prüfst Informationen sorgfältig, bevor du sie akzeptierst. Du möchtest die Dinge nicht nur wissen, sondern wirklich verstehen. Diese Fähigkeit macht dich zu einem außergewöhnlichen Beobachter.",
];

// ─── KopfMensch: texts #151–200 (10 variations × 5) ─────────────────────────
const km_D: string[] = [
  "Du verbringst viel Zeit in deiner inneren Gedankenwelt. Dadurch erkennst du Muster, die anderen verborgen bleiben. Du reflektierst Erlebnisse intensiv. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Dadurch entwickelst du eine außergewöhnliche geistige Tiefe.",
  "Dein Verstand sucht ständig nach tieferen Wahrheiten. Du entwickelst eigene Sichtweisen statt Meinungen einfach zu übernehmen. Du möchtest Zusammenhänge möglichst vollständig verstehen. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Menschen schätzen deine reflektierte Art.",
  "Du möchtest die Welt nicht nur erleben, sondern verstehen. Deine Gedanken gehen häufig in die Tiefe. Oft denkst du länger über Themen nach als andere. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Deine Fähigkeit zum Nachdenken ist eine große Stärke.",
  "Viele deiner Gedanken kreisen um große Fragen des Lebens. Du suchst nach Prinzipien, die hinter Ereignissen stehen. Du vergleichst unterschiedliche Perspektiven miteinander. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Du bringst oft neue Sichtweisen in Gespräche ein.",
  "Du analysierst Situationen oft aus mehreren Blickwinkeln. Komplexe Fragen faszinieren dich. Dein Denken verbindet Logik mit Neugier. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Genau diese Tiefe macht dich einzigartig.",
  "Dein Denken geht häufig weit über das Sichtbare hinaus. Du reflektierst Erlebnisse intensiv. Dadurch erkennst du Muster, die anderen verborgen bleiben. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Du erkennst Möglichkeiten, die andere übersehen.",
  "Du hinterfragst Dinge, die andere als selbstverständlich ansehen. Du möchtest Zusammenhänge möglichst vollständig verstehen. Du entwickelst eigene Sichtweisen statt Meinungen einfach zu übernehmen. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Deine Gedanken eröffnen neue Perspektiven.",
  "Dein Kopf liebt komplexe Ideen und Zusammenhänge. Oft denkst du länger über Themen nach als andere. Deine Gedanken gehen häufig in die Tiefe. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Du findest häufig Antworten auf schwierige Fragen.",
  "Du bist auf der Suche nach Bedeutung und Erkenntnis. Du vergleichst unterschiedliche Perspektiven miteinander. Du suchst nach Prinzipien, die hinter Ereignissen stehen. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Dein analytischer Blick hilft dir, die Welt besser zu verstehen.",
  "Oft beschäftigst du dich mit dem Warum hinter dem Warum. Dein Denken verbindet Logik mit Neugier. Komplexe Fragen faszinieren dich. Du gibst dich selten mit oberflächlichen Erklärungen zufrieden und suchst nach dem tieferen Kern einer Sache. Diese Eigenschaft macht dich zu einem echten Deep Thinker.",
];

const kopfMenschTexts: string[] = [
  ...km_A, ...km_A, ...km_A, ...km_A, ...km_A, ...km_A, ...km_A, ...km_A, ...km_A, ...km_A, // #1–50 (5 vars × 10)
  ...km_B, ...km_B, ...km_B, ...km_B, ...km_B,  // #51–100 (10 vars × 5)
  ...km_C, ...km_C, ...km_C, ...km_C, ...km_C,  // #101–150 (10 vars × 5)
  ...km_D, ...km_D, ...km_D, ...km_D, ...km_D,  // #151–200 (10 vars × 5)
];

// ─── HerzensMensch: texts #1–50 + #151–200 (both identical within group) ─────
const hm_1_50 = "Du suchst echte Verbindungen statt oberflächlicher Kontakte. Menschen fühlen sich bei dir oft verstanden und angenommen. Du spürst häufig, wie es anderen geht, auch wenn sie wenig sagen. Nähe, Vertrauen und Loyalität sind für dich wichtige Werte. Du investierst viel Herz in deine Beziehungen und schenkst anderen Aufmerksamkeit. Diese Wärme macht dich zu einem echten Herzensmenschen.";
const hm_151_200 = "Du spürst schnell, wie es anderen Menschen geht, und möchtest, dass sich jeder wohlfühlt. Freundschaften bedeuten dir mehr als oberflächliche Bekanntschaften. Du bist oft die Person, die zuhört, unterstützt und andere zusammenbringt. Ehrlichkeit, Vertrauen und Loyalität sind für dich besonders wichtig. Menschen fühlen sich durch deine herzliche Art verstanden und angenommen. Genau das macht dich zu einem echten Herzensmenschen.";

// ─── HerzensMensch: texts #51–100 (10 variations × 5) ───────────────────────
const hm_B: string[] = [
  "Du baust Beziehungen lieber tief als breit auf. Andere fühlen sich bei dir oft sicher und angenommen. Menschen vertrauen dir oft ihre Gedanken an. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Dadurch wirst du oft zu einer wichtigen Bezugsperson.",
  "Echte Nähe bedeutet dir mehr als oberflächliche Aufmerksamkeit. Du hörst aufmerksam zu und urteilst nicht vorschnell. Du gibst anderen das Gefühl, wichtig zu sein. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Deine Wärme bleibt vielen Menschen lange in Erinnerung.",
  "Dein Herz reagiert stark auf die Gefühle anderer Menschen. Freundschaften haben für dich einen hohen Stellenwert. Deine Empathie hilft dir, Menschen tief zu verstehen. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Genau das macht dich zu einem echten Herzensmenschen.",
  "Du suchst nach ehrlichen und bedeutungsvollen Verbindungen. Du bemerkst häufig, wenn jemand Unterstützung braucht. Du schaffst echte Verbundenheit statt oberflächlicher Kontakte. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Menschen schätzen deine aufrichtige Art.",
  "Vertrauen ist für dich die Grundlage jeder Beziehung. Menschen vertrauen dir oft ihre Gedanken an. Loyalität ist für dich keine leere Floskel. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Dein Mitgefühl ist eine besondere Stärke.",
  "Du möchtest Menschen wirklich kennenlernen. Du gibst anderen das Gefühl, wichtig zu sein. Du denkst oft auch an das Wohl der Menschen um dich herum. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Du bringst Vertrauen und Nähe in Beziehungen.",
  "Mitgefühl gehört zu deinen größten Stärken. Deine Empathie hilft dir, Menschen tief zu verstehen. Andere fühlen sich bei dir oft sicher und angenommen. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Viele fühlen sich von deiner Ehrlichkeit angezogen.",
  "Du nimmst die emotionale Stimmung anderer oft schnell wahr. Du schaffst echte Verbundenheit statt oberflächlicher Kontakte. Du hörst aufmerksam zu und urteilst nicht vorschnell. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Deine Verbundenheit schafft tiefe Freundschaften.",
  "Für dich sind Beziehungen ein wichtiger Teil des Lebens. Loyalität ist für dich keine leere Floskel. Freundschaften haben für dich einen hohen Stellenwert. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Du gibst anderen das Gefühl, gesehen zu werden.",
  "Du schenkst Menschen Zeit, Aufmerksamkeit und Verständnis. Du denkst oft auch an das Wohl der Menschen um dich herum. Du bemerkst häufig, wenn jemand Unterstützung braucht. Du suchst nach Beziehungen, die auf Ehrlichkeit und Vertrauen beruhen. Diese Eigenschaft macht deine Persönlichkeit besonders.",
];

// ─── HerzensMensch: texts #101–150 (10 variations × 5) ──────────────────────
const hm_C: string[] = [
  "Du glaubst, dass echte Beziehungen das Leben bereichern. Dadurch entstehen oft besonders enge Verbindungen. Du gibst anderen das Gefühl, wichtig zu sein. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Dadurch wirst du oft zu einem sicheren Hafen für andere.",
  "Dein Herz sucht nach Verbundenheit und Vertrauen. Andere vertrauen dir schnell ihre Gedanken an. Deine Wärme schafft Vertrauen. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Menschen fühlen sich in deiner Gegenwart angenommen.",
  "Du möchtest Menschen auf einer tiefen Ebene verstehen. Du hörst zu, um zu verstehen, nicht um zu antworten. Du denkst häufig an das Wohl anderer Menschen. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Genau diese Tiefe macht dich besonders.",
  "Gefühle und zwischenmenschliche Nähe sind dir wichtig. Deine Empathie hilft dir, Menschen wirklich wahrzunehmen. Beziehungen haben für dich einen hohen Stellenwert. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Deine Verbundenheit hinterlässt bleibende Eindrücke.",
  "Du schätzt Ehrlichkeit mehr als oberflächlichen Erfolg. Du bemerkst oft Gefühle, die unausgesprochen bleiben. Du schaffst Nähe durch Echtheit und Verständnis. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Viele schätzen deine herzliche Art.",
  "Du investierst viel Zeit und Herz in deine Beziehungen. Du gibst anderen das Gefühl, wichtig zu sein. Dadurch entstehen oft besonders enge Verbindungen. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Du bringst Wärme und Menschlichkeit in jede Beziehung.",
  "Menschen sind für dich keine Kontakte, sondern Geschichten. Deine Wärme schafft Vertrauen. Andere vertrauen dir schnell ihre Gedanken an. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Dein Mitgefühl ist eine große Stärke.",
  "Du spürst oft, was andere bewegt. Du denkst häufig an das Wohl anderer Menschen. Du hörst zu, um zu verstehen, nicht um zu antworten. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Du schenkst anderen das Gefühl, gesehen zu werden.",
  "Freundschaft bedeutet für dich Loyalität und Zusammenhalt. Beziehungen haben für dich einen hohen Stellenwert. Deine Empathie hilft dir, Menschen wirklich wahrzunehmen. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Deine Loyalität macht dich zu einem wertvollen Freund.",
  "Du fühlst dich wohl, wenn Menschen sich öffnen können. Du schaffst Nähe durch Echtheit und Verständnis. Du bemerkst oft Gefühle, die unausgesprochen bleiben. Du suchst nach Begegnungen, die echt, ehrlich und bedeutungsvoll sind. Diese Eigenschaft macht dich zu einem echten Soulmate.",
];

const herzensMenschTexts: string[] = [
  ...Array(50).fill(hm_1_50),                    // #1–50
  ...hm_B, ...hm_B, ...hm_B, ...hm_B, ...hm_B,  // #51–100
  ...hm_C, ...hm_C, ...hm_C, ...hm_C, ...hm_C,  // #101–150
  ...Array(50).fill(hm_151_200),                 // #151–200
];

// ─── GefühlsMensch: texts #1–200 (10 variations cycling continuously) ──────
const gm_variants: string[] = [
  "der deine Gefühle tief wahrnimmst",
  "der echte Freundschaften suchst",
  "der Menschen aufmerksam beobachtest",
  "der deinem Herzen vertraust",
  "der Zeit für dich brauchst",
  "der loyal zu wichtigen Menschen bist",
  "der Ehrlichkeit schätzt",
  "der tiefe Gespräche magst",
  "der eine starke innere Welt hast",
  "der Stimmungen spürst",
];

const gefuhlsMenschTexts: string[] = Array.from({ length: 200 }, (_, i) => {
  const variant = gm_variants[i % gm_variants.length];
  return `Du bist jemand, ${variant}. Auch wenn du nach außen oft ruhig wirkst, passiert in dir sehr viel. Du nimmst Dinge persönlich und bewusst wahr und denkst oft länger darüber nach. Menschen, die dich wirklich kennen, schätzen deine ehrliche und authentische Art. Genau das macht dich zu einer echten Vibe Person.`;
});

// ─── ErlebnisMensch: texts #1–200 (10 variations cycling continuously) ──────
const em_variants: string[] = [
  "der Action und neue Erlebnisse liebst",
  "der am liebsten mitten im Geschehen bist",
  "der das Leben direkt erleben möchtest",
  "der Energie aus Aktivitäten mit anderen ziehst",
  "der gerne neue Orte und Dinge ausprobierst",
  "der spontan für Abenteuer zu haben bist",
  "der Herausforderungen suchst statt ihnen auszuweichen",
  "der das Hier und Jetzt genießt",
  "der mit deiner Energie andere mitreißt",
  "der lieber machst als lange darüber nachzudenken",
];

const erlebnisMenschTexts: string[] = Array.from({ length: 200 }, (_, i) => {
  const variant = em_variants[i % em_variants.length];
  return `Du bist jemand, ${variant}. Lange stillzusitzen ist nicht unbedingt dein Ding, denn du willst das Leben selbst erleben. Neue Eindrücke, spannende Momente und gemeinsame Erlebnisse geben dir Energie. Freunde schätzen deine offene, mutige und motivierende Art. Genau das macht dich zu einer echten Action Person.`;
});

// ─── Erfahrungsmensch: texts #1–200 (10 variations cycling continuously) ────
const efm_variants: string[] = [
  "der kleine Details bemerkst, die andere oft übersehen",
  "der deine Erlebnisse intensiv wahrnimmst",
  "der lieber beobachtest, bevor du handelst",
  "der Erinnerungen lange in deinem Herzen trägst",
  "der deinen eigenen Erfahrungen vertraust",
  "der ruhige Momente genießt",
  "der eine besondere Verbindung zu Orten und Erinnerungen hast",
  "der die Welt auf deine ganz eigene Weise wahrnimmst",
  "der lieber Qualität als Quantität suchst",
  "der Dingen eine persönliche Bedeutung gibst",
];

const erfahrungsMenschTexts: string[] = Array.from({ length: 200 }, (_, i) => {
  const variant = efm_variants[i % efm_variants.length];
  return `Du bist jemand, ${variant}. Auch wenn du eher ruhig wirkst, nimmst du vieles intensiver wahr, als andere denken. Du verlässt dich oft auf das, was du selbst erlebt und erfahren hast. Vertraute Menschen, besondere Erinnerungen und echte Momente bedeuten dir viel. Genau das macht dich zu einem echten Practitioner.`;
});

// ─── KreativMensch: texts #1–200 (10 variations cycling continuously) ───────
const krm_variants: string[] = [
  "der ständig neue Ideen im Kopf hast",
  "der überall Möglichkeiten entdeckst",
  "der gerne kreativ denkst und handelst",
  "der Menschen mit deinen Ideen begeistern kannst",
  "der neue Wege statt alte Routinen suchst",
  "der große Visionen für die Zukunft hast",
  "der gerne Dinge neu erfindest",
  "der über den Tellerrand hinausdenkst",
  "der dich von neuen Chancen inspirieren lässt",
  "der am liebsten aus einer Idee etwas Besonderes machst",
];

const kreativMenschTexts: string[] = Array.from({ length: 200 }, (_, i) => {
  const variant = krm_variants[i % krm_variants.length];
  return `Du bist jemand, ${variant}. Dein Kopf ist voller Möglichkeiten, Projekte und verrückter Einfälle. Während andere Grenzen sehen, entdeckst du oft neue Chancen und Ideen. Deine Kreativität und Neugier inspirieren die Menschen um dich herum. Genau das macht dich zu einer echten Creative Person.`;
});

// ─── VisionsMensch: texts #1–200 (10 variations cycling continuously) ───────
const vm_variants: string[] = [
  "der oft in deiner eigenen Gedankenwelt unterwegs bist",
  "der über die Zukunft nachdenkst",
  "der große Visionen und Träume hast",
  "der Zusammenhänge erkennst, die andere übersehen",
  "der dich von Ideen und Möglichkeiten faszinieren lässt",
  "der gerne über den Sinn hinter Dingen nachdenkst",
  "der eine starke Vorstellungskraft hast",
  "der dich in spannende Gedanken verlieren kannst",
  "der oft weiter denkst als andere",
  "der eine besondere Sicht auf die Welt hast",
];

const visionsMenschTexts: string[] = Array.from({ length: 200 }, (_, i) => {
  const variant = vm_variants[i % vm_variants.length];
  return `Du bist jemand, ${variant}. Viele deiner besten Ideen entstehen in ruhigen Momenten, wenn du deinen Gedanken freien Lauf lässt. Während andere sich auf das Hier und Jetzt konzentrieren, beschäftigst du dich oft mit dem, was noch möglich sein könnte. Deine Fantasie, Intuition und dein Blick für das große Ganze machen dich besonders. Genau das macht dich zu einer echten Visionary Person.`;
});

export const characterProfiles: CharacterProfile[] = [
  {
    id: "menschen_mensch",
    name: "MenschenMensch",
    englishName: "People-Powered Mind",
    description: "Gesellig, empathisch, verbindend. Blüht in sozialen Momenten auf und schafft sofort Verbindungen.",
    datingProfilePrompts: menschenMenschTexts,
  },
  {
    id: "kopf_mensch",
    name: "KopfMensch",
    englishName: "Deep Thinker",
    description: "Analytisch, reflektiert, tiefgründig. Denkt gerne, hinterfragt Dinge und sucht echte Substanz.",
    datingProfilePrompts: kopfMenschTexts,
  },
  {
    id: "herzens_mensch",
    name: "HerzensMensch",
    englishName: "Soulmate",
    description: "Liebevoll, verbunden, authentisch. Sucht tiefe emotionale Nähe und echte Seelenverwandtschaft.",
    datingProfilePrompts: herzensMenschTexts,
  },
  {
    id: "gefuhls_mensch",
    name: "GefühlsMensch",
    englishName: "Vibe",
    description: "Sensibel, stimmungsvoll, intuitiv. Lebt intensiv in Emotionen und spürt die Energie um sich herum.",
    datingProfilePrompts: gefuhlsMenschTexts,
  },
  {
    id: "erlebnis_mensch",
    name: "ErlebnisMensch",
    englishName: "Action Person",
    description: "Aktiv, spontan, abenteuerlustig. Lebt für Erlebnisse und zieht Energie aus neuen Erfahrungen.",
    datingProfilePrompts: erlebnisMenschTexts,
  },
  {
    id: "erfahrungs_mensch",
    name: "Erfahrungsmensch",
    englishName: "Practitioner",
    description: "Pragmatisch, bodenständig, erfahren. Lernt durch Tun und schätzt echte, gelebte Weisheit.",
    datingProfilePrompts: erfahrungsMenschTexts,
  },
  {
    id: "kreativ_mensch",
    name: "KreativMensch",
    englishName: "Creative Person",
    description: "Kreativ, ausdrucksstark, originell. Sieht die Welt durch eine einzigartige Linse und erschafft gerne.",
    datingProfilePrompts: kreativMenschTexts,
  },
  {
    id: "visions_mensch",
    name: "VisionsMensch",
    englishName: "Visionary Person",
    description: "Visionär, zukunftsorientiert, inspirierend. Denkt in großen Bildern und will die Welt gestalten.",
    datingProfilePrompts: visionsMenschTexts,
  },
];
