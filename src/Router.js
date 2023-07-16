import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Main from './pages/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { styled } from 'styled-components';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frame />}>
          <Route path="" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

const Frame = () => {
  return (
    <Full>
      <AD />
      <Right>
        <Nav />
        <Outlet />
        <Footer />
      </Right>
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

const Right = styled.div`
  width: 440px;
  height: 100vh;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 8px;
`;
