import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8000/orders";
      try {
        const response = await axios.get(url);
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return orders ? (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Vos commandes
          </h2>

          <div>
            {orders.map((prod) => (
              <ul role="list" className="divide-y divide-gray-100">
                <li key={prod.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Status de la commande :
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {prod.status}
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {prod.prix_total}€
                    </p>
                  </div>
                </li>
              </ul>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/">
              <p className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Revenir à la page d'acceuil
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Orders;
