import axios from "axios";
import apiUrl from "./apiConfig";
import Cookies from "js-cookie";

export function SaveToken(token: string) {
  console.log(token);

  Cookies.set("authToken", token, { expires: 30 }); // تخزين التوكن في الكوكيز لمدة 7 أيام
};


export async function LoginApi(username: string | null, email: string | null, password: any) {
  const response = await axios.post(`${apiUrl}/auth/jwt/create/`, {
    username,
    email,
    password,
  });
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
  SaveToken(response.data?.access);
}

export async function BuildingApi(page: any) {
  const response = await fetch(`${apiUrl}/properties/?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function SingelBuildingApi(page: any) {
  const response = await fetch(`${apiUrl}/properties/${page}`);
  
  return response.json();
}