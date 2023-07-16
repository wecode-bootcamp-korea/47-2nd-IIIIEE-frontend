import { styled } from 'styled-components';

const Frame = () => {
  return (
    <Full>
      <AD />
      <Main />
    </Full>
  );
};

const Full = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const AD = styled.div`
  width: 360px;
  height: 420px;
  background-color: white;
  border-radius: 10px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Main = styled.div`
  width: 440px;
  height: 100vh;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 8px;
`;

export default Frame;
