import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetIfIsUserAdmin } from '../../../hooks/client/useGetIfIsUserAdmin';
import { Loader } from '../../components/Loader';
import { PageExit } from '../../components/PageExit';
import { getRents } from '../../../services/rents';
import { getClient } from '../../../services/clients';
import { getCar } from '../../../services/cars';

function Rents() {
  const { isLoading, isUserAdmin } = useGetIfIsUserAdmin();
  const [rents, setRents] = useState([]);

  useEffect(() => {
    (async () => {
      const rentsData = await getRents();
      const rentsAux = [];

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
  }, [getRents, getClient, getCar]);

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
        <header className="mb-5">
          <PageExit exitRoute="/backoffice" />
        </header>

        <main>
          <Link to="/rent/add" className="button is-primary mb-6">Add rent</Link>

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
                  <th>{`${rent.client.firstname}`}</th>
                  <td>{`${rent.car.licensePlate}`}</td>
                  <td>{`${rent.rent.unitPrice}`}</td>
                  <td>{`${rent.rent.totalPrice}`}</td>
                  <td>{`${rent.rent.dateFrom}`}</td>
                  <td>{`${rent.rent.dateTo}`}</td>
                  <td className="is-capitalized">{`${rent.rent.paymentMethod}`}</td>
                  <td>{ `${rent.rent.paidRent === true ? 'Yes' : 'No'}` }</td>
                </tr>
              ))}
            </tbody>
          </table>

        </main>
      </>
    );
  }

  return <h1 className="title is-size-1">Not authorized</h1>;
}

export { Rents };
