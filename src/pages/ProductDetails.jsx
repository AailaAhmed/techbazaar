import { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart } from "../utils/cart";
import { useCart } from "../context/cartContext";

function ProductDetails(){
    const{id}=useParams();
    const { refreshCartCount } = useCart();

    const[product,setProduct]=useState(null);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");


    useEffect(() => {
      if (product) {
        document.title = `${product.title} | TechBazaar`;
       }
    }, [product]);


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

const[showMessage,setShowMessage]=useState(false);
function handleAddToCart() {
  addToCart({ 
              id:product.id,
              thumbnail:product.thumbnail, 
              title: product.title, 
              price:product.price, 
              rating:product.rating, });
  refreshCartCount();
  setShowMessage(true);
  setTimeout(()=> setShowMessage(false),2000);
}
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading && <p>Loading...</p>}

            {!loading && error && <p>{error}</p>}

            {!loading && !error && !product && <p>No products found.</p>}

            {!loading && !error && product && (
                <div className="text-[#0D0D7B]">
                    <Link to="/shop"><p className="text-xl mt-">←</p></Link>
                    <div className="flex justify-center">
                        <img src={product.thumbnail} alt={product.title} className="max-h-56 w-full object-contain rounded-lg mx-auto"/>
                    </div>
                  
                  <div className="mt-8 sm:mt-4">
                    <p className="text-lg ">{product.title}</p>

                    <div className="py-2">
                     <span className="text-yellow-500">★ <span className="text-[#0D0D7B]">{product.rating}</span></span><br/> 
                     <span >Rs. {product.price}</span>
                    </div>
                    <button type="button" onClick={handleAddToCart} className="bg-[#436EDF] w-full mt-auto py-2.5 text-[#F8FAE5] rounded-lg font-semibold hover:bg-[#2f52b0] transition ">Add to Cart</button>
                    {showMessage && <p className="text-xs text-center text-green-600">Added To Cart!</p>}

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