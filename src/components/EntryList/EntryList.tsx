import React, { Component } from "react";
import styled from "styled-components";

import { intake } from "../../db";
import Entry from "./Entry";
import EntryGroup from "./EntryGroup";
import { addEntryListener } from "../../util/progressEvent";
import { InView } from "react-intersection-observer";

interface State {
  entries: number[];
  length: number;
}

const StyledEntryList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 15em;
`;

export default class EntryList extends Component {
  public state: State = {
    entries: [],
    length: 3
  };
  public componentDidMount(): void {
    // initial entries
    this.getValues();
    // add listener for live updating
    addEntryListener(this);
  }
  public async getValues(): Promise<void> {
    let keys: number[] = await intake.getAll();
    if (keys == null || keys.length === 0) {
      if (this.state.entries.length === 0) return;
      else {
        this.setState({ entries: [] });
        return;
      }
    }

    keys = keys.sort().reverse();
    const entries: JSX.Element[] = [];
    const temp: JSX.Element[] = [];
    let last: number = undefined;
    let i: number;

    for (let key of keys) {
      i = new Date(key).setHours(0, 0, 0, 0);
      // if a new group comes in
      if (i !== last) {
        // skip the first time
        if (last) {
          entries.push(
            <EntryGroup key={`${last}-g`} $id={last}>
              {[...temp]}
            </EntryGroup>
          );
          temp.splice(0);
        }
        // track when the next group starts
        last = i;
      }
      temp.push(<Entry key={key} $id={key} />);
    }

    // last group
    entries.push(
      <EntryGroup key={`${i}-g`} $id={i}>
        {[...temp]}
      </EntryGroup>
    );
    this.setState({ entries });
  }
  private getMore(inView: boolean): void {
    if (!inView) return;
    if (this.state.length > this.state.entries.length) return;

    this.setState({ length: this.state.length + 2 });
  }
  public render(): JSX.Element {
    return (
      <StyledEntryList>
        {this.state.entries.slice(0, this.state.length)}
        <InView rootMargin="20px" onChange={inView => this.getMore(inView)}>
          <></>
        </InView>
      </StyledEntryList>
    );
  }
}
