import React, { useEffect, useState } from 'react';
import { ClientForm } from '../components/ClientForm';
import { PageExit } from '../components/PageExit';
import { getUser } from '../../services/users';
import { getAccessToken } from '../../utilities';

function Backoffice() {
  const [userFirstname, setUserFirstname] = useState('');

  useEffect(() => {
    const accessToken = getAccessToken();
    getUser(accessToken).then((user) => {
      setUserFirstname(user.firstname);
    });
  }, []);
  return (
    <>
      <header className="mb-5">
        <PageExit exitRoute="/" />
      </header>
      <main>
        <h1 className="title is-size-2">{`Hi ${userFirstname}!`}</h1>
        <h2 className="title">Register a client here:</h2>
        <ClientForm />
      </main>
    </>
  );
}

export { Backoffice };
