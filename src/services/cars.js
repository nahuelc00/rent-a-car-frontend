const API_HOST = import.meta.env.VITE_API_HOST;

function getCars() {
  return fetch(`${API_HOST}/`).then((res) => res.json());
}

function getCar(id) {
  return fetch(`${API_HOST}/car/${id}`).then((res) => res.json());
}

function saveCar(car) {
  return fetch(`${API_HOST}/cars`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(car),
  });
}

function updateCar(car) {
  return fetch(`${API_HOST}/cars`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(car),
  });
}

function deleteCar(id) {
  return fetch(`${API_HOST}/car/${id}`, {
    method: 'DELETE',
  });
}

export {
  getCars, saveCar, getCar, updateCar, deleteCar,
};
