import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        tags: tags,
      };

      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/products`, // 배포된 백엔드 URL
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response data:', result.data);

      if (result.status === 201) {
        // 상품 등록 성공 시, 상세 페이지로 이동
        navigate(`/products/${result.data._id}`);
      } else {
        console.error('Error submitting product:', result.data);
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const handleDeleteTag = (deleteTag) => {
    setTags(tags.filter((t) => t !== deleteTag));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && tag.trim().length > 0 && tag.trim().length <= 5) {
      e.preventDefault();
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>상품 등록하기</h2>
        <button
          type="submit"
          className="submit-button"
          style={{
            backgroundColor: '#3692FF',
            cursor: 'pointer',
          }}
        >
          등록
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="name">상품명</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="상품명을 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">상품 소개</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상품 소개를 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">판매 가격</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="판매 가격을 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="tag">태그</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleTagKeyPress}
          placeholder="태그를 입력해주세요"
        />
        <div className="tags">
          {tags.map((t, index) => (
            <div key={index} className="tag">
              <span>{t}</span>
              <button type="button" onClick={() => handleDeleteTag(t)}>X</button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Registration;

