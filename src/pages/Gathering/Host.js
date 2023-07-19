import { useEffect, useState } from 'react';
import Style from './HostStyle.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';
import useStarRating from '../../hooks/useStarRating.js';

const Host = () => {
  const [hostData, setHostData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [addReviewText, setAddReviewText] = useState('');
  const [visibleReview, setVisibleReview] = useState([]);
  const { name, gender, age, discription, reviews } = hostData;
  const { rate, starArr, reactionStar, totalRating } = useStarRating();

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
    <Style.All>
      <Style.Title>이 글의 host는 ?</Style.Title>
      <Style.Description>
        <Style.Left>
          <Style.HostImg alt="hostimg" src="./images/IMG_7631.jpg" />
          <Style.ProfileBold>{name}</Style.ProfileBold>
        </Style.Left>
        <Style.Right>
          <Style.Padding>
            <Style.ProfileBold>{gender}</Style.ProfileBold>
            <div>{age}세</div>
          </Style.Padding>
          <Style.Border />
          <Style.Padding>
            <Style.ProfileBold>평점</Style.ProfileBold>
            <div>{totalRating(hostData)}</div>
          </Style.Padding>
          <Style.Border />
          <Style.Padding>{discription}</Style.Padding>
        </Style.Right>
      </Style.Description>

      <div>
        <Style.ReviewToggle>
          <div>{name} 님의 후기</div>
          <StyledIcon
            icon={faChevronDown}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            더보기
          </StyledIcon>
        </Style.ReviewToggle>
        {isOpen && (
          <>
            <Style.AddReview>
              <Style.Name>
                <Style.Bold>양동희</Style.Bold>
                <Style.AllStar>
                  {starArr?.map((star, idx) => {
                    return (
                      <Style.AllStar star={star <= rate} key={idx}>
                        <FontAwesomeIcon
                          icon={faStar}
                          onClick={() => reactionStar(star)}
                        />
                      </Style.AllStar>
                    );
                  })}
                </Style.AllStar>
              </Style.Name>
              <Style.TestArea>
                <Style.TextInput
                  value={addReviewText}
                  onChange={e => handleReview(e)}
                />
                <button onClick={createReview}>작성</button>
              </Style.TestArea>
              {visibleReview.map((review, idx) => {
                return (
                  <Style.ReviewDetail key={idx}>
                    <Style.Bold>양동희</Style.Bold>

                    <Style.Detail>{review}</Style.Detail>
                    <Style.XBtn id={idx + 1} onClick={() => deleteReview(idx)}>
                      x
                    </Style.XBtn>
                  </Style.ReviewDetail>
                );
              })}
            </Style.AddReview>
            {reviews?.map((hostreview, idx) => {
              let guestStar = Array.from({ length: hostreview.star }, () => 0);
              return (
                <Style.ReviewDetail key={idx}>
                  <Style.Name>
                    <Style.Bold>{hostreview.name}</Style.Bold>
                    <Style.GuestStar>
                      {guestStar.map((star, idx) => {
                        return <FontAwesomeIcon key={idx} icon={faStar} />;
                      })}
                    </Style.GuestStar>
                  </Style.Name>
                  <Style.Detail>{hostreview.review}</Style.Detail>
                </Style.ReviewDetail>
              );
            })}
          </>
        )}
      </div>
    </Style.All>
  );
};

export default Host;

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
