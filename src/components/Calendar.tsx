import React, { Component } from 'react';
import styled from 'styled-components';

import { ObjectDate, getFirstDay, getDaysInMonth, prevMonth, nextMonth } from '../util/time';
import HydroProgress from './HydroProgress';

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
  background: #0002;
  flex-shrink: 0;
`;

const InfoBar = styled.div`
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
          <Button onClick={() => this.setState({ date: prevMonth(this.state.date) })} />
          <InfoBar>{`${this.state.date.m < 10 ? '0' + this.state.date.m : this.state.date.m}-${this.state.date.y}`}</InfoBar>
          <Button onClick={() => this.setState({ date: nextMonth(this.state.date) })} />
        </ControlBar>
        <CalendarContainer>
          {generateDays(this.state.date)}
        </CalendarContainer>
      </div>
    );
  }
}