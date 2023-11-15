import React from 'react';
import { Link } from 'react-router-dom';
import { PageExit } from '../components/PageExit';
import { Loader } from '../components/Loader';
import { useGetIfIsUserAdmin } from '../../hooks/client/useGetIfIsUserAdmin';
import { useGetUser } from '../../hooks/client/useGetUser';

function Backoffice() {
  const { isLoading, isUserAdmin } = useGetIfIsUserAdmin();
  const { user } = useGetUser();

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
          <h1 className="title is-size-2">{ `Hi ${user.firstname}!` }</h1>
          <h2 className="title is-size-3">You can:</h2>

          <div style={{ display: 'grid' }}>
            <Link to="/client/register" className="is-size-4">Register a client</Link>
          </div>
        </main>
      </>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { Backoffice };
