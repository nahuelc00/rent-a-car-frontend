import React from 'react';
import { Link } from 'react-router-dom';
import { PageExit } from '../../components/PageExit';
import { useGetCars } from '../../../hooks/cars/useGetCars';
import { CarCard } from '../../components/cars/CarCard';
import { useGetIfIsUserAdmin } from '../../../hooks/client/useGetIfIsUserAdmin';
import { Loader } from '../../components/Loader';

function Cars() {
  const { cars } = useGetCars();
  const { isLoading, isUserAdmin } = useGetIfIsUserAdmin();

  if (isLoading) {
    return <Loader />;
  }

  if (isUserAdmin) {
    return (
      <>
        <header className="mb-5">
          <PageExit exitRoute="/backoffice" />
        </header>
        <main>
          <Link to="/car/add" className="button is-primary mb-6">Add car</Link>
          <div className="cars-page__cars-container">
            { cars.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                licensePlate={car.licensePlate}
                brand={car.brand}
                passengers={car.passengers}
                kms={car.kms}
              />
            ))}
          </div>
        </main>
      </>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { Cars };
