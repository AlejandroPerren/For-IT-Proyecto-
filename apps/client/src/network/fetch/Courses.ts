import type { Course } from "../../interface/course.interface";
import type { Lesson } from "../../interface/lesson.interface";
import type { Section } from "../../interface/section.interface";
import { apiFetch } from "../util/FetchApi";
import summaryApi from "../util/SummaryApi";

export const listOfCourses = async () => {
  const response = await apiFetch<Course[]>(summaryApi.Courses.url);
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const listOfCoursesWhitIdUser = async (id: number) => {
  const response = await apiFetch<Course[]>(`${summaryApi.Courses.url}all/${id}`);
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const sectionOfCourse = async (courseId: number) => {
  const response = await apiFetch<Section[]>(`${summaryApi.Section.url}${courseId}`, {
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const LessonOfSection = async (sectionId: number) => {
  const response = await apiFetch<Lesson[]>(`${summaryApi.Lesson.url}section/${sectionId}`, {
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const EnrollmentOfUser_Course = async (userId: number, courseId: number) => {
  const response = await apiFetch<Section[]>(`${summaryApi.Enrollment.url}${userId}/${courseId}`, {
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const QuizOfLesson = async (lessonId: number) => {
  const response = await apiFetch<Section[]>(`${summaryApi.Section.url}lessons/${lessonId}`, {
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};
