import React from "react";
import styled from "styled-components";

import Input from "./Input/IntakeInput";
import Progress from "./Progress/LinkedProgress";
import { today } from "../util/time";
import Calendar from "./Calendar";
import EntryList from "./EntryList";
import WeekLookup from "./Calendar/WeekLookup";
import GoalInput from "./Input/GoalInput";
import { Space, H3 } from "./Components";

const Section = styled.div<{ align: string; main?: boolean }>`
  min-height: ${props => (props.main ? "100vh" : "")};
  padding: 1.5em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.align};
  align-items: center;
`;

interface State {
  goalInput: boolean;
}

const Main = styled.div<{ enabled: boolean }>`
  overflow: auto;
  height: 100vh;
  pointer-events: ${props => (props.enabled ? "" : "none")};
`;

export default class Hello extends React.Component<{}, State> {
  public state: State = {
    goalInput: localStorage.init !== "true"
  };
  public render(): JSX.Element {
    return (
      <>
        <GoalInput
          enabled={this.state.goalInput}
          onClick={() => this.setState({ goalInput: false })}
        />
        <Main enabled={!this.state.goalInput}>
          <Section align="center" main={true}>
            <div>
              <h1>Hello, there!</h1>
              <H3>You&apos;re doing great!</H3>
            </div>
            <Space size={1.5} />
            <div onClick={() => this.setState({ goalInput: true })}>
              <Progress main={true} date={today()} />
            </div>
            <Space size={2.5} />
            <Input />
            <Space size={1.5} />
            <WeekLookup />
          </Section>
          <Section align="flex-start">
            <Calendar />
            <EntryList />
          </Section>
        </Main>
      </>
    );
  }
}
