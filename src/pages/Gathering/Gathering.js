import Tag from '../../components/Tag';
import { useEffect, useState } from 'react';
import Host from './Host';
import Style from './GatheringStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import useRequireAuth from '../../hooks/useRequireAuth';
import { useNavigate, useParams } from 'react-router-dom';

const Gathering = () => {
  const loading = useRequireAuth();
  const token = localStorage.getItem('token');
  const [textData, setTextData] = useState({});

  const [checkBell, setCheckBell] = useState(false);
  const params = useParams();
  const room = params.room;
  const navigate = useNavigate();
  const applyBtnCondition = textData?.roomStatusId === 1;

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_IP}/rooms/info/${room}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(result => setTextData(result.data));
  }, [room]);

  const applyToGathering = () => {
    fetch(`http://${process.env.REACT_APP_IP}/rooms/${room}/joinRoom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(({ message }) => {
        if (GATHERING_ERRORS[message]) {
          alert(message);
          return;
        }
        navigate('/gustlist');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Style.Full>
      <Style.GatheringImg src={textData?.roomImage} alt="gatheringImg" />
      <Style.RoomTitle>{textData?.roomTitle}</Style.RoomTitle>

      <Tag
        gender={textData?.roomGender}
        ageRange={textData?.roomAgeRange}
        tags={textData?.roomTag}
      />
      <p>{textData?.roomContent}</p>
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
            {textData?.roomYear}.{textData?.roomMonth}.{textData?.roomDay}
          </p>
        </Style.Container>
        <Style.Container>
          <p>{textData?.reservationTime}</p>
        </Style.Container>
      </Style.Top>
      <Style.Top>
        <Style.Container>
          현재인원 : {textData?.numberOfRoomPeople}/{textData?.roomMaxPeople} 명
        </Style.Container>
        <Style.Container>
          총 금액 : {Math.floor(textData?.totalPrice)?.toLocaleString()}원
        </Style.Container>
      </Style.Top>
      <Style.AddBtn
        onClick={applyToGathering}
        disabled={!applyBtnCondition}
        applyBtnCondition={applyBtnCondition}
      >
        신청하기
      </Style.AddBtn>
      <Style.Border />
      <Host textData={textData} />
    </Style.Full>
  );
};

export default Gathering;

const GATHERING_ERRORS = {
  ROOM_FULL: '이미 예약 인원이 꽉 찼어요.',
  USER_ALREADY_IN_ROOM: '이미 신청되었습니다.',
  CANNOT_JOIN_ROOM: '조건에 맞지 않네요 다른 방을 찾아주세요',
};
