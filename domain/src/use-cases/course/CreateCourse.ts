import { Course } from "../../entities/Course";
import { CourseRepository } from "../../services/CourseRepository";

export class CreateCourse {
  constructor(private courseRepo: CourseRepository) {}

  async execute(title: string, description: string, createdBy: number) {
    if (!title || title.trim() === "") throw new Error("Title is required");
    if (!description || description.trim() === "") throw new Error("Description is required");

    const course = new Course(0, title, description, createdBy, false);
    return this.courseRepo.create(course);
  }
}
