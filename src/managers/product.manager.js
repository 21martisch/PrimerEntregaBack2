const ProductRepository = require("../repositories/product.repository.js");

class ProductManager {
    async addProduct(productData) {
        try {
            const { title, description, price, code, stock, category, thumbnails } = productData;

            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            const existeProducto = await ProductRepository.getProductByCode(code);
            if (existeProducto) {
                console.log("El código debe ser único");
                return;
            }

            const newProduct = await ProductRepository.createProduct({
                title,
                description,
                price,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            return newProduct;
        } catch (error) {
            console.log("Error al agregar producto", error);
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
                docs: productos,
                totalPages,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
                page,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages
            };
        } catch (error) {
            console.log("Error al obtener los productos", error);
            throw error;
        }
    }
}

module.exports = ProductManager;