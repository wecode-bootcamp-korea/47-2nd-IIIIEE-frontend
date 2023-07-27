import { useEffect, useState } from 'react';
import HostListStyle from './HostListStyle';
import useRequireAuth from '../../hooks/useRequireAuth';
import { useNavigate } from 'react-router-dom';

const HoseList = () => {
  const loading = useRequireAuth();
  const [listData, setListData] = useState([]);
  const REACT_APP_SERVICE_APP_ADMIN_KEY =
    process.env.REACT_APP_SERVICE_APP_ADMIN_KEY;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_IP}/rooms/host`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(result => setListData(result.data));
  }, []);

  const goToPay = idx => {
    fetch(`https://kapi.kakao.com/v1/payment/ready`, {
      method: 'POST',
      body: new URLSearchParams({
        cid: 'TC0ONETIME',
        partner_order_id: 'partner_order_id',
        partner_user_id: 'partner_user_id',
        item_name: listData[idx]?.roomId.toString(),
        quantity: 1,
        total_amount: Math.floor(listData[idx]?.totalPrice),
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

  const goToGathering = url => {
    navigate(url);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HostListStyle.Full>
      {listData.length === 0 ? (
        <div>아직 만든 모임이 없어요. 모임을 만들어주세요.</div>
      ) : (
        listData?.map((list, idx) => {
          const {
            roomId,
            roomTitle,
            guests,
            totalPrice,
            hour,
            date,
            roomStatusId,
          } = list;
          const newDate = date.substr(0, 10);
          return (
            <HostListStyle.Container key={roomId}>
              <HostListStyle.Title
                onClick={() => goToGathering(`/gathering/${roomId}`)}
              >
                {roomTitle}
              </HostListStyle.Title>
              <HostListStyle.GatheringData>
                <p>{newDate}</p>
                <p>{hour}</p>
                <p>{Math.floor(totalPrice).toLocaleString()}원</p>
              </HostListStyle.GatheringData>
              {guests[0].id === null ? (
                <div>신청 인원이 없어요. 조금만 기다려주세요.</div>
              ) : (
                guests.map(guest => {
                  return (
                    <HostListStyle.Guest key={guest.id}>
                      <p>{guest.name}</p>
                      {roomStatusId !== 3 && (
                        <HostListStyle.GuestBtn>
                          <HostListStyle.AgreeBtn>수락</HostListStyle.AgreeBtn>
                          <HostListStyle.RefuseBtn>
                            거절
                          </HostListStyle.RefuseBtn>
                        </HostListStyle.GuestBtn>
                      )}
                    </HostListStyle.Guest>
                  );
                })
              )}

              {roomStatusId !== 3 ? (
                <HostListStyle.RegistrationBtn
                  onClick={() => goToPay(idx)}
                  disabled={roomStatusId !== 2}
                  colorCondition={roomStatusId !== 2}
                >
                  예약하기
                </HostListStyle.RegistrationBtn>
              ) : (
                <HostListStyle.Complete>예약완료</HostListStyle.Complete>
              )}
            </HostListStyle.Container>
          );
        })
      )}
    </HostListStyle.Full>
  );
};

export default HoseList;
