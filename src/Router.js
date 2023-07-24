import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Gathering from './pages/Gathering/Gathering';
import Frame from './components/Frame';
import Registration from './pages/Registration';
import RestaurantInfo from './pages/RestaurantInfo/RestaurantInfo';
import HoseList from './pages/HostList/HoseList';
import KakaoLogin from './components/Nav/KakaoLogin';
import GestList from './pages/GestList/GestList';
import NotFound from './pages/NotFound/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frame />}>
          <Route path="" element={<Main />} />
          <Route path="registration" element={<Registration />} />
          <Route path="gathering" element={<Gathering />} />
          <Route
            path="restaurantInfo/:restaurantId"
            element={<RestaurantInfo />}
          />
          <Route path="hostList" element={<HoseList />} />
          <Route path="kakakoLogin" element={<KakaoLogin />} />
          <Route path="gestlist" element={<GestList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
