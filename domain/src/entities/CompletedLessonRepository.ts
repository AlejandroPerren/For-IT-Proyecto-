export class CompletedLesson {
  constructor(
    public userId: number,
    public lessonId: number,
    public completedAt: Date
  ) {}
}
