import React from "react";
import styled from "styled-components";

import Input from "./Input";
import Progress from "./Progress/LinkedProgress";
import { today } from "../util/time";
import Calendar from "./Calendar";
import EntryList from "./EntryList";

const Section = styled.div<{ align: string }>`
  min-height: 100vh;
  padding: 1em;
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
        <Section align="center">
          <div>
            <h1>Hello, there!</h1>
            <h2 style={{ color: "var(--secondary)" }}>
              You&apos;re doing great!
            </h2>
          </div>
          <Space size={1.5} />
          <Progress main={true} date={today()} />
          <Space size={2.5} />
          <Input />
        </Section>
        <Section align="flex-start">
          <Calendar />
          <EntryList />
        </Section>
      </>
    );
  }
}
