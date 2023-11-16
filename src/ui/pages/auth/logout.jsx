/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionModal } from '../../components/ActionModal';

function LogOut() {
  const navigate = useNavigate();

  function logout() {
    document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    navigate('/');
  }

  function handleAffirmationModal() {
    logout();
  }

  function handleCancelModal() {
    navigate('/');
  }

  return (
    <ActionModal
      title="Log out"
      subtitle="Are you sure you want to log out?"
      handleAffirmationModal={handleAffirmationModal}
      handleCancelModal={handleCancelModal}
      action="Log out"
    />
  );
}

export { LogOut };
