const API_HOST = import.meta.env.VITE_API_HOST;

function getCars() {
  return fetch(`${API_HOST}/`).then((res) => res.json());
}

export { getCars };
