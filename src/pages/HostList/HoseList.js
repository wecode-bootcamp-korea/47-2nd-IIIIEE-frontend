import { useEffect, useState } from 'react';
import HostListStyle from './HostListStyle';

const HoseList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetch('./data/listData.json')
      .then(response => response.json())
      .then(result => setListData(result));
  }, []);

  return (
    <HostListStyle.Full>
      {listData.map(list => {
        const { roomId, roomName, guests, price, date, time } = list;
        return (
          <HostListStyle.Container key={roomId}>
            <HostListStyle.Title>{roomName}</HostListStyle.Title>
            <HostListStyle.GatheringData>
              <p>{date}</p>
              <p>{time}</p>
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

            <HostListStyle.RegistrationBtn>
              예약하기
            </HostListStyle.RegistrationBtn>
            <HostListStyle.Complete>예약완료</HostListStyle.Complete>
          </HostListStyle.Container>
        );
      })}
    </HostListStyle.Full>
  );
};

export default HoseList;
