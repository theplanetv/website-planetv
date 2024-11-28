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