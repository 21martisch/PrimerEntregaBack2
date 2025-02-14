const CartRepository = require("../repositories/cart.repository.js");

class CartManager {
    async crearCarrito() {
        try {
            return await CartRepository.createCart();
        } catch (error) {
            console.log("Error al crear el nuevo carrito", error);
            throw error;
        }
    }

    async getCarritoById(cartId) {
        try {
            return await CartRepository.getCartById(cartId);
        } catch (error) {
            console.log("Error al obtener el carrito", error);
            throw error;
        }
    }
}

module.exports = CartManager;