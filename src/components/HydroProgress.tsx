import React, { Component } from 'react';
import styled from 'styled-components';

import Progress from './Progress';
import { ObjectDate } from '../util/time';
import { getValuesDay } from '../util/db';
import { addProgressListener, removeProgressListener } from '../util/progressEvent';

const GOAL = 2000;

type Props = {
  date: ObjectDate
  border?: number
  main?: boolean
}

type State = {
  progress: number
}

const H1 = styled.h1`
  line-height: 0.7em;
`;
const H4 = styled.h4`
  line-height: 1em;
`;

export default class HydroProgress extends Component<Props, State> {
  state: Readonly<State> = {
    progress: 0
  }
  componentDidMount() {
    addProgressListener(this, this.props.date);
    this.updateValue();
  }
  componentWillUnmount() {
    removeProgressListener(this, this.props.date);
  }
  async updateValue () {
    const values = await getValuesDay(this.props.date);
    if (Array.isArray(values) && values.length === 0 && this.state.progress === 0) return;
    const progress = values.reduce(((r, c) => r += c), 0);
    this.setState({ progress });
  }
  render() {
    return this.props.main ? (
      <Progress
        progress={this.state.progress / GOAL}>
        {this.state.progress > GOAL
          ? <H4>Goal reached!</H4>
          : <>
            <H1>{GOAL - this.state.progress}</H1>
            <H4>ml to go</H4>
          </>}
        <h6>out of {GOAL}</h6>
      </Progress>
    ) : (
      <Progress
        progress={this.state.progress / GOAL}>
        {this.props.children}
      </Progress>
    );
  }
}