
export interface CompletedLessonRepository {
  markAsCompleted(userId: number, lessonId: number): Promise<void>;
  hasCompleted(userId: number, lessonId: number): Promise<boolean>;
  countCompletedLessons(userId: number, courseId: number): Promise<number>;
}
