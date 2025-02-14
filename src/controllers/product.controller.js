const ProductService = require("../services/product.service.js");

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await ProductService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await ProductService.getProducts(req.query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts
};
