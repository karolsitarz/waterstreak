import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

import { ObjectDate } from "../../util/time";
import LinkedProgress from "../Progress/LinkedProgress";

interface Props {
  pos?: number;
  disabled?: boolean;
  date: ObjectDate;
}

export class CalendarItem extends Component<Props> {
  private styled: HTMLDivElement;
  public componentDidUpdate(): void {
    this.styled.style.animation = "none";
    setTimeout(() => (this.styled.style.animation = ""), 0);
  }
  public render(): JSX.Element {
    return (
      <StyledCalendarItem
        ref={e => (this.styled = e)}
        pos={this.props.pos}
        disabled={this.props.disabled}
      >
        <LinkedProgress date={this.props.date}>
          {this.props.date.d}
        </LinkedProgress>
      </StyledCalendarItem>
    );
  }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

export const StyledCalendarItem = styled.div<{
  pos?: number;
  disabled?: boolean;
}>`
  grid-column-start: ${props => props.pos || "auto"};
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  animation-name: ${fadeIn};
  animation-timing-function: ease;
  animation-fill-mode: backwards;
  animation-duration: 0.5s;
`;
