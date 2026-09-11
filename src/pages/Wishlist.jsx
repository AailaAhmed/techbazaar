import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWishlist } from "../utils/wishlist";
import ProductCard from "../components/ProductCard";


function Wishlist() {
  const [items, setItems] = useState([]);

  function refreshWishlist() {
    setItems(getWishlist());
  }

  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
      <h1 className="text-3xl font-bold text-[#0D0D7B] mb-8"><Link to="/shop" className="text-xl">← </Link> My Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">
          Your wishlist is empty. Start exploring the shop to add products!
          
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.thumbnail}
              title={product.title}
              pricing={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      )}

    </main>
  );
}

export default Wishlist;