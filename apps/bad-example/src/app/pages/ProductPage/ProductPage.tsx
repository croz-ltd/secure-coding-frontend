import React from 'react';

import {ProductPageStyles} from "@owasp-guidelines-frontend/shared-lib";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import * as productApi from "../../api/product";
import * as paths from "../../api/paths";
import { Comment as CommentType} from "../../api/types";
import {CommentComponent} from "../../components/comment/Comment";
import {CommentForm} from "../../components/comment/CommentForm";

const ProductPage = () => {
  const {id} = useParams();
  // TODO: Ispravi seler - bbes
  const seller = "Seller Name";

  const {data, isLoading, refetch} = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.findOne(Number(id))
  });

  const handleBuyClick = () => {
    console.log('Buy button clicked');
  };

  if (isLoading) {
    return (<h1>...Loading</h1>);
  }

  const sortByDate = (comments: CommentType[]): CommentType[] => {
    return comments.sort((a, b) => {
      return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
    })
  }

  if (data) {
    return (
      <>
        <div className={ProductPageStyles.productPage}>
          <div className={ProductPageStyles.productImageContainer}>
            <img className={ProductPageStyles.productImage} src={paths.api.productImage(data.imageName)} alt={data.name}/>
          </div>
          <div className={ProductPageStyles.productDetailsContainer}>
            <h2 className={ProductPageStyles.productName}>{data.name}</h2>
            <p className={ProductPageStyles.productSeller}>{seller}</p>
            <p className={ProductPageStyles.productPrice}>{data.price + "€"}</p>
            <button className={ProductPageStyles.buyButton} onClick={handleBuyClick}>
              Buy Now
            </button>
            <div className={ProductPageStyles.productDescriptionContainer}>
              <p className={ProductPageStyles.productDescription}>{data.description}</p>
            </div>
          </div>
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
