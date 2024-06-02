export async function authUser(
  email: string,
  password: string,
): Promise<{ response: Response; json: any }> {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      const error = `HTTP ERROR ${response.status}`;
      throw new AuthError(error, response);
    }
    const json = await response.json();
    return {
      response: response,
      json: json,
    };
  } catch (error) {
    console.error("Authentication failed", error);
    throw error;
  }
}

export async function userWithSession(
  access_token: string,
): Promise<{ response: Response; json: any }> {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    if (!response.ok) {
      const errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      throw new AuthError(errorMessage, response);
    }
    const json = await response.json();
    return {
      response: response,
      json: json,
    };
  } catch (error) {
    throw error;
  }
}

export async function newAccesskey(
  refreshtoken: string,
): Promise<{ response: Response; json: any }> {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/auth/refresh-token",
      {
        body: JSON.stringify({
          refreshToken: `{${refreshtoken}}`,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const json = await response.json();
    return {
      response: response,
      json: json,
    };
  } catch (error) {
    console.error("Failed renewing access token");
    throw error;
  }
}

export class AuthError extends Error {
  constructor(
    message: string,
    public response?: Response,
  ) {
    super(message);
    this.response = response;
  }
}

export interface signUpUser {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}
export async function createUser(
  data: signUpUser,
): Promise<{ response: Response; json: any }> {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = `HTTP ERROR ${response.statusText}`;
      throw new AuthError(error, response);
    }
    return { response: response, json: response.json() };
  } catch (error) {
    throw error;
  }
}

export async function updateUser(
  userId: number,
  data: signUpUser,
): Promise<{ response: Response; json: any }> {
  try {
    const url = `https://api.escuelajs.co/api/v1/users/${String(userId)}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = `HTTP ERROR ${response.status}`;
      throw new AuthError(error, response);
    }
    return { response: response, json: response.json() };
  } catch (error) {
    throw error;
  }
}
