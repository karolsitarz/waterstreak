import React, { Component } from "react";
import styled from "styled-components";

import Progress from "./Progress";
import { ObjectDate } from "../../util/time";
import { intake, goal } from "../../db";
import {
  addListener,
  removeListener,
  ProgressObserver
} from "../../util/progressEvent";

interface Props {
  date: ObjectDate;
  border?: number;
  main?: boolean;
}

interface State {
  progress: number;
  goal: number;
}

const H1 = styled.h1`
  line-height: 0.7em;
`;
const H4 = styled.h4`
  line-height: 1em;
`;

const MainContent = (props: State): JSX.Element => {
  const { progress, goal } = props;
  return progress == null || !goal ? (
    <></>
  ) : (
    <>
      {progress >= goal && goal > 0 ? (
        <H4>Goal reached!</H4>
      ) : (
        <>
          <H1>{goal - progress}</H1>
          <H4>ml to go</H4>
        </>
      )}
      <h6>out of {goal}</h6>
    </>
  );
};

export default class LinkedProgress extends Component<Props, State>
  implements ProgressObserver {
  private _isMounted = false;
  public state: State = {
    progress: undefined,
    goal: undefined
  };
  public componentDidMount(): void {
    this._isMounted = true;
    addListener(this, this.props.date);
    this.updateGoal();
    this.updateIntake();
  }
  public componentWillUnmount(): void {
    this._isMounted = false;
    removeListener(this, this.props.date);
  }
  public async updateIntake(): Promise<void> {
    const values = await intake.getValuesDay(this.props.date);
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
    const fetchedGoal = await goal.get(this.props.date);
    // if is an empty array, return
    if (!fetchedGoal) return;

    if (this._isMounted) this.setState({ goal: fetchedGoal });
  }
  public render(): JSX.Element {
    const { progress, goal } = this.state;
    const val = !goal || progress == null ? 0 : progress / goal;

    return (
      <Progress progress={val}>
        {this.props.main ? (
          <MainContent progress={progress} goal={goal} />
        ) : (
          this.props.children
        )}
      </Progress>
    );
  }
}
