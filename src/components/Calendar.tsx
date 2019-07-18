import React, { Component } from 'react';
import styled from 'styled-components';

import { ObjectDate, getFirstDay, getDaysInMonth, prevMonth, nextMonth, today } from '../util/time';
import HydroProgress from './HydroProgress';

const thisDay = today();

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 20em;
  font-size: .75em;
  font-weight: bold;
`;

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  place-items: center;
  grid-gap: .25em;
  margin: .25em 0;
`;

const CalendarItem = styled.div<{ pos?: number, disabled?: boolean }>`
  grid-column-start: ${props => props.pos || 'auto'};
  opacity: ${props => props.disabled ? 0.3 : 1};
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: 2em;
  width: 100%;
`;

const Button = styled.div`
  height: 100%;
  width: 2em;
  fill: var(--secondary);
  flex-shrink: 0;
  svg {
    width: 70%;
    height: 70%;
    position: absolute;
    object-fit: contain;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const InfoBar = styled.div`
  color: var(--main);
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .75em;
`;


const generateDays = (date: ObjectDate): JSX.Element[] => {
  const daysInMonth = getDaysInMonth(date.y, date.m);
  const firstDay = getFirstDay(date.y, date.m) > 0 ? getFirstDay(date.y, date.m) : 7;

  const tempArray: JSX.Element[] = [];
  const returnArray: JSX.Element[] = [];

  // days peeking in the previous month
  if (firstDay > 1) {
    const previous = prevMonth(date);
    const daysInPrevMonth = getDaysInMonth(previous.y, previous.m);

    for (let i = 1; i < firstDay; i++) {
      const day = daysInPrevMonth - firstDay + 1 + i;
      tempArray.push(
        <CalendarItem
          disabled={true}
          pos={i}
          key={`${previous.y}-${previous.m}-${day}`}>
          <HydroProgress
            date={{ y: previous.y, m: previous.m, d: i }}>
            {day}
          </HydroProgress>
        </CalendarItem>
      );
    }
  }

  let weekDay = firstDay;
  // days in the current month
  for (let i = 1; i <= daysInMonth; i++) {
    tempArray.push(
      <CalendarItem
        pos={weekDay++}
        key={`${date.y}-${date.m}-${i}`}>
        <HydroProgress
          date={{ y: date.y, m: date.m, d: i }}>
          {i}
        </HydroProgress>
      </CalendarItem>
    );
    if (weekDay > 7) {
      returnArray.push(<WeekContainer key={`${tempArray[0].key}--${tempArray[6].key}`}>{[...tempArray]}</WeekContainer>);
      tempArray.splice(0);
      weekDay = 1;
    }
  }

  // days peeking in the next month
  if ((daysInMonth + firstDay - 1) % 7 > 0) {
    const next = nextMonth(date);
    for (let i = 1; i <= 7 - (daysInMonth + firstDay - 1) % 7; i++) {
      tempArray.push(
        <CalendarItem
          disabled={true}
          pos={weekDay++}
          key={`${next.y}-${next.m}-${i}`}>
          <HydroProgress
            date={{ y: next.y, m: next.m, d: i }}>
            {i}
          </HydroProgress>
        </CalendarItem>
      );
    }
    returnArray.push(<WeekContainer key={`${tempArray[0].key}--${tempArray[6].key}`}>{[...tempArray]}</WeekContainer>);
  }

  return returnArray;
}

type State = {
  date: ObjectDate
}

export default class Calendar extends Component<{}, State> {
  state: State = {
    date: {
      y: new Date().getFullYear(),
      m: new Date().getMonth() + 1,
      d: new Date().getDate()
    }
  }
  render() {
    return (
      <div>
        <ControlBar>
          <Button
            onClick={() => this.setState({ date: prevMonth(this.state.date) })}>
            <svg viewBox="0 0 600 600">
              <path d="M400.888,428.791L272.643,300,400.888,171.208a34.686,34.686,0,0,0-49.1-49L199.143,275.5a34.681,34.681,0,0,0,0,49.005L351.787,477.8a34.686,34.686,0,0,0,49.1-49.007h0Z"/>
            </svg>
          </Button>
          <InfoBar
            onClick={() => this.setState({ date: {...this.state.date, m: thisDay.m, y: thisDay.y} })}>
            {`${this.state.date.m < 10
              ? '0' + this.state.date.m
              : this.state.date.m}-${this.state.date.y}`}
          </InfoBar>
          <Button
          onClick={() => this.setState({ date: nextMonth(this.state.date) })}>
            <svg viewBox="0 0 600 600">
              <path d="M198.528,170.645L326.9,299.5,198.528,428.356a34.712,34.712,0,1,0,49.15,49.029l152.794-153.37a34.685,34.685,0,0,0,0-49.029L247.678,121.613a34.713,34.713,0,0,0-49.15,49.032h0Z"/>
            </svg>
          </Button>
        </ControlBar>
        <CalendarContainer>
          {generateDays(this.state.date)}
        </CalendarContainer>
      </div>
    );
  }
}