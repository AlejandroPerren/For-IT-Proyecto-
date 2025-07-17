import { Lesson } from '../entities/Lesson';

export interface LessonRepository {
  create(lesson: Lesson): Promise<Lesson>;
  findBySectionId(sectionId: number): Promise<Lesson[]>;
  findByCourseId(courseId: number): Promise<Lesson[]>;
  findById(id: number): Promise<Lesson | null>;
  countByCourse(courseId: number): Promise<number>;
}

