import React, { Component } from "react";
import styled from "styled-components";
import { Swiper } from "swiper/dist/js/swiper.esm.js";

import { add } from "../db/intake";
import { dispatchListeners } from "../util/progressEvent";
import { subtractTime } from "../util/time";

interface SwiperValues {
  desc: string;
  value: number;
}

const mlValues: SwiperValues[] = [
  { desc: "125 ml", value: 125 },
  { desc: "250 ml", value: 250 },
  { desc: "300 ml", value: 300 },
  { desc: "350 ml", value: 350 },
  { desc: "400 ml", value: 400 },
  { desc: "450 ml", value: 450 },
  { desc: "500 ml", value: 500 }
];

const timeValues: SwiperValues[] = [
  { desc: "now", value: 0 },
  { desc: "15m ago", value: 15 },
  { desc: "30m ago", value: 30 },
  { desc: "1h ago", value: 60 },
  { desc: "2h ago", value: 120 },
  { desc: "3h ago", value: 180 },
  { desc: "4h ago", value: 240 },
  { desc: "5h ago", value: 300 },
  { desc: "6h ago", value: 360 }
];

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
`;

const SlidersContainer = styled.div`
  background-color: var(--light);
  border-radius: 0.75em;
  height: 3em;
  margin-bottom: 0.5em;
  min-width: 8em;
  max-width: 100%;
  overflow-y: hidden;
  display: flex;
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    height: 1.25em;
    pointer-events: none;
    z-index: 2;
  }
  &::before {
    top: 0;
    background-image: linear-gradient(
      to bottom,
      var(--light),
      var(--lighttransparent)
    );
  }
  &::after {
    bottom: 0;
    background-image: linear-gradient(
      to top,
      var(--light),
      var(--lighttransparent)
    );
  }
`;

const DrinkButton = styled.div`
  background-color: var(--accent);
  background-image: var(--gradient);
  border-radius: 0.75em;
  padding: 0.5em 2em;
  color: #fff;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.2);
`;

const ScrollElement = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const ScrollContainer = styled.div`
  flex-grow: 1;
`;

export default class Input extends Component {
  private mlScrollEl: HTMLDivElement;
  private timeScrollEl: HTMLDivElement;
  private mlSwiper: Swiper;
  private timeSwiper: Swiper;

  public componentDidMount(): void {
    this.mlSwiper = new Swiper(this.mlScrollEl, {
      direction: "vertical",
      slidesPerView: 2,
      centeredSlides: true,
      initialSlide: 1
    });
    this.timeSwiper = new Swiper(this.timeScrollEl, {
      direction: "vertical",
      slidesPerView: 2,
      centeredSlides: true
    });
  }
  public render(): JSX.Element {
    return (
      <InputContainer>
        <SlidersContainer>
          <ScrollContainer
            style={{ padding: "0 1em 0 2em" }}
            ref={(e: HTMLDivElement) => (this.mlScrollEl = e)}
          >
            <div className="swiper-wrapper">
              {mlValues.map(c => (
                <ScrollElement key={c.value} className="swiper-slide">
                  {c.desc}
                </ScrollElement>
              ))}
            </div>
          </ScrollContainer>
          <ScrollContainer
            style={{ padding: "0 2em 0 1em" }}
            ref={(e: HTMLDivElement) => (this.timeScrollEl = e)}
          >
            <div className="swiper-wrapper">
              {timeValues.map(c => (
                <ScrollElement key={c.value} className="swiper-slide">
                  {c.desc}
                </ScrollElement>
              ))}
            </div>
          </ScrollContainer>
        </SlidersContainer>
        <DrinkButton onClick={() => this.handleButtonClick()}>
          drink
        </DrinkButton>
      </InputContainer>
    );
  }
  private async handleButtonClick(): Promise<void> {
    const mlValue = mlValues[this.mlSwiper.activeIndex].value;
    const timeValue = subtractTime(
      new Date(),
      timeValues[this.timeSwiper.activeIndex].value * 60000
    );
    await add(mlValue, timeValue);
    dispatchListeners(timeValue);
  }
}
