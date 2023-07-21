/*global Kakao*/
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const navigate = useNavigate();

  const KAKAO_CODE = new URL(document.location).searchParams.get('code');

  useEffect(() => {
    fetch(
      `http://${process.env.REACT_APP_IP}/users/kakaoLogin?code=${KAKAO_CODE}`,
    )
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('token', data.accessToken.accessToken);
        navigate('/');
      });
  }, []);

  return <div>KakaoLogin</div>;
};

export default KakaoLogin;
