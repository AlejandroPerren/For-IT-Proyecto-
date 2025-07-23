export interface Quiz {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctAnswer: string;
}
