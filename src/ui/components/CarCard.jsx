import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CarCard({
  id, brand, passengers, kms,
}) {
  return (
    <div className="card-car box has-background-grey-lighter is-flex is-flex-direction-column is-align-items-center">
      <h1 className="subtitle mb-3 has-text-weight-bold">{ brand }</h1>
      <p className="mb-1">{`${passengers} passengers`}</p>
      <p className="mb-2">{`${kms} kms`}</p>
      <Link to={`detail/${id}`}>Detail</Link>
      <div>
        <Link to={`form/edit/${id}`} className="mr-1">Edit</Link>
        <Link href>Delete</Link>
      </div>
    </div>
  );
}

CarCard.propTypes = {
  id: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  passengers: PropTypes.number.isRequired,
  kms: PropTypes.number.isRequired,
};

export { CarCard };
