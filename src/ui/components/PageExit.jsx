import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PageExit({ exitRoute }) {
  return (
    <Link to={exitRoute}>
      <img src="/cross-close.svg" alt="cross-close" />
    </Link>
  );
}

PageExit.propTypes = {
  exitRoute: PropTypes.string.isRequired,
};

export { PageExit };
