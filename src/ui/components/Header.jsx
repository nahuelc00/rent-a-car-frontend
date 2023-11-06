/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [displayMenuBurger, setDisplayMenuBurger] = useState(false);

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" href="https://bulma.io">
            <img alt="" src="/images/key-car.png" width="30" height="30" />
          </Link>

          <div onClick={() => setDisplayMenuBurger(!displayMenuBurger)} className="navbar-burger">
            <div role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </div>
            <ul className={displayMenuBurger ? 'is-relative menu-burger' : 'is-hidden'}>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>

        </div>

        <div id="navbarBasicExample" className="navbar-menu">

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/register" className="button is-primary is-medium">
                  <strong>Sign up</strong>
                </Link>
                <Link to="/login" className="button is-light is-medium">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { Header };
