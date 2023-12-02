import React from "react";
import {useQuery} from "@tanstack/react-query";
import * as productApi from "../../api/product";
import * as paths from "../../api/paths";
import {useNavigate} from "react-router-dom";
import {ProductListStyles} from "@owasp-guidelines-frontend/shared-lib";

export const ProductListPage = () => {
  const navigate = useNavigate();

  const {data, isLoading} = useQuery({
    queryKey: ["productList"],
    queryFn: () => productApi.findAll()
  });

  if (isLoading) {
    return (<h1>...Loading</h1>);
  }

  if (data) {
    return (
      <div className={ProductListStyles.productListPageContainer}>
        {data.map((product, _index) => (
          <div className={ProductListStyles.productListCard} onClick={() => navigate(`/product/${product.id}`)}>
            <img src={paths.api.productImage(product.imageName)} alt={product.name} className={ProductListStyles.productListImage}/>
            <div className={ProductListStyles.productListInfo}>
              <h3 className={ProductListStyles.productListName}>{product.name}</h3>
              <p className={ProductListStyles.productListPriceAndSeller}>{`Sold by: ${product.seller.username}`}</p>
              <p className={ProductListStyles.productListPriceAndSeller}>{`Price: €${product.price}`}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
