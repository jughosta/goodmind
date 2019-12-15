import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import { QUERY_ME } from './Settings';

const Navigation = () => {
  const { data, error, loading } = useQuery(QUERY_ME);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (!error && data.me)
    ? (
      <div>
        <Link href="/settings">
          <a>
            Settings
          </a>
        </Link>
      </div>
    )
    : (
      <div>
        <div>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
        <div>
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </div>
      </div>
    );
};

export default Navigation;
