import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};
export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8080",
    });
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      console.log(
        "Sending POST request to /authorization/login with data:",
        data,
      );

      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        "/auth/login",
        data,
      );

      const token = response.data?.token; // Dostęp do tokenu z odpowiedzi, przy użyciu operatora bezpiecznego wybierania '?'
      if (token) {
        localStorage.setItem("token", token); // Zapisz token do localStorage, jeśli istnieje
      } else {
        throw new Error("Token not found in response"); // Rzuć błąd, jeśli token nie istnieje
      }

      this.client.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;

      console.log("Received response:", response);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }
  public async getAllBooks(): Promise<ClientResponse<any | null>> {
    try {
      const token = localStorage.getItem("token") as string;

      if (!token) {
        throw new Error("Token not found");
      }

      const response: AxiosResponse<any> = await this.client.get(
        "/auth/getAllBooks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }
}
