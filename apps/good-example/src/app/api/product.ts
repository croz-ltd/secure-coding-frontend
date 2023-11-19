import * as paths from "./paths";
import { Product } from "./types";

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
