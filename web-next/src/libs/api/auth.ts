import { ResponseEnum } from "@/libs/enum";
import { API_URL } from "@/libs/config";

export async function login(inputUsername: string, inputPassword: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      return false;
    }

    const jsonResponse = await response.json();

    if (jsonResponse.message === ResponseEnum.LOGIN_SUCCESS) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function verify(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return false;
    }

    const jsonResponse = await response.json();

    if (jsonResponse.message === ResponseEnum.AUTH_SUCCESS) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}