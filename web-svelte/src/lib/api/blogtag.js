import { env } from "$env/dynamic/public";

const baseUrl = env.PUBLIC_SVELTE_API_BASE_URL;

/**
 * 
 * @param {string} option 
 * @param {string} search 
 * @returns {Promise}
 */
export async function GetCount(option, search) {
  try {
    const countResponse = await fetch(`${baseUrl}/api/${option}/count?search=${search}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!countResponse.ok) {
      const errorData = await countResponse.json();
      return errorData;
    }

    const countResult = await countResponse.json();
    return countResult.data;
  } catch (error) {
    return {};
  }
}

/**
 * 
 * @param {string} option 
 * @param {string} search 
 * @param {number} limit 
 * @param {number} page 
 * @returns {Promise}
 */
export async function GetData(option, search, limit, page) {
  try {
    const dataResponse = await fetch(`${baseUrl}/api/${option}?search=${search}&limit=${limit}&page=${page}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!dataResponse.ok) {
      const errorData = await dataResponse.json();
      return errorData;
    }

    const dataResult = await dataResponse.json();
    return dataResult.data;
  } catch (error) {
    return {};
  }
}