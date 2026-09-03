import { characterProfiles } from '../src/data/character_profiles';
import { questionsPool } from '../src/data/questions_pool';

// Mocking the scoring logic
function calculateScores(answers: Record<string, number>) {
  const scores: Record<string, number> = {};
  characterProfiles.forEach(p => scores[p.id] = 0);

  Object.entries(answers).forEach(([qId, val]) => {
    const q = questionsPool.find(q => q.id === qId);
    if (q) scores[q.characterTypeId] += val;
  });
  return scores;
}

function simulateRandomAnswers() {
  const answers: Record<string, number> = {};
  questionsPool.forEach(q => {
    answers[q.id] = Math.floor(Math.random() * 5) + 1;
  });
  return answers;
}

function findTop3(scores: Record<string, number>) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);
}

// Running simulation
const stats: Record<string, number> = {};
characterProfiles.forEach(p => stats[p.id] = 0);

console.log("Starting distribution simulation (1000 runs)...");
for (let i = 0; i < 1000; i++) {
  const answers = simulateRandomAnswers();
  const scores = calculateScores(answers);
  const top = findTop3(scores)[0]; // Simulating highest score for now
  stats[top]++;
}

console.log("\nResults (Frequency of top scorer):");
console.table(stats);

const total = 1000;
Object.entries(stats).forEach(([id, count]) => {
  console.log(`${id}: ${(count / total * 100).toFixed(1)}%`);
});
