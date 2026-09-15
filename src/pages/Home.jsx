import { useState,useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory} from "../services/productService";
import { Link } from "react-router-dom";

const categories=[
                {name:"Smartphones" ,value:"smartphones"},
                {name:"Laptops" ,value:"laptops"},
                {name:"Tablets" ,value:"tablets"},
                {name:"Accessories" ,value:"mobile-accessories"},
            ];

function Home(){
    const[featured,setFeatured]=useState([]);
    const[bestSellers,setBestSellers]=useState([]);
    const[flashSale, setFlashSale] = useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");
    

    useEffect(()=>{
       async function fetchHomeData() {
        try {
            setLoading(true);
            setError("");

            const[phones, laptops,tablets, accssories] =await Promise.all ([
                getProductsByCategory("smartphones"),
                getProductsByCategory("laptops"),
                getProductsByCategory("tablets"),
                getProductsByCategory("mobile-accessories"),
            
            ]);
            
            const allProducts=[
                ...phones.products,
                ...laptops.products,
                ...tablets.products,
                ...accssories.products,
            
            ];
        
            setFeatured(allProducts.slice(0,4));


            const topRated=allProducts.filter((p)=>p.rating>=4.5).slice(0,4);
            setBestSellers(topRated);

            const onSale = allProducts.filter((p) => p.discountPercentage > 10).slice(0, 4);
            setFlashSale(onSale)
            
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center">
                    <h1 className="text-xl sm:text-3xl lg:text-6xl text-[#F8FAE5] font-bold">
                        Discover the latest tech
                    </h1>
                    <p className="mt-6 text-sm sm:text-xl text-[#F8FAE5] max-w-2xl mx-auto">
                        Explore the latest gadgets and electronics at prices you'll love.
                    </p>
                    <Link to="/shop"> <button type="button" className="mt-8 px-2 py-1 bg-[#F8FAE5] text-[#436EDF] rounded-lg font-semibold hover:bg-gray-200 transition">Shop Now</button> </Link>
                </div>
            </section>

            <section className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {categories.map((cat)=>(
                            <Link key={cat.value} to={`/shop?category=${cat.value}`} className="bg-gray-100 text-sm sm:text-3xl lg:text-6xl mt-4 rounded-xl p-2 sm:p-2 text-center hover:bg-gray-200 transition"> 
                               <p className="font-semibold text-[#0D0D7B]">{cat.name}</p>
                            </Link>
                        ))}
                    </div>    
                </div>
            </section>

            <section className="py-8 mt-2 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4">
                        Featured Products
                    </h2>
                    {loading && 
                        <p>Loading....</p>
                    }
                    {!loading && error && 
                        <p>{error}</p>
                    }
                    {!loading && !error && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {featured.map((product)=> (
                             
                              <ProductCard
                                key={product.id}
                                id={product.id}
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

            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4">
                        Best Sellers
                    </h2>
                    {loading && <p>Loading...</p>}
                    {!loading && error && <p>{error}</p>}
                    {!loading && !error && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {bestSellers.map((product)=> (
                                <ProductCard 
                                  key={product.id}
                                  id={product.id}
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

            <section className="py-8 bg-gradient-to-r from-[#436EDF] to-blue-200 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4">
                        Flash Sale
                    </h2>
                    {!loading && !error && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {flashSale.map((product)=>(
                                <ProductCard
                                  key={product.id}
                                  id={product.id}
                                  image={product.thumbnail}
                                  title={product.title}
                                  rating={product.rating}
                                  pricing={product.price}
                                 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        
        </div>

        
    );
}
export default Home;