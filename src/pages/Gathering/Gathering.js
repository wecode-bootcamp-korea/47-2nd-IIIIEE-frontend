import Tag from '../../components/Tag';
import { useEffect, useState } from 'react';
import Host from './Host';
import Style from './GatheringStyle';

const Gathering = () => {
  const [textData, setTextData] = useState({});

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
        <Style.Container>
          <p>알림</p>
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
