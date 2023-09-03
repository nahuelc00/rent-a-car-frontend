import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCar } from '../../hooks/useGetCar';
import { Loader } from '../components/Loader';
import { CarInformationColumn } from '../components/CarInformationColumn';
import { PageExit } from '../components/PageExit';

function Detail() {
  const { id } = useParams();
  const { car, isLoading } = useGetCar(id);

  if (isLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="mb-5">
        <PageExit exitRoute="/" />
      </div>
      <div className="is-flex is-align-items-center is-flex-direction-column">
        <h1 className="title m-0 has-text-centered">
          { car.brand }
          {' '}
          { car.model}
        </h1>
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
    </>
  );
}

export { Detail };
