import { Enrollment } from "../../entities/Enrollment";
import { EnrollmentRepository } from "../../services/EnrollmentRepository";

export class RequestAccessToCourse {
  constructor(private enrollmentRepo: EnrollmentRepository) {}

  async execute(userId: number, courseId: number) {
    const existing = await this.enrollmentRepo.findByUserAndCourse(userId, courseId);
    if (existing) throw new Error("Already requested or enrolled");

    const enrollment = new Enrollment(0, userId, courseId, 'pending', 0);
    return this.enrollmentRepo.create(enrollment);
  }
}
