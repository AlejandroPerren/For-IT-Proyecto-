import { Enrollment } from "../entities/Enrollment";
import { EnrollmentRepository } from "../services/EnrollmentRepository";

export interface MockedEnrollmentRepository extends EnrollmentRepository {
  enrollments: Enrollment[];
}

export function mockEnrollmentRepository(enrollments: Enrollment[] = []): MockedEnrollmentRepository {
  return {
    enrollments,

    findByUserAndCourse: async (userId: number, courseId: number): Promise<Enrollment | null> => {
      const match = enrollments.find(e => e.userId === userId && e.courseId === courseId);
      return match ? { ...match } : null;
    },

    create: async (enrollment: Enrollment): Promise<Enrollment> => {
      const newEnrollment = { ...enrollment, id: enrollments.length + 1 };
      enrollments.push(newEnrollment);
      return newEnrollment;
    },

    updateProgress: async (userId: number, courseId: number, progress: number): Promise<void> => {
      const enrollment = enrollments.find(e => e.userId === userId && e.courseId === courseId);
      if (enrollment) enrollment.progress = progress;
    },

    approve: async (userId: number, courseId: number): Promise<void> => {
      const enrollment = enrollments.find(e => e.userId === userId && e.courseId === courseId);
      if (enrollment) enrollment.status = "approved";
    },

    getProgress: async (userId: number, courseId: number): Promise<number> => {
      const enrollment = enrollments.find(e => e.userId === userId && e.courseId === courseId);
      return enrollment ? enrollment.progress : 0;
    },

    findEnrolledUsers: async (courseId: number): Promise<Enrollment[]> => {
      return enrollments.filter(e => e.courseId === courseId).map(e => ({ ...e }));
    },
  };
}
