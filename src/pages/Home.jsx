
function Home(){
    return(
        <div>
            <section className="bg-gradient-to-r from-blue-600 to-blue-200 text-white">
                <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
                    <h1 className="text-4x1 sm:text-5x1 lg:text-6x1 font-bold font-poppins">
                        Discover the latest tech
                    </h1>
                    <p className="mt-6 text-lg sm:text-x1 text-blue-100 maw-w-2x1 mx-auto">
                        Explore the latest gadgets and electronics at prices you'll love.
                    </p>
                    <button type="button" className="mt-8 px-2 py-1 bg-blue-300 text-blue-400 rounded-lg font-semibold hover:bg-gray-100 transition">Shop Now</button>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3x1 font-bold text-gray-900">
                        Categories
                    </h2>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7x1 max-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3x1 font-bold text-gray-900">
                        Featured Products
                    </h2>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3x1 font-bold text-gray-900">
                        Best Sellers
                    </h2>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-200 text-white">
                <div className="max-w-7x1 max-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3x1 font-bold text-gray-900">
                        Flash Sale
                    </h2>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7x1 max-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3x1 font-bold text-gray-900">
                        Newsletter
                    </h2>
                </div>
            </section>
        </div>
    );
}
export default Home;