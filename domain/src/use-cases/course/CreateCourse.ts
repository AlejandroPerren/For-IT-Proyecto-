import { Course } from "../../entities/Course";
import { CourseRepository } from "../../services/CourseRepository";

export interface CreateCourseDependencies {
  courseRepo: CourseRepository;
}

export interface CreateCourseInput {
  title: string;
  description: string;
  createdBy: number;
}

export async function CreateCourse(
  { courseRepo }: CreateCourseDependencies,
  { title, description, createdBy }: CreateCourseInput
): Promise<Course> {
  if (!title || title.trim() === "") {
    throw new Error("Title is required");
  }

  if (!description || description.trim() === "") {
    throw new Error("Description is required");
  }

  const course: Course = {
    id: 0, 
    title,
    description,
    createdBy,
    isPublished: false,
  };

  return courseRepo.create(course);
}
