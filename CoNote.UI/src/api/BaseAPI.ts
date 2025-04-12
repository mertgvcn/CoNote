import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
//utils
import { getCookie } from "../utils/CookieManager";

export abstract class BaseAPI {
    protected axiosInstance: AxiosInstance | any = null;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_BASEURL
        });

        this.initializeInterceptors();
    }

    protected async get(endpoint?: string, params?: any): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.get(endpoint, { params })
        return response
    }

    protected async post(endpoint: string, params?: any): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.post(endpoint, params)
        return response
    }

    protected async put(endpoint: string, params?: any): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.put(endpoint, params);
        return response;
    }

    protected async delete(endpoint: string, params?: any): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.delete(endpoint, params)
        return response
    }


    private initializeInterceptors() {
        this.axiosInstance.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                config.headers = config.headers || {};

                const accessToken = getCookie("access_token")
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                return config;
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );
    }
}