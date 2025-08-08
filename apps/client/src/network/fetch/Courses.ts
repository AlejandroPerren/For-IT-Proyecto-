import type { Course } from "../../interface/course.interface";
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
  const response = await apiFetch<Course[]>(
    `${summaryApi.Courses.url}all/${id}`
  );
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const createCourse = async (course: Course) => {
  const response = await apiFetch<Course>(summaryApi.Courses.url, {
    method: "POST",
    body: course,
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};
