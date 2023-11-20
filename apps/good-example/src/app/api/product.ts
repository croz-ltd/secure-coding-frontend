import * as paths from "./paths";
import {CreateCommentCommand, Product} from "./types";
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

