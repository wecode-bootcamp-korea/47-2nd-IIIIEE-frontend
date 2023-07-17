import { useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { styled } from 'styled-components';
import useModal from '../hooks/useModal';
import { useNavigate } from 'react-router-dom';
import useInputValue from '../hooks/useInputValue';
import { FILTERRING_BOX } from '../components/Nav/NavData/filterListData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Registration = () => {
  const [value, onChange] = useState(new Date());
  const [uploadImg, setUploadImg] = useState(null);
  const imgRef = useRef();
  const [isOpen, handleModal] = useModal();
  const navigate = useNavigate();
  const [eachTag, setEachTag] = useState('');
  const [arrTag, setArrTag] = useState([]);

  const initInput = {
    title: '',
    num: '',
    text: '',
  };
  const { handleInput } = useInputValue(initInput);

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadImg(reader.result);
    };
    // console.log(imgRef.current.files[0].name);
  };

  const cancel = () => {
    navigate('/');
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

  return (
    <Full>
      <GatheringInput
        placeholder="모임 제목을 적어주세요."
        name="title"
        onChange={e => handleInput(e)}
      />
      <ModalBtn onClick={handleModal}>
        {moment(value).format('YYYY년 MM월 DD일')}
        <p>시간 넣을 자리</p>
        <StyledIcon icon={faChevronDown} />
      </ModalBtn>
      {isOpen && (
        <DateBox>
          <StyledCalendar onChange={onChange} value={value} />
          <TagBtns>
            {FILTERRING_BOX[0].select.map(time => {
              return <button key={time.id}>{time.selectValue}</button>;
            })}
          </TagBtns>
        </DateBox>
      )}
      <PeoPleNum>
        <p>원하는 인원 수</p>
        <input name="num" onChange={e => handleInput(e)} />
        <p>명</p>
      </PeoPleNum>
      <FileInput>
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
      </FileInput>
      <GatheringImg
        src={uploadImg ? uploadImg : './images/logo.png'}
        alt="모임 이미지"
      />
      <TextInput
        placeholder="모임 내용에 대해 상세히 적어주세요."
        name="text"
        onChange={e => handleInput(e)}
      />
      <TagBtns>
        {FILTERRING_BOX[1].select.map(age => {
          return <button key={age.id}>{age.selectValue}</button>;
        })}
      </TagBtns>
      <TagBtns>
        {FILTERRING_BOX[2].select.map(gender => {
          return <button key={gender.id}>{gender.selectValue}</button>;
        })}
      </TagBtns>
      <TagBtn>
        <TagContainer>
          <GatheringInput
            placeholder="원하는 태그를 직접 입력해보세요."
            name="tag"
            value={eachTag}
            onChange={e => handleTag(e)}
          />
          <button onClick={createTag}>추가</button>
        </TagContainer>
        <TagBtns>
          {arrTag.map((tag, idx) => {
            return (
              <EachTagBtn key={idx}>
                <p>{tag}</p>
                <XBtn id={idx + 1} onClick={() => deleteTag(idx)}>
                  x
                </XBtn>
              </EachTagBtn>
            );
          })}
        </TagBtns>
      </TagBtn>

      <RegisteBtn>
        <button>등록</button>
        <button onClick={cancel}>취소</button>
      </RegisteBtn>
    </Full>
  );
};
export default Registration;

const Full = styled.div`
  padding: 150px 1em 1em 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ModalBtn = styled.div`
  display: flex;
  gap: 0.5em;
`;

const GatheringImg = styled.img`
  width: 100%;
`;

const RegisteBtn = styled.div`
  display: flex;
  gap: 1em;
  button {
    width: 50%;
    height: 3em;
    border: 0px;
    border-radius: 7px;
    color: white;
    background-color: #ff914d;
  }
`;

const FileInput = styled.div`
  width: 100%;
  padding: 1em;
  border: 1px solid lightgray;
  border-radius: 7px;

  label {
    color: #ff914d;
  }

  input {
    display: none;
  }
`;

const TagBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 8em;
  padding: 1em;
  border: 1px solid lightgray;
  border-radius: 7px;
  resize: none;
`;

const GatheringInput = styled.input`
  width: 100%;
  padding: 1em;
  border: 1px solid lightgray;
  border-radius: 7px;
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;

const TagBtns = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3em;
  button {
    cursor: pointer;
    width: 4em;
    padding: 0.5em;
    border: 1px solid #999;
    border-radius: 1em;
    background: #fff;
    color: ${props => props.theme.mainColor};
    font-weight: 600;
    font-size: 1em;

    &:hover {
      background: #fff6d6;
    }
  }
`;

const PeoPleNum = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  input {
    width: 2em;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5em;
  button {
    width: 4em;
    border: 1px solid lightgray;
    border-radius: 7px;
    background-color: white;
    color: gray;
  }
`;

const EachTagBtn = styled.div`
  display: flex;
  gap: 0.5em;
  padding: 0.7em;
  border: 1px solid #999;
  border-radius: 1em;
  background: #fff;
  p {
    color: ${props => props.theme.mainColor};
    font-weight: 600;
    font-size: 1em;
  }
`;

const XBtn = styled.div`
  cursor: pointer;
  color: #b2afaf;
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
`;

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
