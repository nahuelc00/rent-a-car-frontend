import { useState } from 'react';
import { deleteCar } from '../../services/cars';

function useHandleDeleteCar() {
  const [endOfDelete, setEndOfDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleDeleteCar(id) {
    setIsLoading(true);
    deleteCar(id).then((data) => {
      data.json().then((res) => {
        if (res.message === 'Fail at delete car') setError(res.message);
        setIsLoading(false);
        setEndOfDelete(true);
      });
    });
  }

  return {
    handleDeleteCar, isLoading, endOfDelete, error,
  };
}

export { useHandleDeleteCar };
