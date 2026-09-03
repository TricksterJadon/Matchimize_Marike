import { NextResponse } from 'next/server';
import { questionsPool } from '@/data/questions_pool';

// Helper to shuffle an array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export async function GET() {
  // Group questions by characterTypeId
  const questionsByType: Record<string, typeof questionsPool> = {};

  questionsPool.forEach(q => {
    if (!questionsByType[q.characterTypeId]) {
      questionsByType[q.characterTypeId] = [];
    }
    questionsByType[q.characterTypeId].push(q);
  });

  // Select 5 random questions from each type
  let selectedQuestions: typeof questionsPool = [];

  Object.keys(questionsByType).forEach(typeId => {
    const shuffled = shuffleArray(questionsByType[typeId]);
    const selected = shuffled.slice(0, 5);
    selectedQuestions = [...selectedQuestions, ...selected];
  });

  // Shuffle the final list of 40 questions so types are mixed
  const finalQuestions = shuffleArray(selectedQuestions);

  return NextResponse.json(finalQuestions);
}
