import * as productModel from '../models/productModel.js'

//obtener todos los productos

export const getAllproducts = async (req, res) => {
    try {
        const product = await productModel.getproducts();
        console.log(product); 
        res.status(200).json(product); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: error.message }); 
    }
};

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


export const createNewProduct = async(req, res) => {
    try {
        const { name , price , description } = req.body;
        if(!name || !price || !description ) {
            return res.status(400).json({ message: "fltan datos"});
        }
        const productId = await productModel.createProduct({name, price, description});
        res.status(201).json({id: productId, name, price, description});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}


export const updateproduct = async (req, res) => {
    try{
        const productId = req.params.id;
        const { name , price , description } = req.body;
        await productModel.updateproduct(productId, {name, price, description});
        res.status(200).json({ message: 'producto actualizado correctamente'});
    } catch (error) {
        res.status(500).json({ messege: error.message})
    }
}

export const deleteproduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await productModel.deleteproduct(productId);
        res.status(200).json({ message: "producto eliminado correctamente"});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}