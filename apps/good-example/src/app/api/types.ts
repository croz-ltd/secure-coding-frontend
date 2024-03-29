export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageName: string;
  comments: Comment[];
  seller: UserResponse;
};

export type Comment = {
  id: number;
  text: string
  creationDate: string;
  creator: UserResponse;
};

export type PasswordResetCommand = {
  username: string,
  password: string,
  questionOneAnswer: string;
  questionTwoAnswer: string;
  questionThreeAnswer: string;
};

export type CreateProductCommand = {
  name: string;
  image: FileList;
  description: string;
  price: number;
};

export type CreateCommentCommand = {
  text: string;
}

export type UserResponse = {
  id: number;
  username: string;
};

export type CreateOrderCommand = {
  quantity: number;
};

export type OrderResponse = {
  id: number;
  quantity: number;
  product: Product;
  buyer: UserResponse;
}

