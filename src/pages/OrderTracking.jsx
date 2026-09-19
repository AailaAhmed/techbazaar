import { useState } from "react";
import { getOrderById } from "../utils/cart";

function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    const found = getOrderById(orderId.trim());
    setOrder(found || null);
    setSearched(true);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#0D0D7B] mb-6">Track Your Order</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter your Order #"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-[#436EDF] text-[#F8FAE5] px-6 py-2 rounded-lg font-semibold hover:bg-[#2f52b0] transition"
        >
          Track
        </button>
      </form>

      {searched && !order && (
        <p className="text-red-600">No order found with that ID. Please check and try again.</p>
      )}

      {order && (
        <div className="bg-gray-100 rounded-lg p-6">
          <p className="mb-2"><span className="font-semibold">Order #:</span> {order.orderId}</p>
          <p className="mb-2"><span className="font-semibold">Status:</span> {order.status}</p>
          <p className="mb-2"><span className="font-semibold">Placed on:</span> {new Date(order.date).toLocaleDateString()}</p>
          <p className="mb-2"><span className="font-semibold">Total:</span> Rs. {order.total}</p>
          <p><span className="font-semibold">Shipping to:</span> {order.address}</p>
        </div>
      )}
    </main>
  );
}
export default OrderTracking;