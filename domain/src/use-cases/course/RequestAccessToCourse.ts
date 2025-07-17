import { Enrollment } from "../../entities/Enrollment";
import { EnrollmentRepository } from "../../services/EnrollmentRepository";

export class RequestAccessToCourse {
  constructor(private enrollmentRepo: EnrollmentRepository) {}

  async execute(userId: number, courseId: number) {
    const existing = await this.enrollmentRepo.findByUserAndCourse(userId, courseId);
    if (existing) {
      throw new Error("Already requested or enrolled");
    }

    // Creamos una entidad con id temporal (0)
    const enrollment = new Enrollment(0, userId, courseId, "pending", 0);

    // El repo asignará el id real
    const created = await this.enrollmentRepo.create(enrollment);

    return created;
  }
}
