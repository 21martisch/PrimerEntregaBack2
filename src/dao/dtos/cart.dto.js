class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(item => ({
            productId: item.product._id,
            quantity: item.quantity
        }));
    }
}

module.exports = {
    CartDTO
};
