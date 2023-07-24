import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import useSelectBtn from '../../hooks/useSelectBtn';
import useFetch from '../../hooks/useFetch';

import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import FilterList from './FilterList';

const FilterBox = () => {
  const [openFilterList, setOpenFilterList] = useState(false);
  const [CalendarValue, onChange] = useState();
  const [visible, setVisible] = useState({
    time: '시간 추가',
    age: '연령대 추가',
    gender: '성별 추가',
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterListBtn = () => {
    setOpenFilterList(!openFilterList);
  };

  const allClickBtn = {
    district: '',
    time: '',
    age: '',
    gender: '',
  };

  const { clickBtn, handleClickButton } = useSelectBtn(allClickBtn);

  const location = useLocation();

  const handleClick = e => {
    handleClickButton(e);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    clickBtn.district && params.append('district', clickBtn.district);
    clickBtn.time && params.append('time', clickBtn.time);
    clickBtn.age && params.append('age', clickBtn.age);
    clickBtn.gender && params.append('gender', clickBtn.gender);
    CalendarValue && params.append('Date', CalendarValue);

    setSearchParams(params);
  }, [clickBtn, openFilterList, CalendarValue]);

  const { getData: districtDatas } = useFetch(
    `http://${process.env.REACT_APP_IP}/restaurants/categories/districts`,
  );

  // console.log(districtDatas.data);

  return (
    <>
      <Filter>
        <FilterTop className="filterTop">
          <button onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faChevronLeft} />
            이전
          </button>
          {location.pathname === '/' && (
            <div className="filterSearch" onClick={handleFilterListBtn}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              필터검색
            </div>
          )}
        </FilterTop>
        {location.pathname === '/' && (
          <FilterBottom className="filterBottom">
            <ul>
              {districtDatas?.data?.map(district => (
                <li key={district.id}>
                  <button
                    onClick={e => handleClick(e, district.name)}
                    value={district.id}
                    name="district"
                    style={{
                      color: `${
                        parseInt(clickBtn.district) === district.id
                          ? '#000'
                          : '#999'
                      }`,
                    }}
                  >
                    {district.name}
                  </button>
                </li>
              ))}
            </ul>
          </FilterBottom>
        )}
      </Filter>
      {openFilterList && (
        <FilterList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          visible={visible}
          setVisible={setVisible}
          CalendarValue={CalendarValue}
          onChange={onChange}
          clickBtn={clickBtn}
          handleClickButton={handleClickButton}
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
      display: flex;
      text-align: center;
      button {
        display: block;
        width: 4.5em;
        text-decoration: none;
      }
    }
  }
`;
