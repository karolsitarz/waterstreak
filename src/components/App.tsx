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
import Themed from "../style/Themed";

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
  dark: boolean;
}

const Main = styled.div<{ enabled: boolean }>`
  overflow: auto;
  height: 100vh;
  max-width: 960px;
  margin: auto;
  pointer-events: ${props => (props.enabled ? "" : "none")};
`;

const ThemeChange = styled.div<{ dark: boolean }>`
  width: 2em;
  height: 2em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  z-index: 1;
  background-color: var(--light);
  border-radius: 0.5em;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    transition: transform 0.5s ease;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    pointer-events: none;
  }
  &::before {
    background-color: var(--secondary);
    transform: ${props =>
      props.dark ? "translate(0, 0)" : "translate(5%, 0 )"};
  }
  &::after {
    background-color: var(--light);
    transform: ${props =>
      props.dark ? "translate(100%, -70%)" : "translate(30%, -20%)"};
  }
`;

export default class App extends React.Component<{}, State> {
  public state: State = {
    goalInput: localStorage.init !== "true",
    dark: false
  };
  private changeTheme(): void {
    this.setState({ dark: !this.state.dark });
  }
  public render(): JSX.Element {
    return (
      <Themed dark={this.state.dark}>
        <GoalInput
          enabled={this.state.goalInput}
          onClick={() => this.setState({ goalInput: false })}
        />
        <Main enabled={!this.state.goalInput}>
          <ThemeChange
            dark={this.state.dark}
            onClick={() => this.changeTheme()}
          />
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
      </Themed>
    );
  }
}
