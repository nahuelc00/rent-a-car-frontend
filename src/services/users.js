const API_HOST = import.meta.env.VITE_API_HOST;

function registerUser(userData) {
  return fetch(`${API_HOST}/user/register`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(userData),
  }).then((res) => res.json());
}

export { registerUser };
