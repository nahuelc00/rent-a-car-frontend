/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getRents, saveRent, updateRent } from '../../../services/rents';
import { InformationModal } from '../../components/InformationModal';
import { PageExit } from '../../components/PageExit';
import { useGetIfIsUserAdmin } from '../../../hooks/client/useGetIfIsUserAdmin';
import { Loader } from '../../components/Loader';
import { getCar } from '../../../services/cars';
import { getClient } from '../../../services/clients';

function validateForm(rentData) {
  const {
    carLicensePlate, dniClient, unitPrice,
    totalPrice, dateFrom, dateTo,
    paymentMethod, paidRent,
  } = rentData;

  const hasEmptyValues = carLicensePlate === '' || dniClient === ''
            || unitPrice === '' || totalPrice === ''
            || dateFrom === '' || dateTo === ''
            || paymentMethod === '' || paidRent === '';

  if (hasEmptyValues) return false;
  return true;
}

function RentForm({ isUpdate }) {
  const { isLoading, isUserAdmin } = useGetIfIsUserAdmin();
  const [errorInSave, setErrorInSave] = useState(undefined);
  const [errorInUpdate, setErrorInUpdate] = useState(undefined);
  const [saveSuccesfully, setSaveSuccesfully] = useState(undefined);
  const [updateSuccesfully, setUpdateSuccesfully] = useState(undefined);
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      carLicensePlate: '',
      dniClient: '',
      unitPrice: '',
      totalPrice: '',
      dateFrom: '',
      dateTo: '',
      paymentMethod: '',
      paidRent: '',
    },
    onSubmit: async (rentData) => {
      const isFormValid = validateForm(rentData);

      if (isFormValid) {
        const rentDataMapped = {
          ...rentData,
          paidRent: rentData.paidRent === 'yes',
        };

        if (isUpdate) {
          rentDataMapped.id = Number(id);
          const resultOfUpdate = await updateRent(rentDataMapped);

          if (resultOfUpdate.statusCode === 409) {
            setErrorInUpdate(resultOfUpdate.message);
          } else {
            setUpdateSuccesfully(true);
          }
        } else {
          const resultOfSave = await saveRent(rentDataMapped);

          if (resultOfSave.statusCode === 409) {
            setErrorInSave(resultOfSave.message);
          } else {
            setSaveSuccesfully(true);
          }
        }
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (isUpdate) {
        const rents = await getRents();
        const rentToUpdate = rents.find((rent) => rent.id === Number(id));
        const car = await getCar(rentToUpdate.car);
        const client = await getClient(rentToUpdate.client);

        formik.setValues({
          carLicensePlate: car.licensePlate,
          dniClient: client.documentNumber,
          unitPrice: rentToUpdate.unitPrice,
          totalPrice: rentToUpdate.totalPrice,
          dateFrom: rentToUpdate.dateFrom,
          dateTo: rentToUpdate.dateTo,
          paymentMethod: rentToUpdate.paymentMethod,
          paidRent: rentToUpdate.paidRent ? 'yes' : 'no',
        });
      }
    })();
  }, [getRents]);

  if (isLoading) {
    return (
      <div className="is-flex is-justify-content-center">
        <Loader />
      </div>
    );
  }

  if (isUserAdmin) {
    return (
      <>
        { errorInSave && (
        <InformationModal
          title={errorInSave}
          handleExitRoute={() => { setErrorInSave(undefined); }}
        />
        ) }

        { errorInUpdate && (
        <InformationModal
          title={errorInUpdate}
          handleExitRoute={() => { setErrorInUpdate(undefined); }}
        />
        ) }

        { saveSuccesfully && (
        <InformationModal
          title="Rent saved successfully"
          exitRoute="/rents"
        />
        ) }

        { updateSuccesfully && (
        <InformationModal
          title="Rent updated successfully"
          exitRoute="/rents"
        />
        ) }

        <header className="mb-5">
          <PageExit exitRoute="/rents" />
        </header>

        <main>

          <form onSubmit={formik.handleSubmit}>

            <fieldset style={{ height: '133px' }} className="field">
              <label className="label is-size-4">License plate</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  disabled={!!isUpdate}
                  className={formik.values.carLicensePlate ? 'input is-success is-medium' : 'input is-danger is-medium'}
                  type="text"
                  name="carLicensePlate"
                  value={formik.values.carLicensePlate}
                  placeholder="License plate"
                  onChange={formik.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fa-solid fa-id-card" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
            </fieldset>

            <fieldset style={{ height: '133px' }} className="field">
              <label className="label is-size-4">DNI</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  disabled={!!isUpdate}
                  className={formik.values.dniClient ? 'input is-success is-medium' : 'input is-danger is-medium'}
                  type="number"
                  name="dniClient"
                  value={formik.values.dniClient}
                  placeholder="DNI"
                  onChange={formik.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fa-solid fa-id-card" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
            </fieldset>

            <fieldset style={{ height: '133px' }} className="field">
              <label className="label is-size-4">Unit price</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={formik.values.unitPrice ? 'input is-success is-medium' : 'input is-danger is-medium'}
                  type="number"
                  name="unitPrice"
                  placeholder="Unit price"
                  onChange={formik.handleChange}
                  value={formik.values.unitPrice}
                />
                <span className="icon is-small is-left">
                  <i className="fa-regular fa-money-bill-1" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
            </fieldset>

            <fieldset style={{ height: '133px' }} className="field">
              <label className="label is-size-4">Total price</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={formik.values.totalPrice ? 'input is-success is-medium' : 'input is-danger is-medium'}
                  type="number"
                  name="totalPrice"
                  placeholder="Total price"
                  onChange={formik.handleChange}
                  value={formik.values.totalPrice}
                />
                <span className="icon is-small is-left">
                  <i className="fa-regular fa-money-bill-1" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
            </fieldset>

            <fieldset style={{ height: '133px' }} className="field">
              <label className="label is-size-4">From</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={formik.values.dateFrom ? 'input is-success is-medium' : 'input is-danger is-medium'}
                  type="date"
                  name="dateFrom"
                  placeholder="Date from"
                  onChange={formik.handleChange}
                  value={formik.values.dateFrom}
                />
                <span className="icon is-small is-left">
                  <i className="fa-solid fa-calendar-days" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
            </fieldset>

            <fieldset style={{ height: '133px' }} className="field">
              <label className="label is-size-4">To</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={formik.values.dateTo ? 'input is-success is-medium' : 'input is-danger is-medium'}
                  type="date"
                  name="dateTo"
                  placeholder="Date to"
                  onChange={formik.handleChange}
                  value={formik.values.dateTo}
                />
                <span className="icon is-small is-left">
                  <i className="fa-solid fa-calendar-days" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
            </fieldset>

            <fieldset style={{ height: '133px' }} className="field">
              <label className="label is-size-4">Payment method</label>
              <div className="select is-medium">
                {isUpdate ? (
                  <select
                    value={formik.values.paymentMethod}
                    name="paymentMethod"
                    onChange={formik.handleChange}
                  >
                    <option value="default" disabled>Select dropdown</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                )
                  : (
                    <select
                      defaultValue="default"
                      name="paymentMethod"
                      onChange={formik.handleChange}
                    >
                      <option value="default" disabled>Select dropdown</option>
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                    </select>
                  ) }

              </div>
            </fieldset>

            <fieldset style={{ height: '133px' }} className="field">
              <label className="label is-size-4">Paid rent</label>
              <div className="select is-medium">
                {isUpdate ? (
                  <select value={formik.values.paidRent} name="paidRent" onChange={formik.handleChange}>
                    <option value="default" disabled>Select dropdown</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                )
                  : (
                    <select defaultValue="default" name="paidRent" onChange={formik.handleChange}>
                      <option value="default" disabled>Select dropdown</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  ) }

              </div>
            </fieldset>

            <div className="field">
              <div className="control">
                <button type="submit" className="button is-link is-medium">Save rent</button>
              </div>
            </div>

          </form>
        </main>
      </>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

RentForm.defaultProps = {
  isUpdate: null,
};

RentForm.propTypes = {
  isUpdate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

export { RentForm };
