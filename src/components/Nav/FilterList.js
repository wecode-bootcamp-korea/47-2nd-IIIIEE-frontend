import React, { useState } from 'react';
import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { FILTERRING_BOX } from './NavData/filterListData';

import Calendar from 'react-calendar';
import moment from 'moment';

import 'react-calendar/dist/Calendar.css';

const FilterList = ({ openFilterList, handleFilterListBtn }) => {
  const [openList, setOpenList] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleListBtn = title => {
    setOpenList(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

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
              <span>{moment(value).format('YYYY년 MM월 DD일')}</span>
            </div>
            {openList['날짜'] && (
              <StyledCalendar onChange={onChange} value={value} />
            )}
          </div>
          {FILTERRING_BOX.map(info => (
            <div className="filtering" key={info.id}>
              <div className="text" onClick={() => handleListBtn(info.title)}>
                <p>{info.title}</p>
                <span>{info.title} 추가</span>
              </div>
              {openList[info.title] && (
                <ul>
                  {info.select.map(data => (
                    <li key={data.id}>
                      <button>{data.selectValue}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
