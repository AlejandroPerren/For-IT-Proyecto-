import type { Enrollment } from "../../interface/enrollment.interface";
import { apiFetch } from "../util/FetchApi";
import summaryApi from "../util/SummaryApi";

export interface EnrollmentWithEmail extends Enrollment {
  email: string;
}

export const createEnrollment = async (userId: number, courseId: number) => {
  const response = await apiFetch<Enrollment>(summaryApi.Enrollment.url, {
    method: "POST",
    body: {
      userId: userId,
      courseId: courseId,
    },
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  return response.data;
};

export const ListUsersForCourse = async (courseId: number) => {
  const response = await apiFetch<EnrollmentWithEmail[]>(
    `${summaryApi.Enrollment.url}course/users/${courseId}`
  );
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener Usuarios");
  }
  return response.data;
};

export const approveEnrollment = async (userId: number, courseId: number) => {
  const response = await apiFetch(
    `${summaryApi.Enrollment.url}${userId}/${courseId}/approve`,
    {
      method: "PUT",
      token: localStorage.getItem("token"),
    }
  );
  if (!response.ok) {
    throw new Error(response.error ?? "Error al aprobar inscripción");
  }
  return response.data;
};
