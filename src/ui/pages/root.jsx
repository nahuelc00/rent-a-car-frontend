/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import React from 'react';
import { useGetCars } from '../../hooks/useGetCars';
import { Loader } from '../components/Loader';
import { CarCard } from '../components/CarCard';

function Root() {
  const { cars, isLoading } = useGetCars();

  if (isLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <header>
        <h1 className="title mb-4 has-text-centered">Rent a car</h1>
      </header>
      <main>
        <Link to="car/add" className="button is-info mb-6 has-text-weight-medium">Add car</Link>
        <div className="root-page__container-cards-car">
          { cars.map(({
            id, brand, passengers, kms,
          }) => (
            <CarCard
              key={id}
              id={id}
              brand={brand}
              passengers={passengers}
              kms={kms}
            />
          )) }
        </div>
      </main>
    </>
  );
}

export { Root };
