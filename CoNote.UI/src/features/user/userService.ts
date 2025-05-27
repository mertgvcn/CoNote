//utils
import UserAPI from "../../api/User/UserAPI";
import { RenderErrorToast } from "../../utils/CustomToastManager";

export const SearchUsersByUsername = async (searchValue: string, limit?: number) => {
  try {
    var response = await UserAPI.SearchUsersByUsername(searchValue, limit);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred.");
    }
    throw error;
  }
};

export const userService = {
  SearchUsersByUsername,
};
