import * as paths from "./paths";
import {PasswordResetCommand} from "./types";
import {mapValidationErrorResponse} from "../util/ValidationUtil";

export async function login(username: string, password: string, rememberMe: boolean): Promise<void> {
  const response = await fetch(paths.api.login, {
    body: JSON.stringify({
      username: username,
      password: password,
      rememberMe: rememberMe
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "post",
    credentials: "include"
  });

  if (response.status === 200) {
    return Promise.resolve();
  }

  const errorBody = await response.json();
  return Promise.reject(mapValidationErrorResponse(errorBody));
}

export async function passwordReset(passwordResetCommand: PasswordResetCommand): Promise<void> {
  const response = await fetch(paths.api.passwordReset, {
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
