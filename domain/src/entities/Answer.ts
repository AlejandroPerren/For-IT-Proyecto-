export interface Answer {
  id: number;
  userId: number;
  quizId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}
