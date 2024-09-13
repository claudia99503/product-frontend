import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails, incrementLikeCount } from "../api/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductDetails(id);
      setProduct(data);
      setLikes(data.favoriteCount || 0); // 서버에서 좋아요 수 가져옴
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleLikeClick = async () => {
    const updatedProduct = await incrementLikeCount(id);
    if (updatedProduct) {
      setLikes(updatedProduct.favoriteCount); // 업데이트된 좋아요 수 반영
      setIsLiked(true);

      setTimeout(() => {
        setIsLiked(false); // 하트 색상 원래로 돌아옴
      }, 300);
    }
  };

  return (
    <div className="product-detail-container" style={{ marginTop: "120px" }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price.toLocaleString("ko-KR")}원</p>
      <div>태그: {product.tags.join(", ")}</div>
      <p>좋아요 : {likes}개</p>
      <img
        src="../image/heart.svg"
        alt="좋아요"
        onClick={handleLikeClick}
        style={{
          cursor: "pointer",
          width: "24px",
          height: "24px",
          filter: isLiked
            ? "invert(27%) sepia(97%) saturate(2773%) hue-rotate(320deg) brightness(103%) contrast(101%)"
            : "none",
        }}
      />
    </div>
  );
};

export default ProductDetail;

