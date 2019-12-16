import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';

import { QUERY_ME } from './Settings';

const MUTATION_LOGOUT = gql`
    mutation MUTATION_LOGOUT {
        logout {
            message
        }
    }
`;

const LogoutButton = () => {
  const [logout, { loading, error }] = useMutation(MUTATION_LOGOUT, {
    update(cache) {
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: null },
      });
    },
    onCompleted: () => {
      Router.push({
        pathname: '/'
      });
    }
  });

  return (
    <section>
      <button
        type="button"
        disabled={loading}
        onClick={() => logout()}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
      {
        error &&
          error.message
      }
    </section>
  );
};

export default LogoutButton;
