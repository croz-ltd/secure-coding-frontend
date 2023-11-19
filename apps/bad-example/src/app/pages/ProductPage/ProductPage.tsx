import React from 'react';

import { ProductPageStyles } from "@owasp-guidelines-frontend/shared-lib";

const ProductPage = () => {
  const product = {
    name: 'Product Name',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '19.99€',
    image: 'https://via.placeholder.com/400x300',
    seller: 'Seller Name',
  };

  const handleBuyClick = () => {
    console.log('Buy button clicked');
  };

  return (
    <div className={ProductPageStyles.productPage}>
      <div className={ProductPageStyles.productImageContainer}>
        <img className={ProductPageStyles.productImage} src={product.image} alt={product.name} />
      </div>
      <div className={ProductPageStyles.productDetailsContainer}>
        <h2 className={ProductPageStyles.productName}>{product.name}</h2>
        <p className={ProductPageStyles.productSeller}>{product.seller}</p>
        <p className={ProductPageStyles.productPrice}>{product.price}</p>
        <button className={ProductPageStyles.buyButton} onClick={handleBuyClick}>
          Buy Now
        </button>
        <div className={ProductPageStyles.productDescriptionContainer}>
          <p className={ProductPageStyles.productDescription}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
