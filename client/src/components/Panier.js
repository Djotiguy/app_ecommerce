/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect } from "react";

export default function Panier() {
  const [basket, setBasket] = useState(
    JSON.parse(sessionStorage.getItem("basket")) || []
  );

  useEffect(() => {
    const totalPrice = basket.reduce(
      (total, product) => total + product.price * (product.quantite || 1),
      0
    );

    const roundedTotal = Number(totalPrice.toFixed(2));

    sessionStorage.setItem("totalPrice", roundedTotal);
  }, [basket]);

  function addProduct(productId) {
    const updatedBasket = basket.map((product) => {
      if (product.id === productId) {
        const newquantite = (product.quantite || 0) + 1;
        return {
          ...product,
          quantite: newquantite,
          totalPrice: newquantite * product.price,
        };
      }
      return product;
    });
    setBasket(updatedBasket);
    sessionStorage.setItem("basket", JSON.stringify(updatedBasket));
  }

  function removeProduct(productId) {
    const updatedBasket = basket.map((product) => {
      if (product.id === productId) {
        if (product.quantite && product.quantite > 1) {
          return {
            ...product,
            quantite: product.quantite - 1,
            totalPrice: (product.quantite - 1) * product.price,
          };
        } else {
          return null;
        }
      }
      return product;
    });

    const filteredBasket = updatedBasket.filter((product) => product !== null);
    setBasket(filteredBasket);
    sessionStorage.setItem("basket", JSON.stringify(filteredBasket));
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.location = "/recap-panier/";
  }

  function addPanier() {
    const basketFromSession = JSON.parse(sessionStorage.getItem("basket"));
  
    if (basketFromSession) {
      const totalPrice = basketFromSession.reduce(
        (total, product) => total + (product.quantite || 1) * product.price,
        0
      );
      const totalquantite = basketFromSession.reduce(
        (total, product) => total + (product.quantite || 1),
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
            console.log('Panier ajouté avec succès.');
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
  

  return (
    <>
      <div className="bg-white">
        <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Liste d'articles
          </h1>

          <form onSubmit={handleSubmit} className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {basket.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">{product.name}</h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {product.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <select
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            value={product.quantite || 1}
                            onChange={(e) => {
                              const newquantite = parseInt(e.target.value, 10);
                              if (newquantite > 0) {
                                if (newquantite > (product.quantite || 1)) {
                                  addProduct(product.id);
                                } else if (
                                  newquantite < (product.quantite || 1)
                                ) {
                                  removeProduct(product.id);
                                }
                              }
                            }}
                          >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                        </div>
                      </div>
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
                  <dt className="text-sm text-gray-600">Sous-total</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {Number(sessionStorage.getItem("totalPrice")).toFixed(2)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                onClick={addPanier}
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover-bg-indigo-700 focus:outline-none focus-ring-2 focus-ring-indigo-500 focus-ring-offset-2 focus-ring-offset-gray-50"
                >
                  Valider
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>
    </>
  );
}
