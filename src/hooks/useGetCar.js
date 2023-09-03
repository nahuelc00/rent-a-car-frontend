/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { getCar } from '../services/cars';

function useGetCar(id) {
  const [car, setCar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCar(id).then((car) => {
      setIsLoading(false);
      setCar(car);
    });
  }, [getCar]);

  return { car, isLoading };
}

export { useGetCar };
