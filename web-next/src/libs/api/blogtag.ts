import { ResponseEnum } from "@/libs/enum";
import { API_URL } from "@/libs/config";

type ReturnData = {
  data: number;
  success: boolean;
};

async function count(): Promise<ReturnData> {
  try {
    const response = await fetch(`${API_URL}/blog/tags/count?search=`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return {
        data: 0,
        success: false,
      };
    }

    const jsonResponse = await response.json();

    if (jsonResponse.message === ResponseEnum.GET_DATA_SUCCESS) {
      return {
        data: jsonResponse.data,
        success: true,
      };
    } else {
      return {
        data: 0,
        success: false,
      };
    }
  } catch (error) {
    return {
      data: 0,
      success: false,
    };
  }
}

export default {
  count,
};
