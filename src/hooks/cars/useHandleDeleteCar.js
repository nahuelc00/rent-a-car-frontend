import { useState } from 'react';
import { deleteCar } from '../../services/cars';

function useHandleDeleteCar() {
  const [endOfDelete, setEndOfDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleDeleteCar(id) {
    setIsLoading(true);
    deleteCar(id).then(() => {
      setIsLoading(false);
      setEndOfDelete(true);
    });
  }

  return { handleDeleteCar, isLoading, endOfDelete };
}

export { useHandleDeleteCar };
