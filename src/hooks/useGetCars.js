/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { getCars } from '../services/cars';

function useGetCars() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCars().then((cars) => {
      setIsLoading(false);
      setCars(cars);
    });
  }, [getCars]);

  return { cars, isLoading };
}

export { useGetCars };
