import React, { Component } from "react";
// import styled from "styled-components";

import { getAllKeys } from "../../util/db";
import Entry from "./Entry";
import EntryGroup from "./EntryGroup";

interface State {
  entries: number[];
}

export default class EntryList extends Component {
  public state: State = {
    entries: []
  };
  public componentDidMount(): void {
    this.getValues();
  }
  private async getValues(): Promise<void> {
    let keys: number[] = await getAllKeys();
    keys = keys.sort().reverse();
    const aaa = [];
    for (let x of keys) {
      const i = new Date(x).setHours(0, 0, 0, 0);
      if (!(i in aaa)) aaa[i] = [];
      aaa[i].push(<Entry key={x} $id={x} />);
    }
    const entries = [];
    for (let x in aaa)
      entries.push(
        <EntryGroup key={Number.parseInt(x)} $id={Number.parseInt(x)}>
          {aaa[x]}
        </EntryGroup>
      );

    this.setState({ entries });
  }
  public render(): JSX.Element {
    return <div>{this.state.entries}</div>;
  }
}
