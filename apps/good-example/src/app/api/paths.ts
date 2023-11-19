const BACKEND_PATH = "http://owasp-guidelines-good.com/good-example";

export const api = {
  login: `${BACKEND_PATH}/auth/login`,
  productImage: (imageName: string) => `${BACKEND_PATH}/product/files/${imageName}`,
  productFindOne: (id: number) => `${BACKEND_PATH}/product/${id}`,
  productFindAll: `${BACKEND_PATH}/product/`
}
