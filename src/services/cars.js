const API_HOST = import.meta.env.VITE_API_HOST;

function getCars() {
  return fetch(`${API_HOST}/cars`).then((res) => res.json());
}

function getCar(id) {
  return fetch(`${API_HOST}/cars/${id}`).then((res) => res.json());
}

function saveCar(carFormData) {
  return fetch(`${API_HOST}/cars`, {
    method: 'POST',
    body: carFormData,
  });
}

function updateCar(carFormData) {
  return fetch(`${API_HOST}/cars`, {
    method: 'PUT',
    body: carFormData,
  });
}

function deleteCar(id) {
  return fetch(`${API_HOST}/cars/${id}`, {
    method: 'DELETE',
  });
}

export {
  getCars, saveCar, getCar, updateCar, deleteCar,
};
