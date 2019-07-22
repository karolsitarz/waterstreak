import React, { Component } from "react";
import styled from "styled-components";

import { getAllKeys } from "../../util/db";
import Entry from "./Entry";
import EntryGroup from "./EntryGroup";
import { addEntryListener } from "../../util/progressEvent";

interface State {
  entries: number[];
  length: number;
}

interface UsedKeys {
  [key: number]: boolean;
}

const StyledEntryList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 15em;
`;

const Button = styled.div`
  font-weight: bold;
  padding: 0.5em 2em;
  background-image: var(--gradient);
  max-width: 100%;
  z-index: 1;
  border-radius: 0.5em;
  box-shadow: 0 0.75em 1em #0001;
  color: var(--bg);
  align-self: center;
  margin: 1em 0;
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
    let keys: number[] = await getAllKeys();
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
  public render(): JSX.Element {
    return (
      <StyledEntryList>
        {this.state.entries.slice(0, this.state.length)}
        {this.state.length > this.state.entries.length ? null : (
          <Button
            onClick={() => this.setState({ length: this.state.length + 3 })}
          >
            more
          </Button>
        )}
      </StyledEntryList>
    );
  }
}
