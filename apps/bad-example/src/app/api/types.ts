export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageName: string;
  productComments: Comment[]
};

export type Comment = {
  id: number;
  text: string
  creationDate: string;
};
