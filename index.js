import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import productRoutes from './src/routes/productRoute.js';
import authRoutes from './src/routes/authRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Invocamos las rutas del proyecto
app.use('/api', productRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});