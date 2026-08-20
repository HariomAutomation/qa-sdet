/**
 * Custom API Client with automatic retries, interceptors, error handling, and response encapsulation.
 */
export class ApiClient {
  constructor(baseUrl, defaultHeaders = {}) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...defaultHeaders,
    };
    this.authToken = null;
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  async request(endpoint, options = {}, retries = 2) {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, "")}`;
    const headers = { ...this.defaultHeaders, ...options.headers };

    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }

    const config = {
      ...options,
      headers,
    };

    let lastError;
    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        const response = await fetch(url, config);
        let body = null;
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          body = await response.json();
        } else {
          body = await response.text();
        }

        return {
          status: response.status,
          headers: response.headers,
          data: body,
          ok: response.ok,
        };
      } catch (err) {
        lastError = err;
        if (attempt <= retries) {
          await new Promise((res) => setTimeout(res, attempt * 100));
        }
      }
    }

    throw new Error(`API Request to ${url} failed after ${retries + 1} attempts: ${lastError?.message}`);
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}
