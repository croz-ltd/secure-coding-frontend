import * as paths from "./paths";
import {PasswordResetCommand} from "./types";

export async function login(username: string, password: string): Promise<void> {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(paths.api.login, {
    body: formData,
    method: "post",
    credentials: "include"
  });

  if (response.status === 200) {
    return Promise.resolve()
  }

  return Promise.reject();
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
