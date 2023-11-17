import * as paths from "./paths";

export async function login(username: string, password: string) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(paths.api.login, {
    body: formData,
    method: "post",
    credentials: "include"
  });

  // TODO: dodaj error handler - bbes
  if (response.status === 200) {
    //TODO: pregledaj ovu navigaciju - bbes
    window.location.href = 'http://owasp-guidelines-good.com';
  }

  return Promise.resolve();
}
