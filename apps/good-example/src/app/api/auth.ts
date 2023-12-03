import * as paths from "./paths";
import {PasswordResetCommand, UserResponse} from "./types";
import {authFetch, setCsrfToken} from "../util/AuthUtil";

export async function login(username: string, password: string): Promise<void> {
  await getCsrfToken();
  const response = await authFetch(paths.api.login, {
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "post",
    credentials: "include"
  });

  if (response.status === 200) {
    return Promise.resolve()
  }

  if (response.status === 401) {
    return Promise.reject("Incorrect username or password. Please try again.")
  }

  return Promise.reject("Error");
}

export async function passwordReset(passwordResetCommand: PasswordResetCommand): Promise<void> {
  const response = await authFetch(paths.api.passwordReset, {
    body: JSON.stringify(passwordResetCommand),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "post"
  });

  if (response.status === 200) {
    return Promise.resolve();
  }

  return Promise.reject();
}

export async function getCurrentUser(): Promise<UserResponse> {
  const response = await authFetch(paths.api.currentUser);

  if (response.status === 200) {
    return response.json();
  }

  return Promise.reject();
}

export async function getCsrfToken(): Promise<void> {
  const response = await fetch(paths.api.csrfToken);

  if (response.status !== 200) {
    return Promise.resolve();
  }

  const responseBody = await response.json() as { token: string };
  setCsrfToken(responseBody.token);
}
