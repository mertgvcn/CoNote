import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { UserLoginRequest } from "./models/UserLoginRequest";
import { UserRegisterRequest } from "./models/UserRegisterRequest";

class AuthenticationAPI extends BaseAPI {
  private controllerExtension: string = "/api/Authentication";

  constructor() {
    super();
  }

  public async Login(params: UserLoginRequest): Promise<AxiosResponse> {
    return await this.post(this.controllerExtension + "/Login", params);
  }

  public async Register(params: UserRegisterRequest): Promise<AxiosResponse> {
    return await this.post(this.controllerExtension + "/Register", params);
  }
}

export default new AuthenticationAPI();
