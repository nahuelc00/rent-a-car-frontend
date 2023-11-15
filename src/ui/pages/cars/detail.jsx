import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCar } from '../../../hooks/cars/useGetCar';
import { Loader } from '../../components/Loader';
import { CarInformationColumn } from '../../components/cars/CarInformationColumn';
import { PageExit } from '../../components/PageExit';
import { useGetIfIsUserAdmin } from '../../../hooks/client/useGetIfIsUserAdmin';

function Detail() {
  const { id } = useParams();
  const { car, isLoading } = useGetCar(id);
  const { isLoading: userLoading, isUserAdmin } = useGetIfIsUserAdmin();

  if (isLoading || userLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  if (isUserAdmin) {
    return (
      <>
        <header className="mb-5">
          <PageExit exitRoute="/cars" />
        </header>

        <main>
          <div className="is-flex is-align-items-center is-flex-direction-column">
            <h1 className="title m-0 has-text-centered">{`${car.brand} ${car.model}`}</h1>
            <h2 className="subtitle has-text-weight-semibold is-size-3 m-0 mb-6">{ car.year }</h2>
            <div className="detail-page__container-columns-car-info">
              <div className="is-size-5">
                <CarInformationColumn description="Kms" value={car.kms} />
              </div>
              <div className="is-size-5">
                <CarInformationColumn description="Passengers" value={car.passengers} />
              </div>
              <div className="is-size-5">
                <CarInformationColumn description="Color" value={car.color} />
              </div>
              <div className="is-size-5">
                <CarInformationColumn description="Air Conditioning" value={car.airConditioning ? 'Yes' : 'No'} />
              </div>
              <div className="is-size-5">
                <CarInformationColumn description="Transmission" value={car.transmission} />
              </div>
            </div>
          </div>

          <div className="is-flex">
            <img style={{ width: '300px', height: '200px' }} className="mt-6 mb-0 mx-auto" src={car.imageUrl} alt="" />
          </div>

        </main>
      </>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { Detail };
