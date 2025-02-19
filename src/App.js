import "bootstrap/dist/css/bootstrap.min.css"; 
import "./styles/global.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import NotFound from "./pages/NotFound";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Import list components with correct folder names (Capitalized)
import CustomerList from "./components/Customer/CustomerList";
import ProductList from "./components/Product/ProductList";
import OrderList from "./components/Order/OrderList";

import ProductForm from "./components/Product/ProductForm";
import CustomerForm from "./components/Customer/CustomerForm";
import OrderForm from "./components/Order/OrderForm";

import { generateHashes } from "./services/hashing";

// Load all API keys from .env
const apiKeys = {
  firebase: {
    privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY,
    publicKey: process.env.REACT_APP_FIREBASE_API_KEY
  },
  shipengine: {
    privateKey: process.env.REACT_APP_SHIPENGINE_API_KEY,
    publicKey: ""
  },
  shopify: {
    privateKey: process.env.REACT_APP_SHOPIFY_CLIENT_SECRET,
    publicKey: process.env.REACT_APP_SHOPIFY_CLIENT_ID
  },
  square: {
    privateKey: process.env.REACT_APP_SQUARE_ACCESS_TOKEN,
    publicKey: process.env.REACT_APP_SQUARE_APP_ID
  }
};

// Generate hashes for all API keys
console.log("Environment Variables:", process.env);
const hashes = generateHashes(apiKeys);
console.log("Generated Hashes:", hashes);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Customer Routes */}
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/customers/list" element={<CustomerList />} />
        <Route path="/customers/add" element={<CustomerForm existingCustomer={null} onSuccess={() => {}} />} />

        {/* Product Routes */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/list" element={<ProductList />} />
        <Route path="/products/add" element={<ProductForm existingProduct={null} onSuccess={() => {}} />} />

        {/* Order Routes */}
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/orders/list" element={<OrderList />} />
        <Route path="/orders/add" element={<OrderForm existingOrder={null} onSuccess={() => {}} />} />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
