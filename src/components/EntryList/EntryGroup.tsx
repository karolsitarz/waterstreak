import React, { Component } from "react";
import styled from "styled-components";
import { printWithZero } from "../../util/time";

interface Props {
  $id: number;
}

export default class EntryGroup extends Component<Props> {
  public render(): JSX.Element {
    const date = new Date(this.props.$id);
    return (
      <div>
        <span>
          {date.getFullYear()}-{printWithZero(date.getMonth() + 1)}-
          {printWithZero(date.getDate())}
        </span>
        {this.props.children}
      </div>
    );
  }
}
