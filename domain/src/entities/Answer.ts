export class Answer {
  constructor(
    public id: number,
    public userId: number,
    public quizId: number,
    public selectedAnswer: string,
    public isCorrect: boolean
  ) {}
}
