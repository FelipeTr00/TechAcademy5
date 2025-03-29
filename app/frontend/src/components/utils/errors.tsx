import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Erro ao fazer login";
  }
  return "Erro desconhecido";
};
