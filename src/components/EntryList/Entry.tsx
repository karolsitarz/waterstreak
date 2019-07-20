import React, { Component } from "react";
import styled from "styled-components";
import { printWithZero } from "../../util/time";

interface Props {
  $id: number;
}

interface State {
  value: number;
}

export default class Entry extends Component<Props, State> {
  public state: State = {
    value: 0
  };
  public render(): JSX.Element {
    const dateTime = new Date(this.props.$id);
    return (
      <div>
        <span>
          {printWithZero(dateTime.getHours())}:
          {printWithZero(dateTime.getMinutes())}
        </span>
        <span>{this.state.value}</span>
      </div>
    );
  }
}
