import { useState } from 'react';
import { saveCar } from '../services/cars';

function useHandleSaveCar() {
  const [isSaving, setIsSaving] = useState(false);
  const [endOfSave, setEndOfSave] = useState(false);

  function handleSaveCar(carToSave) {
    setIsSaving(true);

    saveCar(carToSave).then(() => {
      setIsSaving(false);
      setEndOfSave(true);
    });
  }

  return { handleSaveCar, isSaving, endOfSave };
}

export { useHandleSaveCar };
