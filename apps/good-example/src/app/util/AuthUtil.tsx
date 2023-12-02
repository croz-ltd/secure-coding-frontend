const CSRF_TOKEN_NAME = "X-CSRF-TOKEN";

export const authFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  if (!init || init.method === "get") {
    return fetch(input, init);
  }

  const headers = new Headers(init?.headers);
  headers.set(CSRF_TOKEN_NAME, getCsrfToken())

  return fetch(input, {
    ...init,
    credentials: "include",
    headers: headers
  })
}

export const setCsrfToken = (token: string) => {
  localStorage.setItem(CSRF_TOKEN_NAME, token);
}

export const getCsrfToken = (): string => {
  return localStorage.getItem(CSRF_TOKEN_NAME) ?? "";
}
