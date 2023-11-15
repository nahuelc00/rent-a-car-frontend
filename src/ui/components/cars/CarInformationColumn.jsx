/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

function CarInformationColumn({ description, value }) {
  return (
    <div>
      <p>{description}</p>
      <p className="has-text-weight-semibold is-capitalized">{value}</p>
    </div>
  );
}

CarInformationColumn.propTypes = {
  description: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export { CarInformationColumn };
