import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetIfIsUserAdmin } from '../../../hooks/client/useGetIfIsUserAdmin';
import { Loader } from '../../components/Loader';
import { PageExit } from '../../components/PageExit';
import { deleteRent, getRents } from '../../../services/rents';
import { getClient } from '../../../services/clients';
import { getCar } from '../../../services/cars';
import { InformationModal } from '../../components/InformationModal';
import { ActionModal } from '../../components/ActionModal';

function Rents() {
  const { isLoading, isUserAdmin } = useGetIfIsUserAdmin();
  const [rents, setRents] = useState([]);
  const [rentDeleted, setRentDeleted] = useState(false);
  const [modalDeleteRent, setModalDeleteRent] = useState(false);
  const [rentIdToDelete, setRentIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const rentsData = await getRents();
      const rentsAux = [];

      const noRents = rentsData.length === 0;

      if (noRents) {
        setRents([]);
        return;
      }

      rentsData.forEach(async (rent) => {
        const car = await getCar(rent.car);
        const client = await getClient(rent.client);
        const rentMapped = {
          car,
          client,
          rent,
        };
        rentsAux.push(rentMapped);
        setRents([...rentsAux]);
      });
    })();
  }, [getRents, getClient, getCar, rentDeleted]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isUserAdmin) {
    return (
      <>

        { modalDeleteRent && (
        <ActionModal
          title="Delete rent"
          action="Delete"
          subtitle="Are you sure you want to delete this rent?"
          handleAffirmationModal={async () => {
            const response = await deleteRent(rentIdToDelete);
            const isSuccessfullyDeleted = response.affected === 1;
            if (isSuccessfullyDeleted) {
              setModalDeleteRent(false);
              setRentDeleted(true);
            }
          }}
          handleCancelModal={() => setModalDeleteRent(false)}
        />
        ) }

        { rentDeleted && (
        <InformationModal
          title="Rent deleted successfully"
          handleExitRoute={() => {
            setRentDeleted(false);
          }}
        />
        ) }

        <header className="mb-5">
          <PageExit exitRoute="/backoffice" />
        </header>

        <main>
          <Link to="/rent/add" className="button is-primary mb-6">Add rent</Link>

          <div>
            <table className="table">
              <thead>
                <tr>
                  <th><abbr title="client">Client</abbr></th>
                  <th>Car</th>
                  <th><abbr title="unitPrice">Unit price</abbr></th>
                  <th><abbr title="totalPrice">Total price</abbr></th>
                  <th><abbr title="dateFrom">From</abbr></th>
                  <th><abbr title="dateTo">To</abbr></th>
                  <th><abbr title="paymentMethod">Payment.M</abbr></th>
                  <th><abbr title="paidRent">Paid rent</abbr></th>
                </tr>
              </thead>
              <tbody>
                { rents.map((rent) => (
                  <tr key={rent.rent.id}>
                    <th>{`${rent.client.documentNumber}`}</th>
                    <td>{`${rent.car.licensePlate}`}</td>
                    <td>{`${rent.rent.unitPrice}`}</td>
                    <td>{`${rent.rent.totalPrice}`}</td>
                    <td>{`${rent.rent.dateFrom}`}</td>
                    <td>{`${rent.rent.dateTo}`}</td>
                    <td className="is-capitalized">{`${rent.rent.paymentMethod}`}</td>
                    <td>{ `${rent.rent.paidRent ? 'Yes' : 'No'}` }</td>
                    <td>
                      <button
                        onClick={() => {
                          setModalDeleteRent(true);
                          setRentIdToDelete(rent.rent.id);
                        }}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/rent/edit/${rent.rent.id}`);
                        }}
                        type="button"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { Rents };
