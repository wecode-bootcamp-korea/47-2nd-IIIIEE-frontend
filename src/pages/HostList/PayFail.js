import { useNavigate } from 'react-router-dom';
import style from './PayFailStyle';

const PayFail = () => {
  const navigate = useNavigate();

  const goToList = () => {
    navigate('/hostList');
  };
  return (
    <style.Full>
      <img alt="logo" src="./images/logo.png" />
      <div>
        <p>죄송합니다. </p>
        <p>결제가 취소되거나 실패되었습니다.</p>
      </div>
      <button onClick={goToList}>다시 결제하러 가기</button>
    </style.Full>
  );
};

export default PayFail;
