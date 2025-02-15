import { ResponseEnum } from "@/libs/enum";
import { API_URL } from "@/libs/config";
import { BlogPost } from "@/libs/types";

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
      `${API_URL}/blog/posts/count?search=${search}`,
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
  tags: string,
  limit: number,
  page: number,
): Promise<ReturnData> {
  try {
    const response = await fetch(
      `${API_URL}/blog/posts?search=${search}&tags=${tags}&limit=${limit}&page=${page}`,
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

async function Create(input: BlogPost): Promise<ReturnData> {
  try {
    const response = await fetch(`${API_URL}/blog/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: input.title,
        slug: input.slug,
        created_at: input.created_at,
        updated_at: input.updated_at,
        is_draft: input.is_draft
      }),
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

async function Update(input: BlogPost): Promise<ReturnData> {
  try {
    const response = await fetch(`${API_URL}/blog/posts`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: input.id,
        title: input.title,
        slug: input.slug,
        created_at: input.created_at,
        updated_at: input.updated_at,
        is_draft: input.is_draft
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
    const response = await fetch(`${API_URL}/blog/posts/${id}`, {
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
