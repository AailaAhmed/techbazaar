import { useState } from "react";

function Navbar()
{
    const[isMenuOpen,setIsMenuOpen]=useState(false);
    return(
       <nav className="bg-white border-b border-gray">
        <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-centre justify-between h-16">

                {/* logo/ store name */}
                <div className="flex-shrink-0 mt-5">
                    <a href="/" className="text-2X1 font-bold text-gray-900">TechBazaar</a>
                </div>

                {/* desktop navigation*/}
                <div className="hidden md:flex items-centre gap-8 mt-5">
                    <a href="/" className="text-gray-700 hover:text-blue-600 transition">HOME</a>
                    <a href="/shop" className="text-gray-700 hover:text-blue-600 transition">SHOP</a>
                    <a href="/wishlist" className="text-gray-700 hover:text-blue-600 transition">WISHLIST</a>
                    {/* cart */}
                    <a href="/cart" className="relative text-gray-700 hover:text-blue-600 transition">CART
                    {/*static count*/}
                    <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 items-centre justify-centre">2</span>
                    </a>
                </div>
                {/*Mobile hamburger */}
                <button onClick={()=> setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none" aria-label="Toggle menue">
                    ☰
                </button>
                
            </div>

            {/*mobile navigation */}
            {isMenuOpen && (
                <div className="md:hidden pb-4">
                    <div className="flex flex-col gap-3">
                        <a href="/" className="text-gray-700 hover:text-blue-600 py-2">HOME</a>
                        <a href="/shop" className="text-gray-700 hover:text-blue-600 py-2">SHOP</a>
                        <a href="/wishlist" className="text-gray-700 hover:text-blue-600 py-2">WISHLIST</a>
                        <a href="/cart" className="text-gray-700 hover:text-blue-600 py-2">Cart (2)</a>
                    </div>
                </div>)}

        </div>
       </nav>
    );
}
export default Navbar;