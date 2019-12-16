import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

import 'nprogress/nprogress.css';

Router.ready(() => {
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
});

type Props = {
  children: any
}

const Header = ({ children }: Props) => (
  <header>
    {children}
  </header>
);

export default Header;
