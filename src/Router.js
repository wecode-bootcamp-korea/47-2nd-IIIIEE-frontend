import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Main from './pages/Main';
import Frame from './components/Frame';
import Nav from './components/Nav';
import Footer from './components/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

const Layout = () => {
  return (
    <Frame>
      <Nav />
      <Outlet />
      <Footer />
    </Frame>
  );
};
