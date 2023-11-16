import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <>
      <h1 className="title">Profile</h1>
      <Link className="is-size-5" to="/logout">Log out</Link>
    </>
  );
}

export { Profile };
