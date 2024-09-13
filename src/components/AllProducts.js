import React from "react";
import './AllProducts.css';
import SearchBar from './SearchBar';
import RegisterButton from './RegisterButton';
import SortOptions from './SortOptions';

const AllProducts = ({
  products,
  page,
  setPage,
  screenType,
  productSearch,
  setProductSearch,
  sortOrder,
  onSearchSubmit,
  navigate,
}) => {
  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="allProductsContainer">
      {screenType !== 'mobile' && (
        <div className="allProductHeader">
          <div className="headerMenu">
            <h2 className="section-title">판매 중인 상품</h2>
            <RegisterButton navigate={navigate} />
            <SearchBar 
              productSearch={productSearch}
              setProductSearch={setProductSearch}
            />
            <SortOptions
              sortOrder={sortOrder}
              setPage={setPage}
              screenType={screenType}
            />
          </div>
        </div>
      )}

      {screenType === 'mobile' && (
        <>
          <div className="headerMenu">
            <h2 className="section-title">판매 중인 상품</h2>
            <RegisterButton navigate={navigate} />
          </div>

          <div className="searchFormWrapper">
            <SearchBar
              productSearch={productSearch}
              setProductSearch={setProductSearch}
            />
            <SortOptions
              sortOrder={sortOrder}
              setPage={setPage}
              screenType={screenType}
            />
          </div>
        </>
      )}

      {/* 상품 목록 */}
      <div className="allProductsContents">
        {products.map((item) => (
          <div 
            key={item._id || item.id} 
            className="allProducts"
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

export default AllProducts;

