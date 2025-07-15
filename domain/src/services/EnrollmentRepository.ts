import { Enrollment } from '../entities/Enrollment';

export interface EnrollmentRepository {
  create(enrollment: Enrollment): Promise<Enrollment>;
  findByUserAndCourse(userId: number, courseId: number): Promise<Enrollment | null>;
  approve(userId: number, courseId: number): Promise<void>;
  updateProgress(userId: number, courseId: number, progress: number): Promise<void>;
  getProgress(userId: number, courseId: number): Promise<number>;
  findEnrolledUsers(courseId: number): Promise<Enrollment[]>;
}
