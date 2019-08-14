import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { printWithZero, dateToObject } from "../../util/time";
import { goal } from "../../db";
import { addEntryGroupListener } from "../../util/progressEvent";

interface Props {
  $id: number;
}

const Label = styled.div`
  font-weight: bold;
  position: sticky;
  top: 1em;
  padding: 0.5em 1em;
  background: #e5e5e5;
  width: 100%;
  z-index: 1;
  margin-top: 2em;
  border-radius: 0.5em;
  box-shadow: 0 0.75em 1em #0001;
  font-size: 0.85em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const StyledEntryGroup = styled.div`
  width: 100%;
  animation-name: ${fadeIn};
  animation-timing-function: ease;
  animation-fill-mode: backwards;
  animation-duration: 0.5s;
`;

interface State {
  goal: number;
}

export default class EntryGroup extends Component<Props, State> {
  public state: State = {
    goal: undefined
  };
  public componentDidMount(): void {
    this.update();
    const date = dateToObject(new Date(this.props.$id));
    addEntryGroupListener(this, date);
  }
  public async update(): Promise<void> {
    const date = new Date(this.props.$id);
    const fetchedGoal = await goal.get(dateToObject(date));
    this.setState({ goal: fetchedGoal });
  }
  public render(): JSX.Element {
    const date = new Date(this.props.$id);
    return (
      <StyledEntryGroup>
        <Label>
          <span>
            {date.getFullYear()}-{printWithZero(date.getMonth() + 1)}-
            {printWithZero(date.getDate())}
          </span>
          <span>{this.state.goal ? `${this.state.goal}ml` : ""}</span>
        </Label>
        {this.props.children}
      </StyledEntryGroup>
    );
  }
}
