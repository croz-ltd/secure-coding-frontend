import * as paths from "./paths";
import {CreateCommentCommand, CreateOrderCommand, CreateProductCommand, OrderResponse, Product} from "./types";
import {authFetch} from "../util/AuthUtil";

export async function findOne(id: number): Promise<Product> {
  const response = await fetch(paths.api.productFindOne(id));

  if (response.status === 200) {
    return response.json();
  }

  return Promise.reject();
}

export async function findAll(): Promise<Product[]> {
  const response = await fetch(paths.api.productFindAll)

  if (response.status === 200) {
    return response.json();
  }

  return Promise.reject();
}

export async function createComment(id: number, createCommentCommand: CreateCommentCommand): Promise<Comment> {
  const response = await authFetch(paths.api.createComment(id), {
    body: JSON.stringify(createCommentCommand),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    credentials: "include"
  });

  //TODO: ovdje ce jos ici validacija - bbes
  return response.json();
}

export async function createProduct(createProductCommand: CreateProductCommand): Promise<Product> {
  const formData = new FormData();
  formData.append('name', createProductCommand.name);
  formData.append('image', createProductCommand.image.item(0) ?? "");
  formData.append('description', createProductCommand.description);
  formData.append("price", createProductCommand.price.toString());

  const response = await authFetch(paths.api.createProduct, {
    body: formData,
    method: "post",
    credentials: "include"
  });

  //TODO: ovdje ce jos ici validacija - bbes
  return response.json();
}

export async function createOrder(id: number, createOrderCommand: CreateOrderCommand): Promise<OrderResponse> {
  const response = await authFetch(paths.api.createOrder(id), {
    body: JSON.stringify(createOrderCommand),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    credentials: "include"
  });

  //TODO: ovdje ce jos ici validacija - bbes
  return response.json();
}

