import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { printWithZero, dateToObject } from "../../util/time";
import { goal, intake } from "../../db";
import {
  addListener,
  removeListener,
  ProgressObserver
} from "../../util/progressEvent";
import { Accent } from "../Components";

interface Props {
  $id: number;
}

const Label = styled.div`
  font-weight: bold;
  position: sticky;
  top: 1em;
  padding: 0.5em 1em;
  background-color: var(--light);
  width: 100%;
  z-index: 1;
  margin-top: 2em;
  border-radius: 0.5em;
  box-shadow: 0 0.75em 1em #0001;
  font-size: 0.85em;
  > span {
    transition: transform 0.3s ease, opacity 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-child(1) {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    &:nth-child(2) {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 100%;
      width: 100%;
      transform: translate3d(-50%, calc(-50% + 1em), 0);
      opacity: 0;
    }
  }
  &:hover {
    > span:nth-child(1) {
      transform: translate3d(0, -1em, 0);
      opacity: 0;
    }
    > span:nth-child(2) {
      transform: translate3d(-50%, -50%, 0);
      opacity: 1;
    }
  }
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
  progress: number;
  goal: number;
}

export default class EntryGroup extends Component<Props, State>
  implements ProgressObserver {
  private _isMounted = false;
  public state: State = {
    progress: undefined,
    goal: undefined
  };
  public componentDidMount(): void {
    this._isMounted = true;
    const date = dateToObject(new Date(this.props.$id));
    addListener(this, date);
    this.updateIntake();
    this.updateGoal();
  }
  public componentWillUnmount(): void {
    this._isMounted = false;
    const date = dateToObject(new Date(this.props.$id));
    removeListener(this, date);
  }
  public async updateIntake(): Promise<void> {
    const date = new Date(this.props.$id);
    const values = await intake.getValuesDay(dateToObject(date));
    // if is an empty array, return
    if (
      Array.isArray(values) &&
      values.length === 0 &&
      this.state.progress === 0
    )
      return;

    const progress = values.reduce((r, c) => (r += c), 0);
    if (this._isMounted) this.setState({ progress });
  }
  public async updateGoal(): Promise<void> {
    const date = new Date(this.props.$id);
    const fetchedGoal = await goal.get(dateToObject(date));
    if (this._isMounted) this.setState({ goal: fetchedGoal });
  }
  public render(): JSX.Element {
    const date = new Date(this.props.$id);
    const { progress, goal } = this.state;
    const string = !goal || progress == null ? "" : `${progress}/${goal} ml`;
    const percentage =
      !goal || progress == null
        ? ""
        : `${((progress * 100) / goal).toFixed(0)}%`;

    return (
      <StyledEntryGroup>
        <Label>
          <span>
            {date.getFullYear()}-{printWithZero(date.getMonth() + 1)}-
            {printWithZero(date.getDate())}
          </span>
          <span>
            <Accent>{percentage}</Accent>&ensp;-&ensp;{string}
          </span>
        </Label>
        {this.props.children}
      </StyledEntryGroup>
    );
  }
}
