/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import React from 'react';
import { useGetCars } from '../../hooks/useGetCars';

function Root() {
  const { cars, isLoading } = useGetCars();

  if (isLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <div className="loader is-size-2" />
      </div>
    );
  }

  return (
    <>
      <h1 className="title mb-4 has-text-centered">Rent a car</h1>
      <Link to="form/add" className="button is-info mb-6 has-text-weight-medium">Add car</Link>
      <div className="root-page__container-cards-car">
        { cars.map((car) => (
          <div key={car.id} className="root-page__card-car box has-background-grey-lighter is-flex is-flex-direction-column is-align-items-center">
            <h1 className="subtitle mb-3 has-text-weight-bold">{ car.brand }</h1>
            <p className="mb-1">{`${car.passengers} passengers`}</p>
            <p className="mb-2">{ `${car.kms} kms` }</p>
            <Link href>Detail</Link>
            <div>
              <Link href className="mr-1">Edit</Link>
              <Link href>Delete</Link>
            </div>
          </div>
        )) }
      </div>

    </>
  );
}

export { Root };
