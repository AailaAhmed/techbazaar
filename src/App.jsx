import './App.css'
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/cartContext';
function App() {
  
  return (
    
    <BrowserRouter>
     <CartProvider>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
      
        <main className='flex-1'>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/shop" element={<Shop />} />

            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/cart" element={<Cart/>}/>

            <Route path="/checkout" element={<Checkout/>}/>

          </Routes>
        </main>
        <Footer />
      </div>
     </CartProvider>
    </BrowserRouter>
  )
}
export default App;
