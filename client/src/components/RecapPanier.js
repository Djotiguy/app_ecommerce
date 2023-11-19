import { useState, useEffect } from "react";

export default function RecapPanier() {
    const [basket, setBasket] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const basketData = JSON.parse(sessionStorage.getItem("basket"));
          if (basketData) {
            setBasket(basketData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);


      function addOrder() {
        const basketFromSession = JSON.parse(sessionStorage.getItem("basket"));
      
        if (basketFromSession) {
          const totalPrice = basketFromSession.reduce(
            (total, productuct) => total + (productuct.quantite || 1) * productuct.price,
            0
          );
          const totalquantite = basketFromSession.reduce(
            (total, productuct) => total + (productuct.quantite || 1),
            0
          );
      
          const basketInfo = {
            price: totalPrice,
            quantite: totalquantite,
          };
      
          fetch("http://localhost:8000/recap-panier", {
            method: "POST",
            body: JSON.stringify(basketInfo),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.status === 200) {
                sessionStorage.removeItem("basket");
                sessionStorage.removeItem("totalPrice");
                window.location = '/orders';
              } else {
                console.error('Erreur lors de l\'ajout du panier.');
              }
            })
            .catch((error) => {
              console.error('Erreur lors de l\'ajout du panier.', error);
            });
        } else {
          console.error('Aucune donnée de panier dans le sessionStorage.');
        }
      }  
      

  return basket ? (
    <>
      <div className="dark:bg-slate-900 bg-slate-400">
        <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Récapitulatif de la commande
          </h1>

          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {basket.map((product) => (
                <li key={product.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      Status de la commande :{" "}
                    </p>
                    <p className="mt-1 truncate text-xl leading-5 dark:text-slate-400 text-gray-500">
                      {product.name}
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-xl leading-6 dark:text-slate-400 text-gray-900">
                    {product.price}€
                  </p>
                </div>
              </li>
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Sommaire commande
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Prix total</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {Number(sessionStorage.getItem("totalPrice")).toFixed(2)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={addOrder}
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-orange-200 px-4 py-3 text-base font-medium text-white shadow-sm hover-bg-indigo-700 focus:outline-none focus-ring-2 focus-ring-indigo-500 focus-ring-offset-2 focus-ring-offset-gray-50"
                >
                  Commander
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>
    </>
  ) : null;
}
