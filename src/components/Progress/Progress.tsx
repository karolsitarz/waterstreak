import React, { Component } from "react";
import styled from "styled-components";
import BezierEasing from "bezier-easing";

const size = 400;
const time = 250;
const stroke = 0.075;
const ease = BezierEasing(0.43, 0, 0.43, 1);

interface Props {
  progress: number;
}

interface State {
  progress: number;
  previousProgress: number;
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
  background-image: radial-gradient(
    ellipse at center,
    transparent 60%,
    rgba(0, 0, 0, 0.125) 60%
  );
  border-radius: 50%;
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

const getInBound = (value: number): number =>
  value > 1 ? 1 : value < 0 ? 0 : value;

export default class ProgressRing extends Component<Props, State> {
  private canvas: HTMLCanvasElement;
  private gradient: CanvasGradient;
  public state: State = {
    progress: this.props.progress,
    previousProgress: 0
  };

  public static getDerivedStateFromProps(props: Props, state: State): State {
    if (props.progress === state.progress) return null;
    else
      return {
        progress: props.progress,
        previousProgress: state.progress
      };
  }
  public componentDidUpdate(): void {
    if (this.state.previousProgress - this.state.progress !== 0)
      this.animate(this.state.previousProgress, this.state.progress);
  }

  public componentDidMount(): void {
    this.setState({ progress: this.props.progress });

    const ctx = this.canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = size * stroke;
    this.gradient = ctx.createLinearGradient(0, 0, 0, size);
    this.gradient.addColorStop(0, "#00cffc");
    this.gradient.addColorStop(1, "#008ffc");
  }

  private drawPercentage(p: number, clear: boolean = false): void {
    const ctx = this.canvas.getContext("2d");

    if (clear) ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = this.gradient;
    ctx.beginPath();
    ctx.arc(
      size / 2,
      size / 2,
      (size * (1 - stroke)) / 2,
      -Math.PI / 2,
      Math.PI * p * 2 - Math.PI / 2
    );
    ctx.stroke();
  }

  private animate(start: number, end: number): void {
    start = getInBound(start);
    end = getInBound(end);
    const chunkTime = Math.abs(time * (end - start));
    let t = 0;
    const loop = (): void => {
      if (this.canvas == null) return;
      if (t++ > chunkTime) {
        if (end === 0) this.drawPercentage(-1, end < start);
        return;
      }

      this.drawPercentage(
        ease(t / chunkTime) * (end - start) + start,
        end < start
      );
      requestAnimationFrame(loop);
    };
    loop();
  }

  public render(): JSX.Element {
    return (
      <RingContainer>
        <Canvas width={size} height={size} ref={e => (this.canvas = e)} />
        <Content>{this.props.children}</Content>
      </RingContainer>
    );
  }
}
