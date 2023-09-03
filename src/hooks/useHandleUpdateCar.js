import { useState } from 'react';
import { updateCar } from '../services/cars';

function useHandleUpdateCar() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [endOfUpdating, setEndOfUpdating] = useState(false);

  function handleUpdateCar(carToUpdate) {
    setIsUpdating(true);

    updateCar(carToUpdate).then(() => {
      setIsUpdating(false);
      setEndOfUpdating(true);
    });
  }

  return { handleUpdateCar, isUpdating, endOfUpdating };
}

export { useHandleUpdateCar };
