import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GustListStyle } from './GustListStyle';
import useRequireAuth from '../../hooks/useRequireAuth';

const GustList = () => {
  const loading = useRequireAuth();
  const [gustListData, setGustListData] = useState([]);
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
      .then(result => setGustListData(result.data));
  }, []);

  const goToLink = roomId => {
    navigate(`/gathering/${roomId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GustListStyle.GustListBox>
      {gustListData.length === 0 ? (
        <GustListStyle.DataNull>
          신청하신 내역이 없습니다.
        </GustListStyle.DataNull>
      ) : (
        gustListData?.map(info => (
          <GustListStyle.Container key={info.roomId}>
            <GustListStyle.Title>{info.roomTitle}</GustListStyle.Title>
            <GustListStyle.GatheringData>
              <p>{info.date.split('T')[0]}</p>
              <p>{info.hour}</p>
            </GustListStyle.GatheringData>
            <GustListStyle.RegistrationBtn
              onClick={() => goToLink(info.roomId)}
            >
              {info.roomStatus === 'PURCHASED' ? '후기 작성' : '모임 정보'}
            </GustListStyle.RegistrationBtn>
          </GustListStyle.Container>
        ))
      )}
    </GustListStyle.GustListBox>
  );
};

export default GustList;
