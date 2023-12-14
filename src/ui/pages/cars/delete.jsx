/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionModal } from '../../components/ActionModal';
import { InformationModal } from '../../components/InformationModal';
import { Loader } from '../../components/Loader';
import { useHandleDeleteCar } from '../../../hooks/cars/useHandleDeleteCar';
import { useGetIfIsUserAdmin } from '../../../hooks/client/useGetIfIsUserAdmin';

function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handleDeleteCar, isLoading, endOfDelete, error: errorInDelete,
  } = useHandleDeleteCar();
  const { isLoading: userLoading, isUserAdmin } = useGetIfIsUserAdmin();

  function handleDelete() {
    handleDeleteCar(id);
  }

  function handleCancelDelete() {
    navigate('/cars');
  }

  if (isLoading || userLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  if (endOfDelete && !errorInDelete) {
    return (
      <InformationModal title="Car deleted successfully" exitRoute="/cars" />
    );
  }

  if (errorInDelete) {
    return (
      <InformationModal title={errorInDelete} exitRoute="/cars" />
    );
  }

  if (isUserAdmin) {
    return (
      <main>
        <ActionModal
          title="Delete car"
          subtitle="Are you sure you want to delete the car?"
          handleAffirmationModal={handleDelete}
          handleCancelModal={handleCancelDelete}
          action="Delete"
        />
      </main>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { Delete };
