import React, { Component } from "react";
import styled from "styled-components";

import { printWithZero } from "../../util/time";
import { getByKey } from "../../util/db";

interface Props {
  $id: number;
}

interface State {
  value: number;
}

const StyledEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 0.5em;
  font-weight: bold;
`;

const Volume = styled.span`
  background-image: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Time = styled.span`
  color: var(--secondary);
`;

export default class Entry extends Component<Props, State> {
  public state: State = {
    value: 0
  };
  public componentDidMount(): void {
    this.updateValue();
  }
  public async updateValue(): Promise<void> {
    const value = await getByKey(this.props.$id);
    this.setState({ value });
  }
  public render(): JSX.Element {
    const dateTime = new Date(this.props.$id);
    return (
      <StyledEntry>
        <Time>
          {printWithZero(dateTime.getHours())}:
          {printWithZero(dateTime.getMinutes())}
        </Time>
        <span>
          <Volume>{this.state.value}</Volume>ml
        </span>
      </StyledEntry>
    );
  }
}
