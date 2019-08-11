import React, { Component } from "react";
import styled from "styled-components";

import { printWithZero } from "../../util/time";
import { intake } from "../../db";
import { dispatchIntakeListeners } from "../../util/progressEvent";
import DeleteButton, { StyledButton } from "./DeleteButton";

const timeLimit = 9 * 3600000;

interface Props {
  $id: number;
}

interface State {
  value: number;
}

const Volume = styled.span`
  background-image: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Time = styled.span`
  color: var(--secondary);
`;

const RightSide = styled.span`
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const StyledEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 0.5em;
  font-weight: bold;
  &:hover ${StyledButton} {
    transform: translate3d(-1em, -50%, 0);
    opacity: 1;
    pointer-events: auto;
    & ~ ${RightSide} {
      transform: translate3d(-2.5em, 0, 0);
    }
  }
`;

export default class Entry extends Component<Props, State> {
  public state: State = {
    value: 0
  };
  public componentDidMount(): void {
    this.updateValue();
  }
  public async updateValue(): Promise<void> {
    const value = await intake.get(this.props.$id);
    this.setState({ value });
  }
  private async deleteEntry(): Promise<void> {
    const time = this.props.$id;
    if (new Date().getTime() - time > timeLimit) return;
    await intake.remove(time);
    dispatchIntakeListeners(new Date(time));
  }
  public render(): JSX.Element {
    const time = this.props.$id;
    const dateTime = new Date(time);
    return (
      <StyledEntry>
        {new Date().getTime() - time > timeLimit ? null : (
          <DeleteButton onClickHandle={() => this.deleteEntry()} />
        )}
        <Time>
          {printWithZero(dateTime.getHours())}:
          {printWithZero(dateTime.getMinutes())}
        </Time>
        <RightSide>
          <Volume>{this.state.value}</Volume>ml
        </RightSide>
      </StyledEntry>
    );
  }
}
