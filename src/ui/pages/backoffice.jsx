import React, { useEffect, useState } from 'react';
import { ClientForm } from '../components/ClientForm';
import { PageExit } from '../components/PageExit';
import { getUser } from '../../services/users';
import { getAccessToken } from '../../utilities';
import { Loader } from '../components/Loader';

function Backoffice() {
  const [userFirstname, setUserFirstname] = useState('');
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = getAccessToken();
    getUser(accessToken).then((user) => {
      const isAdmin = user.roles.includes('admin');
      if (isAdmin) {
        setUserFirstname(user.firstname);
        setIsUserAdmin(true);
        setIsLoading(false);
      }

      if (!isAdmin) {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  if (isUserAdmin) {
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

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { Backoffice };
