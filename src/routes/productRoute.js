import express from 'express';
const router = express.Router();
import * as productcontroller from '../controllers/productController.js'

router.get('/products' , productcontroller.getAllproducts);
router.get('/product/:id' ,productcontroller.getproductbyid);
router.post('/newproduct', productcontroller.createNewProduct);
router.put('editproduct/:id', productcontroller.updateproduct);
router.delete('delproduct/:id', productcontroller.deleteproduct);

export default router;