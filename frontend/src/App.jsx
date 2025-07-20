import React from 'react';
import Layout from './layout/Layout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePages';
import ContactUsView from './pages/Contact/ContactUsView';
import ProductView from './pages/Products/ProductsView';
import Featured from './pages/Featured/Featured';
import BecomeResellerview from './pages/BecameSeller/BecameResellerView';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} /> {/* ✅ Fixed */}
        <Route path="/products/:categoryId" element={<ProductView />} />
        <Route path="/home/featured" element={<Featured />} /> {/* ✅ Fixed */}
        <Route path="/home/contact-us" element={<ContactUsView />} /> {/* ✅ Fixed */}
        <Route path="/contact" element={<ContactUsView />} /> {/* ✅ Fixed */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
        <Route path="/seller" element={<BecomeResellerview />} /> {/* ✅ Fixed */}
        <Route path="/others/became-seller" element={<BecomeResellerview />} /> {/* ✅ Fixed */}
      </Routes>
    </Layout>
  );
}

export default App;
