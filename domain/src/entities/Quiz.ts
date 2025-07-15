export class Quiz {
  constructor(
    public id: number,
    public lessonId: number,
    public question: string,
    public options: string[],
    public correctAnswer: string
  ) {}
}
