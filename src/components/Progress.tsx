import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  progress: number
  border?: number
}


const RingContainer = styled.div<Props>`
  --b: ${props => props.border ? `${props.border * 100}%` : '10%'};
  --p: ${props => props.progress > 1 ? 1 : (props.progress < 0 ? 0 : props.progress)};
  max-width: 65vmin;
  max-height: 65vmin;
  width: 15em;
  height: 15em;
  min-width: 50px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
`;

const Ring = styled.svg`
  width: 100%;
  height: 100%;
`;

const Percentage = styled.circle`
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
  transition: stroke-dashoffset 2s ease;
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
        <Content>
          {this.props.children}
        </Content>
      </RingContainer>
    );
  }
}