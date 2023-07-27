import { useEffect, useState } from 'react';
import Style from './HostStyle.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';
import useStarRating from '../../hooks/useStarRating.js';

const Host = ({ textData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addReviewText, setAddReviewText] = useState('');
  // const [visibleReview, setVisibleReview] = useState([]);
  const { rate, starArr, reactionStar, totalRating, makeZero } =
    useStarRating();
  const token = localStorage.getItem('token');
  const id = textData?.hostId;
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    if (textData?.hostId) {
      fetch(`http://${process.env.REACT_APP_IP}/reviews/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(result => setReviewData(result.data));
    }
  }, [textData, rate]);

  const handleReview = e => {
    setAddReviewText(e.target.value);
  };

  const createReview = () => {
    fetch(`http://${process.env.REACT_APP_IP}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        hostId: id,
        content: addReviewText,
        roomId: textData.roomId,
        rating: rate,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.message === 'SUCCESS POST REVIEW') {
          // setVisibleReview(visibleReview => [addReviewText, ...visibleReview]);
          setAddReviewText('');
          makeZero();
        } else if (data.message === '이미 댓글이 존재합니다') {
          alert('이미 댓글이 존재합니다.');
        } else {
          alert('글을 입력 후 클릭해주세요.');
        }
      });
  };

  // const deleteReview = targetIdx => {
  //   const newTag = visibleReview.filter((tag, idx) => idx !== targetIdx);
  //   setVisibleReview(newTag);
  // };

  const textWritingCondition = 1;

  return (
    <Style.All>
      <Style.Title>이 글의 host는 ?</Style.Title>
      <Style.Description>
        <Style.Left>
          <Style.HostImg alt="hostimg" src={textData?.hostProfileImage} />
          <Style.ProfileBold>{textData?.hostName}</Style.ProfileBold>
        </Style.Left>
        <Style.Right>
          <Style.Padding>
            <Style.ProfileBold>{textData?.hostGender}</Style.ProfileBold>
            <div>{textData?.hostAge}</div>
          </Style.Padding>
          <Style.Border />
          <Style.Padding>
            <Style.ProfileBold>평점</Style.ProfileBold>
            <div>{totalRating(reviewData)}</div>
            {/* <div>{totalRating(gatheringData)}</div> */}
          </Style.Padding>
          <Style.Border />
          <Style.Padding>
            죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는
            바람에도 나는 괴로워했다. 별을 노래하는 마음으로 모든 죽어가는 것을
            사랑해야지 그리고 나한테 주어진 길을 걸어가야겠다. ​오늘 밤에도 별이
            바람에 스치운다.
          </Style.Padding>
        </Style.Right>
      </Style.Description>

      <div>
        <Style.ReviewToggle>
          <div>{textData?.hostName} 님의 후기</div>
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
              {textData.roomStatusId === 3 &&
                textData.guestName !== textData.hostName && (
                  <Style.ReviewBox>
                    <Style.Name>
                      <Style.Bold>{textData.guestName}</Style.Bold>
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
                      <button
                        onClick={createReview}
                        disabled={!textWritingCondition}
                      >
                        작성
                      </button>
                    </Style.TestArea>
                  </Style.ReviewBox>
                )}
              {/* {visibleReview.map((review, idx) => {
                let guestStar = Array.from({ length: rate }, () => 0);
                return (
                  <Style.ReviewDetail key={idx}>
                    <Style.Name>
                      <Style.Bold>{textData.guestName}</Style.Bold>
                      <Style.GuestStar>
                        {guestStar.map((star, idx) => {
                          return <FontAwesomeIcon key={idx} icon={faStar} />;
                        })}
                      </Style.GuestStar>
                    </Style.Name>
                    <Style.Detail>{review}</Style.Detail>
                    <Style.XBtn id={idx + 1} onClick={() => deleteReview(idx)}>
                      x
                    </Style.XBtn>
                  </Style.ReviewDetail>
                );
              })} */}
            </Style.AddReview>
            {reviewData.length === 0 ? (
              <Style.PaddingTop>아직 후기가 없습니다.</Style.PaddingTop>
            ) : (
              reviewData?.map((hostreview, idx) => {
                let guestStar = Array.from(
                  { length: hostreview.rating },
                  () => 0,
                );
                return (
                  <Style.ReviewDetail key={idx}>
                    <Style.Name>
                      <Style.Bold>{hostreview?.guestName}</Style.Bold>
                      <Style.GuestStar>
                        {guestStar.map((star, idx) => {
                          return <FontAwesomeIcon key={idx} icon={faStar} />;
                        })}
                      </Style.GuestStar>
                    </Style.Name>
                    <Style.Detail>{hostreview?.content}</Style.Detail>
                  </Style.ReviewDetail>
                );
              })
            )}
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
