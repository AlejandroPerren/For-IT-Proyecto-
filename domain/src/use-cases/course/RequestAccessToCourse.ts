import { Enrollment } from "../../entities/Enrollment";
import { EnrollmentRepository } from "../../services/EnrollmentRepository";

export interface RequestAccessDependencies {
  enrollmentRepo: EnrollmentRepository;
}

export interface RequestAccessInput {
  userId: number;
  courseId: number;
}

export async function RequestAccessToCourse(
  { enrollmentRepo }: RequestAccessDependencies,
  { userId, courseId }: RequestAccessInput
): Promise<Enrollment> {
  const existing = await enrollmentRepo.findByUserAndCourse(userId, courseId);
  if (existing) {
    throw new Error("Already requested or enrolled");
  }

  const enrollment: Enrollment = {
    id: 0,
    userId,
    courseId,
    status: "pending",
    progress: 0,
  };

  return enrollmentRepo.createEnrollment(enrollment);
}
