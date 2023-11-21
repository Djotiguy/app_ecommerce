import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();


    useEffect(() => {
      const fetchData = async () => {
        const url = `http://localhost:8000/products/${id}`;     
        try {
          const response = await axios.get(url);
          setProduct(response.data);
        } catch (error) {  
          console.log(error);
        } 
      };
      fetchData();
    }, [id]); 

    function addProduct() {
      const existingProductInfo = JSON.parse(sessionStorage.getItem("basket")) || [];
    
      existingProductInfo.push({
        name: product.name,
        price: product.price,
        qty: product.inventory
      });
    
      sessionStorage.setItem("basket", JSON.stringify(existingProductInfo));
      console.log('Produit ajouté');
      window.location = "/panier";
    }

    return product ? (
      <div className="dark:bg-slate-900 bg-slate-400">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
           
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight dark:text-slate-400 text-gray-900">{product.name}</h1>
  
              <div className="mt-3">
                <p className="text-3xl tracking-tight dark:text-slate-400">{product.price}€</p>
              </div>
  
                <div className="mt-10 flex">
                  <button
                    type="submit"
                    onClick={addProduct}
                    className="rounded-md border border-transparent bg-orange-200 px-4 py-3 text-base font-medium text-white shadow-sm hover-bg-indigo-700 focus:outline-none focus-ring-2 focus-ring-indigo-500 focus-ring-offset-2 focus-ring-offset-gray-50"
                    >
                    Ajouter au panier
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
}
