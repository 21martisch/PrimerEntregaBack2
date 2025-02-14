class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.code = product.code;
        this.stock = product.stock;
        this.category = product.category;
        this.status = product.status;
        this.thumbnails = product.thumbnails;
    }
}

class CreateProductDTO {
    constructor({ title, description, price, code, stock, category, thumbnails }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.status = true;
        this.thumbnails = thumbnails || [];
    }
}

module.exports = {
    ProductDTO,
    CreateProductDTO
};
