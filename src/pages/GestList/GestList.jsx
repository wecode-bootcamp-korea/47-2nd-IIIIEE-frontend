import React, { useState, useEffect } from 'react';
import { GestListStyle } from './GestListStyle';

const GestList = () => {
  const [gestListData, setGestListData] = useState([]);

  useEffect(() => {
    fetch('./data/gestListData.json')
      .then(response => response.json())
      .then(result => setGestListData(result.data));
  }, []);

  return (
    <GestListStyle.GestListBox>
      {gestListData.map(info => (
        <GestListStyle.Container key={info.roomId}>
          <GestListStyle.Title>{info.roomTitle}</GestListStyle.Title>
          <GestListStyle.GatheringData>
            <p>{info.date}</p>
            <p>{info.hour}</p>
          </GestListStyle.GatheringData>
          <GestListStyle.RegistrationBtn>
            후기 작성
          </GestListStyle.RegistrationBtn>
        </GestListStyle.Container>
      ))}
    </GestListStyle.GestListBox>
  );
};

export default GestList;
