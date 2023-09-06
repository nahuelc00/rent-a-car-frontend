/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionModal } from '../components/ActionModal';
import { InformationModal } from '../components/InformationModal';
import { Loader } from '../components/Loader';
import { useHandleDeleteCar } from '../../hooks/useHandleDeleteCar';

function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleDeleteCar, isLoading, endOfDelete } = useHandleDeleteCar();

  function handleDelete() {
    handleDeleteCar(id);
  }

  function handleCancelDelete() {
    navigate('/');
  }

  if (isLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  if (endOfDelete) {
    return (
      <InformationModal title="Car deleted successfully" exitRoute="/" />
    );
  }

  return (
    <ActionModal
      title="Delete car"
      subtitle="Are you sure you want to delete the car?"
      handleAffirmationModal={handleDelete}
      handleCancelModal={handleCancelDelete}
      action="Delete"
    />
  );
}

export { Delete };
