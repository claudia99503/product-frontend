import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProductList.css";
import useScreenType from "../hooks/useScreenType";
import { fetchProducts } from '../api/api';
import BestProducts from "./BestProducts";
import AllProducts from "./AllProducts";
import Pagination from "./Pagination";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [productSearch, setProductSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = 5;
  const navigate = useNavigate();
  const location = useLocation();
  const isMarketPage = location.pathname === "/items"; 

  const screenType = useScreenType();

  useEffect(() => {
    if (screenType === "desktop") {
      setPageSize(10);
    } else if (screenType === "tablet") {
      setPageSize(6);
    } else {
      setPageSize(4);
    }
  }, [screenType]);

  // 상품 데이터 가져오기 (item 페이지 여부와 상관없이 데이터 가져오기)
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts({ orderBy: sortOrder, page, pageSize, keyword: productSearch });
      setProducts(data.list);

      const sortedByLikes = data.list.sort((a, b) => b.favoriteCount - a.favoriteCount || new Date(b.createdAt) - new Date(a.createdAt));
      setBestProducts(sortedByLikes.slice(0, 4));
    };

    fetchData();
  }, [sortOrder, page, pageSize, productSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="product-list">
      {isMarketPage ? (
        <AllProducts
          products={products}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          screenType={screenType}
          productSearch={productSearch}
          setProductSearch={setProductSearch}
          sortOrder={sortOrder}
          onSearchSubmit={handleSearchSubmit}
          navigate={navigate}
        />
      ) : (
        <>
          <BestProducts products={bestProducts} screenType={screenType} />
          <AllProducts
            products={products}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            screenType={screenType}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
            sortOrder={sortOrder}
            onSearchSubmit={handleSearchSubmit}
            navigate={navigate}
          />
        </>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ProductList;

