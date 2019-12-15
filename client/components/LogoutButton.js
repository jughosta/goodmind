import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { QUERY_ME } from './Settings';

const MUTATION_LOGOUT = gql`
    mutation MUTATION_LOGOUT {
        logout {
            message
        }
    }
`;

const LogoutButton = () => {
  const [logout, { _, loading, error }] = useMutation(MUTATION_LOGOUT, {
    update(cache) {
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: null },
      });
    }
  });

  return (
    <section>
      <button
        type="button"
        disabled={loading}
        onClick={logout}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
      {
        error &&
          error.message
      }
    </section>
  )
};

export default LogoutButton;

