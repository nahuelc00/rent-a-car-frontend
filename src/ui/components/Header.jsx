/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAccessToken } from '../../utilities';
import { getUser } from '../../services/users';

function assignClassnameForBackoffice(token, isAdmin, isMobile, isDesktop) {
  const notHasToken = token === undefined;
  const hasTokenAndIsAdmin = token && isAdmin === true;
  const hasTokenAndNotIsAdmin = token && isAdmin === false;

  if (notHasToken) return 'is-hidden';
  if (hasTokenAndIsAdmin && isDesktop) return 'navbar-item is-size-5';
  if (hasTokenAndIsAdmin && isMobile) return '';
  if (hasTokenAndNotIsAdmin) return 'is-hidden';
}

function Header() {
  const [displayMenuBurger, setDisplayMenuBurger] = useState(false);
  const [initialOfName, setInitialOfName] = useState('');
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  const userAccessToken = getAccessToken();

  useEffect(() => {
    const isUserLogged = userAccessToken !== undefined;

    if (isUserLogged) {
      getUser(userAccessToken).then((user) => {
        if (user.roles.includes('admin')) setIsUserAdmin(true);
        const firstLetter = user.firstname.charAt(0);
        setInitialOfName(firstLetter);
      });
    }
  }, [getUser]);

  function handleClickInMenuBurger() {
    setDisplayMenuBurger(!displayMenuBurger);
  }

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img alt="" src="/images/key-car.png" width="30" height="30" />
          </Link>

          <div onClick={handleClickInMenuBurger} className="navbar-burger">
            <div role="button" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </div>
            <ul className={displayMenuBurger ? 'is-relative menu-burger' : 'is-hidden'}>
              <li className={userAccessToken ? 'is-hidden' : ''}>
                <Link to="/register">Register</Link>
              </li>
              <li className={userAccessToken ? 'is-hidden' : ''}>
                <Link to="/login">Login</Link>
              </li>
              <li className={!userAccessToken ? 'is-hidden' : ''}>
                <Link to="/">Dashboard</Link>
              </li>
              <li
                className={assignClassnameForBackoffice(userAccessToken, isUserAdmin, true, false)}
              >
                <Link to="/">Backoffice</Link>
              </li>
            </ul>

          </div>

        </div>

        <div className="navbar-menu">

          <div style={{ gap: '20px' }} className="navbar-end">
            <div className="navbar-item">
              <div className={userAccessToken ? 'is-hidden' : 'buttons'}>
                <Link to="/register" className="button is-primary is-medium">
                  <strong>Sign up</strong>
                </Link>
                <Link to="/login" className="button is-light is-medium">
                  Log in
                </Link>
              </div>
            </div>
            <Link to="/" className={userAccessToken ? 'navbar-item is-size-5' : 'is-hidden'}>
              Dashboard
            </Link>
            <Link to="/" className={assignClassnameForBackoffice(userAccessToken, isUserAdmin, false, true)}>
              Backoffice
            </Link>
            <div
              style={{
                width: '64px', borderRadius: '50px', backgroundColor: '#1c6b84', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
              className={userAccessToken ? 'navbar-item is-flex is-justify-content-center' : 'is-hidden'}
            >
              <span className="is-size-3 is-clickable has-text-light">{initialOfName}</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { Header };
