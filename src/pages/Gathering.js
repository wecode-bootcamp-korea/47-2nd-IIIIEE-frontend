import { styled } from 'styled-components';
import Tag from '../components/Tag';
import { useEffect, useState } from 'react';
import Host from '../components/Host';

const Gathering = () => {
  const [textData, setTextData] = useState({});

  useEffect(() => {
    fetch('/data/text.json')
      .then(response => response.json())
      .then(result => setTextData(result));
  }, []);

  return (
    <Full>
      <GatheringImg src={textData.img} alt="gatheringImg" />
      <Tag cathegorys={textData?.cathegory} tags={textData?.tag} />
      <p>{textData.discription}</p>
      <Top>
        <Container>
          <p>알림</p>
        </Container>
        <Container>
          <p>{textData.date}</p>
        </Container>
        <Container>
          <p>{textData.time}</p>
        </Container>
        <Container>
          현재인원 : {textData.person} / {textData.maxPerson} 명
        </Container>
      </Top>
      <AddBtn>신청하기</AddBtn>
      <Border />
      <Host />
    </Full>
  );
};

const Full = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding: 1em;
  gap: 20px;
  overflow: scroll;
`;

const GatheringImg = styled.img`
  height: 200px;
`;

const AddBtn = styled.button`
  width: 17em;
  padding: 1em;
  border: 0px;
  border-radius: 7px;
  background-color: #ff914d;
  color: white;
  font-size: 1.5em;
`;

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 7px;
  padding: 10px;
  display: flex;
  gap: 10px;
`;

const Top = styled.div`
  display: flex;
  gap: 1.3em;
  justify-content: center;
`;

const Border = styled.div`
  border-top: ${props => props.theme.borderDiv};
`;
export default Gathering;
