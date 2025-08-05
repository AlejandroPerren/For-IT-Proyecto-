export type EnrollmentStatus = "pending" | "approved";

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: EnrollmentStatus;
  progress: number;
}
