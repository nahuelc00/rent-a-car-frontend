import React from 'react';
import PropTypes from 'prop-types';

function ActionModal({
  handleAffirmationModal, handleCancelModal, title, subtitle,
  action,
}) {
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{ title }</p>
        </header>
        <section className="modal-card-body">
          <h2>{ subtitle }</h2>
        </section>
        <footer className="modal-card-foot">
          <button onClick={handleAffirmationModal} type="button" className="button is-success">{ action }</button>
          <button onClick={handleCancelModal} type="button" className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
}

ActionModal.propTypes = {
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  handleCancelModal: PropTypes.func.isRequired,
  handleAffirmationModal: PropTypes.func.isRequired,
};

export { ActionModal };
