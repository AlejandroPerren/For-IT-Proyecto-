import { Course as CourseModel } from "../database/models";
import { CourseRepository } from "domain/src/services/CourseRepository";
import { Course } from "domain/src/entities/Course";

export function courseService(): CourseRepository {
  const _mapToCourse = (course: CourseModel): Course => {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      createdBy: course.createdBy,
      isPublished: course.isPublished,
    };
  };
  return {
    findById: async function (id: number): Promise<Course | null> {
      try {
        const course = await CourseModel.findByPk(id);
        return course ? _mapToCourse(course) : null;
      } catch (error) {
        throw error;
      }
    },

    createCourse: async function (courseData: Course): Promise<Course>{
        try {
            const newCourse = await CourseModel.create(courseData);
            return _mapToCourse(newCourse)
        } catch (error) {
            throw error;
        }
    }



  };
}
