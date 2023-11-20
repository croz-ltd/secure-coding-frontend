export const authFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  if (!init || init.method === "get") {
    return fetch(input, init);
  }

  const headers = new Headers(init?.headers);
  headers.set("XSRF-TOKEN", getCookieValue("XSRF-TOKEN") ?? "")

  return fetch(input, {
    ...init,
    credentials: "include",
    headers: headers
  })
}


const getCookieValue = (name: string): string | undefined => {
  const regex = new RegExp(`(^| )${name}=([^;]+)`)
  const match = document.cookie.match(regex)
  if (match) {
    return match[2]
  }
}
