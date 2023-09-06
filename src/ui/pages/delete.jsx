/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionModal } from '../components/ActionModal';
import { deleteCar } from '../../services/cars';
import { InformationModal } from '../components/InformationModal';
import { Loader } from '../components/Loader';

function Delete() {
  const { id } = useParams();
  const [isCarDeleted, setIsCarDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleDeleteCar() {
    setIsLoading(true);
    deleteCar(id).then(() => {
      setIsLoading(false);
      setIsCarDeleted(true);
    });
  }

  function handleCancelCar() {
    navigate('/');
  }

  if (isLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  if (isCarDeleted) {
    return (
      <InformationModal title="Car deleted succesfully" exitRoute="/" />
    );
  }

  return (
    <ActionModal
      title="Delete car"
      subtitle="Are you sure you want to delete the car?"
      handleAffirmationModal={handleDeleteCar}
      handleCancelModal={handleCancelCar}
      action="Delete"
    />
  );
}

export { Delete };
