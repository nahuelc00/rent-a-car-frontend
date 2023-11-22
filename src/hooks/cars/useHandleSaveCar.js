/* eslint-disable consistent-return */
import { useState } from 'react';
import { saveCar } from '../../services/cars';

function useHandleSaveCar() {
  const [isSaving, setIsSaving] = useState(false);
  const [endOfSave, setEndOfSave] = useState(false);
  const [error, setError] = useState(undefined);

  function handleSaveCar(carToSaveFormData) {
    setIsSaving(true);

    saveCar(carToSaveFormData).then((res) => res.json()).then((data) => {
      if (data.message === 'This car already exists') setError(data.message);

      setIsSaving(false);
      setEndOfSave(true);
    });
  }

  return {
    handleSaveCar, isSaving, endOfSave, error,
  };
}

export { useHandleSaveCar };
