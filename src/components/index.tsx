import React from 'react';
import styled from 'styled-components';

import Input from './Input';
import Progress from './HydroProgress';
// import Progress from './Progress';
import { today } from '../util/time';
import Calendar from './Calendar';

const Section = styled.div`
  min-height: 100vh;
  padding: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Space = styled.div<{ size: number }>`
  width: ${props => props.size}em;
  height: ${props => props.size}em;
`;

export default class Hello extends React.Component<{}> {
  render() {
    return (
      <>
        <Section>
          <div>
            <h1>Hello, there!</h1>
            <h2>You're doing great!</h2>
          </div>
          <Space size={1.5} />
          <Progress main={true} date={today()} />
          <Space size={2.5} />
          <Input />
        </Section>
        <Section>
          <Calendar />
        </Section>
      </>
    );
  }
}