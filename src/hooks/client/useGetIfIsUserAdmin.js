import { useEffect, useState } from 'react';
import { getAccessToken } from '../../utilities';
import { getUser } from '../../services/users';

function useGetIfIsUserAdmin() {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = getAccessToken();

    getUser(accessToken).then((user) => {
      const isAdmin = user.roles?.includes('admin');

      if (isAdmin) {
        setIsUserAdmin(true);
      }

      setIsLoading(false);
    });
  }, []);

  return { isLoading, isUserAdmin };
}

export { useGetIfIsUserAdmin };
