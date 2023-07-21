import { useEffect, useState } from 'react';
import HostListStyle from './HostListStyle';

const HoseList = () => {
  const [listData, setListData] = useState([]);
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

  return (
    <HostListStyle.Full>
      {listData.map(list => {
        const {
          roomId,
          roomTitle,
          guests,
          price,
          hour,
          roomYear,
          roomMonth,
          roomDay,
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
