import { useEffect, useState } from 'react';

const useRequireAuth = () => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    if (!token) {
      alert('로그인을 먼저 진행해주세요.');
      window.location.replace(KAKAO_AUTH_URL);
    } else {
      setLoading(false);
    }
  }, [KAKAO_AUTH_URL, token]);

  return loading;
};

export default useRequireAuth;
