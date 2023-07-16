import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Host = () => {
  const [hostData, setHostData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { name, gender, age, discription, score, reviews } = hostData;

  useEffect(() => {
    fetch('/data/host.json')
      .then(response => response.json())
      .then(result => setHostData(result));
  }, []);

  return (
    <All>
      <Title>이 글의 host는 ?</Title>
      <Description>
        <Left>
          <HostImg alt="hostimg" src="./images/IMG_7631.jpg" />
          <ProfileBold>{name}</ProfileBold>
        </Left>
        <Right>
          <Padding>
            <ProfileBold>{gender}</ProfileBold>
            <div>{age}세</div>
          </Padding>
          <Border />
          <Padding>
            <ProfileBold>평점</ProfileBold>
            <div>{score}</div>
          </Padding>
          <Border />
          <Padding>{discription}</Padding>
        </Right>
      </Description>

      <div>
        <ReviewToggle>
          <div>{name} 님의 후기</div>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            더보기
          </button>
        </ReviewToggle>
        {isOpen && (
          <div>
            {reviews?.map((hostreview, idx) => {
              return (
                <ReviewDetail key={idx}>
                  <Bold>{hostreview.name}</Bold>
                  <Detail>"{hostreview.review}"</Detail>
                </ReviewDetail>
              );
            })}
          </div>
        )}
      </div>
    </All>
  );
};

export default Host;

const All = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 700;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;

const HostImg = styled.img`
  width: 7em;
  height: 7em;
  border-radius: 50%;
`;

const Right = styled.div`
  width: 16em;
`;

const Description = styled.div`
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  gap: 1em;
`;

const Border = styled.div`
  border-top: ${props => props.theme.borderDiv};
`;

const Padding = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px 0px;
`;
const Bold = styled.div`
  font-weight: 700;
  width: 5em;
`;

const ReviewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

const ReviewDetail = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  padding: 10px;
`;

const ProfileBold = styled.div`
  font-weight: 700;
`;

const Detail = styled.p`
  width: 20em;
`;
