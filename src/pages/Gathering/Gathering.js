import Tag from '../../components/Tag';
import { useEffect, useState } from 'react';
import Host from './Host';
import Style from './GatheringStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
// import Icon from '../../components/icon/icon';

const Gathering = () => {
  const [textData, setTextData] = useState({});
  const [checkBell, setCheckBell] = useState(false);

  useEffect(() => {
    fetch('/data/text.json')
      .then(response => response.json())
      .then(result => setTextData(result));
  }, []);

  return (
    <Style.Full>
      <Style.GatheringImg src={textData.img} alt="gatheringImg" />
      <Tag cathegorys={textData?.cathegory} tags={textData?.tag} />
      <p>{textData.discription}</p>
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
          <p>{textData.date}</p>
        </Style.Container>
        <Style.Container>
          <p>{textData.time}</p>
        </Style.Container>
        <Style.Container>
          현재인원 : {textData.person} / {textData.maxPerson} 명
        </Style.Container>
      </Style.Top>
      <Style.AddBtn>신청하기</Style.AddBtn>
      <Style.Border />
      <Host />
    </Style.Full>
  );
};

export default Gathering;
