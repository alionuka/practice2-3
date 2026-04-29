import { getStrapiURL } from "@/lib/utils";

type TRegisterUser = {
  username: string;
  email: string;
  password: string;
};

type TAuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

type TStrapiError = {
  status: number;
  name: string;
  message: string;
  details?: unknown;
};

type TAuthServiceResponse =
  | TAuthResponse
  | {
      error: TStrapiError;
    };

    type TLoginUser = {
  identifier: string;
  password: string;
};

export function isAuthError(
  response: TAuthServiceResponse
): response is { error: TStrapiError } {
  return "error" in response;
}

export async function registerUserService(
  userData: TRegisterUser
): Promise<TAuthServiceResponse | undefined> {
  const url = new URL("/api/auth/local/register", getStrapiURL());

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.dir(data, { depth: null });

    return data;
  } catch (error) {
    console.error("Registration Service Error:", error);
    return undefined;
  }
}

export async function loginUserService(
  userData: TLoginUser
): Promise<TAuthServiceResponse | undefined> {
  const url = new URL("/api/auth/local", getStrapiURL());

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.dir(data, { depth: null });

    return data;
  } catch (error) {
    console.error("Login Service Error:", error);
    return undefined;
  }
}