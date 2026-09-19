import { useState,useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../services/productService";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { MoveLeft, MoveRight } from "lucide-react";

function Shop(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);

    const [currentPage,setCurrentPage]=useState(1);
    const productsPerPage=8;

    const [searchParams,setSearchParams]=useSearchParams();
    const [category,setCategory]=useState(searchParams.get("category")||"all");
    const [searchTerm,setSearchTerm]=useState("");
    const [sortBy,setSortBy]=useState("default");
    const [error,setError]=useState("");

    useEffect(()=>{
        async function fetchProducts() {
            try {
                setLoading(true);
                setError("");
                const[smartphones, laptops,tablets, accssories] =await Promise.all ([
                    getProductsByCategory("smartphones"),
                    getProductsByCategory("laptops"),
                    getProductsByCategory("tablets"),
                    getProductsByCategory("mobile-accessories"),

                ]);

                const allProducts=[
                    ...smartphones.products,
                    ...laptops.products,
                    ...tablets.products,
                    ...accssories.products,

                ];

                setProducts(allProducts);

            } catch (err) {
                setError("Failed to load products. Please try again.");
            } finally{
                setLoading(false);
            }
        }
        fetchProducts();

    },[] );


    let filteredProducts=products.filter((p)=> category==="all" || p.category===category).filter((p)=> p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if(sortBy==="price-low"){
        filteredProducts=[...filteredProducts.sort((a,b)=> a.price - b.price)];
    } else if(sortBy==="price-high"){
        filteredProducts=[...filteredProducts.sort((a,b)=> b.price - a.price)];
    } else if (sortBy === "rating") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const totalPages= Math.ceil(filteredProducts.length/productsPerPage);
    const startIndex= (currentPage-1) * productsPerPage;
    const paginatedProducts= filteredProducts.slice(startIndex, startIndex + productsPerPage);

    useEffect (()=> {
        setCurrentPage(1);
    },[searchTerm,category,sortBy]);

    function handleCategoryChange(e){
        const value=e.target.value;
        setCategory(value);
        setSearchParams(value==="all" ? {} : {category:value});
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4">
               
                <h1 className="text-3xl font-bold text-[#0D0D7B]"> <Link to="/" className="text-xl">← </Link> Shop</h1>
                <p className="mt-4 text-lg text-gray-600">Explore our latest products</p>
            </div>

            
                <input 
                 type="text" 
                 placeholder="Search"
                 value={searchTerm}
                 onChange={(e)=> setSearchTerm(e.target.value)}
                 className="border border-gray-300 rounded-lg px-2 w-full text-sm"
                />
            <div className="grid grid-cols-2 gap-4 mt-6 mb-8 text-sm">
                <select 
                 value={category}
                 onChange={handleCategoryChange}
                 className="border border-gray-300 rounded-lg w-full"
                >
                    <option value="all">All Categories</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="tablets">Tablets</option>
                    <option value="mobile-accessories">Accessories</option>

                 </select>

                <select 
                 value={sortBy}
                 onChange={(e)=> setSortBy(e.target.value)}
                 className="border border-gray-300 rounded-lg w-full"
                 >
                    <option value="default">Sort by</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                 </select>
            </div>

            {loading && (
                <div className="text-center py-12">
                    <p className="text-gray-600">Loading Products...</p>
                </div>
            )}

            {!loading && error &&(
                <div className="text-center py-12">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            {!loading && !error && filteredProducts.length===0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600">No Products Found.</p>
                </div>
            )}

            {!loading && !error && filteredProducts.length>0 && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {paginatedProducts.map((product)=> (
                        <ProductCard 
                          key={product.id}
                          id={product.id}
                          image={product.thumbnail}
                          title={product.title}
                          pricing={product.price}
                          rating={product.rating}
                        />
                    ))}
                </div>
            )}

            {!loading && !error && filteredProducts.length>0 && (

                <div className="flex items-center justify-center mt-16 mb-8 gap-6">
                        <button 
                           onClick={()=> setCurrentPage((p)=> Math.max(1,p-1))}
                           disabled={currentPage===1}
                           
                        >  
                           < MoveLeft/> 
                        </button>

                        <span>Page {currentPage} of {totalPages}</span>

                        <button 
                            onClick={()=> setCurrentPage((p)=> Math.min(totalPages,p+1))}
                            disabled={currentPage===totalPages}
                            > 
                            <MoveRight/> 
                        </button>
                        
                    </div>

            )}



        </main>
    );
}
export default Shop; 