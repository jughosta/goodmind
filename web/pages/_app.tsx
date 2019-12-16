import React from 'react';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';

import Page from '../components/Page';
import withData from '../lib/withData';

interface WithApollo {
  apollo: any
}

class MyApp extends App<WithApollo> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {
      query: {}
    };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} /> { /* eslint-disable-line  react/jsx-props-no-spreading, react/jsx-one-expression-per-line, max-len */ }
        </Page>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
