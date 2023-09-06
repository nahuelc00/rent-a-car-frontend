/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import { PageExit } from './PageExit';

function InformationModal({ title, exitRoute }) {
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head is-flex is-justify-content-end">
          <PageExit exitRoute={exitRoute} />
        </header>
        <section className="modal-card-body">
          <h2 className="title">{title}</h2>
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  );
}

InformationModal.propTypes = {
  title: PropTypes.string.isRequired,
  exitRoute: PropTypes.string.isRequired,
};

export { InformationModal };
