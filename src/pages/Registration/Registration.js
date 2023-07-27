import { useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { styled } from 'styled-components';
import useModal from '../../hooks/useModal';
import { useNavigate, useParams } from 'react-router-dom';
import useInputValue from '../../hooks/useInputValue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useSelectBtn from '../../hooks/useSelectBtn';
import style from './RegistrationStyle';
import useFetch from '../../hooks/useFetch';
import useRequireAuth from '../../hooks/useRequireAuth';

const Registration = () => {
  const loading = useRequireAuth();
  const [value, onChange] = useState(new Date());
  const [uploadImg, setUploadImg] = useState(null);
  const imgRef = useRef();
  const [isOpen, handleModal] = useModal();
  const navigate = useNavigate();
  const [eachTag, setEachTag] = useState('');
  const [arrTag, setArrTag] = useState([]);
  const [visibleTime, setVisibleTime] = useState('00:00');
  const [afterPost, setAfterPost] = useState(false);
  const [saveRoomId, setSaveRoomId] = useState();
  const [saveFormdata, setSaveFormdata] = useState({});
  const { getData: ageDatas } = useFetch(
    `http://${process.env.REACT_APP_IP}/rooms/categories/ages`,
  );
  const { getData: genderDatas } = useFetch(
    `http://${process.env.REACT_APP_IP}/rooms/categories/genders`,
  );
  const { getData: timeDatas } = useFetch(
    `http://${process.env.REACT_APP_IP}/rooms/categories/times`,
  );
  const params = useParams();
  const restaurant = params.restaurant;
  const { getData: idDatas } = useFetch(
    `http://${process.env.REACT_APP_IP}/restaurants/${restaurant}`,
  );

  const token = localStorage.getItem('token');

  //달력 리팩토링 예정
  // const dateValue = new Date(value);
  // const beforeDate = dateValue < new Date();
  // // const beforeTime = dateValue.toString().slice(5, 10);
  // console.log(new Date(value));
  // console.log('>>', new Date());
  // console.log('이전', beforeDate);
  // // console.log('시간', beforeTime);

  // const disableButton = () => {
  //   const tomorrow = new Date();
  //   tomorrow.setDate(tomorrow.getDate() + 1);
  //   const twoWeeksLater = new Date();
  //   twoWeeksLater.setDate(tomorrow.getDate() + 14);
  //   // return dateValue >= tomorrow && dateValue <= twoWeeksLater;
  // };

  // const tileDisabled = ({ date }) => {
  //   const today = new Date();
  //   const twoWeeksLater = new Date();
  //   twoWeeksLater.setDate(today.getDate() + 14);
  //   return date < today || date > twoWeeksLater;
  // };

  const initInput = {
    title: '',
    num: '1',
    text: '',
  };

  const allClickBtn = {
    time: '',
    age: '',
    gender: '',
  };

  const { inputValue, handleInput } = useInputValue(initInput);
  const { clickBtn, handleClickButton } = useSelectBtn(allClickBtn);

  const handleClickTime = (e, value) => {
    handleClickButton(e);
    setVisibleTime(value);
  };

  const saveImgFile = e => {
    const formData = new FormData();
    setSaveFormdata(e.target.files[0]);
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadImg(reader.result);
    };
    formData.append('image', file);
    formData.append('roomId', saveRoomId);
    setSaveFormdata(formData);
  };
  const postImg = async () => {
    await fetch(`http://${process.env.REACT_APP_IP}/rooms/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: saveFormdata,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.message === 'IMAGE_UPLOAD_SUCCESS') {
          navigate('/hostList');
        } else if (data.message === 'INVALID_DATA') {
          alert('이미지 업로드에 실패했습니다. 다시 확인해주세요.');
        }
      });
  };

  const createRoom = () => {
    fetch(`http://${process.env.REACT_APP_IP}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        restaurantId: idDatas.data,
        title: inputValue.title,
        date: value,
        timeId: clickBtn.time,
        maxNum: inputValue.num,
        content: inputValue.text,
        ageId: clickBtn.age,
        genderId: clickBtn.gender,
        tag: arrTag,
        roomStatusId: 1,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data) {
          setAfterPost(true);
          setSaveRoomId(data.data);
        } else if (data.message === 'INVALID_DATA_INPUT') {
          alert('입력사항 다시 확인해주세요.');
        } else if (data.message === 'EXISTED_DATA_INPUT') {
          alert('이미 예약된 모임이 있습니다.');
        }
      });
  };

  const cancel = () => {
    navigate('/');
  };

  const cancelImg = () => {
    setAfterPost(false);
  };

  const handleTag = e => {
    setEachTag(e.target.value);
  };

  const createTag = () => {
    if (eachTag) {
      setArrTag(arrTag => [...arrTag, eachTag]);
      setEachTag('');
    } else {
      alert('글을 입력 후 클릭해주세요.');
    }
  };

  const deleteTag = targetIdx => {
    if (arrTag.length > 0) {
      const newTag = arrTag.filter((tag, idx) => idx !== targetIdx);
      setArrTag(newTag);
    }
  };

  const numRegular = /[0-9]/g;
  const alertNum = inputValue.num === 0 || inputValue.num === '';

  const handleGatheringInput = e => {
    const { value } = e.target;
    if (value === '' || numRegular.test(value)) {
      handleInput(e);
    } else {
      return;
    }
  };

  const condition =
    inputValue.title &&
    inputValue.num !== '' &&
    inputValue.num !== 0 &&
    inputValue.text &&
    clickBtn.time &&
    clickBtn.age &&
    clickBtn.gender;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <style.Full>
      <style.GatheringInput
        placeholder="모임 제목을 적어주세요."
        name="title"
        onChange={e => handleInput(e)}
      />
      <style.ModalBtn onClick={handleModal}>
        {moment(value).format('YYYY년 MM월 DD일')}
        <p>{visibleTime}</p>
        <StyledIcon icon={faChevronDown} />
      </style.ModalBtn>
      {isOpen && (
        <style.DateBox>
          <StyledCalendar
            onChange={onChange}
            value={value}
            // beforeDate={beforeDate}
          />
          <style.TagBtns>
            {timeDatas?.data?.map(time => {
              return (
                <button
                  key={time.id}
                  onClick={e => handleClickTime(e, time.hour)}
                  value={time.id}
                  name="time"
                  style={{
                    backgroundColor: `${
                      Number(clickBtn.time) === time.id ? '#fff6d6' : ''
                    }`,
                  }}
                >
                  {time.hour}
                </button>
              );
            })}
          </style.TagBtns>
        </style.DateBox>
      )}
      <style.PeoPleNum checkNum={alertNum}>
        <p>원하는 인원 수</p>
        <input
          value={inputValue.num}
          name="num"
          onChange={e => handleGatheringInput(e)}
        />
        <p>명</p>
        {alertNum && (
          <style.AlertNumber alertNum={alertNum}>
            인원수는 1 이상이어야 합니다.
          </style.AlertNumber>
        )}
      </style.PeoPleNum>
      <style.TextInput
        placeholder="모임 내용에 대해 상세히 적어주세요."
        name="text"
        onChange={e => handleInput(e)}
      />
      <style.TagBtns>
        {ageDatas?.data?.slice(0, 8).map(age => {
          return (
            <button
              key={age.id}
              name="age"
              value={age.id}
              onClick={handleClickButton}
              style={{
                backgroundColor: `${
                  Number(clickBtn.age) === age.id ? '#fff6d6' : ''
                }`,
              }}
            >
              {age.ageRange}
            </button>
          );
        })}
      </style.TagBtns>
      <style.TagBtns>
        {genderDatas?.data?.slice(0, 3).map(gender => {
          return (
            <button
              key={gender.id}
              value={gender.id}
              name="gender"
              onClick={handleClickButton}
              style={{
                backgroundColor: `${
                  Number(clickBtn.gender) === gender.id ? '#fff6d6' : ''
                }`,
              }}
            >
              {gender.gender}
            </button>
          );
        })}
      </style.TagBtns>
      <style.TagBtn>
        <style.TagContainer>
          <style.GatheringInput
            placeholder="원하는 태그를 직접 입력해보세요."
            name="tag"
            value={eachTag}
            onChange={e => handleTag(e)}
          />
          <button onClick={createTag}>추가</button>
        </style.TagContainer>
        <style.TagBtns>
          {arrTag.map((tag, idx) => {
            return (
              <style.EachTagBtn key={idx}>
                <p>{tag}</p>
                <style.XBtn id={idx + 1} onClick={() => deleteTag(idx)}>
                  x
                </style.XBtn>
              </style.EachTagBtn>
            );
          })}
        </style.TagBtns>
      </style.TagBtn>
      {!afterPost ? (
        <style.RegisteBtns>
          <style.RegisteBtn
            disabled={!condition}
            condition={condition}
            onClick={createRoom}
          >
            등록
          </style.RegisteBtn>
          <button onClick={cancel}>취소</button>
        </style.RegisteBtns>
      ) : (
        <style.ImgBox>
          <style.FileForm>
            <label for="file">
              이 곳을 클릭해 모임을 대표할 사진을 올려주세요.
            </label>
            <input
              type="file"
              accept="image/*"
              id="file"
              onChange={saveImgFile}
              ref={imgRef}
            />
          </style.FileForm>
          <style.GatheringImg
            src={uploadImg ? uploadImg : '/images/logo.png'}
            alt="모임 이미지"
          />
          <style.RegisteBtns>
            <style.RegisteBtn
              disabled={!imgRef?.current?.files[0]?.name}
              condition={imgRef?.current?.files[0]?.name}
              onClick={postImg}
            >
              등록
            </style.RegisteBtn>
            <button onClick={cancelImg}>취소</button>
          </style.RegisteBtns>
        </style.ImgBox>
      )}
    </style.Full>
  );
};
export default Registration;
const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  margin-bottom: 1em;

  .react-calendar__navigation__label__labelText {
    font-size: 1.3em;
  }

  .react-calendar__month-view__weekdays {
    font-size: 1em;
  }

  .react-calendar__tile--now {
    background: #ffdcbc;
    border-radius: 10em;
  }

  .react-calendar__tile--active {
    background: ${props => props.theme.mainColor} !important;
    border-radius: 10em;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    border-radius: 10em;
  }
  .react-calendar__month-view__days {
    button {
      background-color: ${props =>
        props.beforeDate ? 'lightgray' : 'none'} !important;
    }
  }
`;
