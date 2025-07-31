import { Lesson } from "../entities/Lesson";
import { LessonRepository } from "../services/LessonRepository";

export interface MockedLessonRepository extends LessonRepository {
  lessons: Lesson[];
}

export function mockLessonRepository(
  lessons: Lesson[] = []
): MockedLessonRepository {
  return {
    lessons,

    createLesson: async (lesson: Lesson): Promise<Lesson> => {
      const newLesson = { ...lesson, id: lessons.length + 1 };
      lessons.push(newLesson);
      return newLesson;
    },

    findBySectionId: async (sectionId: number): Promise<Lesson[]> => {
      return lessons
        .filter((l) => l.sectionId === sectionId)
        .map((l) => ({ ...l }));
    },

    findById: async (id: number): Promise<Lesson | null> => {
      const lesson = lessons.find((l) => l.id === id);
      return lesson ? { ...lesson } : null;
    },

    countByCourse: async (courseId: number): Promise<number> => {
      return lessons.filter((l) => (l as any).courseId === courseId).length;
    },
  };
}
