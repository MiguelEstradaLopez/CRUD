import { dbconfing } from "../config/db.config.js";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const pool = mysql.createPool(dbconfing);

export const registerUser = async (userData) => {
    const { username, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
};

export const loginUser = async (email, password) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length === 0) {
        throw new Error('User not found');
    }
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return user;
};