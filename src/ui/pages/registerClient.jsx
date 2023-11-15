import React from 'react';
import { ClientForm } from '../components/ClientForm';
import { Loader } from '../components/Loader';
import { useGetIfIsUserAdmin } from '../../hooks/client/useGetIfIsUserAdmin';

function RegisterClient() {
  const { isLoading, isUserAdmin } = useGetIfIsUserAdmin();

  if (isLoading) {
    return <Loader />;
  }

  if (isUserAdmin) {
    return (
      <ClientForm />
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { RegisterClient };
