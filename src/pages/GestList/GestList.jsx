import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { GestListStyle } from './GestListStyle';
import useRequireAuth from '../../hooks/useRequireAuth';

const GestList = () => {
  const loading = useRequireAuth();
  const [gestListData, setGestListData] = useState([]);

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
      .then(result => setGestListData(result.data));
  }, []);

  const goToLink = roomId => {
    Navigate(`/gathering/${roomId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GestListStyle.GestListBox>
      {gestListData?.map(info => (
        <GestListStyle.Container key={info.roomId}>
          <GestListStyle.Title>{info.roomTitle}</GestListStyle.Title>
          <GestListStyle.GatheringData>
            <p>{info.date.split('T')[0]}</p>
            <p>{info.hour}</p>
          </GestListStyle.GatheringData>
          <GestListStyle.RegistrationBtn onClick={() => goToLink(info.roomId)}>
            {info.roomStatus === 'PURCHASED' ? '후기 작성' : '모임 정보'}
          </GestListStyle.RegistrationBtn>
        </GestListStyle.Container>
      ))}
    </GestListStyle.GestListBox>
  );
};

export default GestList;
