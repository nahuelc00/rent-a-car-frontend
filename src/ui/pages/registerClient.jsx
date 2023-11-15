import React from 'react';
import { ClientForm } from '../components/ClientForm';
import { Loader } from '../components/Loader';
import { useGetIfIsUserAdmin } from '../../hooks/client/useGetIfIsUserAdmin';
import { PageExit } from '../components/PageExit';

function RegisterClient() {
  const { isLoading, isUserAdmin } = useGetIfIsUserAdmin();

  if (isLoading) {
    return <Loader />;
  }

  if (isUserAdmin) {
    return (
      <>
        <header className="mb-5">
          <PageExit exitRoute="/backoffice" />
        </header>
        <main>
          <ClientForm />
        </main>
      </>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { RegisterClient };
