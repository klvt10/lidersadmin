import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";

import { signOut } from "@/contexts/AuthContext";

export const Api = axios.create({
  baseURL: "https://api.lidersclub.com.br/v2",
  headers: {
    Authorization: `Bearer ${parseCookies()["lidersclubadmin.token"]}`,
  },
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      signOut();
    } else {
      return Promise.reject(error);
    }
  }
);
