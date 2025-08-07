import type { User } from "../../interface/user.interface";
import type { TUser } from "../../types/auth.types";
import { apiFetch } from "../util/FetchApi";
import summaryApi from "../util/SummaryApi";

export const listOfUsers = async () => {
  const response = await apiFetch<User[]>(summaryApi.Users.url, {
    token: localStorage.getItem("token"),
  });
  console.log(localStorage.getItem("token"))
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener los Usuarios");
  }
  return response.data;
};

export const userDataByEmail = async (email: string) => {
  const response = await apiFetch<User[]>(`${summaryApi.Users.url}${email}`, {
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener el Usuario");
  }
  return response.data;
};

export const userDataById = async (id: number) => {
  const response = await apiFetch<User[]>(`${summaryApi.Users.url}${id}`, {
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener el Usuario");
  }
  return response.data;
};

export const deleteUSer = async (id: number) => {
  const response = await apiFetch<User[]>(`${summaryApi.Users.url}${id}`, {
    method: "DELETE",
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al Borrar el Usuario");
  }
  return response.data;
};

export const updateUser = async (id: number, userData: TUser) => {
  const response = await apiFetch<User[]>(`${summaryApi.Users.url}${id}`, {
    method: "PUT",
    body: userData,
    token: localStorage.getItem("token"),
  });
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al Actualizar el Usuario");
  }
  return response.data;
};
