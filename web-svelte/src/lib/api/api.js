import { env } from "$env/dynamic/public";
import { HandleJSON } from "./utils.js";

const baseUrl = env.PUBLIC_SVELTE_API_BASE_URL;

/**
 * 
 * @param {string} option 
 * @param {string} search 
 * @returns {Promise}
 */
async function GetCount(activeOption, search) {
  try {
    const countResponse = await fetch(`${baseUrl}/api/${activeOption}/count?search=${search}`, {
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
async function GetData(activeOption, search, limit, page) {
  try {
    const dataResponse = await fetch(`${baseUrl}/api/${activeOption}?search=${search}&limit=${limit}&page=${page}`, {
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

/**
 * 
 * @param {any} input
 * @returns {Promise}
 */
async function Create(activeOption, input) {
  try {
    const dataResponse = await fetch(`${baseUrl}/api/${activeOption}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: HandleJSON(activeOption, input),
    });

    if (!dataResponse.ok) {
      const errorData = await dataResponse.json();
      return errorData;
    }

    const dataResult = await dataResponse.json();
    return dataResult;
  } catch (error) {
    return {};
  }
}

/**
 * 
 * @param {any} input
 * @returns {Promise}
 */
async function Update(activeOption, input) {
  try {
    const dataResponse = await fetch(`${baseUrl}/api/${activeOption}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: HandleJSON(activeOption, input),
    });

    if (!dataResponse.ok) {
      const errorData = await dataResponse.json();
      return errorData;
    }

    const dataResult = await dataResponse.json();
    return dataResult;
  } catch (error) {
    return {};
  }
}

/**
 * 
 * @param {any} input 
 * @returns 
 */
async function Remove(activeOption, input) {
  try {
    const dataResponse = await fetch(`${baseUrl}/api/${activeOption}/${input.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!dataResponse.ok) {
      const errorData = await dataResponse.json();
      return errorData;
    }

    const dataResult = await dataResponse.json();
    return dataResult;
  } catch (error) {
    return {};
  }
}

export default {
  GetCount,
  GetData,
  Create,
  Update,
  Remove
}