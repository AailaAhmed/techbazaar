import { useState,useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";
import { Link } from "react-router-dom";


function Home(){
    const[featured,setFeatured]=useState([]);
    const[bestSellers,setBestSellers]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");
    

    useEffect(()=>{
       async function fetchHomeData() {
        try {
            setLoading(true);
            setError("");
            const data=await getAllProducts(50,0);
            const products=data.products;
            setFeatured(products.slice(0,4));


            const topRated=products.filter((p)=>p.rating>=4.5).slice(0,4);
            setBestSellers(topRated);
            
        } catch (err) {
            setError("Failed to load products.")
            
        } finally {
            setLoading(false);
        }
       }
       fetchHomeData();
    },[])

   

    return(
        <div>
            <section className="bg-gradient-to-r from-[#436EDF] to-blue-200 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
                    <h1 className="text-xl sm:text-3xl lg:text-6xl text-[#F8FAE5] font-bold">
                        Discover the latest tech
                    </h1>
                    <p className="mt-6 text-sm sm:text-xl text-[#F8FAE5] max-w-2xl mx-auto">
                        Explore the latest gadgets and electronics at prices you'll love.
                    </p>
                    <Link to="/shop"> <button type="button" className="mt-8 px-2 py-1 bg-[#F8FAE5] text-[#436EDF] rounded-lg font-semibold hover:bg-gray-200 transition">Shop Now</button> </Link>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">
                        Categories
                    </h2>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">
                        Featured Products
                    </h2>
                    {loading && 
                        <p>Loading....</p>
                    }
                    {!loading && error && 
                        <p>{error}</p>
                    }
                    {!loading && !error && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {featured.map((product)=> (
                             
                              <ProductCard
                                key={product.id}
                                image={product.thumbnail}
                                title={product.title}
                                pricing={product.price}
                                rating={product.rating}
                             />
                              ))
                            }
                        </div>
                    )
                    }
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">
                        Best Sellers
                    </h2>
                    {loading && <p>Loading...</p>}
                    {!loading && error && <p>{error}</p>}
                    {!loading && !error && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {bestSellers.map((product)=> (
                                <ProductCard 
                                  key={product.id}
                                  image={product.thumbnail}
                                  title={product.title}
                                  rating={product.rating}
                                  pricing={product.price}
                                />
                            )
                            )}
                        </div>
                    ) }
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-[#436EDF] to-blue-200 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">
                        Flash Sale
                    </h2>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">
                        Newsletter
                    </h2>
                </div>
            </section>
        
        </div>

        
    );
}
export default Home;