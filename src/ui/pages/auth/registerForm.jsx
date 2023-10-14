/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import React from 'react';
import { validateEmail, validatePassword } from './utilities';

function validateForm(values) {
  const {
    firstname, lastname, email, password,
  } = values;

  const hasEmptyValues = firstname === '' || lastname === '' || email === '' || password === '';

  if (hasEmptyValues) return false;

  const isEmail = validateEmail(email);
  const isPasswordSecure = validatePassword(password);

  if (isEmail && isPasswordSecure) return true;
}

function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const isFormValid = validateForm(values);
      if (isFormValid) {
        console.log('The data of register are: ', {
          name: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
        });
      } else {
        console.log('Data of register incorrect');
      }
    },
  });

  return (
    <>
      <h1 className="title">Registration</h1>
      <form onSubmit={formik.handleSubmit}>

        <div className="field">
          <label className="label">Firstname</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={formik.values.firstname ? 'input is-success' : 'input is-danger'}
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
          {!formik.values.firstname && <p className="help is-danger">This firstname is invalid</p> }

        </div>

        <div className="field">
          <label className="label">Lastname</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={formik.values.lastname ? 'input is-success' : 'input is-danger'}
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
          {!formik.values.lastname && <p className="help is-danger">This lastname is invalid</p>}
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={validateEmail(formik.values.email) ? 'input is-success' : 'input is-danger'}
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle" />
            </span>
          </div>
          {!validateEmail(formik.values.email) && <p className="help is-danger">This email is invalid</p>}
        </div>

        <div className="field mb-5">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={validatePassword(formik.values.password) ? 'input is-success' : 'input is-danger'}
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
          <p className="help is-danger">
            This password is invalid.
            Required min 8 characters: 1 in lower case, 1 in uppercase, 1 number and 1 symbol.
          </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">Sign up</button>
          </div>
        </div>
      </form>
    </>
  );
}

export { RegisterForm };
