/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { validateEmail } from './utilities';
import { loginUser } from '../../../services/users';

function validateForm(values) {
  const { email, password } = values;

  const hasEmptyValues = email === '' || password === '';

  if (hasEmptyValues) return false;

  const isEmail = validateEmail(email);

  if (isEmail) return true;
}

function LoginForm() {
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const isFormValid = validateForm(values);
      if (isFormValid) {
        const loginData = { email: values.email, password: values.password };

        loginUser(loginData).then((res) => {
          if (res.statusCode === 401) setInvalidCredentials(true);
          if (res.token) {
            console.log('Login successfully');
            document.cookie = `access_token=${res.token}`;
            setInvalidCredentials(false);
          }
        });
      }
    },
  });

  return (
    <>
      <h1 className="title">Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={validateEmail(formik.values.email) ? 'input is-success' : 'input is-danger'}
              type="text"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </div>
          {!validateEmail(formik.values.email) && <p className="help is-danger">This email is invalid</p>}
        </div>

        <div className="field mb-3">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </div>
        </div>

        {invalidCredentials && (<p className="help is-danger mb-5">Check your email and password</p>)}

        <div className="field is-grouped is-align-items-center">
          <div className="control">
            <button type="submit" className="button is-link">Sign in</button>
          </div>
          <span>or</span>
          <Link to="/register" className="button is-ghost">Register</Link>
        </div>
      </form>
    </>
  );
}

export { LoginForm };
