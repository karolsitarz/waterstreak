import React from "react";
import styled from "styled-components";

import Input from "./Input";
import Progress from "./Progress/LinkedProgress";
import { today } from "../util/time";
import Calendar from "./Calendar";
import EntryList from "./EntryList";
import WeekLookup from "./Calendar/WeekLookup";

const Section = styled.div<{ align: string; main?: boolean }>`
  min-height: ${props => (props.main ? "100vh" : "")};
  padding: 1.5em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.align};
  align-items: center;
`;

const Space = styled.div<{ size: number }>`
  width: ${props => props.size}em;
  height: ${props => props.size}em;
`;

export default class Hello extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <>
        <Section align="center" main={true}>
          <div>
            <h1>Hello, there!</h1>
            <h3 style={{ color: "var(--secondary)" }}>
              You&apos;re doing great!
            </h3>
          </div>
          <Space size={1.5} />
          <Progress main={true} date={today()} />
          <Space size={2.5} />
          <Input />
          <Space size={1.5} />
          <WeekLookup />
        </Section>
        <Section align="flex-start">
          <Calendar />
          <EntryList />
        </Section>
      </>
    );
  }
}
