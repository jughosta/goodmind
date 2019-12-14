import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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
  const [signup, { _, loading, error }] = useMutation(MUTATION_SIGNUP);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        const elements = event.currentTarget.elements;

        signup({ variables: { email: elements[0].value, password: elements[1].value, name: elements[2].value } });
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
      <p>
        <label>
          Name
          <input
            type="text"
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
