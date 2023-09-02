/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ModalSaveCar } from '../components/ModalSaveCar';
import { PageExit } from '../components/PageExit';
import { useHandleSaveCar } from '../../hooks/useHandleSaveCar';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';

function validateForm(values) {
  let quantityErrors = 0;
  for (const key in values) {
    const value = values[key];

    if (value === '') quantityErrors += 1;
  }

  if (quantityErrors === 0) return true;
  if (quantityErrors !== 0) return false;
}

function Form() {
  const [displayModalSave, setDisplayModalSave] = useState(false);
  const { handleSaveCar, isSaving, endOfSave } = useHandleSaveCar();

  const formik = useFormik({
    initialValues: {
      brand: '',
      year: '',
      color: '',
      passengers: '',
      model: '',
      kilometers: '',
      airConditioning: '',
      transmission: '',
    },
    onSubmit: (carValues) => {
      const isFormValid = validateForm(carValues);

      if (isFormValid) {
        setDisplayModalSave(true);
      }
    },
  });

  function handleSaveInModal() {
    handleSaveCar(formik.values);
  }

  function handleCancelInModal() {
    setDisplayModalSave(false);
  }

  if (isSaving) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  if (endOfSave) {
    return (
      <Modal title="Car saved successfully" exitRoute="/" />
    );
  }

  if (displayModalSave) {
    return (
      <ModalSaveCar
        handleCancelModal={handleCancelInModal}
        handleSaveModal={handleSaveInModal}
      />
    );
  }

  return (
    <>
      <div className="mb-5">
        <PageExit exitRoute="/" />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <fieldset className="mb-2">
          <label className="has-text-weight-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            className={formik.values.brand === '' ? 'input is-danger' : 'input is-success'}
          />
        </fieldset>
        <fieldset className="mb-2">
          <label className="has-text-weight-semibold">Year</label>
          <input
            min={1200}
            type="number"
            name="year"
            value={formik.values.year}
            onChange={formik.handleChange}
            className={formik.values.year === '' ? 'input is-danger' : 'input is-success'}
          />

        </fieldset>
        <fieldset className="mb-2">
          <label className="has-text-weight-semibold">Color</label>
          <input
            type="text"
            name="color"
            value={formik.values.color}
            onChange={formik.handleChange}
            className={formik.values.color === '' ? 'input is-danger' : 'input is-success'}
          />
        </fieldset>
        <fieldset className="mb-2">
          <label className="has-text-weight-semibold">Passengers</label>
          <input
            min={1}
            type="number"
            name="passengers"
            value={formik.values.passengers}
            onChange={formik.handleChange}
            className={formik.values.passengers === '' ? 'input is-danger' : 'input is-success'}
          />
        </fieldset>
        <fieldset className="mb-2">
          <label className="has-text-weight-semibold">Model</label>
          <input
            type="text"
            name="model"
            value={formik.values.model}
            onChange={formik.handleChange}
            className={formik.values.model === '' ? 'input is-danger' : 'input is-success'}
          />
        </fieldset>
        <fieldset className="mb-4">
          <label className="has-text-weight-semibold">Kilometers</label>
          <input
            min={1}
            type="number"
            name="kilometers"
            value={formik.values.kilometers}
            onChange={formik.handleChange}
            className={formik.values.kilometers === '' ? 'input is-danger' : 'input is-success'}
          />
        </fieldset>
        <fieldset className="form-page__fieldset-air-conditioning">
          <label className="form-page__label-air-conditioning has-text-weight-semibold">Air Conditioning</label>
          <div className="form-page__container-fieldset-yes">
            <label>Yes</label>
            <input
              name="airConditioning"
              onChange={formik.handleChange}
              type="radio"
              value="yes"
            />
          </div>
          <div className="form-page__container-fieldset-no">
            <label>No</label>
            <input name="airConditioning" onChange={formik.handleChange} type="radio" value="no" />
          </div>
        </fieldset>
        <fieldset className="form-page__fieldset-transmission">
          <label className="form-page__label-transmission has-text-weight-semibold">Transmission</label>
          <div className="form-page__container-fieldset-manual">
            <label>Manual</label>
            <input name="transmission" onChange={formik.handleChange} type="radio" value="manual" />
          </div>
          <div className="form-page__container-fieldset-automatic">
            <label>Automatic</label>
            <input name="transmission" onChange={formik.handleChange} type="radio" value="automatic" />
          </div>
        </fieldset>

        <button className="button is-primary" type="submit">Save car</button>
      </form>
    </>
  );
}

export { Form };
