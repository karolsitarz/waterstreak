import React, { Component } from 'react';
import Progress from './Progress';
import { ObjectDate } from '../util/time';
import { getValuesDay } from '../util/db';
import { addProgressListener } from '../util/progressEvent';

const GOAL = 2000;

type Props = {
  date: ObjectDate
  border?: number
}

type State = {
  progress: number
}

export default class HydroProgress extends Component<Props, State> {
  state: Readonly<State> = {
    progress: 0
  }
  componentDidMount() {
    addProgressListener(this, this.props.date);
    this.updateValue();
  }
  async updateValue () {
    const values = await getValuesDay(this.props.date);
    const progress = values.reduce(((r, c) => r += c), 0);
    this.setState({ progress });
  }
  render() {
    return (
      <Progress
        progress={this.state.progress / GOAL}>
        {this.props.children}
      </Progress>
    );
  }
}