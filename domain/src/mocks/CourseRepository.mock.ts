import { Course } from "../entities/Course";
import { CourseRepository } from "../services/CourseRepository";

export interface MockedCourseRepository extends CourseRepository {
  courses: Course[];
}

export function mockCourseRepository(courses: Course[] = []): MockedCourseRepository {
  return {
    courses,

    createCourse: async (course: Course): Promise<Course> => {
      const newCourse = { ...course, id: courses.length + 1 };
      courses.push(newCourse);
      return newCourse;
    },

    findById: async (id: number): Promise<Course | null> => {
      const course = courses.find(c => c.id === id);
      return course ? { ...course } : null;
    },
  }
}
