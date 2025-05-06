import express from 'express';
const router = express.Router();
import * as productcontroller from '../controllers/productController.js'

router.get('/products' , productcontroller.getAllproducts);
router.get('/products/:id' ,productcontroller.getproductbyid);
router.post('/product', productcontroller.createNewProduct);
router.put('/products/:id', productcontroller.updateproduct);
router.delete('/products/:id', productcontroller.deleteproduct);

export default router;