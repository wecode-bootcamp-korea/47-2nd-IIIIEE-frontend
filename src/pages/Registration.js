import { useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { styled } from 'styled-components';
import useModal from '../hooks/useModal';
import { CATHEGORY_DATAS, TIME_DATAS } from './REGISTRATION_DATA';
import { useNavigate } from 'react-router-dom';
import useInputValue from '../hooks/useInputValue';

const Registration = () => {
  const [value, onChange] = useState(new Date());
  const [uploadImg, setUploadImg] = useState(null);
  const imgRef = useRef();
  const [isOpen, handleModal] = useModal();
  const navigate = useNavigate();
  const [eachTag, setEachTag] = useState('');
  const [arrTag, setArrTag] = useState([]);

  console.log(arrTag);

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
  };

  const cancel = () => {
    navigate('/');
  };

  const handleTag = e => {
    setEachTag(e.target.value);
  };

  const createTag = () => {
    if (eachTag) {
      setArrTag(eachTag);
    } else {
      alert('글을 입력 후 클릭해주세요.');
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
        <p>더보기</p>
      </ModalBtn>
      {isOpen && (
        <DateBox>
          <Calendar onChange={onChange} value={value} />
          {TIME_DATAS.map(TIME_DATA => {
            return <button key={TIME_DATA.id}>{TIME_DATA.time}</button>;
          })}
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
      <CathegoryBtn>
        {CATHEGORY_DATAS.map(cathegory => {
          return <button key={cathegory.id}>{cathegory.name}</button>;
        })}
      </CathegoryBtn>
      <TagBtn>
        <GatheringInput
          placeholder="원하는 태그를 직접 입력해보세요."
          name="tag"
          onChange={e => handleTag(e)}
        />
        <button onClick={createTag}>추가</button>
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
  padding: 1em;
  height: 100vh;
  overflow: scroll;
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

const CathegoryBtn = styled.div`
  display: flex;
  gap: 1em;
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
  gap: 0.5em;
  button {
    border: 1px solid lightgray;
    border-radius: 7px;
    background-color: white;
    color: gray;
  }
`;

const TextInput = styled.textarea`
  width: 100%;
  padding: 1em;
  border: 1px solid lightgray;
  border-radius: 7px;
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
`;

const PeoPleNum = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  input {
    width: 2em;
  }
`;
