import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

function Navbar()
{
    const[isMenuOpen,setIsMenuOpen]=useState(false);
    const { cartCount } = useCart();
    return(
       <nav className="bg-white border-b border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-centre justify-between h-16">

                {/* logo/ store name */}
                <div className="flex-shrink-0 mt-4">
                    <Link to="/" className="text-2xl font-bold text-[#0D0D7B]">TechBazaar</Link>
                </div>

                {/* desktop navigation*/}
                <div className="hidden md:flex items-centre gap-8 mt-5 text-sm">
                    <Link to="/" className="text-gray-700 hover:text-[#436EDF] transition">HOME</Link>
                    <Link to="/shop" className="text-gray-700 hover:text-[#436EDF] transition">SHOP</Link>
                    <Link to="/wishlist" className="text-gray-700 hover:text-[#436EDF] transition">WISHLIST</Link>
               
                    {/*static count*/}
                    <Link to="/cart" className="relative text-gray-700 hover:text-[#436EDF] transition"> CART {cartCount > 0 && <span className="absolute -top-2 -right-4 bg-[#436EDF] text-white text-xs font-bold rounded-full w-5 h-5 flex justify-center">{cartCount}</span>}</Link> 
            
                </div>
                {/*Mobile hamburger */}
                <Link to="/cart" className="md:hidden px-4 ml-auto flex items-center text-xs">🛒 {cartCount>0 && <span className="mb-4 px-1 text-bold">{cartCount}</span> }</Link>
                <button onClick={()=> setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700 text-xl hover:text-[#436EDF] focus:outline-none" aria-label="Toggle menue">
                    ☰
                </button>
                
            </div>

            {/*mobile navigation */}
            {isMenuOpen && (
                <div className="md:hidden pb-4">
                    <div className="flex flex-col gap-3 text-sm">
                        <Link to="/" className="text-gray-700 hover:text-[#436EDF] py-2">HOME</Link>
                        <Link to="/shop" className="text-gray-700 hover:text-[#436EDF] py-2">SHOP</Link>
                        <Link to="/wishlist" className="text-gray-700 hover:text-[#436EDF] py-2">WISHLIST</Link>
                        <Link to="/cart" className="text-gray-700 hover:text-[#436EDF] py-2">CART </Link>
                    </div>
                </div>)}

        </div>
       </nav>
    );
}
export default Navbar;