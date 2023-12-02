import React from 'react';

import {ProductPageStyles} from "@owasp-guidelines-frontend/shared-lib";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import * as productApi from "../../api/product";
import * as paths from "../../api/paths";
import {Comment as CommentType, CreateOrderCommand} from "../../api/types";
import {CommentComponent} from "../../components/comment/Comment";
import {CommentForm} from "../../components/comment/CommentForm";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import ErrorComponent from "../../../../../bad-example/src/app/components/ErrorMessage/ErrorMessage";

const placeOrderSchema = z.object({
  quantity: z.number().min(1, {message: 'Must be greater than 1'}),
});

const ProductPage = () => {
  const {id} = useParams();
  const resolver = zodResolver(placeOrderSchema);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver,
    defaultValues: {
      quantity: null
    }
  });

  const mutation = useMutation({
    mutationFn: (createOrderCommand: CreateOrderCommand) => {
      return productApi.createOrder(Number(id), createOrderCommand);
    }
  });

  const {data, isLoading, refetch} = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.findOne(Number(id))
  });

  const sortByDate = (comments: CommentType[]): CommentType[] => {
    return comments.sort((a, b) => {
      return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
    })
  }

  if (isLoading) {
    return (<h1>...Loading</h1>);
  }

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  }

  if (data) {
    return (
      <>
        <div className={ProductPageStyles.productPage}>
          <div className={ProductPageStyles.productImageContainer}>
            <img className={ProductPageStyles.productImage} src={paths.api.productImage(data.imageName)} alt={data.name}/>
          </div>
          <form className={ProductPageStyles.productDetailsContainer} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={ProductPageStyles.productName}>{data.name}</h2>
            <p className={ProductPageStyles.productSeller}>{data.seller.username}</p>
            <p className={ProductPageStyles.productPrice}>{data.price + "€"}</p>
            <div className={ProductPageStyles.quantityContainer}>
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" className={ProductPageStyles.quantityInput} {
                ...register('quantity', {
                  setValueAs: (value) => Number(value)
                })
              }/>
            </div>
            {errors.quantity && <ErrorComponent message={errors.quantity.message ?? ""} />}
            <button className={ProductPageStyles.buyButton} type="submit">
              Buy Now
            </button>
            <div className={ProductPageStyles.productDescriptionContainer}>
              <p className={ProductPageStyles.productDescription}>{data.description}</p>
            </div>
          </form>
        </div>
        <CommentForm id={Number(id)} onSubmit={refetch}/>
        <div className={ProductPageStyles.productComments}>
          <h2>Comments</h2>
          {sortByDate(data.comments).map((comment, _index) => (
            <CommentComponent comment={comment} key={comment.id}/>
          ))}
        </div>
      </>
    );
  }
};

export default ProductPage;
