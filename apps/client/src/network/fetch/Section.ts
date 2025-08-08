import type { Section } from "../../interface/section.interface";
import { apiFetch } from "../util/FetchApi";
import summaryApi from "../util/SummaryApi";



export const sectionOfCourse = async (courseId: number) => {
  const response = await apiFetch<Section[]>(`${summaryApi.Section.url}${courseId}`, {
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const createSection = async (section: Section) => {
  const response = await apiFetch<Section>(summaryApi.Section.url, {
    method: "POST",
    body: section,
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al Crear la Seccion");
  }
  return response.data;
};
