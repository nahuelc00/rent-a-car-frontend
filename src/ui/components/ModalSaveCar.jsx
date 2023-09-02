import React from 'react';
import PropTypes from 'prop-types';

function ModalSaveCar({ handleSaveModal, handleCancelModal }) {
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Save car</p>
        </header>
        <section className="modal-card-body">
          <h2>Are you sure you want to save this car?</h2>
        </section>
        <footer className="modal-card-foot">
          <button onClick={handleSaveModal} type="button" className="button is-success">Save</button>
          <button onClick={handleCancelModal} type="button" className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
}

ModalSaveCar.propTypes = {
  handleCancelModal: PropTypes.func.isRequired,
  handleSaveModal: PropTypes.func.isRequired,
};

export { ModalSaveCar };
