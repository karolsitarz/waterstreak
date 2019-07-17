import React, { Component } from 'react';
import styled from 'styled-components';
import BezierEasing from 'bezier-easing';

const size = 400;
const time = 250;
const stroke = 0.075;
const ease = BezierEasing(0.43, 0, 0.43, 1);

type Props = {
  progress: number
}

type State = {
  progress: number
  previousProgress: number
}

const RingContainer = styled.div<{ main?: boolean }>`
  width: 100%;
  height: 100%;
  min-width: 10px;
  min-height: 10px;
  max-width: 13em;
  max-height: 13em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div<{ main?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 85%;
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
  gradient: CanvasGradient;

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.progress === state.progress) return null;
    else return {
      progress: props.progress,
      previousProgress: state.progress
    }
  }
  componentDidUpdate() {
    if (this.state.previousProgress - this.state.progress !== 0)
      this.animate(this.state.previousProgress, this.state.progress);
  }

  componentDidMount() {
    this.state.progress = this.props.progress;
    this.drawRing();

    const ctx = this.canvas.getContext('2d');
    ctx.lineCap = 'round';
    this.gradient = ctx.createLinearGradient(0, 0, 0, size);
    this.gradient.addColorStop(0, '#00cffc');
    this.gradient.addColorStop(1, '#008ffc');
  }

  drawRing() {
    const ctx = this.canvas.getContext('2d');

    ctx.clearRect(0, 0, size, size);
    ctx.lineWidth = size * stroke;
    ctx.strokeStyle = '#0002';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * (1 - stroke) / 2, 0, 2 * Math.PI);
    ctx.stroke();
    // ctx.strokeStyle = '#008ffc';
  }

  drawPercentage(p: number) {
    const ctx = this.canvas.getContext('2d');

    ctx.strokeStyle = this.gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * (1 - stroke) / 2, -Math.PI / 2, Math.PI * p * 2 - Math.PI / 2);
    ctx.stroke();
  }

  animate(start: number, end: number) {
    start = start < 0 ? 0 : start;
    end = end > 1 ? 1 : end;
    const chunkTime = Math.abs(time * (end - start));
    let t = 0;
    const loop = () => {
      if (this.canvas == null) return;
      if (t++ > chunkTime) return;
  
      if (start > end) this.drawRing();
      this.drawPercentage(ease(t / chunkTime) * (end - start) + start);
      requestAnimationFrame(loop);
    }
    loop();
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