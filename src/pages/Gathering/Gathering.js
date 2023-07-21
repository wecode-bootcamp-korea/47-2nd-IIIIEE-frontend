import Tag from '../../components/Tag';
import { useEffect, useState } from 'react';
import Host from './Host';
import Style from './GatheringStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
// import Icon from '../../components/icon/icon';

const Gathering = () => {
  const token = localStorage.getItem('token');
  const [textData, setTextData] = useState({});
  const {
    roomTitle,
    roomImage,
    price,
    gender,
    ageRange,
    roomTag,
    roomContent,
    roomYear,
    roomMonth,
    roomDay,
    reservationTime,
    numberOfRoomPeople,
    roomMaxPeople,
  } = textData;
  const [checkBell, setCheckBell] = useState(false);

  useEffect(() => {
    fetch('/data/gathering.json')
      .then(response => response.json())
      .then(result => setTextData(result.data));
  }, []);

  const applyToGathering = () => {
    fetch('http://52.78.25.104:3000/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.message === 'User added to room') {
          navigator('gestlist');
        } else if (data.message === 'ROOM_FULL') {
          alert('이미 예약 인원이 꽉 찼어요.');
        } else if (data.message === 'USER_ALREADY_IN_ROOM') {
          alert('이미 신청되었습니다.');
        } else if (data.message === 'CANNOT_JOIN_ROOM') {
          alert('조건에 맞지 않네요 다른 방을 찾아주세요');
        }
      });
  };

  return (
    <Style.Full>
      <Style.GatheringImg src={roomImage} alt="gatheringImg" />
      <Style.RoomTitle>{roomTitle}</Style.RoomTitle>

      <Tag gender={gender} ageRange={ageRange} tags={roomTag} />
      <p>{roomContent}</p>
      <Style.Top>
        <Style.Container
          checkBell={checkBell}
          onClick={() => {
            setCheckBell(!checkBell);
          }}
        >
          {/* <Icon name="bell" /> */}
          <FontAwesomeIcon icon={faBell} />
        </Style.Container>
        <Style.Container>
          <p>
            {roomYear}.{roomMonth}.{roomDay}
          </p>
        </Style.Container>
        <Style.Container>
          <p>{reservationTime}</p>
        </Style.Container>
      </Style.Top>
      <Style.Top>
        <Style.Container>
          현재인원 : {numberOfRoomPeople}/{roomMaxPeople} 명
        </Style.Container>
        <Style.Container>총 금액 : {price?.toLocaleString()}원</Style.Container>
      </Style.Top>
      <Style.AddBtn onClick={applyToGathering}>신청하기</Style.AddBtn>
      <Style.Border />
      <Host textData={textData} />
    </Style.Full>
  );
};

export default Gathering;
