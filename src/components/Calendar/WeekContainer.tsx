import styled from "styled-components";

export const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  place-items: center;
  grid-gap: 0.25em;
  margin: 0.25em 0;
  max-width: 20em;
  font-size: 0.75em;
  font-weight: bold;
`;
