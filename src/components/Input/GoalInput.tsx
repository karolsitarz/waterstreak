import React from "react";
import styled, { css } from "styled-components";
import { Swiper } from "swiper/dist/js/swiper.esm.js";

import {
  Button,
  Space,
  H3,
  ScrollElement,
  SlidersContainer
} from "../Components";

import { goal } from "../../db";
import { dispatchGoalListeners } from "../../util/progressEvent";

interface Props {
  enabled: boolean;
  onClick?: () => void;
}

interface State {
  value: number;
}

let values: number[] = [];
// values between 500 and 5000 with 125 intervals
for (let i = 500; i <= 5000; i += 250) values.push(i);

const Container = styled.section<Props>`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--bg);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, -1em, 0);
  ${props =>
    props.enabled &&
    css`
      pointer-events: auto;
      opacity: 1;
      transform: scale(1);
    `}
`;

export default class GoalInput extends React.Component<Props, State> {
  private scrollEl: HTMLDivElement;
  private mlSwiper: Swiper;
  public state: State = {
    value: undefined
  };

  public componentDidMount(): void {
    this.mlSwiper = new Swiper(this.scrollEl, {
      direction: "vertical",
      slidesPerView: 2,
      centeredSlides: true,
      initialSlide: 6
    });
    this.getGoal();
  }

  private async getGoal(): Promise<void> {
    const value = await goal.get();
    this.setState({ value });
    if (value != null) {
      const i = values.indexOf(value);
      if (i !== -1) this.mlSwiper.slideTo(i, 0);
    }
  }

  private async confirmGoal(): Promise<void> {
    const value = values[this.mlSwiper.activeIndex];
    await goal.add(value);
    dispatchGoalListeners(new Date());
    this.setState({ value });
    this.props.onClick();
    if (localStorage.init !== "true") localStorage.init = "true";
  }

  private cancelGoal(): void {
    this.props.onClick();
  }

  public render(): JSX.Element {
    return (
      <Container enabled={this.props.enabled}>
        <h1>Hello, there!</h1>
        <H3>What&apos;s your hydration goal?</H3>
        <Space size={2.5} />
        <SlidersContainer ref={(e: HTMLDivElement) => (this.scrollEl = e)}>
          <div className="swiper-wrapper">
            {values.map(c => (
              <ScrollElement key={c} className="swiper-slide">
                {c} ml
              </ScrollElement>
            ))}
          </div>
        </SlidersContainer>
        <Space size={1.5} />
        {this.state.value === undefined ? (
          ""
        ) : (
          <Button primary onClick={() => this.confirmGoal()}>
            OK
          </Button>
        )}
        {this.state.value == null ? (
          ""
        ) : (
          <Button onClick={() => this.cancelGoal()}>Cancel</Button>
        )}
      </Container>
    );
  }
}
