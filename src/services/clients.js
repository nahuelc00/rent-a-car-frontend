function registerClient(clientData) {
  return fetch(`${import.meta.env.VITE_API_HOST}/client/register`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(clientData),
  }).then((res) => res.json());
}

export { registerClient };
