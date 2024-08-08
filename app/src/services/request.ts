const BASE_URL = "http://localhost:3001/api";

export class Request {
  async post<T, K>(path: string, body?: K): Promise<T> {
    const url = BASE_URL + path;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async get<T>(path: string): Promise<T> {
    const url = BASE_URL + path;
    const response = await fetch(url);

    return await response.json();
  }
}
