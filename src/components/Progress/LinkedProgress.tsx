import React, { Component } from "react";
import styled from "styled-components";

import Progress from "./Progress";
import { ObjectDate } from "../../util/time";
import { intake } from "../../db";
import {
  addProgressListener,
  removeProgressListener
} from "../../util/progressEvent";

const GOAL = 2000;

interface Props {
  date: ObjectDate;
  border?: number;
  main?: boolean;
}

interface State {
  progress: number;
}

const H1 = styled.h1`
  line-height: 0.7em;
`;
const H4 = styled.h4`
  line-height: 1em;
`;

export default class LinkedProgress extends Component<Props, State> {
  public state: Readonly<State> = {
    progress: 0
  };
  public componentDidMount(): void {
    addProgressListener(this, this.props.date);
    this.updateValue();
  }
  public componentWillUnmount(): void {
    removeProgressListener(this, this.props.date);
  }
  public async updateValue(): Promise<void> {
    const values = await intake.getValuesDay(this.props.date);
    // if is an empty array, return
    if (
      Array.isArray(values) &&
      values.length === 0 &&
      this.state.progress === 0
    )
      return;

    const progress = values.reduce((r, c) => (r += c), 0);
    this.setState({ progress });
  }
  public render(): JSX.Element {
    return this.props.main ? (
      <Progress progress={this.state.progress / GOAL}>
        {this.state.progress > GOAL ? (
          <H4>Goal reached!</H4>
        ) : (
          <>
            <H1>{GOAL - this.state.progress}</H1>
            <H4>ml to go</H4>
          </>
        )}
        <h6>out of {GOAL}</h6>
      </Progress>
    ) : (
      <Progress progress={this.state.progress / GOAL}>
        {this.props.children}
      </Progress>
    );
  }
}
