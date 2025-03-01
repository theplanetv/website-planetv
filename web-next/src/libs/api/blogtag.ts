import { ResponseEnum } from "@/libs/enum";
import { API_URL } from "@/libs/config";
import { BlogTag } from "@/libs/types";

type ReturnCountData = {
  data: number;
  success: boolean;
};

type ReturnData = {
  data: any;
  success: boolean;
};

async function Count(search: string): Promise<ReturnCountData> {
  try {
    const response = await fetch(
      `${API_URL}/blog/tags/count?search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

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

async function GetAll(
  search: string,
  limit: number,
  page: number,
): Promise<ReturnData> {
  try {
    const response = await fetch(
      `${API_URL}/blog/tags?search=${search}&limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      return {
        data: [],
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

async function Create(input: BlogTag): Promise<ReturnData> {
  try {
    const response = await fetch(`${API_URL}/blog/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name: input.name }),
    });

    if (!response.ok) {
      return {
        data: {},
        success: false,
      };
    }

    const jsonResponse = await response.json();

    if (jsonResponse.message === ResponseEnum.CREATE_DATA_SUCCESS) {
      return {
        data: jsonResponse.data,
        success: true,
      };
    } else {
      return {
        data: {},
        success: false,
      };
    }
  } catch (error) {
    return {
      data: {},
      success: false,
    };
  }
}

async function Update(input: BlogTag): Promise<ReturnData> {
  try {
    const response = await fetch(`${API_URL}/blog/tags`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: input.id,
        name: input.name,
      }),
    });

    if (!response.ok) {
      return {
        data: {},
        success: false,
      };
    }

    const jsonResponse = await response.json();

    if (jsonResponse.message === ResponseEnum.UPDATE_DATA_SUCCESS) {
      return {
        data: jsonResponse.data,
        success: true,
      };
    } else {
      return {
        data: {},
        success: false,
      };
    }
  } catch (error) {
    return {
      data: {},
      success: false,
    };
  }
}

async function Remove(id: string): Promise<ReturnData> {
  try {
    const response = await fetch(`${API_URL}/blog/tags/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return {
        data: {},
        success: false,
      };
    }

    const jsonResponse = await response.json();

    if (jsonResponse.message === ResponseEnum.REMOVE_DATA_SUCCESS) {
      return {
        data: jsonResponse.data,
        success: true,
      };
    } else {
      return {
        data: {},
        success: false,
      };
    }
  } catch (error) {
    return {
      data: {},
      success: false,
    };
  }
}

export default {
  Count,
  GetAll,
  Create,
  Update,
  Remove,
};
