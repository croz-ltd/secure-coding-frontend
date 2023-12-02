const BACKEND_PATH = "http://owasp-guidelines-bad.com/bad-example";

export const api = {
  login: `${BACKEND_PATH}/auth/login`,
  passwordReset: `${BACKEND_PATH}/auth/password-reset`,
  createComment: (id: number) => `${BACKEND_PATH}/product/${id}/comment`,
  createProduct: `${BACKEND_PATH}/product/`,
  productImage: (imageName: string) => `${BACKEND_PATH}/product/files/${imageName}`,
  productFindOne: (id: number) => `${BACKEND_PATH}/product/${id}`,
  productFindAll: `${BACKEND_PATH}/product/`,
  createOrder: (id: number) => `${BACKEND_PATH}/product/${id}/order`
}
