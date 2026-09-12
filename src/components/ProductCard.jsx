import { useState } from "react";
import {Link} from "react-router-dom";
import { isInWishlist,addToWishlist,removeFromWishlist } from "../utils/wishlist";
import { addToCart} from "../utils/cart";
import { useCart } from "../context/cartContext";

function ProductCard({id,image,title,pricing,rating,onWishlistChange}) {

const [wishlisted,setWishlisted]=useState(isInWishlist(id));
function wishlistToggle(e){
      e.preventDefault();
      if(wishlisted){
        removeFromWishlist(id);
      }
      else {
        addToWishlist({id,thumbnail:image,title,price:pricing,rating});
      }
      setWishlisted(!wishlisted);
      if (onWishlistChange) onWishlistChange();
}

const { refreshCartCount } = useCart();
const[showMessage,setShowMessage]=useState(false);
function handleAddToCart(e){
       e.preventDefault();
       addToCart({id,thumbnail:image,title,price:pricing,rating});
       refreshCartCount();

       setShowMessage(true);
       setTimeout(()=>setShowMessage(false),2000);
}


    return(
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-full border border-gray-200 flex flex-col hover:shadow-lg transition">
            <div>
                <button type="button" onClick={wishlistToggle} className="text-lg px-3 mt-2"> {wishlisted?"❤️":"♡"} </button>
            </div>
            <div className="h-56 overflow-hidden">
               <Link to={`/product/${id}`}><img src={image} alt={title} className="w-full h-full object-cover" /></Link> 
            </div>

            <div className="p-2 flex flex-col flex-1 bg-gray-100">
                <h3 className="text-sm font-semibold text-[#0D0D7B] line-clamp-2 min-h-[3rem]">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{rating}</span>
                </div>

                <p className="text-sm font-bold text-[#0D0D7B] mt-auto">Rs. {pricing}</p>

               <button type="button" onClick={handleAddToCart} className="bg-[#436EDF] w-full mt-auto py-2.5 text-[#F8FAE5] rounded-lg font-semibold hover:bg-gray-700 transition ">Add to Cart</button>
               {showMessage && <p className="text-xs text-green-600 text-center">Added To Cart!</p>}
            </div>
        </div>
    );
}
export default ProductCard;
