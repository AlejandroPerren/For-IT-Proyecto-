
import { CompletedLesson } from "../entities/CompletedLessonRepository";
import { CompletedLessonRepository } from "../services/CompleteLesson";

export interface MockedCompletedLessonRepository extends CompletedLessonRepository {
  completed: CompletedLesson[];
}

export function mockCompletedLessonRepository(completed: CompletedLesson[] = []): MockedCompletedLessonRepository {
  return {
    completed,
    hasCompleted: async (userId: number, lessonId: number): Promise<boolean> => {
      return completed.some(cl => cl.userId === userId && cl.lessonId === lessonId);
    },
    markAsCompleted: async (userId: number, lessonId: number): Promise<void> => {
      completed.push({ userId, lessonId, completedAt: new Date() });
    },
    countCompletedLessons: async (userId: number, courseId: number): Promise<number> => {
      return completed.filter(cl => cl.userId === userId && cl.lessonId && cl.completedAt).length;
    },
  };
}
