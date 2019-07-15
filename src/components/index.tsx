import React from 'react';
import styled from 'styled-components';

import Progress from './Progress';
import Input from './Input';

const Section = styled.div`
  min-height: 100vh;
  padding: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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
          <Progress progress={0.65} border={0.075}>
            {/* :DDDDDD */}
          </Progress>
          <Input />
        </Section>
        {/* <Section>
          czeesc:DD
        </Section> */}
      </>
    );
  }
}