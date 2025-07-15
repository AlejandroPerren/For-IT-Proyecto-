export type EnrollmentStatus = 'pending' | 'approved';

export class Enrollment {
  constructor(
    public id: number,
    public userId: number,
    public courseId: number,
    public status: EnrollmentStatus,
    public progress: number
  ) {}
}
