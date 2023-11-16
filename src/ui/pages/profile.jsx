import React from 'react';
import { Link } from 'react-router-dom';
import { getAccessToken } from '../../utilities';
import { Header } from '../components/Header';

function Profile() {
  const accessToken = getAccessToken();
  const isUserLogged = accessToken !== undefined;

  if (isUserLogged) {
    return (
      <>
        <Header />
        <main className="mt-5">
          <h1 className="title">Profile</h1>
          <Link className="is-size-5" to="/logout">Log out</Link>
        </main>

      </>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { Profile };
