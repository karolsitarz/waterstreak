import React, { PureComponent } from "react";
import styled from "styled-components";

export const StyledButton = styled.div<{ sure: boolean }>`
  height: 2em;
  width: 2em;
  background-color: ${props =>
    !props.sure ? "#e5e5e5" : "rgba(255, 0, 0, 0.4)"};
  display: block;
  position: absolute;
  right: -1em;
  top: 50%;
  transform: translate3d(1em, -50%, 0);
  border-radius: 0.5em;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.5s ease;
  cursor: pointer;
  overflow: hidden;
`;

const Svg = styled.svg<{ sure: boolean }>`
  fill: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: ${props =>
    props.sure ? "translate3d(-50%, -50%, 0)" : "translate3d(-50%, 50%, 0)"};
  opacity: ${props => (props.sure ? 1 : 0)};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

interface Props {
  onClickHandle: () => void;
}

interface State {
  sure: boolean;
}

export default class DeleteButton extends PureComponent<Props, State> {
  private timeout: number = undefined;
  public state: State = {
    sure: false
  };
  private handleClick(): void {
    if (!this.state.sure) this.setState({ sure: true });
    else this.props.onClickHandle();
  }
  public componentWillUnmount(): void {
    if (this.timeout) clearTimeout(this.timeout);
  }
  public componentDidUpdate(): void {
    if (this.state.sure && !this.timeout) {
      this.timeout = setTimeout(() => {
        this.setState({ sure: false });
        this.timeout = undefined;
      }, 2000);
    }
  }
  public render(): JSX.Element {
    return (
      <StyledButton sure={this.state.sure} onClick={() => this.handleClick()}>
        <Svg sure={!this.state.sure} viewBox="0 0 600 600">
          <path d="M104,70.3H223.273l27.8-32.3H349.72l26.007,32.3H495v46.658H104V70.3ZM430.159,562H167.538L104,158.233H495Z" />
        </Svg>
        <Svg sure={this.state.sure} viewBox="0 0 600 600">
          <path d="M242.678,458.678h0L225,476.355l-17.678-17.677h0l-150-150,35.355-35.356L225,405.645,507.322,123.322l35.356,35.356Z" />
        </Svg>
      </StyledButton>
    );
  }
}
