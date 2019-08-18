import styled from "styled-components";

interface Theme {
  [key: string]: string;
}

const light: Theme = {
  accent: "#008ffc",
  lightAccent: "#00cffc",
  main: "#555555",
  secondary: "#777777",
  light: "#e5e5e5",
  lightTransparent: "rgba(229, 229, 229, 0)",
  bg: "#ffffff",
  gradient: "linear-gradient(to bottom right, #00cffc, #008ffc)",
  progressFilter: ""
};

const dark: Theme = {
  accent: "#006bbd",
  lightAccent: "#11b1d4",
  main: "#e7e7e7",
  secondary: "#dddddd",
  light: "#202020",
  lightTransparent: "rgba(32, 32, 32, 0)",
  bg: "#2a2a2a",
  gradient: "linear-gradient(to bottom right, #11b1d4, #006bbd)",
  progressFilter: "saturate(0.8) brightness(0.95)"
};

export const setTheme = (t: boolean): void => {
  localStorage.dark = t;
  const color = (t ? dark : light)["bg"];
  const el = document.head.querySelector('meta[name="theme-color"]');

  if (el) el.setAttribute("content", color);
  else
    document.head.insertAdjacentHTML(
      "beforeend",
      `<meta name="theme-color" content="${color}">`
    );
};

export const getTheme = (t: boolean): Theme => (t ? dark : light);

export default styled.div<{ dark: boolean }>`
  --accent: ${props => (props.dark ? dark : light)["accent"]};
  --lightaccent: ${props => (props.dark ? dark : light)["lightAccent"]};
  --main: ${props => (props.dark ? dark : light)["main"]};
  --secondary: ${props => (props.dark ? dark : light)["secondary"]};
  --light: ${props => (props.dark ? dark : light)["light"]};
  --bg: ${props => (props.dark ? dark : light)["bg"]};
  --gradient: ${props => (props.dark ? dark : light)["gradient"]};
  --lighttransparent: ${props =>
    (props.dark ? dark : light)["lightTransparent"]};
  --progress-filter: ${props => (props.dark ? dark : light)["progressFilter"]};
  width: 100%;
  height: 100%;
  margin: auto;
  text-align: center;
  overflow: hidden;
  color: var(--main);
  background-color: var(--bg);
`;
