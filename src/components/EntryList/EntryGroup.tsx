import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { printWithZero } from "../../util/time";

interface Props {
  $id: number;
}

const Label = styled.div`
  font-weight: bold;
  position: sticky;
  top: 1em;
  padding: 0.5em 0;
  background: #e5e5e5;
  width: 100%;
  z-index: 1;
  margin-top: 2em;
  border-radius: 0.5em;
  box-shadow: 0 0.75em 1em #0001;
  font-size: 0.85em;
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

export default class EntryGroup extends Component<Props> {
  public render(): JSX.Element {
    const date = new Date(this.props.$id);
    return (
      <StyledEntryGroup>
        <Label>
          {date.getFullYear()}-{printWithZero(date.getMonth() + 1)}-
          {printWithZero(date.getDate())}
        </Label>
        {this.props.children}
      </StyledEntryGroup>
    );
  }
}
