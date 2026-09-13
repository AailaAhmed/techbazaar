import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getCart,removeFromCart,updateQuantity,getCartTotal } from "../utils/cart";
import { useCart } from "../context/cartContext";

function Cart(){
    const[items,setItems]=useState([]);
    const { refreshCartCount } = useCart();
    function refreshCart(){
        setItems(getCart());
    }
    useEffect (()=>{ 
        refreshCart();
    },[]);

    function handleRemove(id){
        removeFromCart(id);
        refreshCart();
        refreshCartCount();
    }

    function handleQuantityChange(id,newQty){
        updateQuantity(id,newQty);
        refreshCart();
        refreshCartCount();
    }
  
   const total= items.reduce((sum,item) => sum + item.price * item.quantity,0);
    
   return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#0D0D7B] mb-8">My Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/shop" className="text-[#436EDF] font-semibold hover:underline">
            Continue shopping →
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white rounded-xl shadow-md p-4 border border-gray-200"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-[#0D0D7B]">{item.title}</h3>
                  <p className="text-sm text-gray-600">Rs. {item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-[#0D0D7B]">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-600 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="bg-gray-100 rounded-xl p-6 h-fit">
            <h2 className="text-lg font-bold text-[#0D0D7B] mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Items</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-[#0D0D7B] border-t pt-3 mt-3">
              <span>Total</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
             <button type="button" className="bg-[#436EDF] w-full mt-6 py-3 text-[#F8FAE5] rounded-lg font-semibold hover:bg-[#2f52b0] transition">
              Proceed to Checkout
             </button>
            </Link>
          </div>
        </div>
      )}
    </main>
);
}
export default Cart;