import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { QUERY_ME } from './Settings';

const MUTATION_LOGIN = gql`
  mutation MUTATION_LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      journal {
          id
      }
    }
  }
`;

const LoginForm = () => {
  const [login, { _, loading, error }] = useMutation(MUTATION_LOGIN, {
    refetchQueries: [{ query: QUERY_ME }],
    awaitRefetchQueries: true
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        const elements = event.currentTarget.elements;

        login({ variables: { email: elements[0].value, password: elements[1].value } });
      }}
    >
      {
        error && (
          <div>
            {error.message}
          </div>
        )
      }
      <p>
        <label>
          Email
          <input
            required
            type="email"
          />
        </label>
      </p>
      <p>
        <label>
          Password
          <input
            required
            type="password"
          />
        </label>
      </p>
      <button type="submit" disabled={loading}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
