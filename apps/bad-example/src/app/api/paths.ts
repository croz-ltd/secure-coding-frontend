const BACKEND_PATH = "http://owasp-guidelines-bad.com/bad-example";

export const api = {
  login: `${BACKEND_PATH}/auth/login`,
  productImage: (imageName: string) => `${BACKEND_PATH}/product/files/${imageName}`,
  productFindAll: `${BACKEND_PATH}/product/`
}
