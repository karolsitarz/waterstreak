import React, { Component } from 'react';
import styled from 'styled-components';
import { Swiper } from 'swiper/dist/js/swiper.esm.js';

import { addToDB } from '../util/db';
import { dispatchProgressEvent } from '../util/progressEvent';
import { subtractTime } from '../util/time';

type SwiperValues = {
  desc: string
  value: number
}

const mlValues: SwiperValues[] = [
  { desc: '125 ml', value: 125 },
 { desc: '250 ml', value: 250 },
 { desc: '300 ml', value: 300 },
 { desc: '350 ml', value: 350 },
 { desc: '400 ml', value: 400 },
 { desc: '450 ml', value: 450 },
 { desc: '500 ml', value: 500 }]

const timeValues: SwiperValues[] = [
  { desc: 'now', value: 0 },
 { desc: '15m ago', value: 15 },
 { desc: '30m ago', value: 30 },
 { desc: '1h ago', value: 60 },
 { desc: '2h ago', value: 120 },
 { desc: '3h ago', value: 180 },
 { desc: '4h ago', value: 240 },
 { desc: '5h ago', value: 300 },
 { desc: '6h ago', value: 360 }]

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
  min-width: 8em;
  max-width: 100%;
  overflow-y: hidden;
  display: flex;
`;

const DrinkButton = styled.div`
  background-color: var(--accent);
  border-radius: 1em;
  padding: .75em 2em;
  color: #fff;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.2);
`;

const ScrollElement = styled.div`
  height: 3em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollContainer = styled.div`
  flex-grow: 1;
`;

export default class Input extends Component {
  mlScrollEl: HTMLDivElement;
  timeScrollEl: HTMLDivElement;
  mlSwiper: Swiper;
  timeSwiper: Swiper;

  componentDidMount () {
    this.mlSwiper = new Swiper(this.mlScrollEl, {
      direction: 'vertical',
      slidesPerView: 2,
      centeredSlides: true,
      initialSlide: 1
    });
    this.timeSwiper = new Swiper(this.timeScrollEl, {
      direction: 'vertical',
      slidesPerView: 2,
      centeredSlides: true
    });
  }
  render() {
    return (
      <InputContainer>
        <SlidersContainer>
          <ScrollContainer
            style={{margin: '0 1em 0 2em'}}
            ref={((e: HTMLDivElement) => this.mlScrollEl = e)}>
            <div className="swiper-wrapper">
              {mlValues.map(c =>
                <ScrollElement
                  key={c.value}
                  className="swiper-slide">
                    {c.desc}
                  </ScrollElement>)}
            </div>
          </ScrollContainer>
          <ScrollContainer
            style={{margin: '0 2em 0 1em'}}
            ref={((e: HTMLDivElement) => this.timeScrollEl = e)}>
            <div className="swiper-wrapper">
              {timeValues.map(c => 
                <ScrollElement
                  key={c.value}
                  className="swiper-slide">
                    {c.desc}
                  </ScrollElement>)}
            </div>
          </ScrollContainer>
        </SlidersContainer>
        <DrinkButton onClick={e => this.handleButtonClick()}>drink</DrinkButton>
      </InputContainer>
    );
  }
  async handleButtonClick () {
    const mlValue = mlValues[this.mlSwiper.activeIndex].value;
    const timeValue = subtractTime(new Date(), timeValues[this.timeSwiper.activeIndex].value * 60000);
    await addToDB(mlValue, timeValue);
    dispatchProgressEvent(timeValue);
  }
}