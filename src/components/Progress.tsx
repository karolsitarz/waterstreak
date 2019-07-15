import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  progress: number
  border?: number
  style?: object
}


const RingContainer = styled.div<Props>`
  --b: ${props => props.border ? `${props.border * 100}%` : '10%'};
  --p: ${props => props.progress};
  max-width: 70vmin;
  max-height: 70vmin;
  min-width: 50px;
  min-height: 50px;
  flex-grow: 1;
`;

const Ring = styled.svg`
  width: 100%;
  height: 100%;
`;

const PercentageRise = keyframes`
  from {
    stroke-dashoffset: var(--circ);
  }
`;

const Percentage = styled.circle`
  animation: ${PercentageRise} 2s 1s ease backwards;
  fill: transparent;
  stroke: var(--accent);
  stroke-width: var(--b);
  cx: 50%;
  cy: 50%;
  r: calc(50% - var(--b) / 2);
  --circ: calc((100% - var(--b)) * 3.14);
  stroke-dasharray: var(--circ) var(--circ);
  stroke-dashoffset: calc(var(--circ) - var(--p) * var(--circ));
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

const RingBackground = styled.circle`
  fill: transparent;
  stroke: var(--light);
  stroke-width: var(--b);
  cx: 50%;
  cy: 50%;
  r: calc(50% - var(--b) / 2);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - var(--b) * 2);
  height: calc(100% - var(--b) * 2);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const PercentageRiseCap = keyframes`
  from {
    transform: rotate(0deg);
  }
`;
const Cap = styled.div`
  animation: ${PercentageRiseCap} 2s 1s ease backwards;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transform: rotate(calc(var(--p) * 360deg));
  &::before {
    content: "";
    background: var(--accent);
    width: var(--b);
    height: var(--b);
    display: block;
    border-radius: 0 50% 50% 0;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    /* box-shadow: 0.5em 0 0.5em 0 rgba(0, 0, 0, .1); */
  }
`;

export default class ProgressRing extends Component<Props, {}> {
  render() {
    return (
      <RingContainer
      progress={this.props.progress}
      border={this.props.border}>
        <Ring
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet">
          <RingBackground />
          <Percentage />
        </Ring>
        <Cap />
        <Content>
          {this.props.children}
        </Content>
      </RingContainer>
    );
  }
}