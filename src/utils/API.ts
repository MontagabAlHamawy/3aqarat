import axios from "axios";
import apiUrl from "./apiConfig";
import Cookies from "js-cookie";
// import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import { notFound } from "next/navigation";

export function SaveToken(token: string) {
  Cookies.set("authToken", token, { expires: 30 }); // تخزين التوكن في الكوكيز لمدة 7 أيام
};

export function GetToken(): string | undefined {
  return Cookies.get("authToken");
}

export function SaveUsername(username: string) {
  Cookies.set("username", username);
};
export function GetUsername(): string | undefined {
  return Cookies.get("username");
}

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
export async function ApartmentsApi() {
  const response = await fetch(`${apiUrl}/apartments/`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function BBuildingsApi() {
  const response = await fetch(`${apiUrl}/buildings/`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function CommercialApi() {
  const response = await fetch(`${apiUrl}/commercial-properties/`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function HousesApi() {
  const response = await fetch(`${apiUrl}/houses/`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function LandApi() {
  const response = await fetch(`${apiUrl}/lands/`);
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
export async function MyProfile() {
  let token = GetToken();
  try {
    const response = await axios.get(`${apiUrl}/profile/me`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 404) {
      return notFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}
export async function userProfile(username:any) {
  let token = GetToken();
  try {
    const response = await axios.get(`${apiUrl}/profile/${username}`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 404) {
      return notFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}
export async function MyBuilding() {
  let token = GetToken();
  try {
    const response = await axios.get(`${apiUrl}/properties/me`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 404) {
      return notFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}