import { dbconfing } from "../config/db.config.js"; 
import mysql from 'mysql2/promise';

const pool = mysql.createPool(dbconfing);

// Obtener todos los productos
export const getproducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

// Obtener un producto por ID
export const getproductbyid = async (productId) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
    return rows[0];
};

// Agregar un producto
export const createProduct = async (productData) => {
    const { name, price, description } = productData; 
    const [result] = await pool.query(
        'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
        [name, price, description]
    );
    return { id: result.insertId, name, price, description }; 
};

// Eliminar un producto
export const deleteproduct = async (productId) => {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [productId]);
    return result.affectedRows > 0;
};

// Editar un producto
export const updateproduct = async (productId, productData) => {
    const { name, price, description } = productData;
    const [result] = await pool.query(
        'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
        [name, price, description, productId]
    );
    return result.affectedRows > 0;
};
