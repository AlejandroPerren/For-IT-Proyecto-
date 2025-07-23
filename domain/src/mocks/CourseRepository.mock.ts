import { Course } from "../entities/Course";
import { CourseRepository } from "../services/CourseRepository";

export interface MockedCourseRepository extends CourseRepository {
  courses: Course[];
}

export function mockCourseRepository(courses: Course[] = []): MockedCourseRepository {
  return {
    courses,

    create: async (course: Course): Promise<Course> => {
      const newCourse = { ...course, id: courses.length + 1 };
      courses.push(newCourse);
      return newCourse;
    },

    findById: async (id: number): Promise<Course | null> => {
      const course = courses.find(c => c.id === id);
      return course ? { ...course } : null;
    },

    findPublished: async (): Promise<Course[]> => {
      return courses.filter(c => c.isPublished).map(c => ({ ...c }));
    },

    findByUserId: async (userId: number): Promise<Course[]> => {
      return courses.filter(c => c.createdBy === userId).map(c => ({ ...c }));
    },

    publishCourse: async (id: number): Promise<void> => {
      const course = courses.find(c => c.id === id);
      if (course) course.isPublished = true;
    },
  };
}
