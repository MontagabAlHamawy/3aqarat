import axios from "axios";
import apiUrl from "./apiConfig";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import NotFound from "@/app/not-found";
import { cache } from "react";

export function SaveToken(token: string) {
  Cookies.set("authToken", token, { expires: 5 });
};
export function SaveRefreshToken(token: string) {
  Cookies.set("refreshToken", token, { expires: 10 });
};

export function GetToken(): string | undefined {
  if (Cookies.get("authToken") === undefined && Cookies.get("refreshToken") !== undefined) {
    RefreshToken();
    GetToken();
  } else {
    return Cookies.get("authToken");
  }
}
export function GetRefreshToken(): string | undefined {
  return Cookies.get("refreshToken");
}

export async function RefreshToken() {
  let token = GetRefreshToken()
  const response = await axios.post(`${apiUrl}/auth/jwt/refresh/`, {
    refresh: `${token}`
  });
  console.log("response=", response);
  if (response.status === 404) {
    return notFound()
  }
  SaveToken(response.data.access);
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
  SaveRefreshToken(response.data?.refresh);
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
  SaveRefreshToken(response.data?.refresh);
}
export async function ResetPassword(new_password: string | null, current_password: string | null) {
  let token = GetToken();
  const response = await axios.post(`${apiUrl}/auth/users/set_password/`, {
    new_password,
    current_password
  }, {
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 404) {
    return notFound()
  }
}

export async function BuildingApi(page: any) {
  const response = await fetch(`${apiUrl}/properties/?page=${page}`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function ApartmentsApi(page: any) {
  const response = await fetch(`${apiUrl}/apartments/?page=${page}`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function BBuildingsApi(page: any) {
  const response = await fetch(`${apiUrl}/buildings/?page=${page}`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function CommercialApi(page: any) {
  const response = await fetch(`${apiUrl}/commercial-properties/?page=${page}`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function HousesApi(page: any) {
  const response = await fetch(`${apiUrl}/houses/?page=${page}`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function LandApi(page: any) {
  const response = await fetch(`${apiUrl}/lands/?page=${page}`);
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
    return NotFound()
  }
  return response.json();
}

export async function userProfile(username: any) {

  const response = await axios.get(`${apiUrl}/profile/${username}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 404) {
    return notFound();
  }
  return response.data;
}
export async function userInfo() {
  let token = GetToken();
  const response = await axios.get(`${apiUrl}/auth/users/me/`, {
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 404) {
    RefreshToken();
    return notFound();
  }
  return response.data;
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
      RefreshToken();
      return notFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}
export async function userBuilding(username: any) {
  try {
    const response = await axios.get(`${apiUrl}/profile/${username}/properties`);
    if (response.status === 404) {

      return NotFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}
export async function userBuildingLimit(data: any) {

  try {
    const response = await axios.get(`${apiUrl}/profile/${data.username}/properties/?limit=${data.limit}`);
    if (response.status === 404) {
      return notFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
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
      RefreshToken();
      return notFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}
export async function DeletMyAccount(current_password: any) {
  let token = GetToken();
  try {
    const response = await axios.delete(`${apiUrl}/auth/users/me`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      },
      data: { current_password }
    });
    if (response.status === 404) {
      RefreshToken();
      return notFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
}

export async function ApiCities() {
  const response = await fetch(`${apiUrl}/cities/`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}
export async function ApiOfferTypes() {
  const response = await fetch(`${apiUrl}/offer-types/`);
  if (response.status === 404) {
    return notFound()
  }
  return response.json();
}


export async function ApiSearch(search: any) {
  const response = await fetch(`${apiUrl}/properties/?search=${search}`, { cache: 'no-store' });

  if (response.status === 404) {
    return NotFound();
  }
  return response.json();
}
export async function ApiSearch2(search: any, offer: any, limit: any) {
  const response = await fetch(`${apiUrl}/properties/?search=${search}&offer=${offer}&limit=${limit}`);

  if (response.status === 404) {
    return NotFound();
  }
  return response.json();
}
export async function ApiApartmentSearch(search: any, offer: any, limit: any) {
  const response = await fetch(`${apiUrl}/apartments/?search=${search}&property__offer=${offer}&limit=${limit}`);

  if (response.status === 404) {
    return NotFound();
  }
  return response.json();
}
export async function ApiBuildingSearch(search: any, offer: any, limit: any) {
  const response = await fetch(`${apiUrl}/buildings/?search=${search}&property__offer=${offer}&limit=${limit}`);

  if (response.status === 404) {
    return NotFound();
  }
  return response.json();
}
export async function ApiCommercialSearch(search: any, offer: any, limit: any) {
  const response = await fetch(`${apiUrl}/commercial-properties/?search=${search}&property__offer=${offer}&limit=${limit}`);

  if (response.status === 404) {
    return NotFound();
  }
  return response.json();
}
export async function ApiHouseSearch(search: any, offer: any, limit: any) {
  const response = await fetch(`${apiUrl}/houses/?search=${search}&property__offer=${offer}&limit=${limit}`);

  if (response.status === 404) {
    return NotFound();
  }
  return response.json();
}
export async function ApilandSearch(search: any, offer: any, limit: any) {
  const response = await fetch(`${apiUrl}/lands/?search=${search}&property__offer=${offer}&limit=${limit}`);

  if (response.status === 404) {
    return NotFound();
  }
  return response.json();
}
export async function DeletBuilding(id: any) {
  let token = GetToken();
  try {
    const response = await axios.delete(`${apiUrl}/properties/${id}/`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 404) {
      RefreshToken();
      return notFound();
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting Building:', error);
    throw error;
  }
}
