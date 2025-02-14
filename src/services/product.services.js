const ProductRepository = require("../repositories/product.repository.js");
const { ProductDTO, CreateProductDTO } = require("../dao/dtos/product.dto.js");

class ProductService {
    async createProduct(productData) {
        try {
            const productDTO = new CreateProductDTO(productData);
            const newProduct = await ProductRepository.createProduct(productDTO);
            return new ProductDTO(newProduct);
        } catch (error) {
            throw error;
        }
    }

    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            const skip = (page - 1) * limit;
            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort === 'asc' || sort === 'desc') {
                sortOptions.price = sort === 'asc' ? 1 : -1;
            }

            const productos = await ProductRepository.getProducts(queryOptions, sortOptions, skip, limit);
            const totalProducts = await ProductRepository.countProducts(queryOptions);
            const totalPages = Math.ceil(totalProducts / limit);

            return {
                docs: productos.map(prod => new ProductDTO(prod)),
                totalPages,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
                page,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages
            };
        } catch (error) {
            console.log("Error en ProductService al obtener productos", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductRepository.getProductById(id);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            return new ProductDTO(product);
        } catch (error) {
            console.log("Error en ProductService al obtener producto por ID", error);
            throw error;
        }
    }
    async updateProduct(id, productData) {
        try {
            const updatedProduct = await ProductRepository.updateProduct(id, productData);
            if (!updatedProduct) {
                throw new Error("Producto no encontrado");
            }
            return new ProductDTO(updatedProduct);
        } catch (error) {
            console.log("Error en ProductService al actualizar producto", error);
            throw error;
        }
    }
    async deleteProduct(id) {
        return await ProductRepository.deleteProduct(id);
    }    
}

module.exports = new ProductService();
