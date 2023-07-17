import { useState } from 'react';

const useInputValue = initInput => {
  const [inputValue, setInputValue] = useState(initInput);

  const handleInput = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const initValue = () => {
    setInputValue(initInput);
  };

  return { inputValue, initValue, handleInput };
};

export default useInputValue;
