import style from './NotFoundStyle';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <style.Container>
      <style.TextBox>
        <style.Title>404 ERROR</style.Title>
        <style.Text>
          죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
        </style.Text>
        <style.Text>페이지의 주소가 잘못 입력되었거나,</style.Text>
        <style.Text>
          주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </style.Text>
        <style.Btns>
          <style.Btn onClick={() => navigate('/')}>메인으로</style.Btn>
          <style.Btn onClick={() => window.history.back()}>이전으로</style.Btn>
        </style.Btns>
      </style.TextBox>
    </style.Container>
  );
};

export default NotFound;
