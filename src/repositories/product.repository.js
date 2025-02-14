const ProductModel = require("../dao/models/product.model");

class ProductRepository {
    async createProduct(productData) {
        try {
            const newProduct = new ProductModel(productData);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getProducts(queryOptions, sortOptions, skip, limit) {
        try {
            return await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async getProductByCode(code) {
        try {
            return await ProductModel.findOne({ code });
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, updateData) {
        try {
            return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        return await ProductModel.findByIdAndDelete(id);
    }

    async countProducts(queryOptions) {
        try {
            return await ProductModel.countDocuments(queryOptions);
        } catch (error) {
            throw error;
        }
    }
    async updateProduct(id, productData) {
        return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
    }
}

module.exports = new ProductRepository();
