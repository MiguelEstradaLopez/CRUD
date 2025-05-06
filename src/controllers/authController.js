import * as authModel from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validación de email
        if(!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Formato de email inválido' });
        }

        // Validación de contraseña
        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
            return res.status(400).json({ 
                message: "La contraseña debe tener al menos 1 mayúscula, 1 minúscula, 1 número y mínimo 8 caracteres"
            });
        }

        // Hash de la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await authModel.registerUser({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error al registrar el usuario', 
            error: error.message 
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validación de email
        if(!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Formato de email inválido' });
        }

        const user = await authModel.loginUser(email);
        
        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email }, 
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hora
        });
        
        res.status(200).json({ 
            message: 'Usuario logueado exitosamente', 
            token 
        });
    } catch (error) {
        return res.status(401).json({ 
            message: 'Error al iniciar sesión', 
            error: error.message 
        });
    }
};