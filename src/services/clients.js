const API_HOST = import.meta.env.VITE_API_HOST;

function registerClient(clientData) {
  return fetch(`${API_HOST}/client/register`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(clientData),
  }).then((res) => res.json());
}

function getClient(id) {
  return fetch(`${API_HOST}/client/${id}`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
  }).then((res) => res.json());
}

export { registerClient, getClient };
