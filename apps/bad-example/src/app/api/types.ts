export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageName: string;
  comments: Comment[]
};

export type Comment = {
  id: number;
  text: string
  creationDate: string;
};

export type PasswordResetCommand = {
  username: string,
  password: string,
  questionOneAnswer: string;
  questionTwoAnswer: string;
  questionThreeAnswer: string;
};

export type CreateCommentCommand = {
  text: string;
}

export type CreateProductCommand = {
  name: string;
  image: FileList;
  description: string;
  price: number;
};

export type ValidationErrorsResponse<T> = {
  [key in keyof T]: string[];
};
