/*global Kakao*/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCircleUser as regularCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser as solidCircleUser } from '@fortawesome/free-regular-svg-icons';
import FilterBox from './FilterBox';

const Nav = () => {
  const [openList, setOpenList] = useState(false);
  const navigate = useNavigate();

  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleListBtn = () => {
    setOpenList(!openList);
  };

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="Nav">
      <FilterBox />
      <NavBox>
        <div className="navMenu ListBtn">
          <FontAwesomeIcon icon={faBars} onClick={handleListBtn} />
          <span>목록</span>
          {openList && (
            <ListBox>
              <li>
                <Link to="hostlist">
                  <span>모임 목록</span>
                </Link>
              </li>
              <li>
                <Link to="gestList">
                  <span>신청 목록</span>
                </Link>
              </li>
            </ListBox>
          )}
        </div>
        <div className="navMenu logoBtn">
          <Link to="/">
            <Img src="./images/logo.png" alt="logo" />
          </Link>
        </div>
        {token ? (
          <button className="navMenu loginBtn" onClick={handleLogout}>
            <FontAwesomeIcon icon={regularCircleUser} />
            <span>로그아웃</span>
          </button>
        ) : (
          <button className="navMenu loginBtn" onClick={handleLogin}>
            <FontAwesomeIcon icon={solidCircleUser} />
            <span>로그인 / 회원가입</span>
          </button>
        )}
      </NavBox>
    </div>
  );
};

export default Nav;

const NavBox = styled.div`
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  width: 440px;
  height: 8vh;
  background: #fff;
  border-top: 1px solid #e9ecef;
  z-index: 9999;

  .navMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    text-decoration: none;

    svg {
      font-size: 2em;
      path {
        color: #999;
      }
    }

    span {
      padding-top: 0.2em;
      font-size: 0.8em;
      text-align: center;
    }
  }
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  width: 5em;
`;

const ListBox = styled.ul`
  position: absolute;
  top: -10em;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 10em;
  background: #fff;
  box-shadow: 3px -3px 17px -14px gray;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    border-top: 1px solid #e9ecef;

    a {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      font-size: 1.5em;
      text-align: center;
      line-height: 3.5em;
    }
  }
`;
