const API_HOST = import.meta.env.VITE_API_HOST;

function saveRent(rentData) {
  return fetch(`${API_HOST}/rent`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(rentData),
  }).then((res) => res.json());
}

function getRents() {
  return fetch(`${API_HOST}/rent`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
  }).then((res) => res.json());
}

export { saveRent, getRents };
