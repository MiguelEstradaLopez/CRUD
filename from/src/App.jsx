import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './components/login';
import Register from './components/Register';
import ProductList from './components/ProductForm';
import ProductForm from './components/ProductList';

function App() {
    axios.defaults.baseURL = 'http://localhost:3809/api';

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:id/edit" element={<ProductForm />} />
                    <Route path="/products/new" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;