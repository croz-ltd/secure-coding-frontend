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
