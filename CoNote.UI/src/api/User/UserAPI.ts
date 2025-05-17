import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";

class UserAPI extends BaseAPI {
  private controllerExtension: string = "/api/User";

  constructor() {
    super();
  }

  public async SearchUsersByUsername(
    searchValue: string,
    limit?: number
  ): Promise<AxiosResponse> {
    return await this.get(this.controllerExtension + "/SearchUsersByUsername", {
      searchValue,
      limit,
    });
  }
}

export default new UserAPI();
