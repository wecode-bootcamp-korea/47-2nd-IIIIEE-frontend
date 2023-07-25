import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoPay = () => {
  const navigate = useNavigate();
  const pgToken = new URL(document.location).searchParams.get('pg_token');
  // const partner_order_id = new URL(document.location).searchParams.get(
  //   'partner_order_id',
  // );
  const token = localStorage.getItem('token');

  // const postData = {
  //   cid: 'TC0ONETIME',
  //   tid: localStorage.getItem('tid'),
  //   partner_order_id,
  //   partner_user_id: 'token',
  //   pg_token,
  // };

  // useEffect(() => {
  //   fetch(`https://kapi.kakao.com/v1/payment/approve`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       Authorization: `KakaoAK ${process.env.REACT_APP_SERVICE_APP_ADMIN_KEY}`,
  //     },
  //     body: new URLSearchParams(postData).toString(),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.approved_at) {
  //         // acceptPay();
  //         navigate('hostList');
  //       } else if (data.code === '-780') {
  //         alert('진행중인 거래가 있습니다. 잠시 후 다시 시도해 주세요.');
  //       }
  //     });
  // }, []);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_IP}/orders/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tid: localStorage.getItem('tid'),
        pgToken,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'PAYMENT_SUCCESS') {
          navigate('/hostList');
          localStorage.removeItem('tid');
        }
      });
  }, []);

  return <div>KakaoPay</div>;
};

export default KakaoPay;
