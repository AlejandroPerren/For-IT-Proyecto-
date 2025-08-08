import type { Quiz } from "../../interface/quiz.interface";
import type { Section } from "../../interface/section.interface";
import { apiFetch } from "../util/FetchApi";
import summaryApi from "../util/SummaryApi";

export const QuizOfLesson = async (lessonId: number) => {
  const response = await apiFetch<Section[]>(
    `${summaryApi.Section.url}lessons/${lessonId}`,
    {
      token: localStorage.getItem("token"),
    }
  );
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const createQuiz = async (quiz: Quiz) => {
  const response = await apiFetch<Quiz>(summaryApi.Quiz.url, {
    method: "POST",
    body: quiz,
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al Crear la Pregunta");
  }
  return response.data;
};