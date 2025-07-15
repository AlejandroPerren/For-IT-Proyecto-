import { Course } from '../entities/Course';

export interface CourseRepository {
  create(course: Course): Promise<Course>;
  findById(id: number): Promise<Course | null>;
  findPublished(): Promise<Course[]>;
  findByUserId(userId: number): Promise<Course[]>;
  publishCourse(id: number): Promise<void>;
}
