import React, { Component } from "react";
import styled from "styled-components";

import LinkedProgress from "../Progress/LinkedProgress";
import { dateToObject } from "../../util/time";
import { WeekContainer } from "./WeekContainer";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const fullDayMs = 1000 * 60 * 60 * 24;

const TodayProgress = styled.div`
  width: 100%;
  height: 100%;
  min-width: 10px;
  min-height: 10px;
  max-width: 13em;
  max-height: 13em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: var(--gradient);
  color: var(--bg);
  border-radius: 50%;
  letter-spacing: 0;
`;

interface State {
  content: JSX.Element[];
}

export default class WeekLookup extends Component<{}, State> {
  public state: State = {
    content: []
  };
  public componentDidMount(): void {
    const today = new Date();
    const todayWeekday = today.getDay() === 0 ? 7 : today.getDay();
    const content = [];
    for (let i = 1; i <= 7; i++) {
      if (i === todayWeekday) {
        content.push(<TodayProgress key={i}>{WEEKDAYS[i - 1]}</TodayProgress>);
        continue;
      }

      const date = dateToObject(
        new Date(today.getTime() - fullDayMs * (todayWeekday - i))
      );
      content.push(
        <LinkedProgress key={i} date={date}>
          {WEEKDAYS[i - 1]}
        </LinkedProgress>
      );
    }
    this.setState({ content });
  }
  public render(): JSX.Element {
    return <WeekContainer>{this.state.content}</WeekContainer>;
  }
}
