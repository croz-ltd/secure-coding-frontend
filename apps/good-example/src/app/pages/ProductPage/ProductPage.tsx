import React from 'react';
import './ProductPage.css';

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
    <div className="product-page">
      <div className="product-image-container">
        <img className="product-image" src={product.image} alt={product.name} />
      </div>
      <div className="product-details-container">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-seller">{product.seller}</p>
        <p className="product-price">{product.price}</p>
        <button className="buy-button" onClick={handleBuyClick}>
          Buy Now
        </button>
        <div className="product-description-container">
          <p className="product-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
