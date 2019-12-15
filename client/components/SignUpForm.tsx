import React, {useState} from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';

import { QUERY_ME } from './Settings';

const MUTATION_SIGNUP = gql`
  mutation MUTATION_SIGNUP($email: String!, $password: String!, $name: String) {
    signup(email: $email, password: $password, name: $name) {
      id
      name
      email
      journal {
          id
          chapters {
              id
              entries {
                  id
                  question
              }
          }
      }
    }
  }
`;

const SignUpForm = () => {
  const [signup, { loading, error }] = useMutation(MUTATION_SIGNUP, {
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
  const [name, setName] = useState('');

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        signup({ variables: {
            email,
            password,
            name
        }});
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
      <p>
        <label>
            Password
             <input
                type="text"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
             />
        </label>
      </p>
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
