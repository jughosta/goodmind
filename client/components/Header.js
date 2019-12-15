import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

import 'nprogress/nprogress.css';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = ({ children }) => (
  <header>
    {children}
  </header>
);

export default Header;
