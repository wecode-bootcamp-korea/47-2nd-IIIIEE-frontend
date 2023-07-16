import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import FilterList from './FilterList';

import { FILTER_BOTTOM_LIST } from './NavData/filterBoxData';

const FilterBox = () => {
  const [openFilterList, setOpenFilterList] = useState(false);

  const handleFilterListBtn = () => {
    setOpenFilterList(!openFilterList);
  };
  return (
    <>
      <Filter>
        <FilterTop className="filterTop">
          <button onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faChevronLeft} />
            이전
          </button>
          <div className="filterSearch" onClick={handleFilterListBtn}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            필터검색
          </div>
        </FilterTop>
        <FilterBottom className="filterBottom">
          <ul>
            {FILTER_BOTTOM_LIST.map(borough => (
              <li key={borough.id}>
                <Link to={borough.link}>
                  <span>{borough.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </FilterBottom>
      </Filter>
      {openFilterList && (
        <FilterList
          openFilterList={openFilterList}
          handleFilterListBtn={handleFilterListBtn}
        />
      )}
    </>
  );
};

export default FilterBox;

const Filter = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 440px;
  background: #fff;
  border-bottom: 1px solid #e9ecef;
  z-index: 9999;
  box-shadow: 1px 0px 23px -10px gray;
`;

const FilterTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1em;
  border-bottom: 1px solid #e9ecef;

  button {
    border: none;
    background: none;
    color: ${props => props.theme.mainColor};
    font-size: 1em;

    svg {
      padding-right: 0.1em;
      path {
        color: ${props => props.theme.mainColor};
      }
    }
  }

  .filterSearch {
    display: flex;
    align-items: center;
    width: 85%;
    height: 3em;
    border: 1px solid #e9ecef;
    border-radius: 2em;
    box-shadow: 1px 0px 16px -10px gray;
    color: ${props => props.theme.mainColor};

    svg {
      padding: 0 1em;
      path {
        color: ${props => props.theme.mainColor};
      }
    }
  }
`;

const FilterBottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3em;
  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    display: flex;
    li {
      text-align: center;
      a {
        display: block;
        width: 4em;
        text-decoration: none;

        span {
          color: #999;
        }
      }
    }
  }
`;
