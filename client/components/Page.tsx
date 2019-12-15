import React, { Component } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

const theme = {

};

createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 14px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header>
          <Navigation />
        </Header>
        {this.props.children}
      </ThemeProvider>
    );
  }
}

export default Page;
