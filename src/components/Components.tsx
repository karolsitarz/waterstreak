import styled, { css } from "styled-components";

export const Button = styled.div<{ primary?: boolean }>`
  border-radius: 0.75em;
  padding: 0.5em 2em;
  color: var(--main);
  font-weight: bold;

  ${props =>
    props.primary &&
    css`
      color: var(--bg);
      background-color: var(--accent);
      background-image: var(--gradient);
      box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.2);
      box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.2);
    `}
`;

export const Space = styled.div<{ size: number }>`
  width: ${props => props.size}em;
  height: ${props => props.size}em;
`;

export const H3 = styled.h3`
  color: var(--secondary);
`;

export const SlidersContainer = styled.div`
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

export const ScrollElement = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-weight: bold;
`;

export const ScrollContainer = styled.div`
  flex-grow: 1;
`;
