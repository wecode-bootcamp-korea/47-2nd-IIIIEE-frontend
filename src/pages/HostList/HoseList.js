import { useEffect, useState } from 'react';
import HostListStyle from './HostListStyle';
import useRequireAuth from '../../hooks/useRequireAuth';

const HoseList = () => {
  const loading = useRequireAuth();
  const [listData, setListData] = useState([]);
  const REACT_APP_SERVICE_APP_ADMIN_KEY =
    process.env.REACT_APP_SERVICE_APP_ADMIN_KEY;
  // const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('./data/listData.json')
      // fetch('http://52.78.25.104:3000/rooms/host', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      .then(response => response.json())
      .then(result => setListData(result.data));
  }, []);

  const goToPay = idx => {
    fetch(`https://kapi.kakao.com/v1/payment/ready`, {
      method: 'POST',
      body: new URLSearchParams({
        cid: 'TC0ONETIME',
        partner_order_id: listData[idx]?.roomId,
        partner_user_id: 'token',
        item_name: listData[idx]?.roomTitle,
        quantity: 1,
        total_amount: listData[idx]?.price,
        tax_free_amount: 0,
        approval_url: `http://localhost:3000/kakaopay?partner_order_id=${listData[idx]?.roomId}`,
        cancel_url: 'http://localhost:3000/payFail',
        fail_url: 'http://localhost:3000/payFail',
      }).toString(),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `KakaoAK ${REACT_APP_SERVICE_APP_ADMIN_KEY}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.tid) {
          localStorage.setItem('tid', data.tid);
          window.location.href = data.next_redirect_pc_url;
        }
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HostListStyle.Full>
      {listData.map((list, idx) => {
        const {
          roomId,
          roomTitle,
          guests,
          price,
          hour,
          roomYear,
          roomMonth,
          roomDay,
          roomStatue,
        } = list;
        return (
          <HostListStyle.Container key={roomId}>
            <HostListStyle.Title>{roomTitle}</HostListStyle.Title>
            <HostListStyle.GatheringData>
              <p>
                {roomYear}년 {roomMonth}월 {roomDay}일
              </p>
              <p>{hour}</p>
              <p>{price?.toLocaleString()}원</p>
            </HostListStyle.GatheringData>
            {guests.map(guest => {
              return (
                <HostListStyle.Guest key={guest.id}>
                  <p>{guest.name}</p>
                  <HostListStyle.GuestBtn>
                    <HostListStyle.AgreeBtn>수락</HostListStyle.AgreeBtn>
                    <HostListStyle.RefuseBtn>거절</HostListStyle.RefuseBtn>
                  </HostListStyle.GuestBtn>
                </HostListStyle.Guest>
              );
            })}

            {roomStatue !== 3 && (
              <HostListStyle.RegistrationBtn onClick={() => goToPay(idx)}>
                예약하기
              </HostListStyle.RegistrationBtn>
            )}
            {roomStatue === 3 && (
              <HostListStyle.Complete>예약완료</HostListStyle.Complete>
            )}
          </HostListStyle.Container>
        );
      })}
    </HostListStyle.Full>
  );
};

export default HoseList;
