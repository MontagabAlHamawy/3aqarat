import axios from "axios";
import apiUrl from "./apiConfig";
import Cookies from "js-cookie";
// import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import { notFound } from "next/navigation";

export function SaveToken(token: string) {
  Cookies.set("authToken", token, { expires: 30 }); // تخزين التوكن في الكوكيز لمدة 7 أيام
};


export async function LoginApi(username: string | null, email: string | null, password: any) {
  const response = await axios.post(`${apiUrl}/auth/jwt/create/`, {
    username,
    email,
    password,
  });
  if (response.status === 404) {
    return notFound()
  }
  SaveToken(response.data?.access);
}

export async function SignUpApi(email: string, first_name: string, last_name: string, username: string, password: string) {
  const response = await axios.post(`${apiUrl}/auth/users/`, {
    email,
    first_name,
    last_name,
    username,
    password,
  });
  if (response.status === 404) {
    return notFound()
  }
  SaveToken(response.data?.access);
}

export async function BuildingApi(page: any) {
  const response = await fetch(`${apiUrl}/properties/?page=${page}`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function LimitBuildingApi(limit: any) {
  const response = await fetch(`${apiUrl}/properties/?limit=${limit}`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}

export async function SingelBuildingApi(page: any) {
  const response = await fetch(`${apiUrl}/properties/${page}`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}