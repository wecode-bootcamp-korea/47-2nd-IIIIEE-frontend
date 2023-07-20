import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import FilterBox from './FilterBox';

const Nav = () => {
  const [openList, setOpenList] = useState(false);

  const handleListBtn = () => {
    setOpenList(!openList);
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
                <Link to="hostList">
                  <span>모임 목록</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>신청 목록</span>
                </Link>
              </li>
            </ListBox>
          )}
        </div>
        <div className="navMenu logoBtn">
          <Link to="">
            <Img src="./images/logo.png" alt="logo" />
          </Link>
        </div>
        <Link className="navMenu loginBtn" to="/">
          <FontAwesomeIcon icon={faCircleUser} />
          <span>로그인</span>
        </Link>
      </NavBox>
    </div>
  );
};

export default Nav;

const NavBox = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 440px;
  height: 8vh;
  background: #fff;
  border-top: 1px solid #e9ecef;
  z-index: 9999;

  .navMenu {
    display: flex;
    flex-direction: column;
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
  top: -10.1em;
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
