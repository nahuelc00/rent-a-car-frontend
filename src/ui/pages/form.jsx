/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { ActionModal } from '../components/ActionModal';
import { PageExit } from '../components/PageExit';
import { useHandleSaveCar } from '../../hooks/useHandleSaveCar';
import { Loader } from '../components/Loader';
import { InformationModal } from '../components/InformationModal';
import { getCar } from '../../services/cars';
import { useHandleUpdateCar } from '../../hooks/useHandleUpdateCar';

function validateForm(values) {
  let quantityErrors = 0;
  for (const key in values) {
    const value = values[key];
    if (value === '') quantityErrors += 1;
  }

  if (quantityErrors === 0) return true;
  if (quantityErrors !== 0) return false;
}

function buildFormData(formValues) {
  const formData = new FormData();

  for (const key in formValues) {
    const value = formValues[key];
    formData.append(key, value);
  }

  return formData;
}

function Form({ isUpdate }) {
  const [displayModalSave, setDisplayModalSave] = useState(false);
  const { handleSaveCar, isSaving, endOfSave } = useHandleSaveCar();
  const { handleUpdateCar, isUpdating, endOfUpdating } = useHandleUpdateCar();
  const { id } = useParams();

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
      file: '',
    },
    onSubmit: (carValues) => {
      const isFormValid = validateForm(carValues);

      if (isFormValid) {
        setDisplayModalSave(true);
      }
    },
  });

  useEffect(() => {
    if (isUpdate) {
      getCar(id).then((car) => {
        formik.setValues({
          id: car.id,
          brand: car.brand,
          year: car.year,
          color: car.color,
          passengers: car.passengers,
          model: car.model,
          kilometers: car.kms,
          airConditioning: car.airConditioning,
          transmission: car.transmission,
          file: car.imageUrl,
        });
      });
    }
  }, [getCar]);

  function handleSaveInModal() {
    const carFormData = buildFormData(formik.values);

    if (isUpdate) {
      handleUpdateCar(carFormData);
    } else {
      handleSaveCar(carFormData);
    }
  }

  function handleCancelInModal() {
    setDisplayModalSave(false);
  }

  if (isSaving || isUpdating) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  if (endOfSave || endOfUpdating) {
    return (
      <InformationModal title="Car saved successfully" exitRoute="/" />
    );
  }

  if (displayModalSave) {
    return (
      <ActionModal
        action="Save"
        title="Save car"
        subtitle="Are you sure you want to save this car?"
        handleCancelModal={handleCancelInModal}
        handleAffirmationModal={handleSaveInModal}
      />
    );
  }

  return (
    <>
      <header className="mb-5">
        <PageExit exitRoute="/" />
      </header>

      <main>

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
                defaultChecked={formik.values.airConditioning === true ? 'checked' : null}
              />
            </div>
            <div className="form-page__container-fieldset-no">
              <label>No</label>
              <input
                name="airConditioning"
                onChange={formik.handleChange}
                type="radio"
                value="no"
                defaultChecked={formik.values.airConditioning === false ? 'checked' : null}
              />
            </div>
          </fieldset>
          <fieldset className="form-page__fieldset-transmission">
            <label className="form-page__label-transmission has-text-weight-semibold">Transmission</label>
            <div className="form-page__container-fieldset-manual">
              <label>Manual</label>
              <input
                name="transmission"
                onChange={formik.handleChange}
                type="radio"
                value="manual"
                defaultChecked={formik.values.transmission === 'manual' ? 'checked' : null}
              />
            </div>
            <div className="form-page__container-fieldset-automatic">
              <label>Automatic</label>
              <input
                name="transmission"
                onChange={formik.handleChange}
                type="radio"
                value="automatic"
                defaultChecked={formik.values.transmission === 'automatic' ? 'checked' : null}
              />
            </div>
          </fieldset>
          <fieldset className="file mb-5">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="resume"
                onChange={(e) => {
                  formik.setFieldValue('file', e.target.files[0]);
                }}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label">
                  Choose a image…
                </span>
              </span>
            </label>
          </fieldset>

          <button className="button is-primary" type="submit">Save car</button>
        </form>

      </main>
    </>
  );
}

Form.propTypes = {
  isUpdate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export { Form };
