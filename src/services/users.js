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

function loginUser(userData) {
  return fetch(`${API_HOST}/user/login`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(userData),
  }).then((res) => res.json());
}

function getUser(token) {
  return fetch(`${API_HOST}/user`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());
}
export { registerUser, loginUser, getUser };
