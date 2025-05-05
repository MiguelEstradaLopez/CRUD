import express from 'express';
import productRoutes from './src/routes/productRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api,', productRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});