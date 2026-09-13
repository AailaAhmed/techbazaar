import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart,clearCart } from "../utils/cart";
import { useCart } from "../context/cartContext";

function Checkout(){
    const[items,setItems]=useState([]);
    const[errors,setErrors]=useState({});
    const [formData,setFormData]=useState({
       
        email:"",
        country:"",
        firstName:"",
        lastName:"",
        phone:"",
        address:"",
        postalCode:"",
        paymentMethod:"",

    });
    useEffect (()=>{
       setItems(getCart());
    },[]);
    
    function validateForm(){
        const newErrors={};

        if(!formData.email.trim()){
            newErrors.email="Email is required";
        } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
            newErrors.email="Please enter a valid email address."
        }

        if(!formData.country){
            newErrors.country="Please select a country.";
        }

        if(!formData.firstName.trim()){
            newErrors.firstName="First name is required.";
        }

        if(!formData.lastName.trim()){
            newErrors.lastName="Last name is required.";
        }

        if(!formData.phone.trim()){
            newErrors.phone="Phone number is required";
        } else if(!/^\d{7,15}$/.test(formData.phone)){
            newErrors.phone="Enter a valid phone number.";
        }

        if(!formData.address.trim()){
            newErrors.address="Shipping address is required.";
        }

        if(!formData.postalCode.trim()){
            newErrors.postalCode="Postal code is required.";
        }

        if(!formData.paymentMethod){
            newErrors.paymentMethod="Please select a payment method.";
        }
        return newErrors;
    }
    
    function handleChange(e){
        const {name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}));
    }

    const total= items.reduce((sum,item) => sum + item.price * item.quantity,0);
    const shipping=200;
    const grandTotal=total + shipping;
    
    const navigate=useNavigate();
    const {refreshCartCount}=useCart();
    function handleSubmit(e){
        e.preventDefault();
        const newErrors=validateForm();
        setErrors(newErrors);

        if(Object.keys(newErrors).length===0){
            clearCart();
            refreshCartCount();
            navigate("/order-success",{
                state: {
                    total: grandTotal,
                    customerName: `${formData.firstName} ${formData.lastName}`,
                    phone: formData.phone,
                    address: formData.address,
                    postalCode: formData.postalCode,
                },
            });
        }
    }
   
    return(

         <form onSubmit={handleSubmit} noValidate className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-4">
              <span className="text-lg font-bold">Total: </span> <span>Rs. {total}</span>
            </div>

            <input 
             type="email"
             name="email" 
             placeholder="Enter Your Email" 
             value={formData.email}
             onChange={handleChange}
             className="w-full border border-gray-600 bg-white rounded-lg px-4 mt-4"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}


            <div className="mt-4">
             <input type="checkbox" /> <span >Remember me</span>
            </div>


            <h1 className="font-bold text-xl mt-8 mb-4">Delivery</h1>


            <select
             name="country"
             value={formData.country}
             onChange={handleChange}
             className="w-full border border-gray-600 bg-white rounded-lg px-4 mt-4"
            >
                <option value="">Select Country / Reigon</option>
                <option value="Pakistan">Pakistan</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Iran">Iran</option>
            </select>
            {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}

            <input 
             type="text" 
             name="firstName"
             placeholder="Enter first name" 
             value={formData.firstName}
             onChange={handleChange}
             className="w-full border border-gray-600 bg-white rounded-lg px-4 mt-4" 
            />
            {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}

            <input 
             type="text" 
             name="lastName"
             placeholder="Enter last name" 
             value={formData.lastName}
             onChange={handleChange}
             className="w-full border border-gray-600 bg-white rounded-lg px-4 mt-4"
            />
            {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}

            <input 
             type="tel" 
             name="phone"
             pattern="[0-9]*" 
             value={formData.phone}
             onChange={handleChange}
             placeholder="Enter phone number" className="w-full border border-gray-600 bg-white rounded-lg px-4 mt-4 invalid:border-red-600" 
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}

            <input 
             type="text" 
             name="address"
             placeholder="Enter shipping address" 
             value={formData.address}
             onChange={handleChange}
             className="w-full border border-gray-600 bg-white rounded-lg px-4 mt-4"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}

            <input 
             type="text" 
             name="postalCode"
             inputMode="numeric" 
             placeholder="Enter postal code" 
             value={formData.postalCode}
             onChange={handleChange}
             className="w-full border border-gray-600 bg-white rounded-lg px-4 mt-4"
            />
            {errors.postalCode && <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>}


            <h1 className="font-bold text-xl mt-8 mb-4">Payment</h1>
            <div>
             <input 
              type="radio" 
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod==="cod"}
              onChange={handleChange}
            /> {" "}
             <span> Cash on delivery</span> <br />
             <input 
              type="radio" 
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod==="card"}
              onChange={handleChange}
              />  {" "}
              <span> Credit / Debit card</span>
            </div>
            {errors.paymentMethod && <p className="text-red-600 text-sm mt-1">{errors.paymentMethod}</p>}

            <h1 className="font-bold text-xl mt-8 mb-4">Shipping Method</h1>
            <div className="bg-gray-100 rounded-lg max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-5 mb-4">
                <p>Flat Shipping 199 PKR + 1 PKR FBR POS Fee</p>
            </div>

             <div className="bg-gray-100 rounded-lg max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-5 mb-4">
                <p>Subtotal: Rs. {total}</p>
                <p>Shipping: Rs. {shipping}</p>
                <p className="font-bold mt-2">Total: Rs. {grandTotal}</p>
            </div>
            <div className="flex items-center justify-center">
             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-[#F8FAE5] rounded-lg py-2.5 px-4 mt-4 mb-4">Complete Order</button>
            </div>

            
         </form>
    );
   
}
export default Checkout;