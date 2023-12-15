/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { getAccessToken, validateEmail } from '../../../utilities';
import { loginUser } from '../../../services/users';
import { PageExit } from '../../components/PageExit';

function validateForm(values) {
  const { email, password } = values;

  const hasEmptyValues = email === '' || password === '';

  if (hasEmptyValues) return false;

  const isEmail = validateEmail(email);

  if (isEmail) return true;
}

function LoginForm() {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const navigate = useNavigate();
  const isUserLogged = getAccessToken();

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
            const date = new Date();
            const dateAddingTwoDays = date.getDate() + 2;
            date.setDate(dateAddingTwoDays);

            const dateForCookie = date.toUTCString();

            document.cookie = `access_token=${res.token};expires=${dateForCookie};`;
            navigate('/');
          }
        });
      }
    },
  });

  if (isUserLogged) {
    return <h1 className="title is-size-1">You are logged in</h1>;
  }

  return (
    <>
      <PageExit exitRoute="/" />
      <h1 className="title mt-5">Login</h1>
      <form style={{ maxWidth: '600px' }} onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="label is-size-4">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={validateEmail(formik.values.email) ? 'input is-success is-medium' : 'input is-danger is-medium'}
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
          {!validateEmail(formik.values.email) && <p className="help is-danger is-size-5">This email is invalid</p>}
        </div>

        <div className="field mb-5">
          <label className="label is-size-4">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-medium"
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

        {invalidCredentials && (<p className="help is-danger mb-5 is-size-5">Check your email and password</p>)}

        <div className="field is-grouped is-align-items-center">
          <div className="control">
            <button type="submit" className="button is-link is-medium">Sign in</button>
          </div>
          <span className="is-size-5">or</span>
          <Link to="/register" className="button is-ghost is-medium">Register</Link>
        </div>
      </form>
    </>
  );
}

export { LoginForm };
