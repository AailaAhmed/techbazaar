import { useState,useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { Link, useSearchParams } from "react-router-dom";
import { MoveLeft, MoveRight } from "lucide-react";

const productsPerPage=8;
const SORT_MAP = { "price-low": "price", "price-high": "-price", rating: "-rating" };

function Shop(){

    const [products,setProducts]=useState([]);
    const [count, setCount] = useState(0);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");

    const [currentPage,setCurrentPage]=useState(1);
    const [searchParams,setSearchParams]=useSearchParams();
    const [category,setCategory]=useState(searchParams.get("category")||"all");
    const [searchTerm,setSearchTerm]=useState("");
    const [sortBy,setSortBy]=useState("default");

    const totalPages = Math.max(1, Math.ceil(count / productsPerPage));
    useEffect (()=> {
        setCurrentPage(1);
    },[searchTerm,category,sortBy]);


    useEffect(()=>{
        async function fetchProducts() {
            try {
                setLoading(true);
                setError("");
                const data = await getProducts({
                    page:currentPage,
                    search: searchTerm,
                    category,
                    ordering: SORT_MAP[sortBy]||""
                });

                setProducts(data.results);
                setCount(data.count);

            } catch (err) {
                setError("Failed to load products. Please try again.");
            } finally{
                setLoading(false);
            }
        }
        fetchProducts();

    },[currentPage,searchTerm,category,sortBy] );

    useEffect(() => {
       document.title = "Shop | TechBazaar";
    }, []);


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

            {!loading && !error && products.length===0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600">No Products Found.</p>
                </div>
            )}

            {!loading && !error && products.length>0 && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {products.map((product)=> (
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

            {!loading && !error && products.length>0 && (

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