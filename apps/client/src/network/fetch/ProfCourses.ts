import type { Course } from "../../interface/course.interface";
import { apiFetch } from "../util/FetchApi";
import summaryApi from "../util/SummaryApi";

export const myListCourses = async (id: number) => {
  const response = await apiFetch<Course[]>(
    `${summaryApi.Courses.url}createdBy/${id}`,
    {
      token: localStorage.getItem("token"),
    }
  );
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};
