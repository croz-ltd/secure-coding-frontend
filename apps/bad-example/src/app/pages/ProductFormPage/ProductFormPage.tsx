import React from "react";
import {ProductFormStyles} from "@owasp-guidelines-frontend/shared-lib";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import * as productApi from "../../api/product";
import {CreateProductCommand, Product} from "../../api/types";
import {useNavigate} from "react-router-dom";

const newProductSchema = z.object({
  name: z.string().min(1, {message: 'Required'}),
  image: z.any().refine((image) => image, {message: "Required"}),
  description: z.string().min(1, {message: 'Required'}),
  price: z.number()
});

const ProductFormPage = () => {
  const resolver = zodResolver(newProductSchema);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit
  } = useForm({
    resolver,
    defaultValues: {
      name: "",
      image: null,
      description: "",
      price: 0
    }
  });

  const mutation = useMutation({
    mutationFn: (createProductCommand: CreateProductCommand) => {
      return productApi.createProduct(createProductCommand);
    },
    onSuccess: (data: Product) => {
      return navigate(`/product/${data.id}`)
    }
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  }

  return (
    <div className={ProductFormStyles.newProductPage}>
      <form className={ProductFormStyles.newProductCard} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={ProductFormStyles.newProductTitle}>New product</h2>
        <div className={ProductFormStyles.newProductGroup}>
          <label className={ProductFormStyles.newProductLabel}>Name:</label>
          <input className={ProductFormStyles.newProductInput} {...register('name')}/>
        </div>
        <div className={ProductFormStyles.newProductGroup}>
          <label className={ProductFormStyles.newProductLabel}>Image:</label>
          <input type="file" className={ProductFormStyles.newProductInput} {...register('image')}/>
        </div>
        <div className={ProductFormStyles.newProductGroup}>
          <label className={ProductFormStyles.newProductLabel}>Description:</label>
          <textarea className={ProductFormStyles.newProductTextArea} {...register('description')}/>
        </div>
        <div className={ProductFormStyles.newProductGroup}>
          <label className={ProductFormStyles.newProductLabel}>Price:</label>
          <input type="number" className={ProductFormStyles.newProductInput} {
            ...register('price', {
              setValueAs: (value) => Number(value)
            })
          }/>
        </div>
        <button className={ProductFormStyles.newProductButton} type="submit">
          Create new product
        </button>
      </form>
    </div>
  );
}

export default ProductFormPage;
