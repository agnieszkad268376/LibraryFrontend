import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { ReturnLoanDto } from "./dto/returnLoanDto";
import { AddBook } from "./dto/addBook";

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

      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("Token not found in response");
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
        "/books/getAllBooks",
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

  public async getAllUsers(): Promise<ClientResponse<any | null>> {
    try {
      const token = localStorage.getItem("token") as string;

      if (!token) {
        throw new Error("Token not found");
      }

      const response: AxiosResponse<any> = await this.client.get("/auth/show", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  public async getAllLoans(): Promise<ClientResponse<any | null>> {
    try {
      const token = localStorage.getItem("token") as string;

      if (!token) {
        throw new Error("Token not found");
      }

      const response: AxiosResponse<any> = await this.client.get(
        "/loan/getAll",
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

  public async deleteUser(id: number): Promise<ClientResponse<any | null>> {
    try {
      const token = localStorage.getItem("token") as string;

      if (!token) {
        throw new Error("Token not found");
      }

      const response: AxiosResponse<any> = await this.client.delete(
        `/auth/delete/${id}`,
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

  public async deleteBook(id: number): Promise<ClientResponse<any>> {
    try {
      // Pobierz token z localStorage
      const token = localStorage.getItem("token") as string;

      if (!token) {
        throw new Error("Token not found");
      }

      const response: AxiosResponse<any> = await this.client.delete(
        `/books/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Received response:", response);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error(
        "Error occurred during getAllFromArchive request:",
        axiosError,
      );

      if (axiosError.response) {
        console.error("Response data:", axiosError.response.data);
        console.error("Response status:", axiosError.response.status);
        console.error("Response headers:", axiosError.response.headers);
      }

      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async returnLoan(data: ReturnLoanDto): Promise<ClientResponse<any>> {
    try {
      const payload = {
        ...data,
      };

      const token = localStorage.getItem("token") as string;

      if (!token) {
        throw new Error("Token not found");
      }

      // Logowanie danych wysyłanych do backendu
      console.log("Sending request to /loan/returnLoan with payload:", payload);
      console.log(`Authorization token: ${token}`);

      const response: AxiosResponse<any> = await this.client.patch(
        "/loan/returnLoan",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Response from /loan/returnLoan:", response);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error("Error occurred during returnLoan request:", axiosError);

      if (axiosError.response) {
        console.error("Response data:", axiosError.response.data);
        console.error("Response status:", axiosError.response.status);
        console.error("Response headers:", axiosError.response.headers);
      }

      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getMyLoans(id: number): Promise<ClientResponse<any | null>> {
    try {
      const token = localStorage.getItem("token") as string;

      if (!token) {
        throw new Error("Token not found");
      }

      const url = `/loan/getById/${id}`;

      console.log(`Sending request to ${url} with token: ${token}`);

      const response: AxiosResponse<any> = await this.client.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("getMyLoans response:", response);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("getMyLoans error:", error);
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getMe(): Promise<ClientResponse<any | null>> {
    try {
      const token = localStorage.getItem("token") as string;

      if (!token) {
        throw new Error("Token not found");
      }

      console.log(`Sending request to /user/getUserMe with token: ${token}`);

      const response: AxiosResponse<any> = await this.client.get(
        "/user/getUserMe",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("getMe response:", response);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("getMe error:", error);
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async addBook(
    data: AddBook,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      console.log("Sending POST request to /books/add with data:", data);

      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        "/books/add",
        data,
      );

      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("Token not found in response");
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
}
