/* eslint-disable no-unused-expressions */

import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

const theme = {};

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

type Props = {
  children: any
}

const Page = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    <Header>
      <Navigation />
    </Header>
    {children}
  </ThemeProvider>
);

export default Page;
