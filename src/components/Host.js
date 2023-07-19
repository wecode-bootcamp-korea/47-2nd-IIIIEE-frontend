import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Host = () => {
  const [hostData, setHostData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [addReviewText, setAddReviewText] = useState('');
  const [visibleReview, setVisibleReview] = useState([]);
  const { name, gender, age, discription, score, reviews } = hostData;

  useEffect(() => {
    fetch('/data/host.json')
      .then(response => response.json())
      .then(result => setHostData(result));
  }, []);

  const handleReview = e => {
    setAddReviewText(e.target.value);
  };

  const createReview = () => {
    if (addReviewText) {
      setVisibleReview(visibleReview => [addReviewText, ...visibleReview]);
      setAddReviewText('');
    } else {
      alert('글을 입력 후 클릭해주세요.');
    }
  };

  const deleteReview = targetIdx => {
    const newTag = visibleReview.filter((tag, idx) => idx !== targetIdx);
    setVisibleReview(newTag);
  };

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
          <>
            <AddReview>
              <Bold>양동희</Bold>
              <TestArea>
                <TextInput
                  value={addReviewText}
                  onChange={e => handleReview(e)}
                />
                <button onClick={createReview}>작성</button>
              </TestArea>
              {visibleReview.map((review, idx) => {
                return (
                  <ReviewDetail key={idx}>
                    <Bold>양동희</Bold>
                    <Detail>{review}</Detail>
                    <XBtn id={idx + 1} onClick={() => deleteReview(idx)}>
                      x
                    </XBtn>
                  </ReviewDetail>
                );
              })}
            </AddReview>
            {reviews?.map((hostreview, idx) => {
              return (
                <ReviewDetail key={idx}>
                  <Bold>{hostreview.name}</Bold>
                  <Detail>{hostreview.review}</Detail>
                </ReviewDetail>
              );
            })}
          </>
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
  text-align: justify;
`;
const Bold = styled.div`
  font-weight: 700;
  width: 5em;
  padding-left: 0.1em;
`;

const ReviewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1em 0em;
`;

const ReviewDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1em 0em 0em 0em;
  position: relative;
`;

const TestArea = styled.div`
  display: flex;
  gap: 1em;
`;

const ProfileBold = styled.div`
  font-weight: 700;
`;

const Detail = styled.p`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0.5em;
  text-align: justify;
  :last-child {
    border: 0px;
    padding-bottom: 0px;
  }
`;

const AddReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  button {
    width: 4em;
    height: 5em;
    border: 1px solid lightgray;
    border-radius: 7px;
    background-color: white;
    color: gray;
  }
`;

const TextInput = styled.textarea`
  width: 26em;
  min-height: 5em;
  padding: 1em;
  border: 1px solid lightgray;
  border-radius: 7px;
  resize: none;
`;

const XBtn = styled.div`
  cursor: pointer;
  color: #b2afaf;
  position: absolute;
  right: 1em;
`;
