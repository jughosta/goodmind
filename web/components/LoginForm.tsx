/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';

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
  const [login, { loading, error }] = useMutation(MUTATION_LOGIN, {
    refetchQueries: [{ query: QUERY_ME }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      Router.push({
        pathname: '/'
      });
    }
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        login({
          variables: {
            email,
            password
          }
        });
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
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
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
