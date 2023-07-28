import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuestListStyle } from './GuestListStyle';
import useRequireAuth from '../../hooks/useRequireAuth';

const GuestList = () => {
  const loading = useRequireAuth();
  const [guestListData, setGuestListData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_IP}/rooms/member`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(result => setGuestListData(result.data));
  }, []);

  const goToLink = roomId => {
    navigate(`/gathering/${roomId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GuestListStyle.GuestListBox>
      {guestListData.length === 0 ? (
        <GuestListStyle.DataNull>
          신청하신 내역이 없습니다.
        </GuestListStyle.DataNull>
      ) : (
        guestListData?.map(info => (
          <GuestListStyle.Container key={info.roomId}>
            <GuestListStyle.Title>{info.roomTitle}</GuestListStyle.Title>
            <GuestListStyle.GatheringData>
              <p>{info.date.split('T')[0]}</p>
              <p>{info.hour}</p>
            </GuestListStyle.GatheringData>
            <GuestListStyle.RegistrationBtn
              onClick={() => goToLink(info.roomId)}
            >
              {info.roomStatus === 'PURCHASED' ? '후기 작성' : '모임 정보'}
            </GuestListStyle.RegistrationBtn>
          </GuestListStyle.Container>
        ))
      )}
    </GuestListStyle.GuestListBox>
  );
};

export default GuestList;
