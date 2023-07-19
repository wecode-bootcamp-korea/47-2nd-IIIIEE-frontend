import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Gathering from './pages/Gathering';
import Frame from './components/Frame';
import Registration from './pages/Registration';
import RestaurantInfo from './pages/RestaurantInfo/RestaurantInfo';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frame />}>
          <Route path="" element={<Main />} />
          <Route path="registration" element={<Registration />} />
          <Route path="gathering" element={<Gathering />} />
          <Route path="restaurantInfo" element={<RestaurantInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
