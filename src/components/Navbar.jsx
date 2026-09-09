import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar()
{
    const[isMenuOpen,setIsMenuOpen]=useState(false);
    return(
       <nav className="bg-white border-b border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-centre justify-between h-16">

                {/* logo/ store name */}
                <div className="flex-shrink-0 mt-4">
                    <Link to="/" className="text-2xl font-bold text-gray-900">TechBazaar</Link>
                </div>

                {/* desktop navigation*/}
                <div className="hidden md:flex items-centre gap-8 mt-5 text-sm">
                    <Link to="/" className="text-gray-700 hover:text-[#436EDF] transition">HOME</Link>
                    <Link to="/shop" className="text-gray-700 hover:text-[#436EDF] transition">SHOP</Link>
                    <Link to="/wishlist" className="text-gray-700 hover:text-[#436EDF] transition">WISHLIST</Link>
                    {/* cart */}
                    <Link to="/cart" className="relative text-gray-700 hover:text-[#436EDF] transition">CART
                    {/*static count*/}
                    <span className="absolute -top-2 -right-4 bg-[#436EDF] text-white text-xs font-bold rounded-full w-5 h-5 items-center justify-center">2</span>
                    </Link>
                </div>
                {/*Mobile hamburger */}
                <button onClick={()=> setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700 hover:text-[#436EDF] focus:outline-none" aria-label="Toggle menue">
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
                        <Link to="/cart" className="text-gray-700 hover:text-[#436EDF] py-2">Cart (2)</Link>
                    </div>
                </div>)}

        </div>
       </nav>
    );
}
export default Navbar;