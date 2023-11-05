/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import React from 'react';
import { useGetCars } from '../../hooks/useGetCars';
import { Loader } from '../components/Loader';
import { CarCard } from '../components/CarCard';
import { Header } from '../components/Header';

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
      <Header />
      <h1 className="title is-1 has-text-centered mt-5">Rent a car</h1>
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
