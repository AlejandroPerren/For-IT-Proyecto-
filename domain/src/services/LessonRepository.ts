import { Lesson } from '../entities/Lesson';

export interface LessonRepository {
  createLesson(lesson: Lesson): Promise<Lesson>;
  findBySectionId(sectionId: number): Promise<Lesson[]>;
  findById(id: number): Promise<Lesson | null>;
  countByCourse(courseId: number): Promise<number>;
}

