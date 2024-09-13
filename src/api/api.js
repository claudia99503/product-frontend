const baseUrl = process.env.REACT_APP_API_URL; // .env 파일의 환경 변수 사용

// 상품 목록을 가져오는 함수
export const fetchProducts = async ({ orderBy = 'recent', page = 1, pageSize = 10, keyword = '' }) => {
  try {
    const queryParams = new URLSearchParams({ orderBy, page, pageSize, keyword }).toString();
    const response = await fetch(`${baseUrl}/products?${queryParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상품 목록을 불러오는 중 오류가 발생했습니다:', error);
    return null;
  }
};

// 단일 상품 상세 정보를 가져오는 함수
export const fetchProductDetails = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상품 상세 정보를 불러오는 중 오류가 발생했습니다:', error);
    return null;
  }
};

// 좋아요 수를 증가시키는 함수
export const incrementLikeCount = async (productId) => {
    try {
      const response = await fetch(`${baseUrl}/products/${productId}/like`, {
        method: 'PATCH',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('좋아요 수를 증가시키는 중 오류가 발생했습니다:', error);
      return null;
    }
  };

// 상품을 등록하는 함수
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상품 등록 중 오류가 발생했습니다:', error);
    return null;
  }
};

// 상품을 삭제하는 함수
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/products/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상품 삭제 중 오류가 발생했습니다:', error);
    return null;
  }
};

