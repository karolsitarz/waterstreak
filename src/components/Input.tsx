import React, { Component } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SlidersContainer = styled.div`
  background-color: var(--light);
  border-radius: 1em;
  height: 3em;
  margin-bottom: .5em;
  width: 10em;
  max-width: 100%;
`;

const DrinkButton = styled.div`
  background-color: var(--accent);
  border-radius: 1em;
  padding: .75em 2em;
  color: #fff;
  font-weight: bold;
`;


export default class Input extends Component<{}> {
  render() {
    return (
      <InputContainer>
        <SlidersContainer>

        </SlidersContainer>
        <DrinkButton>drink</DrinkButton>
      </InputContainer>
    );
  }
}