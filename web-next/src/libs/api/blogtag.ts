import { ResponseEnum } from "@/libs/enum";
import { API_URL } from "@/libs/config";

type ReturnCountData = {
  data: number;
  success: boolean;
};

type ReturnData = {
  data: any;
  success: boolean;
};

async function Count(): Promise<ReturnCountData> {
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

async function GetData(search: string, limit: number, page: number): Promise<ReturnData> {
  try {
    const response = await fetch(`${API_URL}/blog/tags?search=${search}&limit=${limit}&page=${page}`, {
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
        data: [],
        success: false,
      };
    }
  } catch (error) {
    return {
      data: [],
      success: false,
    };
  }
}

export default {
  Count,
  GetData
};
