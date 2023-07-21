import { useEffect, useState } from 'react';
import Style from './HostStyle.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';
import useStarRating from '../../hooks/useStarRating.js';

const Host = ({ textData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addReviewText, setAddReviewText] = useState('');
  const [visibleReview, setVisibleReview] = useState([]);
  const { rate, starArr, reactionStar, totalRating } = useStarRating();
  const { hostName, hostGender, hostAge } = textData;

  const token = localStorage.getItem('token');

  const [gatheringData, setGatheringData] = useState({});
  useEffect(() => {
    fetch('/data/hostReview.json')
      .then(response => response.json())
      .then(result => setGatheringData(result.data));
  }, []);

  const handleReview = e => {
    setAddReviewText(e.target.value);
  };

  const createReview = () => {
    // if (addReviewText) {
    //   setVisibleReview(visibleReview => [addReviewText, ...visibleReview]);
    //   setAddReviewText('');
    // } else {
    //   alert('글을 입력 후 클릭해주세요.');
    // }

    fetch(`http://52.78.25.104:3000/review/host/${gatheringData.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        hostId: 1,
        content: addReviewText,
        roomId: 1,
        rating: rate,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.message === 'SUCCESS POST REVIEW') {
          setVisibleReview(visibleReview => [addReviewText, ...visibleReview]);
          setAddReviewText('');
        } else {
          alert('글을 입력 후 클릭해주세요.');
        }
      });
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
          <Style.HostImg alt="hostimg" src="/images/IMG_7631.jpg" />
          <Style.ProfileBold>{hostName}</Style.ProfileBold>
        </Style.Left>
        <Style.Right>
          <Style.Padding>
            <Style.ProfileBold>{hostGender}</Style.ProfileBold>
            <div>{hostAge}</div>
          </Style.Padding>
          <Style.Border />
          <Style.Padding>
            <Style.ProfileBold>평점</Style.ProfileBold>
            <div>{totalRating(gatheringData)}</div>
          </Style.Padding>
          <Style.Border />
          <Style.Padding>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
          </Style.Padding>
        </Style.Right>
      </Style.Description>

      <div>
        <Style.ReviewToggle>
          <div>{hostName} 님의 후기</div>
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
            {gatheringData?.map((hostreview, idx) => {
              let guestStar = Array.from(
                { length: hostreview.rating },
                () => 0,
              );
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
                  <Style.Detail>{hostreview.content}</Style.Detail>
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
