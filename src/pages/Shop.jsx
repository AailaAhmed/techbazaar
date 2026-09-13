import { useState,useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";
import { Link } from "react-router-dom";

function Shop(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");

    useEffect(()=>{
        async function fetchProducts() {
            try {
                setLoading(true);
                setError("");
                const data =await getAllProducts();
                setProducts(data.products);

            } catch (err) {
                setError("Failed to load products. Please try again.");
            } finally{
                setLoading(false);
            }
        }
        fetchProducts();

    },[] );

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-4">
               
                <h1 className="text-3xl font-bold text-[#0D0D7B]"> <Link to="/" className="text-xl">← </Link> Shop</h1>
                <p className="mt-4 text-lg text-gray-600">Explore our latest products</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
        </main>
    );
}
export default Shop; 