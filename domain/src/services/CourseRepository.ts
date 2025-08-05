import { Course } from '../entities/Course';

export interface CourseRepository {
  createCourse(course: Course): Promise<Course>;
  findById(id: number): Promise<Course | null>;
  findAllCourses(): Promise<Course[] | null>;
}
