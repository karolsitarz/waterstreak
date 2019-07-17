import React, { Component } from 'react';
import styled from 'styled-components';
import BezierEasing from 'bezier-easing';

const size = 400;
const time = 250;
const stroke = 0.1;
const ease = BezierEasing(0.43, 0, 0.2, 1);

type Props = {
  progress: number
}

type State = {
  progress: number
  previousProgress: number
}

const RingContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 10px;
  min-height: 10px;
  max-width: 15em;
  max-height: 15em;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default class ProgressRing extends Component<Props, State> {
  canvas: HTMLCanvasElement;
  state: State = {
    progress: this.props.progress,
    previousProgress: 0
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.progress === state.progress) return null;
    else return {
      progress: props.progress,
      previousProgress: state.progress
    }
  }
  componentDidUpdate() {
    this.animate(this.state.previousProgress, this.state.progress);
  }

  componentDidMount() {
    this.state.progress = this.props.progress;
    this.drawRing();
  }

  drawRing () {
    const ctx = this.canvas.getContext('2d');

    ctx.clearRect(0, 0, size, size);
    ctx.lineWidth = size * stroke;
    ctx.strokeStyle = '#0002';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * (1 - stroke) / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = '#000';
  }

  drawPercentage (p: number) {
    const ctx = this.canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * (1 - stroke) / 2, -Math.PI / 2, Math.PI * p * 2 - Math.PI / 2);
    ctx.stroke();
  }

  animate (start: number, end: number) {
    const chunkTime = Math.abs(time * (end - start));
    let t = 0;
    const loopGrow = () => {
      t++;
      if (t > chunkTime) return;
  
      this.drawPercentage(ease(t / chunkTime) * (end - start) + start);
      requestAnimationFrame(loopGrow);
    }
    const loopShrink = () => {
      t++;
      if (t > chunkTime) return;

      this.drawRing();
      this.drawPercentage(ease(t / chunkTime) * (end - start) + start);
      requestAnimationFrame(loopShrink);
    }
    start < end ? loopGrow() : loopShrink();
  }

  render() {
    return (
      <RingContainer>
        <Canvas width={size} height={size} ref={e => (this.canvas = e)} />
        <Content>
          {this.props.children}
        </Content>
      </RingContainer>
    );
  }
}