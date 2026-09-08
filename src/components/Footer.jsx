
function Footer(){
    return (
       <footer className="bg-gray-900 text-white mt-16">
         <div className="max-7x1 wx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-8 lg:gap-155">
                   <a href="/about" className="text-gray-400 hover:text-white transition">ABOUT</a>
                   <a href="/contact" className="text-gray-400 hover:text-white transition">CONTACT</a>
                   <a href="/shop" className="text-gray-400 hover:text-white transition">SHOP</a>
            </div>
            <div className="mt-6 text-gray-400">
                   <p>Your one-stop shop for the latest technology.</p>
                </div>
         </div>


         <div className="px-8">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for latest updates and offers</p>
            <div className="flex">
                <input type="email" placeholder="Enter your E-mail" className="w-full px-4 py-2 rounded-l-lg bg-white text-gray-900 focus:outline-none"/>
                <button type="button" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg">Subscribe</button>

            </div>
         </div>

         <div className="border-t border-gray-700 mt-10 pt-6 text-center">
            <p>© 2026 TechBazaar. All rights reserved.</p>

         </div>
       </footer>
    );
}
export default Footer;