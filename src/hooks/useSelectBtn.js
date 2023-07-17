import { useState } from 'react';

const useSelectBtn = allClickBtn => {
  const [clickBtn, setClickBtn] = useState(allClickBtn);

  const handleClickButton = e => {
    const { name, value } = e.target;
    setClickBtn({ ...clickBtn, [name]: value });
  };

  return { clickBtn, handleClickButton };
};

export default useSelectBtn;
