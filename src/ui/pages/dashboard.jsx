import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { useGetCars } from '../../hooks/cars/useGetCars';

function Dashboard() {
  const { cars } = useGetCars();

  return (
    <>
      <Header />
      <main>
        <h1 className="title mt-5 mb-6 is-size-1">Dashboard</h1>
        <div className="dashboard-page__cars-container">
          { cars.map((car) => (
            <div key={car.id} className="car-card box has-background-grey-lighter is-flex is-flex-direction-column is-align-items-center">
              <h1 className="subtitle mb-3 has-text-weight-bold">{ car.brand }</h1>
              <p className="mb-1">{`${car.passengers} passengers`}</p>
              <p className="mb-2">{ `${car.kms} kms` }</p>
              <img className="is-rounded" style={{ width: '150px', height: '100px', borderRadius: '10px' }} src={car.imageUrl} alt="" />
              <Link to={`/car/detail/${car.id}`}>Detail</Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export { Dashboard };
