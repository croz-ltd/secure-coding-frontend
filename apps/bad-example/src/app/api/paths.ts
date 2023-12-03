const BACKEND_PATH = "http://owasp-guidelines-bad.com/bad-example";
const BACKEND_PATH_WS = "ws://owasp-guidelines-bad.com/bad-example";

export const api = {
  login: `${BACKEND_PATH}/auth/login`,
  currentUser: `${BACKEND_PATH}/auth/current-user`,
  passwordReset: `${BACKEND_PATH}/auth/password-reset`,
  createComment: (id: number) => `${BACKEND_PATH}/product/${id}/comment`,
  createProduct: `${BACKEND_PATH}/product/`,
  productImage: (imageName: string) => `${BACKEND_PATH}/product/files/${imageName}`,
  productFindOne: (id: number) => `${BACKEND_PATH}/product/${id}`,
  productFindAll: `${BACKEND_PATH}/product/`,
  createOrder: (id: number) => `${BACKEND_PATH}/product/${id}/order`,
  websocket: `${BACKEND_PATH_WS}/good-example-stomp`,
  stompTopic: (id: number) => `/product/${id}`
}
