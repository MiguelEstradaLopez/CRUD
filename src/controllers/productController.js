import * as productModel from '../models/productModel'

//obtener todos los productos

export const getAllproducts = async (req, res) => {
    try {
        const product = await productModel.getproducts()
        console.log(products)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({message: error.messege})
    }
}

export const getproductbyid = async (req,res) => {
    try{
        const productId = req.params.id;
        const product = await getproductbyid(productId);
        if(product){
            res.status(201).json(product)
        }else{
            res.status(404).json({ message:'productos no existe'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


export const createNewProduct = async(req.res) => {
    try {
        const { name , price , description } = req.body;
        if(!name || )
    }
}