import './App.css'
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductCard from './components/ProductCard';
import Shop from './pages/Shop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  
  return (
    
    <BrowserRouter>
     <div className='min-h-screen flex flex-col'>
      <Navbar />
      
     <main className='flex-1'>
      <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/shop" element={<Shop />} />

            

          </Routes>
     </main>
     
      
      <Footer />
      </div>
     </BrowserRouter>
  )
}
export default App;
