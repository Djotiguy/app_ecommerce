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
      <div className="dark:bg-slate-900 bg-slate-400">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Vos commandes
          </h2>

          <div>
            {orders.map((prod) => (
              <ul className="divide-y divide-gray-100">
                <li key={prod.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6  text-gray-900">
                        Status de la commande :
                      </p>
                      <p className="mt-1 truncate text-xl leading-5 text-gray-500">
                        {prod.status}
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {prod.total_price}€
                    </p>
                  </div>
                </li>
              </ul>
            ))}
          </div>

        </div>
      </div>
    </>
  ) : null;
};

export default Orders;
