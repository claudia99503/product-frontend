import React from "react";
import './BestProducts.css';
import { useNavigate } from 'react-router-dom';

const BestProducts = ({ products, screenType }) => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const displayedProducts = screenType === 'desktop' 
    ? products.slice(0, 4)
    : screenType === 'tablet' 
    ? products.slice(0, 2)
    : products.slice(0, 1);

  return (
    <div className="bestProductsContainer">
      <h2 className="section-title">베스트 상품</h2>
      <div className="productsBox">
        {displayedProducts.map((item) => (
          <div 
            key={item._id || item.id} 
            className="products"
            onClick={() => handleProductClick(item._id || item.id)} 
            style={{ cursor: 'pointer' }}
          >
            <img src={item.images || '/image/img_default.svg'} alt={item.name} className="productImg" />
            <h2 className="productTitle">{item.name}</h2>
            <h2 className="productPrice">{item.price.toLocaleString("ko-KR")}원</h2>
            <span className="like">
              <img src="../image/heart.svg" alt="좋아요" />
              {item.favoriteCount || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestProducts;

