import { Enrollment as EnrollmentModel } from "../database/models";
import { User as UserModel } from "../database/models";
import { EnrollmentRepository } from "domain/src/services/EnrollmentRepository";
import { Enrollment } from "domain/src/entities/Enrollment";

export function enrollmentService(): EnrollmentRepository {
  const _mapToEnrollment = (enrollment: EnrollmentModel): Enrollment => {
    return {
      id: enrollment.id,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      status: enrollment.status,
      progress: enrollment.progress,
    };
  };

  return {
    async createEnrollment(enrollmentData: Enrollment): Promise<Enrollment> {
      const newEnrollment = await EnrollmentModel.create({
        ...enrollmentData,
        status: "pending",
        progress: 0,
      });
      return _mapToEnrollment(newEnrollment);
    },

    async findByUserAndCourse(
      userId: number,
      courseId: number
    ): Promise<Enrollment | null> {
      const enrollment = await EnrollmentModel.findOne({
        where: { userId, courseId },
      });
      return enrollment ? _mapToEnrollment(enrollment) : null;
    },

    async updateProgress(
      userId: number,
      courseId: number,
      progress: number
    ): Promise<void> {
      await EnrollmentModel.update(
        { progress },
        { where: { userId, courseId } }
      );
    },

    async approve(userId: number, courseId: number): Promise<void> {
      await EnrollmentModel.update(
        { status: "approved" },
        { where: { userId, courseId } }
      );
    },

    async getProgress(userId: number, courseId: number): Promise<number> {
      const enrollment = await EnrollmentModel.findOne({
        where: { userId, courseId },
        attributes: ["progress"],
      });
      return enrollment ? enrollment.progress : 0;
    },

    async findEnrolledUsers(courseId: number): Promise<Enrollment[]> {
      const enrollments = await EnrollmentModel.findAll({
        where: { courseId },
        include: [{ model: UserModel, as: "user" }],
      });

      return enrollments.map(_mapToEnrollment);
    },
  };
}
