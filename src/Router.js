import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Frame from './components/Frame';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/frame" element={<Frame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
