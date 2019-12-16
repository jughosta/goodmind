import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import LogoutButton from './LogoutButton';

export const QUERY_ME = gql`
    query QUERY_ME {
        me {
            name
            email
            journal {
                id
            }
        }
    }
`;

const Settings = () => {
  const { data, error, loading } = useQuery(QUERY_ME);

  if (error) {
    return (
      <div>{error.message}</div>
    );
  }

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const user = data.me;

  return user
    ? (
      <section>
        {
          user.name && (
            <div>
Name:
              {user.name}
            </div>
          )
}
        <div>
Email:
          {user.email}
        </div>
        <LogoutButton />
      </section>
    )
    : (
      <div>
            404 Not found
      </div>
    );
};

export default Settings;
