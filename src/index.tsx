import React from 'react';
import ReactDOM from 'react-dom';

import App from './components';
import GlobalStyles from './style/global-styles';

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('container')
);