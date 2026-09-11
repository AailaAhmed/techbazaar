import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { Link } from "react-router-dom";

function ProductDetails(){
    const{id}=useParams();

    const[product,setProduct]=useState(null);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");

    useEffect (() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                setError("");
                const data= await getProductById(id);
                setProduct(data);

            } catch (err) {
                setError("Failed to load product. Please try again.");
            } finally{
                setLoading(false);
            }
        }
        fetchProduct();
    },[id]);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {loading && <p>Loading...</p>}

            {!loading && error && <p>{error}</p>}

            {!loading && !error && !product && <p>No products found.</p>}

            {!loading && !error && product && (
                <div className="text-[#0D0D7B]">
                    <Link to="/shop"><p className="text-xl">←</p></Link>
                    <div className="flex justify-center">
                        <img src={product.thumbnail} />
                    </div>
                  <div className="py-2">
                    <p className="text-lg ">{product.title}</p>

                    <div className="py-3">
                     <span className="text-yellow-500">★ <span className="text-[#0D0D7B]">{product.rating}</span></span><br/> 
                     <span >Rs. {product.price}</span>
                    </div>

                    <p className="py-1"> <span className="font-bold text-lg" >Category: </span><span className="text-sm">{product.category}</span></p>

                    <div className="py-2 text-sm">
                        <span className="font-bold text-lg">Description: </span>{product.description}
                    </div>
                       <p> <span className="font-bold text-lg" >Available Units: </span> <span className="text-sm">{product.stock}</span></p>
                  </div>  
                </div>
            )}

        </main>
    );
}
export default ProductDetails;