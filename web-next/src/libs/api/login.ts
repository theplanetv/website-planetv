import { ResponseEnum } from "@/libs/enum";

export async function login(inputUsername: string, inputPassword: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword,
      }),
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return false;
    }

    const jsonResponse = await response.json();

    if (jsonResponse.message === ResponseEnum.LOGIN_SUCCESS) {
      console.log('Login successful:', jsonResponse.message);
      return true;
    } else {
      console.error('Login failed:', jsonResponse.message);
      return false;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
}
