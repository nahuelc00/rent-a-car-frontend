/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetterAndRestInUpperCase, validateEmail, validatePassword } from '../../../utilities';
import { registerUser } from '../../../services/users';
import { PageExit } from '../../components/PageExit';

function validateForm(userData) {
  const {
    firstname, lastname, email, password,
  } = userData;

  const hasEmptyValues = firstname === '' || lastname === '' || email === '' || password === '';

  if (hasEmptyValues) return false;

  const isEmail = validateEmail(email);
  const isPasswordSecure = validatePassword(password);

  if (isEmail && isPasswordSecure) return true;
}

function assignInputEmailClassname(emailValue, isEmailExistent) {
  const isEmail = validateEmail(emailValue);

  if (isEmailExistent) return 'input is-danger is-medium';

  if (isEmail) return 'input is-success is-medium';

  return 'input is-medium';
}

function RegisterForm() {
  const navigate = useNavigate();
  const [isEmailExistent, setIsEmailExistent] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    onSubmit: async (userData) => {
      const isFormValid = validateForm(userData);

      if (isFormValid) {
        const userDataMapped = {
          ...userData,
          firstname: capitalizeFirstLetterAndRestInUpperCase(userData.firstname),
          lastname: capitalizeFirstLetterAndRestInUpperCase(userData.lastname),
          roles: 'user',
        };

        const resultOfRegister = await registerUser(userDataMapped);

        if (resultOfRegister.message === 'This email already exists') setIsEmailExistent(true);

        if (resultOfRegister.registered) navigate('/login');
      }
    },
  });

  return (
    <>
      <PageExit exitRoute="/" />
      <h1 className="title mt-5">Registration</h1>
      <form style={{ maxWidth: '700px' }} onSubmit={formik.handleSubmit}>

        <div className="field">
          <label className="label is-size-4">Firstname</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={formik.values.firstname ? 'input is-success is-medium' : 'input is-danger is-medium'}
              type="text"
              name="firstname"
              placeholder="Firstname"
              onChange={formik.handleChange}
              value={formik.values.firstname}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </div>
          {!formik.values.firstname && <p className="help is-danger is-size-5">This firstname is invalid</p> }

        </div>

        <div className="field">
          <label className="label is-size-4">Lastname</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={formik.values.lastname ? 'input is-success is-medium' : 'input is-danger is-medium'}
              name="lastname"
              type="text"
              placeholder="Lastname"
              onChange={formik.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </div>
          {!formik.values.lastname && <p className="help is-danger is-size-5">This lastname is invalid</p>}
        </div>

        <div className="field">
          <label className="label is-size-4">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={assignInputEmailClassname(formik.values.email, isEmailExistent)}
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setIsEmailExistent(false);
                formik.handleChange(e);
              }}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle" />
            </span>
          </div>
          { !validateEmail(formik.values.email) && <p className="help is-danger is-size-5">This email is invalid</p> }
          {isEmailExistent && <p className="help is-danger is-size-5">This email already exists</p>}
        </div>

        <div className="field mb-5">
          <label className="label is-size-4">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={validatePassword(formik.values.password) ? 'input is-success is-medium' : 'input is-danger is-medium'}
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </div>
          {!validatePassword(formik.values.password) && (
          <p className="help is-danger is-size-5">
            This password is invalid.
            Required min 8 characters: 1 in lower case, 1 in uppercase, 1 number and 1 symbol.
          </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link is-medium">Sign up</button>
          </div>
        </div>
      </form>
    </>
  );
}

export { RegisterForm };
