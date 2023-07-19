import { styled } from 'styled-components';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

const Frame = () => {
  return (
    <Full>
      <AD>
        <Video muted autoPlay loop>
          <source src="/videos/앙꼬.mp4" type="video/mp4" />
        </Video>
        <Text>
          <Title>혼밥하기 싫은 순간</Title>
          <Logo>
            <ColorText>맛</ColorText>나는 <ColorText>만남</ColorText>
          </Logo>
        </Text>
      </AD>
      <Right>
        <Nav />
        <Outlet />
        <Footer />
      </Right>
    </Full>
  );
};

export default Frame;

const Full = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
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
  padding: 1.2em;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Right = styled.div`
  width: 440px;
  height: 100vh;
  overflow: scroll;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 8px;
`;
const Video = styled.video`
  width: 20em;
  border-radius: 10px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Title = styled.p`
  font-size: 1em;
  font-weight: 900;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
`;

const ColorText = styled.span`
  color: ${props => props.theme.mainColor};
  font-weight: 700;
`;

const Logo = styled.p`
  font-size: 1.6em;
`;
