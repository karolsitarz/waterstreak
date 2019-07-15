import React, { Component } from 'react';
import styled from 'styled-components';
import { FTScroller as Scroller } from 'ftscroller';

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
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
`;

const ScrollElement = styled.div`
  height: 3em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class Input extends Component {
  scroller: HTMLDivElement;
  scrollerItem: HTMLDivElement;

  componentDidMount () {
    console.log(this.scrollerItem.getBoundingClientRect().height);
    new Scroller(this.scroller, {
      scrollingX: false,
      snapping: true,
      scrollbars: false,
      snapSizeY: this.scrollerItem.getBoundingClientRect().height
    });
  }
  render() {
    return (
      <InputContainer>
        <SlidersContainer
          ref={((e: HTMLDivElement) => this.scroller = e)}>
          <div className="ftscroller_container">
            <div className="ftscroller_y ftscroller_hwaccelerated">
              <ScrollElement
                ref={((e: HTMLDivElement) => this.scrollerItem = e)}>
                125ml</ScrollElement>
              <ScrollElement>250ml</ScrollElement>
              <ScrollElement>300ml</ScrollElement>
              <ScrollElement>400ml</ScrollElement>
              <ScrollElement>500ml</ScrollElement>
            </div>
          </div>
        </SlidersContainer>
        <DrinkButton>drink</DrinkButton>
      </InputContainer>
    );
  }
}