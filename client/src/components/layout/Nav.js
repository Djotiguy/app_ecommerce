import {Link} from 'react-router-dom';

export default function Nav() {
    return (
        <>
          <div className="flex gap-2 p-5 items-center justify-center text-center">
            {" "}
            <Link to="/" className="bg-orange-200 rounded-lg my-2 p-1 text-xl">
              {" "}
              Accueil{" "}
            </Link>
            <Link to="/products" className="bg-orange-200 rounded-lg my-2 p-1 text-xl">
              {" "}
              Nos Produits{" "}
            </Link>
            <Link to="/panier" className="bg-orange-200 rounded-lg my-2 p-1 text-xl">
              {" "}
              Panier{" "}
            </Link>
            <Link to="/orders" className="bg-orange-200 rounded-lg my-2 p-1 text-xl">
              {" "}
              Commandes passées{" "}
            </Link>
            <Link to="/recap-panier" className="bg-orange-200 rounded-lg my-2 p-1 text-xl">
              {" "}
              Récapitulatif commande{" "}
            </Link>
          </div>
        </>
      );
}

