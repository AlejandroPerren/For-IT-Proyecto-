import type { TLogin, TRegister } from "../../types/auth.types";
import { apiFetch } from "../util/FetchApi";
import summaryApi from "../util/SummaryApi";

type TAuthResponse = {
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
};

export const Login = async (data: TLogin) => {
  const response = await apiFetch<TAuthResponse>(
    `${summaryApi.Users.url}login`,
    {
      method: "POST",
      body: data,
    }
  );
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  const { user, token } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};


export const SignUp = async (data: TRegister) => {
  const response = await apiFetch<TAuthResponse>(
    `${summaryApi.Users.url}`,
    {
      method: "POST",
      body: data,
    }
  );
  if (!response.ok || !response.data) {
    throw new Error(response.error ?? "Error al obtener cursos");
  }
  const { user, token } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};
