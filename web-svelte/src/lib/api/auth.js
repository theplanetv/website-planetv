import { env } from "$env/dynamic/public";

const baseUrl = env.PUBLIC_SVELTE_API_BASE_URL;

/**
 * 
 * @returns {Promise}
 */
export async function CheckLogin() {
  try {
    const authResponse = await fetch(`${baseUrl}/api/auth/verify`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!authResponse.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise}
 */
export async function Login(username, password) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('An error occurred during login:', error);
    return false;
  }
}