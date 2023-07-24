import React, { useState } from 'react';

import useFetch from '../../hooks/useFetch';

import { FILTERRING_BOX } from './NavData/filterListData';

import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

const FilterList = ({
  searchParams,
  setSearchParams,
  openFilterList,
  CalendarValue,
  onChange,
  handleFilterListBtn,
  clickBtn,
  handleClickButton,
  visible,
  setVisible,
}) => {
  const [openList, setOpenList] = useState(false);

  const handleListBtn = title => {
    setOpenList(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleClick = e => {
    handleClickButton(e);

    const { name, innerText } = e.target;
    setVisible({ ...visible, [name]: innerText });
  };

  const { getData: ageDatas } = useFetch(
    `http://${process.env.REACT_APP_IP}/rooms/categories/ages`,
  );
  const { getData: genderDatas } = useFetch(
    `http://${process.env.REACT_APP_IP}/rooms/categories/genders`,
  );
  const { getData: timeDatas } = useFetch(
    `http://${process.env.REACT_APP_IP}/rooms/categories/times`,
  );

  return (
    <FilterListBox>
      {openFilterList && (
        <div className="container">
          <CloseBtn onClick={handleFilterListBtn}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
          <div className="filtering">
            <div className="text" onClick={() => handleListBtn('날짜')}>
              <p>날짜</p>
              <span>{moment(CalendarValue).format('YYYY년 MM월 DD일')}</span>
            </div>
            {openList['날짜'] && (
              <StyledCalendar onChange={onChange} value={CalendarValue} />
            )}
          </div>

          <div className="filtering">
            <div className="text" onClick={() => handleListBtn('시간')}>
              <p>시간</p>
              <span>{visible.time}</span>
            </div>

            {openList['시간'] && (
              <ul>
                {timeDatas?.data?.map(time => (
                  <li key={time.id}>
                    <button
                      onClick={e => handleClick(e, time.hour)}
                      value={time.id}
                      name="time"
                      style={{
                        backgroundColor: `${
                          Number(clickBtn.time) === time.id ? '#fff6d6' : ''
                        }`,
                      }}
                    >
                      {time.hour}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filtering">
            <div className="text" onClick={() => handleListBtn('연령대')}>
              <p>연령대</p>
              <span>{visible.age}</span>
            </div>

            {openList['연령대'] && (
              <ul>
                {ageDatas?.data?.map(age => (
                  <li key={age.id}>
                    <button
                      onClick={e => handleClick(e, age.age_range)}
                      value={age.id}
                      name="age"
                      style={{
                        backgroundColor: `${
                          Number(clickBtn.age) === age.id ? '#fff6d6' : ''
                        }`,
                      }}
                    >
                      {age.age_range}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filtering">
            <div className="text" onClick={() => handleListBtn('성별')}>
              <p>성별</p>
              <span>{visible.gender}</span>
            </div>

            {openList['성별'] && (
              <ul>
                {genderDatas?.data?.map(gender => (
                  <li key={gender.id}>
                    <button
                      onClick={e => handleClick(e, gender.gender)}
                      value={gender.id}
                      name="gender"
                      style={{
                        backgroundColor: `${
                          Number(clickBtn.gender) === gender.id ? '#fff6d6' : ''
                        }`,
                      }}
                    >
                      {gender.gender}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* {FILTERRING_BOX &&
            FILTERRING_BOX.map(data => (
              <div className="filtering" key={data.id}>
                <div className="text" onClick={() => handleListBtn(data.title)}>
                  <p>{data.title}</p>
                  <span>{visible[data.titleEng]}</span>
                </div>

                {openList[data.title] && (
                  <ul>
                    {data.select.map(info => (
                      <li key={info.id}>
                        <button
                          onClick={e => handleClick(e, info.selectValue)}
                          value={info.id}
                          name={data.titleEng}
                          style={{
                            backgroundColor: `${
                              Number(clickBtn[data.titleEng]) === info.id
                                ? '#fff6d6'
                                : ''
                            }`,
                          }}
                        >
                          {info.selectValue}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))} */}
        </div>
      )}
    </FilterListBox>
  );
};

export default FilterList;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  margin-bottom: 1em;
  font-size: 1.5em;
  border-radius: 1em;
  border: 1px solid #999;
  background: #fff;

  svg {
    path {
      color: #999;
    }
  }
`;

const FilterListBox = styled.div`
  position: fixed;
  width: 440px;
  height: 100vh;
  padding-bottom: 5em;
  z-index: 9999;
  background: #eee;
  overflow: scroll;

  .container {
    padding: 2em;

    .filtering {
      display: flex;
      flex-direction: column;
      margin-bottom: 1em;
      padding: 0 1.5em;
      border-radius: 1em;
      background: #fff;
      box-shadow: 1px 0px 15px -10px gray;

      .text {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4em;

        span {
          font-weight: 600;
        }
      }

      ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20%, auto));
        gap: 1em;
        margin-bottom: 1.5em;

        li {
          button {
            cursor: pointer;
            width: 4.4em;
            padding: 0.5em;
            border: 1px solid #999;
            border-radius: 1em;
            background: #fff;
            color: ${props => props.theme.mainColor};
            font-weight: 600;
            font-size: 1em;

            &:hover {
              background: #fff6d6;
            }
          }
        }
      }
    }
  }
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  margin-bottom: 1em;

  .react-calendar__navigation__label__labelText {
    font-size: 1.3em;
  }

  .react-calendar__month-view__weekdays {
    font-size: 1em;
  }

  .react-calendar__tile--now {
    background: #ffdcbc;
    border-radius: 10em;
  }

  .react-calendar__tile--active {
    background: ${props => props.theme.mainColor} !important;
    border-radius: 10em;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    border-radius: 10em;
  }
`;
