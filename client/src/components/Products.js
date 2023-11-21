import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8000/products";
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="dark:bg-slate-900 bg-slate-400">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nos Nouveautés
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            
            {product.map((prod) => (
            <Link key={prod.id} to={prod.id}> 
              <div key={prod.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={prod.id}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-xl dark:text-slate-400  text-slate-900">
                      <a href={prod.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {prod.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-xl font-medium dark:text-slate-400  text-slate-900">
                    {prod.price}€
                  </p>
                </div>
              </div>
            </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
