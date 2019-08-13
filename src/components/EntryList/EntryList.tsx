import React, { Component } from "react";
import styled from "styled-components";

import { intake } from "../../db";
import Entry from "./Entry";
import EntryGroup from "./EntryGroup";
import { addEntryListener } from "../../util/progressEvent";
import { InView } from "react-intersection-observer";
import { dateToObject } from "../../util/time";

interface State {
  entries: EntriesObject;
  length: number;
}

const StyledEntryList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 15em;
`;

interface EntriesObject {
  values: { [key: number]: number[] };
  days: number[];
}

export default class EntryList extends Component {
  public state: State = {
    entries: { values: {}, days: [] },
    length: 3
  };
  public componentDidMount(): void {
    // initial entries
    this.getFirstEntries();
    // add listener for live updating
    addEntryListener(this);
  }
  public async getFirstEntries(): Promise<void> {
    let keys: number[] = await intake.getAll();
    if (keys == null || keys.length === 0) {
      this.setState({ values: {}, days: [] });
      return;
    }

    keys = keys.sort().reverse();

    const entries: EntriesObject = { values: {}, days: [] };

    const { values, days } = entries;

    // generate entriesData
    for (let key of keys) {
      const i = new Date(key).setHours(0, 0, 0, 0);
      if (!values.hasOwnProperty(i)) {
        values[i] = [];
        days.push(i);
      }
      values[i].push(key);
    }

    this.setState({ entries });
  }

  public async updateEntry(date: Date): Promise<void> {
    const entries = { ...this.state.entries };
    let fetched = await intake.getKeysDay(dateToObject(date));
    if (fetched == null) return;
    if (!Array.isArray(fetched)) return;
    const i = new Date(date.getTime()).setHours(0, 0, 0, 0);

    // if there are no entries in the day
    if (fetched.length === 0) {
      if (entries.values.hasOwnProperty(i)) {
        delete entries.values[i];
        entries.days.splice(entries.days.indexOf(i), 1);
      }
      this.setState({ entries });
      return;
    }

    fetched = fetched.sort().reverse();
    entries.values[i] = [...fetched];
    this.setState({ entries });
    return;
  }

  private getMore(inView: boolean): void {
    if (!inView) return;
    if (this.state.length > this.state.entries.days.length) return;

    this.setState({ length: this.state.length + 2 });
  }

  public render(): JSX.Element {
    const entriesArray = [];
    const { values, days } = this.state.entries;

    for (let i = 0; i < this.state.length; i++) {
      if (i >= days.length) break;
      const day = days[i];
      const entryObjects: JSX.Element[] = [];
      for (let value of values[day]) {
        entryObjects.push(<Entry key={value} $id={value} />);
      }

      entriesArray.push(
        <EntryGroup key={`${day}-g`} $id={day}>
          {[...entryObjects]}
        </EntryGroup>
      );
    }

    return (
      <StyledEntryList>
        {entriesArray}
        <InView rootMargin="20px" onChange={inView => this.getMore(inView)}>
          <></>
        </InView>
      </StyledEntryList>
    );
  }
}
