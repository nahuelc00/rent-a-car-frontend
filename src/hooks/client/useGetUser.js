import { useEffect, useState } from 'react';
import { getAccessToken } from '../../utilities';
import { getUser } from '../../services/users';

function useGetUser() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const accessToken = getAccessToken();

    getUser(accessToken).then((userData) => {
      setUser(userData);
    });
  }, []);

  return { user };
}

export { useGetUser };
