import type { Lesson } from "../../interface/lesson.interface";
import { apiFetch } from "../util/FetchApi";
import summaryApi from "../util/SummaryApi";



export const LessonOfSection = async (sectionId: number) => {
  const response = await apiFetch<Lesson[]>(`${summaryApi.Lesson.url}section/${sectionId}`, {
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const createLesson = async (lesson: Lesson) => {
  const response = await apiFetch<Lesson>(summaryApi.Lesson.url, {
    method: "POST",
    body: lesson,
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al Crear la Leccion");
  }
  return response.data;
};