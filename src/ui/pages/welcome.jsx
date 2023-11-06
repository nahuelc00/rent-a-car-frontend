/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

function Welcome() {
  return (
    <>
      <Header />
      <main className="welcome-page">

        <section className="is-flex is-flex-direction-column is-justify-content-center" style={{ height: '90vh' }}>
          <div>
            <h1 className="title welcome-page__title m-0 has-text-centered">Rentificar</h1>
            <h2 className="subtitle welcome_page__subtitle m-0 is-size-3 has-text-centered">Your destiny, your car</h2>
          </div>
        </section>

        <section className="is-flex is-flex-direction-column is-justify-content-center" style={{ height: '100vh' }}>
          <div>
            <div className="welcome-page__section-line has-background-black" />
            <p className="welcome-page__introduction has-text-black has-text-weight-semibold">
              Versatile solution that gives people the opportunity to temporarily access
              a wide range of vehicles, from compacts to SUVs and vans, to meet their
              mobility needs. Whether for business trips, vacations or any other occasion,
              this system offers an efficient and convenient way to obtain a car without
              the responsibility of long-term ownership.
            </p>
            <div className="welcome-page__section-line has-background-black" />
          </div>

        </section>

        <section className="is-flex is-flex-direction-column is-justify-content-center" style={{ height: '100vh' }}>
          <div>
            <div className="welcome-page__section-line has-background-black" />
            <div className="welcome-page__characteristics-container has-text-black has-text-weight-semibold">
              <div>
                <span className="welcome-page__characteristic">Variety of options</span>
              </div>
              <div>
                <span className="welcome-page__characteristic">Simple reservations</span>
              </div>
              <div>
                <span className="welcome-page__characteristic">Competitive rates</span>
              </div>
              <div>
                <span className="welcome-page__characteristic">Safety and cleanliness</span>
              </div>
              <div>
                <span className="welcome-page__characteristic">Delivery and pickup</span>
              </div>
            </div>
            <div className="welcome-page__section-line has-background-black" />
          </div>
        </section>

        <section className="is-flex is-flex-direction-column is-justify-content-center" style={{ height: '100vh' }}>
          <div className="welcome-page__section-line has-background-black" />
          <div style={{ margin: '50px 0' }}>
            <p style={{ color: '#1c6b84', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', fontSize: '60px' }} className="title m-0 mb-3 has-text-centered">Ready to get started?</p>
            <p className="subtitle m-0 is-size-3 has-text-centered">
              <Link className="has-text-weight-semibold" to="/register">
                Create your account
              </Link>
              {' '}
              and start using it
            </p>
          </div>
          <div className="welcome-page__section-line has-background-black" />
        </section>

      </main>
    </>
  );
}

export { Welcome };
