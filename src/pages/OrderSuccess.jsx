import { Link,useLocation } from "react-router-dom";



function OrderSuccess(){

    const location=useLocation();
    const order = location.state;

    if(!order){
        return(
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <p className="font-bold text-xl text-red-600 mb-8">No order datails found</p>
                <Link to="/shop" className="text-lg text-[#436EDF] hover:underline" >Go to shop.</Link>
            </div>
        );
    }
    return(
        <div className="max-w-7xl mx-auto mb-4 px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gray-100 rounded-lg w-full py-4 px-2">
             <p className="font-bold text-3xl text-[#0D0D7B] sm:text-xl">Order Placed Successfully </p>
             <p className="text-gray-600 mb-2">Thank you for shopping with TechBazaar</p>
             <p className="mt-6 text-lg font-bold" >Order#  <span className="font-medium">{order.orderId}</span></p>
             <p className="text-lg font-bold">Total: <span className="font-medium">Rs. {order.total}</span></p>
             
            </div>
            <p className="text-xl font-bold mt-8 mb-4">Order Summary</p>

            <div className="bg-gray-100 rounded-lg px-2 w-full py-4">
                <p className="mb-2 mt-2">{order.customerName}</p>
                <p className="mb-2">{order.email}</p>
                <p className="mb-2">{order.phone}</p>
                <p className="mb-2">{order.address}</p>
                <p className="mb-2">{order.postalCode}</p>
            </div>
            <Link to="/track-order"><button type="button" className="bg-[#436EDF] text-[#F8FAE5] font-semibold rounded-lg mt-8 p-2 hover:bg-[#2f52b0] transition ">Track Order</button></Link>

            <Link to="/shop" className="text-lg flex items-center justify-center text-[#436EDF] hover:underline mt-18 mb-6" >Continue Shopping</Link>
        </div>
    );
    
}
export default OrderSuccess;