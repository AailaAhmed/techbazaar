import { useState } from "react";
import {Link} from "react-router-dom";
import { isInWishlist,addToWishlist,removeFromWishlist } from "../utils/wishlist";

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

    return(
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-full border border-gray-200 flex flex-col hover:shadow-lg transition">
            <div>
                <button type="button" onClick={wishlistToggle} className="text-lg px-3 mt-2"> {wishlisted?"❤️":"♡"} </button>
            </div>
            <div className="h-56 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="p-2 flex flex-col flex-1 bg-gray-100">
                <h3 className="text-sm font-semibold text-[#0D0D7B] line-clamp-2 min-h-[3rem]">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{rating}</span>
                </div>

                <p className="text-sm font-bold text-[#0D0D7B] mt-auto">Rs. {pricing}</p>

               <Link to={`/product/${id}`}> <button type="button" className="bg-[#436EDF] w-full mt-auto py-2.5 text-[#F8FAE5] rounded-lg font-semibold hover:bg-gray-700 transition ">Add to Cart</button></Link>
            </div>
        </div>
    );
}
export default ProductCard;
