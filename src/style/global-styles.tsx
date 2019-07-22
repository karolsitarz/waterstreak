import { createGlobalStyle } from "styled-components";
import swiper from "./swiper-styles";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500,700&display=swap&subset=latin-ext');
  
  *,:after,:before {
    box-sizing: border-box;
    position: relative;
    font-family: 'Montserrat', 'Helvetica', 'Helvetica Neue', sans-serif;
    /* font-weight: 600; */
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
  *:not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  html, body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overscroll-behavior: contain;
    color: #555;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  p, th, td, li, dd, dt, ul, ol, blockquote, q, acronym, abbr, a, input, select, textarea {
    margin: 0;
    padding: 0;
  }
  :focus {
    outline: none;
  }
  @keyframes appFadeIn {
    from {
      opacity: 0;
      transform: translate3d(0, 1em, 0) scale(0.95);
    }
  }
  #container {
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    max-width: 960px;
    animation: appFadeIn .5s ease backwards;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  input {
    color: inherit;
  }
  ::placeholder {
    text-align: center;
    opacity: 0.25;
  }
  span {
    pointer-events: none;
  }
  
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  :root {
    --accent: #008ffc;
    --main: #555;
    --secondary: #777;
    --light: #e5e5e5;
    --bg: #fff;
    --gradient: linear-gradient(to bottom right, #00cffc, #008ffc);
    font-size: 20px;
    letter-spacing: -.05em;
  }
  ${swiper}
`;
