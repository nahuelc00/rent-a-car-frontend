import React from 'react';
import { ClientForm } from '../components/ClientForm';
import { PageExit } from '../components/PageExit';

function Backoffice() {
  return (
    <>
      <header>
        <PageExit exitRoute="/" />
      </header>
      <main>
        <h1 className="title">Hi user!</h1>
        <h2 className="title">Register a client here:</h2>
        <ClientForm />
      </main>
    </>
  );
}

export { Backoffice };
